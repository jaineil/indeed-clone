import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import register from './components/common/Register';

class Main extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={register} />
                <Route path="/register" component={register} />
            </div>
        );
    }
}
export default Main;