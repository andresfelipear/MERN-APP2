
import "./Header.css"
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Navbar, Box, Breadcrumb, Icon } from "react-bulma-components";

function Header() {

    return (
        <div>
            <Box radiusless display="flex" shadowless marginless justifyContent="center" style={{ backgroundColor: "#905960" }}>
                <Breadcrumb separator="bullet">
                    <Breadcrumb.Item active>
                        <a style={{ color: "white", flexDirection:"column", marginInline:"10px" }}>
                            <strong>Contact Numbers</strong>
                            <div>
                                <Icon size="small">
                                    <i className={`fas fa-phone`}></i>
                                </Icon>
                               +1 (236)-986-3592
                            </div>

                        </a>
                    </Breadcrumb.Item>

                    <Breadcrumb.Item active>
                        <a style={{ color: "white", flexDirection:"column", marginInline:"10px" }}>
                            <strong> Schedule</strong>
                            <div>
                                <Icon size="small">
                                    <i className={`fas fa-calendar`}></i>
                                </Icon>
                               M-F 8am - 6pm / Saturday 9am - 3pm
                            </div>

                        </a>
                    </Breadcrumb.Item>

                    <Breadcrumb.Item active>
                        <a style={{ color: "white", flexDirection:"column", marginInline:"10px" }}>
                            <strong> Delivery</strong>
                            <div>
                                <Icon size="small">
                                    <i className={`fas fa-truck`}></i>
                                </Icon>
                               Sunday to Sunday
                            </div>

                        </a>
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
                                <Navbar.Item href="/policy">
                                    Delivery Policy
                                </Navbar.Item>
                                <Navbar.Item href="/contact">
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