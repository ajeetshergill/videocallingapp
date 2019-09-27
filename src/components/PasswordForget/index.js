import React from "react";
import { withRouter, Link } from "react-router-dom";
import { compose } from "recompose";
import { Form, Button, Input, Alert } from "reactstrap";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
const PasswordForgetPage = () => (
    <div>
        <h1>PasswordForget</h1>
        <PasswordForgotForm />
    </div>
);
const INITIAL_STATE = {
    email: "",
    error: null
};

class PasswordForgotFormBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email } = this.state;

        this.props.firebase
            .doPasswordReset(email)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
            })
            .catch(err => {
                this.state({ err });
            });
            event.preventDefault();

    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    render() {
        const { email, error } = this.state;
        const isInvalid = email === "";
        return (
            <Form onSubmit={this.onSubmit}>
                <Input
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                ></Input>
                <Button disabled={isInvalid} type="submit">
                    Reset My Password
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
const PasswordForgetLink = () => (
    <p>
        <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password</Link>
    </p>
);
export default PasswordForgetPage;

const PasswordForgotForm = compose(
    withRouter,
    withFirebase
)(PasswordForgotFormBase);

export { PasswordForgotForm, PasswordForgetLink };
