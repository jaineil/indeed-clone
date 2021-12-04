import CompanyDetails from "../../../db/models/mongo/companyDetails.js";
import CompanyPhotos from "../../../db/models/mongo/companyPhotos.js";
import JobRecords from "../../../db/models/mongo/jobRecords.js";
import CompanyClicks from "../../../db/models/mongo/companyClicks.js";
import moment from "moment";

class CompanyController {
	responseGenerator = (statusCode, message) => ({
		status: statusCode,
		response: message,
	});

	fetchCompanySnapshot = async (data) => {
		const companyId = data.companyId;
		let featuredReviews = [];

		try {
			const company = await CompanyDetails.findOne({ _id: companyId })
				.populate("featuredReviews.reviewId")
				.exec();
			console.log(JSON.stringify(company));

			if (company.featuredReviews.length > 0) {
				company.featuredReviews.map((review) =>
					featuredReviews.push({
						reviewTitle: review.reviewId.reviewTitle,
						city: review.reviewId.companyLocation.city,
						state: review.reviewId.companyLocation.state,
						postedDate: review.reviewId.postedOn,
						overallStars:
							review.reviewId.overallCompanyRatingByReviewer,
						ratingInNumber:
							review.reviewId.overallCompanyRatingByReviewer,
					})
				);
			}

			const snapshot = {
				name: company.companyName,
				avgWorkHappinessScore: company.avgWorkHappinessScore,
				avgLearningScore: company.avgLearningScore,
				avgAppreciationScore: company.avgAppreciationScore,
				aboutTheCompany: company.description.about,
				ceo: company.ceoName,
				founded: company.founded,
				companySize: company.companySize,
				revenue: company.revenue,
				industry: company.industry,
				companyDescription: company.description.about,
				companyMission: company.description.missionAndVision,
				featuredReviews: featuredReviews,
			};

			console.log(JSON.stringify(snapshot));
			return this.responseGenerator(200, snapshot);
		} catch (err) {
			console.error("Error when fetching company snapshot ", err);
			return this.responseGenerator(
				404,
				"Error when fetching company snapshot"
			);
		}
	};

	fetchCompanyWhyJoinUs = async (data) => {
		const companyId = data.companyId;
		try {
			const company = await CompanyDetails.findOne({ _id: companyId });
			console.log(company);

			const whyJoinUs = {
				about: company.description.about,
				workCulture: company.description.workCulture,
				values: company.description.values,
			};
			console.log(JSON.stringify(whyJoinUs));

			return this.responseGenerator(200, whyJoinUs);
		} catch (err) {
			console.error(
				"Error when fetching the 'why join us' section of company ",
				err
			);
			return this.responseGenerator(
				404,
				"Error when fetching the 'why join us' section of company"
			);
		}
	};

	fetchPhotos = async (data) => {
		const companyId = data.companyId;
		let photos = [];

		try {
			const companyPhotos = await CompanyPhotos.find({
				companyId: companyId,
				isPhotoApprovedByAdmin: "APPROVED",
			});
			companyPhotos.map((companyPhoto) =>
				photos.push(companyPhoto.companyPhotoUrl)
			);
			console.log(photos);
			return this.responseGenerator(200, photos);
		} catch (err) {
			console.error("Error fetching photo urls for company", err);
			return this.responseGenerator(
				404,
				"Error fetching photo urls for company"
			);
		}
	};

	fetchCompanySalaries = async (data) => {
		console.log(data);
		const companyId = data.companyId;

		try {
			const salaries = await JobRecords.find(
				{ companyId: companyId },
				{ jobTitle: 1, salary: 1 }
			);
			// const salaries = await JobRecords.aggregate([
			// 	{
			// 		$match: {
			// 			companyId: companyId,
			// 		},
			// 	},
			// 	{
			// 		$project: {
			// 			jobTitle: 1,
			// 			salary: 1,
			// 		},
			// 	},
			// ]);
			console.log(salaries);
			return this.responseGenerator(200, salaries);
		} catch (err) {
			console.error("Error when fetching salaries of a company ", err);
		}
	};

	addClick = async (data) => {
		console.log(data);
		const companyId = data.companyId;
		const date = moment().format("MM-DD-YYYY");
		try {
			const res = await CompanyClicks.updateOne(
				{ companyId: companyId, date: date },
				{
					$set: {
						companyId: companyId,
						date: date,
					},
					$inc: { clicks: 1 },
				},
				{ upsert: true }
			);
			console.log(res);
		} catch (err) {
			console.error(
				"Error when adding click count to company view ",
				err
			);
		}
	};
}

export default CompanyController;
