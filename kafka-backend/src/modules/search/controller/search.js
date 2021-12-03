import Jobs from "../../../db/models/mongo/jobs.js";
import JobRecords from "../../../db/models/mongo/jobRecords.js";
import Reviews from "../../../db/models/mongo/reviews.js";
import CompanyDetails from "../../../db/models/mongo/companyDetails.js";

export class SearchController {
	responseGenerator = (statusCode, message) => ({
		status: statusCode,
		response: message,
	});

	searchJobsTitlesForAutocomplete = async (data) => {
		console.log(data);
		const queryString = data.query;
		let results = [];

		try {
			const suggestions = await Jobs.find({
				jobTitle: {
					$regex: queryString,
					$options: "i",
				},
			});
			console.log(suggestions);
			suggestions.map((suggestion) => results.push(suggestion.jobTitle));

			return this.responseGenerator(200, [...new Set(results.sort())]);
		} catch (err) {
			console.error(
				"Error when fetching job titles for suggestions ",
				err
			);
			return this.responseGenerator(
				404,
				"Error when fetching job titles for suggestions"
			);
		}
	};

	searchJobs = async (data) => {
		console.log(data);
		const searchQuery = data.searchQuery;
		const location = data.location;
		let results = [];

		if (searchQuery) {
			try {
				const jobs = await Jobs.find({
					$and: [
						{
							$or: [
								{
									"jobLocation.city": {
										$regex: location,
										$options: "i",
									},
								},
								{
									"jobLocation.state": {
										$regex: location,
										$options: "i",
									},
								},
							],
						},
						{
							$or: [
								{
									jobTitle: {
										$regex: searchQuery,
										$options: "i",
									},
								},
								{
									companyName: {
										$regex: searchQuery,
										$options: "i",
									},
								},
							],
						},
					],
				})
					.populate("companyId")
					.exec();

				jobs.map((job) => {
					if (
						job.jobTitle.toLowerCase() ===
							searchQuery.toLowerCase() ||
						job.companyName.toLowerCase() ===
							searchQuery.toLowerCase()
					) {
						results.push({
							jobId: job._id,
							jobTitle: job.jobTitle,
							companyId: job.companyId._id,
							companyName: job.companyName,
							rating: job.companyId.averageRating,
							city: job.jobLocation.city,
							state: job.jobLocation.state,
							salary: job.salary,
							description: job.jobDescription.description,
						});
					}
				});
				console.log(JSON.stringify(results));

				return this.responseGenerator(200, results);
			} catch (err) {
				console.error("Error when searching for jobs ", err);
				return this.responseGenerator(
					404,
					"Error when searching for jobs"
				);
			}
		} else {
			const jobs = await Jobs.find({
				$or: [
					{
						"jobLocation.city": {
							$regex: location,
							$options: "i",
						},
					},
					{
						"jobLocation.state": {
							$regex: location,
							$options: "i",
						},
					},
				],
			})
				.populate("companyId")
				.exec();

			jobs.map((job) =>
				results.push({
					jobId: job._id,
					jobTitle: job.jobTitle,
					companyId: job.companyId._id,
					companyName: job.companyName,
					rating: job.companyId.averageRating,
					city: job.jobLocation.city,
					state: job.jobLocation.state,
					salary: job.salary,
					description: job.jobDescription.description,
				})
			);
			console.log(JSON.stringify(results));
			return this.responseGenerator(200, results);
		}
	};

	searchCompanies = async (data) => {
		console.log(data);
		let location;
		const companyName = data.companyName;
		data.location ? (location = data.location) : (location = undefined);

		let results = [];

		if (location) {
			try {
				const companies = await CompanyDetails.find({
					$and: [
						{
							companyName: {
								$regex: companyName,
								$options: "i",
							},
						},
						{
							$or: [
								{
									"companyLocation.city": {
										$regex: location,
										$options: "i",
									},
								},
								{
									"companyLocation.state": {
										$regex: location,
										$options: "i",
									},
								},
							],
						},
					],
				});
				console.log(JSON.stringify(companies));
				companies.map((company) =>
					results.push({
						companyId: company.id,
						companyName: company.companyName,
						averageRating: company.averageRating,
					})
				);
				return this.responseGenerator(200, results);
			} catch (err) {
				console.error(
					"Error during searching companies with both filters ",
					err
				);
				return this.responseGenerator(
					404,
					"Error during searching companies with both filters"
				);
			}
		} else {
			try {
				const companies = await CompanyDetails.find({
					companyName: {
						$regex: companyName,
						$options: "i",
					},
				});
				console.log(JSON.stringify(companies));
				companies.map((company) =>
					results.push({
						companyId: company.id,
						companyName: company.companyName,
						averageRating: company.averageRating,
					})
				);
				return this.responseGenerator(200, results);
			} catch (err) {
				console.error(
					"Error during searching companies with company name ",
					err
				);
				return this.responseGenerator(
					404,
					"Error during searching companies with company name"
				);
			}
		}
	};

	searchSalaries = async (data) => {
		console.log(data);

		const jobTitle = data.jobTitle;
		const location = data.location;
		let results = [];

		try {
			const companies = await JobRecords.aggregate([
				{
					$match: {
						jobTitle: jobTitle,
						"jobLocation.city": location,
					},
				},
				{
					$group: {
						_id: {
							companyId: "$companyId",
							companyName: "$companyName",
						},
						count: {
							$sum: 1,
						},
						avgSalary: {
							$avg: "$salary",
						},
					},
				},
				{
					$sort: {
						avgSalary: -1,
					},
				},
			]).limit(5);

			const averageSalaryForRole = await JobRecords.aggregate([
				{
					$match: {
						jobTitle: jobTitle,
						"jobLocation.city": location,
					},
				},
				{
					$group: {
						_id: {
							role: "$jobTitle",
							location: "$jobLocation.city",
						},
						overallAvgSalary: {
							$avg: "$salary",
						},
					},
				},
			]);

			console.log(JSON.stringify(companies));
			console.log(JSON.stringify(averageSalaryForRole));

			const overallAvgSalary = averageSalaryForRole[0].overallAvgSalary;

			for (const company of companies) {
				const companyId = company._id.companyId;
				const companyName = company._id.companyName;
				const companyAvgSalaryForRole = company.avgSalary;
				const numberOfSalaries = company.count;

				const totalReviewsForCompany = await Reviews.find({
					companyId: companyId,
					isReviewApprovedByAdmin: "APPROVED",
				});
				console.log(totalReviewsForCompany.length);
				const numberOfReviews = totalReviewsForCompany.length;

				const result = {
					companyId: companyId,
					companyName: companyName,
					averageSalary: companyAvgSalaryForRole,
					numberOfReviews: numberOfReviews,
					numberOfSalaries: numberOfSalaries,
				};

				results.push(result);
			}

			return this.responseGenerator(200, {
				overallAverageSalary: overallAvgSalary,
				highestPayingCompanies: results,
			});
		} catch (err) {
			console.error(
				"Error somewhere during searching salaries for a particular role ",
				err
			);
			return this.responseGenerator(
				404,
				"Error somewhere during searching salaries for a particular role"
			);
		}
	};
}
