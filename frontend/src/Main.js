import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import register from './components/common/Register';
import home from './components/jobseeker/Landing/Home'
import login from './components/common/Login';
import employerDashboard from './components/employer/LandingPage';

class Main extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={register} />
                <Route path="/login" component={login} />
                <Route path="/register" component={register} />
                <Route path="/home" component={home} />
                <Route path="/testEmployer" component={employerDashboard} />
            </div>
        );
    }
}
export default Main;