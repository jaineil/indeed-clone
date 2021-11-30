import React, { Component } from "react";
import { Route } from "react-router-dom";
import register from "./components/common/Register";
import home from "./components/jobseeker/Landing/Home";
import login from "./components/common/Login";
import jobs from "./components/jobseeker/jobs/DisplayJobs";

import employerDashboard from "./components/employer/LandingPage";
import employerProfile from "./components/employer/Profile";

import JobSeekerChats from "./components/chats/jobSeeker";
import EmployerChats from "./components/chats/employer";
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
			</div>
		);
	}
}
export default Main;
