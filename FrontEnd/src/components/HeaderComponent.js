import React, { useState } from 'react';
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

const Header = ({ cartItems, isLoggedIn }) => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    }

    return (
        <div>
            <Navbar dark expand="md">
                <div className="container">
                    <NavbarBrand className="mr-auto" href="/"><img src='assets/images/logo.png' height="30" width="41" alt='Indian Restaurant ' /></NavbarBrand>
                    <div className="d-flex justify-content-between">
                        <NavbarToggler onClick={toggleNav} />
                        <Collapse isOpen={isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to='/home'><span className="fa fa-home fa-lg"></span> Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/about'><span className="fa fa-info fa-lg"></span> About Us</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/menu'><span className="fa fa-list fa-lg"></span> Menu</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/contact'><span className="fa fa-address-card fa-lg"></span> Contact Us</NavLink>
                                </NavItem>
                                {isLoggedIn && (
                                <NavItem>
                                    {/* Display number of items in cart */}
                                    <NavLink className="nav-link" to='/cart'><span className="fa fa-shopping-cart fa-lg"></span> {cartItems} </NavLink>
                                </NavItem>
                                )}
                                {isLoggedIn && ( // Render profile link only if user is logged in
                                    <NavItem>
                                        <NavLink className="nav-link" to='/profile'><span className="fa fa-user fa-lg"></span> Profile</NavLink>
                                    </NavItem>
                                )}
                            </Nav>
                        </Collapse>
                        <Collapse  navbar>
                            <Nav className="ml-auto" navbar>
                                {!isLoggedIn ? ( // Render login and signup links if user is not logged in
                                    <>
                                        <NavItem>
                                            <NavLink className="nav-link" to='/login'><span className="fa fa-sign-in fa-lg"></span> Login</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink className="nav-link" to='/signup'><span className="fa fa-user-plus fa-lg"></span> Sign Up</NavLink>
                                        </NavItem>
                                    </>
                                ) : ( // Render logout link if user is logged in
                                    <NavItem>
                                        <NavLink className="nav-link" to='/logout' ><span className="fa fa-sign-out fa-lg"></span> Logout</NavLink>
                                    </NavItem>
                                )}
                            </Nav>
                        </Collapse>
                        <NavbarToggler  />
                    </div>
                </div>
            </Navbar>

            <div className="container">
                <div className="row row-header">
                    <div className="col-12 col-sm-6">
                        <h1>Indian Restaurant!</h1>
                        <p>We take inspiration from the World's best cuisines!</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
