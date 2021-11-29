import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import register from './components/common/Register';
import home from './components/jobseeker/Landing/Home'
import login from './components/common/Login';
import jobs from './components/jobseeker/jobs/DisplayJobs';

import employerDashboard from './components/employer/LandingPage';
import employerProfile from './components/employer/Profile';
import postJob from './components/employer/PostJob';
import candidates from './components/employer/Candidates';
import viewApplication from './components/employer/ViewApplication';
import report from './components/employer/Report';

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
                <Route path="/postJob" component={postJob} />
                <Route path="/candidates" component={candidates} />
                <Route path="/jobs" component={employerDashboard} />
                <Route path="/viewApplication" component={viewApplication} />
                <Route path="/reports" component={report} />
            </div>
        );
    }
}
export default Main;