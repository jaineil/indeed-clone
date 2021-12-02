import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import register from './components/common/Register';
import home from './components/jobseeker/Landing/Home'
import login from './components/common/Login';
import jobs from './components/jobseeker/jobs/DisplayJobs';
import companyHome from './components/jobseeker/company/CompanyHome';
import CompanyJoinus from './components/jobseeker/company/CompanyJoinus';
import CompanyReview from './components/jobseeker/company/CompanyReview';
import CompanySalaries from './components/jobseeker/company/CompanySalaries';
import {AddCompanySalaryModal} from "./components/jobseeker/company/AddCompanySalaryModal";
import jobseekerprofile from "./components/jobseeker/profile/JobSeekerProfile";
import findSalaries from "./components/jobseeker/salaries/FindSalaries";

import employerJobs from "./components/employer/Jobs";
import employerProfile from "./components/employer/Profile";
import employerCandidates from "./components/employer/Candidates";

import JobSeekerChats from "./components/chats/jobSeeker";
import EmployerChats from "./components/chats/employer";
import employerReport from "./components/employer/Report";
import employerReviews from "./components/employer/Reviews";
import employerPostJob from "./components/employer/PostJob";

class Main extends Component {
    
    render() {
        
        return (
            <div>
                <Route exact path="/" component={register} />
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
				<Route path="/addcompanysalary" component={AddCompanySalaryModal} />

				<Route path="/jobSeekerChats" component={JobSeekerChats} />
				<Route path="/employerChats" component={EmployerChats} />

                <Route path="/employer" component={employerJobs} />
                <Route path="/employer/profile" component={employerProfile} />
				<Route path="/employer/candidates" component={employerCandidates} />
				<Route path="/employer/jobs" component={employerJobs} />
				<Route path="/employer/reports" component={employerReport} />
				<Route path="/employer/reviews" component={employerReviews} />
				<Route path="/employer/postJob" component={employerPostJob} />

            </div>
        );
    }
}

export default Main;
