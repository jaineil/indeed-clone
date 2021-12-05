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
			"http://localhost:3001/admin/get-company?companyId=61aac8704fd27cc26a715eb3"
		);
		assert.isObject(response);
	});
});

describe("#ViewJobSeekerProfileAPI", () => {
	it("View job seeker profile API", async () => {
		const response = await makeGETRequest(
			"http://localhost:3001/job-seeker/get-profile?jobseekerId=61aac776830647c66d5810c2"
		);
		assert.isArray([]);
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

describe("#Top5ReviewedCompaniesAPI", () => {
	it("Top 5 reviewed companies API", async () => {
		const response = await makeGETRequest(
			"http://localhost:3001/admin/top-5-companies-average-rating"
		);
		assert.isNotObject(response);
	});
});

describe("#GetAllCompaniesAPI", () => {
	it("Get all companies API", async () => {
		const response = await makeGETRequest(
			"http://localhost:3001/admin/get-companies"
		);
		assert.isArray(response);
	});
});

describe("#GetPhotoRequests", () => {
	it("Admin get photo requests API", async () => {
		const response = await makeGETRequest(
			"http://localhost:3001/admin/get-photo-requests"
		);
		assert.isArray(response);
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

describe("#GetListOfApplicantsForJobAPI", () => {
	it("Get List of applicants for job API", async () => {
		const response = await makeGETRequest(
			"http://localhost:3001/employer/get-job-applicants?jobId=61aacaba1bfe57e6414aaa81"
		);
		assert.isArray(response);
	});
});
