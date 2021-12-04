import React, { Component } from "react";
import { Route } from "react-router-dom";
import register from "./components/common/Register";
import home from "./components/jobseeker/Landing/Home";
import login from "./components/common/Login";
import jobs from "./components/jobseeker/jobs/DisplayJobs";
import companyHome from "./components/jobseeker/company/CompanyHome";
import CompanyJoinus from "./components/jobseeker/company/CompanyJoinus";
import CompanyReview from "./components/jobseeker/company/CompanyReview";
import CompanySalaries from "./components/jobseeker/company/CompanySalaries";
import CompanyPhotos from "./components/jobseeker/company/CompanyPhotos";
import { AddCompanySalaryModal } from "./components/jobseeker/company/AddCompanySalaryModal";
import jobseekerprofile from "./components/jobseeker/profile/JobSeekerProfile";
import findSalaries from "./components/jobseeker/salaries/FindSalaries";
import CompanyJobs from "./components/jobseeker/company/CompanyJobs";
import CompanyReviews from "./components/jobseeker/Landing/CompanyReviews";
import employerDashboard from "./components/employer/LandingPage";
import employerJobs from "./components/employer/Jobs";
import employerProfile from "./components/employer/Profile";
import employerCandidates from "./components/employer/Candidates";
import myJobs from "./components/jobseeker/activity/myJobs/MyJobs";
import myReviews from "./components/jobseeker/activity/myReviews/MyReviews";
import JobSeekerChats from "./components/chats/jobSeeker";
import employerChats from "./components/chats/employer";
import { AdminPortal } from "./components/admin/AdminPortal";
import { CompanyStats } from "./components/admin/components/CompanyStats";
import employerReport from "./components/employer/Report";
import employerReviews from "./components/employer/Reviews";
import employerPostJob from "./components/employer/PostJob";
import employerLandingPage from "./components/employer/LandingPage";
import LandingPage from "./components/common/Landing";


class Main extends Component {
	render() {
		return (
			<div>
				<Route exact path="/" component={LandingPage} />
				<Route path="/login" component={login} />
				<Route path="/register" component={register} />
				<Route path="/home" component={home} />
				<Route path="/displayjobs" component={jobs} />
				<Route path="/companyhome" component={companyHome} />
				<Route path="/joinus" component={CompanyJoinus} />
				<Route path="/companyreview" component={CompanyReview} />
				<Route path="/companysalary" component={CompanySalaries} />
				<Route path="/jobseekerprofile" component={jobseekerprofile} />
				<Route path="/career/salaries" component={findSalaries} />
				<Route path="/savedjobs" component={myJobs} />
				<Route path="/jobSeekerChats" component={JobSeekerChats} />
				<Route path="/companyphotos" component={CompanyPhotos} />
				<Route path="/reviews" component={myReviews} />

				<Route path="/addcompanysalary" component={AddCompanySalaryModal} />
				<Route path="/companyjobs" component={CompanyJobs} />
				<Route path="/companyReviews" component={CompanyReviews} />
				<Route path="/admin" component={AdminPortal} />
        		<Route path="/companystats" component={CompanyStats} />				
				<Route exact path="/employer/profile" component={employerProfile} />
				<Route exact path="/employer/candidates" component={employerCandidates} />
				<Route exact path="/employer/jobs" component={employerJobs} />
				<Route exact path="/employer/reports" component={employerReport} />
				<Route exact path="/employer/reviews" component={employerReviews} />
				<Route exact path="/employer/postJob" component={employerPostJob} />
				<Route exact path="/employer/messages" component={employerChats} />
				<Route exact path="/employer" component={employerLandingPage} />
			</div>
		);
	}
}

export default Main;
