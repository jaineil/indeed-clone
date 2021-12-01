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
import AddCompanySalary from "./components/jobseeker/company/AddCompanySalaries";
import jobseekerprofile from "./components/jobseeker/profile/JobSeekerProfile";
import findSalaries from "./components/jobseeker/salaries/FindSalaries";

import employerDashboard from "./components/employer/LandingPage";
import employerProfile from "./components/employer/Profile";
import employerCandidates from "./components/employer/Candidates";

import JobSeekerChats from "./components/chats/jobSeeker";
import EmployerChats from "./components/chats/employer";
import employerReport from "./components/employer/Report";

class Main extends Component {
	render() {
		return (
			<div>
				<Route exact path="/" component={register} />
				<Route path="/login" component={login} />
				<Route path="/register" component={register} />
				<Route path="/home" component={home} />
				<Route path="/displayjobs" component={jobs} />
				<Route path="/employer" component={employerDashboard} />
				<Route path="/profile" component={employerProfile} />
				<Route path="/jobSeekerChats" component={JobSeekerChats} />
				<Route path="/employerChats" component={EmployerChats} />
				<Route path="/companyhome" component={companyHome} />
				<Route path="/joinus" component={CompanyJoinus} />
				<Route path="/companyreview" component={CompanyReview} />
				<Route path="/companysalary" component={CompanySalaries} />
				<Route path="/addcompanysalary" component={AddCompanySalary} />
				<Route path="/jobseekerprofile" component={jobseekerprofile} />
				<Route path="/career/salaries" component={findSalaries} />
				<Route path="/candidates" component={employerCandidates} />
				<Route path="/jobs" component={employerDashboard} />
				<Route path="/reports" component={employerReport} />
			</div>
		);
	}
}

export default Main;
