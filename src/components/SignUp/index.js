import React from "react";
import { Form, Button, Input, Alert } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";
import * as ROUTES from "./../../constants/routes";
const SignUpPage = () => (
    <div>
        <h1>Sign Up</h1>
        <SignUpForm />
    </div>
);

const INITIAL_STATE = {
    username: "",
    email: "",
    passwordOne: "",
    passwordTwo: "",
    error: null
};
class SignUpFormBase extends React.Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        event.preventDefault();

        const { username, email, passwordOne } = this.state;

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error });
            });
    };
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    onErrorDismiss = event => {
        this.setState({ error: INITIAL_STATE.error });
    };
    render() {
        const { username, email, passwordOne, passwordTwo, error } = this.state;
        const isNotValid =
            passwordOne !== passwordTwo ||
            passwordOne === "" ||
            email === "" ||
            username === "";
        return (
            <Form onSubmit={this.onSubmit}>
                <Input
                    name="username"
                    value={username}
                    type="text"
                    onChange={this.onChange}
                    placeholder="Full Name"
                    className="m-2"
                />
                <Input
                    name="email"
                    value={email}
                    type="text"
                    onChange={this.onChange}
                    placeholder="Email"
                    className="m-2"
                />
                <Input
                    name="passwordOne"
                    value={passwordOne}
                    type="password"
                    onChange={this.onChange}
                    placeholder="Password"
                    className="m-2"
                />
                <Input
                    name="passwordTwo"
                    value={passwordTwo}
                    type="password"
                    onChange={this.onChange}
                    placeholder="Confirm Password"
                    className="m-2"
                />
                <Button
                    type="Submit"
                    disabled={isNotValid}
                    className="mx-auto d-block"
                >
                    Sign Up
                </Button>
                <Alert
                    color="danger"
                    isOpen={error}
                    toggle={this.onErrorDismiss}
                >
                    {error && <p>{error.message}</p>}
                </Alert>
            </Form>
        );
    }
}

const SignUpLink = () => {
    return (
        <p>
            Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
        </p>
    );
};
const SignUpForm = compose(
    withRouter,
    withFirebase
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };
