
import "./Header.css"
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Navbar } from "react-bulma-components";

function Header() {

    return (
        <div>
            
            <Navbar color="light" backgroundColor="danger-light">
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