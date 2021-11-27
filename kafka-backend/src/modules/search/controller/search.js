import JobRecords from "../../../db/models/mongo/jobRecords.js";
import Reviews from "../../../db/models/mongo/reviews.js";

export class SearchController {
	responseGenerator = (statusCode, message) => ({
		status: statusCode,
		response: message,
	});

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
