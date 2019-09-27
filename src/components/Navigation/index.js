import React from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from "reactstrap";
import * as ROUTES from "../../constants/routes";
import SignOutButton from "../SignOut";
import { AuthUserContext } from "../Session";

export class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            authUser: props.authUser,
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <div>
                <Navbar color="primary" dark expand="sm">
                    <NavbarToggler
                        onClick={this.toggleNavbar}
                        className="mr-2"
                    />
                    <AuthUserContext.Consumer>
                        {authUser =>
                            authUser ? (
                                <NavigationAuth />
                            ) : (
                                <NavigationNonAuth />
                            )
                        }
                    </AuthUserContext.Consumer>

                    <Collapse isOpen={!this.state.collapsed} navbar></Collapse>
                    <NavbarBrand href="/" className="ml-auto">
                        Video App
                    </NavbarBrand>
                </Navbar>
            </div>
        );
    }
}

const NavigationAuth = () => {
    return (
        <Nav navbar>
            <NavItem>
                <NavLink href={ROUTES.LANDING}>Landing</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href={ROUTES.HOME}>Home</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href={ROUTES.ACCOUNT}>Account</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href={ROUTES.ADMIN}>Admin</NavLink>
            </NavItem>
            <SignOutButton />
        </Nav>
    );
};

const NavigationNonAuth = () => {
    return (
        <Nav navbar>
            <NavItem>
                <NavLink href={ROUTES.SIGN_IN}>Sign In</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href={ROUTES.LANDING}>Landing</NavLink>
            </NavItem>
        </Nav>
    );
};

export default Navigation;
