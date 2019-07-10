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
export default class Example extends React.Component {
    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
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
                <Navbar color="danger" dark expand="sm">
                    <NavbarToggler
                        onClick={this.toggleNavbar}
                        className="mr-2"
                    />
                    <Collapse isOpen={!this.state.collapsed} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink href={ROUTES.SIGN_IN}>Sign In</NavLink>
                            </NavItem>
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
                    </Collapse>

                    <NavbarBrand href="/" className="ml-auto">
                        Video App
                    </NavbarBrand>
                </Navbar>
            </div>
        );
    }
}
