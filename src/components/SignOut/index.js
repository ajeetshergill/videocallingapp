import React from "react";
import { withFirebase } from "../Firebase";
import { Button } from "reactstrap";
const SignOutButton = ({ firebase , color = 'primary'}) => {
    return (
            <Button onClick={firebase.doSignOut} color={color} className="mx-2">Sign Out</Button>
    );
};

export default withFirebase(SignOutButton);