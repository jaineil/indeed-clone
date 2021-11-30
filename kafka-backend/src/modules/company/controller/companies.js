import CompanyDetails from "../../../db/models/mongo/companyDetails.js";

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
				avgWorkHappinessScore: company.avgWorkHappinessScore,
				avgLearningScore: company.avgLearningScore,
				avgAppreciationScore: company.avgAppreciationScore,
				aboutTheCompany: company.description.about,
				ceo: company.ceoName,
				founded: company.founded,
				companySize: company.companySize,
				revenue: company.revenue,
				industry: company.industry,
				companyDescription: company.about,
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
}

export default CompanyController;
