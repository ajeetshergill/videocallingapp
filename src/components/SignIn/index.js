import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { Form, Button, Input, Alert } from "reactstrap";
import { withFirebase } from "../Firebase";
import { SignUpLink } from "../SignUp";
import * as ROUTES from "../../constants/routes";
const SignIn = () => (
    <div>
        <h1>Sign In</h1>
        <SignInForm />
        <SignUpLink />
    </div>
);

const INITIAL_STATE = {
    email: "",
    password: "",
    error: null
};

class SignInFormBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }
    onSubmit = event => {
        event.preventDefault();
        const { email, password } = this.state;
        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
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
    render() {
        const { email, password, error } = this.state;

        const isInvalid = email === "" || password === "";

        return (
            <Form onSubmit={this.onSubmit}>
                <Input
                    name="email"
                    value={email}
                    type="text"
                    onChange={this.onChange}
                    placeholder="Email"
                    className="mx-auto w-50 my-2"
                />
                <Input
                    name="password"
                    value={password}
                    type="password"
                    onChange={this.onChange}
                    placeholder="Password"
                    className="mx-auto w-50 my-2"
                />
                <Button
                    color="danger"
                    type="Submit"
                    disabled={isInvalid}
                    className="mx-auto w-50 my-2"
                    block
                    outline
                >
                    Sign In
                </Button>
                <Alert
                    className="mx-auto w-50 my-2"
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

const SignInForm = compose(
    withRouter,
    withFirebase
)(SignInFormBase);
export default SignIn;

export { SignInForm };
