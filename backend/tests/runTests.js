// import { makeGETRequest, makePOSTRequest } from "./makeRequest.js";
import { assert } from "chai";
import axios from "axios";

const makeGETRequest = async (url) => {
	const response = await axios.get(url);
	return response.data;
};

describe("#TopReviewsPerDayAPI", () => {
	it("Should return the previous 7 days' total new reviews", async () => {
		const response = await makeGETRequest(
			"http://localhost:3001/admin/reviews-per-day"
		);
		assert.isObject(response);
		assert.strictEqual(typeof response, "object");
	});
});

describe("#Top10CEOsBasedOnRatingAPI", () => {
	it("Should return the top 10 highest rated CEOs", async () => {
		const response = await makeGETRequest(
			"http://localhost:3001/admin/top-ceos"
		);
		assert.isArray(response);
		// assert.strictEqual(typeof response, "array");
	});
});

describe("#GetCompanyProfileAPI", () => {
	it("Employer company profile API", async () => {
		const response = await makeGETRequest(
			"http://localhost:3001/admin/get-company?companyId=61aa224794208aad9216c4e4"
		);
		assert.isObject(response);
	});
});

describe("#ViewJobSeekerProfileAPI", () => {
	it("View job seeker profile API", async () => {
		const response = await makeGETRequest(
			"http://localhost:3001/job-seeker/get-profile?jobseekerId=61aa46eb90978ad352f37ddb"
		);
		assert.isObject(response);
	});
});

describe("#NumberOfApplicantsForJobAPI", () => {
	it("Get Number of applicants for the job API", async () => {
		const response = await makeGETRequest(
			"http://localhost:3001/employer/get-number-of-job-applicants?jobId=61aa238494208aad9216c93c"
		);
		assert.isObject(response);
	});
});

// describe("#GetCompanyProfileAPI", () => {
// 	it("Employer company profile API", async () => {
// 		const response = await makeGETRequest(
// 			"http://localhost:3001/employer/viewCompany/61aa224794208aad9216c4e4"
// 		);
// 		assert.isObject(response);
// 	});
// });

// describe("#GetCompanyProfileAPI", () => {
// 	it("Employer company profile API", async () => {
// 		const response = await makeGETRequest(
// 			"http://localhost:3001/employer/viewCompany/61aa224794208aad9216c4e4"
// 		);
// 		assert.isObject(response);
// 	});
// });

// describe("#GetCompanyProfileAPI", () => {
// 	it("Employer company profile API", async () => {
// 		const response = await makeGETRequest(
// 			"http://localhost:3001/employer/viewCompany/61aa224794208aad9216c4e4"
// 		);
// 		assert.isObject(response);
// 	});
// });

// describe("#GetCompanyProfileAPI", () => {
// 	it("Employer company profile API", async () => {
// 		const response = await makeGETRequest(
// 			"http://localhost:3001/employer/viewCompany/61aa224794208aad9216c4e4"
// 		);
// 		assert.isObject(response);
// 	});
// });

// describe("#GetCompanyProfileAPI", () => {
// 	it("Employer company profile API", async () => {
// 		const response = await makeGETRequest(
// 			"http://localhost:3001/employer/viewCompany/61aa224794208aad9216c4e4"
// 		);
// 		assert.isObject(response);
// 	});
// });
