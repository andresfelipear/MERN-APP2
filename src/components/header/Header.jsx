
import "./Header.css"
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Navbar, Box, Breadcrumb, Icon } from "react-bulma-components";

function Header() {

    return (
        <div>
            <Box radiusless display="flex" shadowless marginless justifyContent="center" style={{ backgroundColor: "#905960" }}>
                <Breadcrumb separator="succeeds">
                    <Breadcrumb.Item active>
                        <a style={{ color: "white", flexDirection:"column" }}>
                            Contact Numbers
                            <div>
                                <Icon size="small">
                                    <i className={`fas fa-phone`}></i>
                                </Icon>
                               +1 (236)-986-3592
                            </div>

                        </a>
                    </Breadcrumb.Item>

                    <Breadcrumb.Item active>
                        <a style={{ color: "white" }}>Schedule</a>
                    </Breadcrumb.Item>

                    <Breadcrumb.Item active>
                        <a style={{ color: "white" }}>Delivery</a>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </Box>

            <Navbar p={2} color="light" backgroundColor="danger-light">
                <Navbar.Brand >
                    <Navbar.Item href="/">
                        <img src="/logo.png" alt="logo" />
                    </Navbar.Item>
                    <Navbar.Item href="/">
                        Home
                    </Navbar.Item>

                </Navbar.Brand>
                <Navbar.Menu>
                    <Navbar.Container>
                        <Navbar.Item active={false} hoverable={true} >
                            <Navbar.Link>
                                More
                            </Navbar.Link>
                            <Navbar.Dropdown>
                                <Navbar.Item>
                                    Breakfasts
                                </Navbar.Item>
                                <Navbar.Item>
                                    Delivery Policy
                                </Navbar.Item>
                                <Navbar.Item>
                                    Contact
                                </Navbar.Item>
                            </Navbar.Dropdown>
                        </Navbar.Item>
                    </Navbar.Container>
                    <Navbar.Container align="right">
                        <Navbar.Item href="/login">
                            Login
                        </Navbar.Item>
                        <Navbar.Item href="/signup">
                            SignUp
                        </Navbar.Item>
                    </Navbar.Container>
                </Navbar.Menu>
            </Navbar>

        </div>
    )
}

export default Header