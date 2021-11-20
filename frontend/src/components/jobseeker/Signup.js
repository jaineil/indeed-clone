import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signup } from '../../_actions/signupAction';
import { Redirect } from 'react-router';
import { Row, Col, Form, Button } from 'react-bootstrap';
import './Signup.css';


class RestaurantSignup extends Component {
    
    constructor(props) {
        super(props);
        this.state = {};
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    onSubmit = (e) => {
        //prevent the page from refresh
        e.preventDefault();
        const data = {
            email_id: this.state.email_id,
            password: this.state.password,
            role: this.state.role
        }

        this.props.signup(data);

        this.setState({
            signedUp: 1
        });
    }

    render() {
        console.log('rendering the page');
        //redirect based on successful signup
        let redirectVar = null;
        let message = "";

        //Get the username from local or session storage.
        if (!localStorage.getItem("user_id")) {
            redirectVar = <Redirect to="/signup" />
        }
        if (this.props.user === "USER_ADDED" && this.state.signedUp) {
            console.log("User successfully login");
            message = "You have registered successfully. Please Login!";
            redirectVar = <Redirect to="/login" />
        }
        else if(this.props.user === "USER_EXISTS" && this.state.signedUp){
            message = "Username is already registered"
        }
        return (
            <div className= "backGroundLayer">
                {redirectVar}
                <div className="pass-PageLayout-content">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Create Account
                        </Button>
                    </Form>
                </div> <br />
            </div>
            
        )
    }
}

RestaurantSignup.propTypes = {
    RestaurantSignup: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.signup.user
});

export default connect(mapStateToProps, { signup })(RestaurantSignup);
