import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import signup from './components/jobseeker/Signup';
import register from './components/jobseeker/Register';

class Main extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={signup} />
                <Route path="/signup" component={signup} />
                <Route path="/register" component={register} />
            </div>
        );
    }
}
export default Main;