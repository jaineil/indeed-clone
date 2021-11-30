import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import register from './components/common/Register';
import home from './components/jobseeker/Landing/Home'
import login from './components/common/Login';
import jobs from './components/jobseeker/jobs/DisplayJobs';
import companyHome from './components/jobseeker/company/CompanyHome';
import CompanyJoinus from './components/jobseeker/company/CompanyJoinus';
import CompanyReview from './components/jobseeker/company/CompanyReview';

import employerDashboard from './components/employer/LandingPage';
import employerProfile from './components/employer/Profile';


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


                <Route path="/employer" component={employerDashboard} />
                <Route path="/profile" component={employerProfile} />

            </div>
        );
    }
}
export default Main;