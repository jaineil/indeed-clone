import React, { Component } from "react";
import { Route } from "react-router-dom";
import register from "./components/common/Register";
import home from "./components/jobseeker/Landing/Home";
import login from "./components/common/Login";
import jobs from "./components/jobseeker/jobs/DisplayJobs";
import jobseekerprofile from "./components/jobseeker/profile/JobSeekerProfile";
import employerDashboard from "./components/employer/LandingPage";
import employerProfile from "./components/employer/Profile";
import findSalaries from "./components/jobseeker/salaries/FindSalaries";

class Main extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={register} />
        <Route path="/login" component={login} />
        <Route path="/register" component={register} />
        <Route path="/home" component={home} />
        <Route path="/displayjobs" component={jobs} />
        <Route path="/career/salaries" component={findSalaries} />
        <Route path="/employer" component={employerDashboard} />
        <Route path="/profile" component={employerProfile} />
        <Route path="/jobseekerprofile" component={jobseekerprofile} />
      </div>
    );
  }
}
export default Main;
