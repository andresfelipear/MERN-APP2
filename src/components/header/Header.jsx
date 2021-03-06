
import "./Header.css"
import React, { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Navbar, Box, Breadcrumb, Icon, Button } from "react-bulma-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom';

function Header() {

    const [userContext, setUserContext] = useContext(UserContext);

    const mediaDesktop = '(min-width:1024px )';

    const [isDesktop, setIsDesktop] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const media = window.matchMedia(mediaDesktop)
        if (media.matches !== isDesktop) {
            setIsDesktop(media.matches)
        }
        const listener = () => setIsDesktop(media.matches);
        window.addEventListener("resize", listener);
        return () => window.removeEventListener("resize", listener);

    }, [isDesktop])

    const fetchUserDetails = useCallback(() => {
        fetch(process.env.REACT_APP_API_ENDPOINT + "api/user/me", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userContext.token}`,
            },
        }).then(async (response) => {
            if (response.ok) {
                const data = await response.json();
                setUserContext((prev) => ({ ...prev, details: data }));
            } else {
                if (response.status === 401) {
                    window.location.reload();
                } else {
                    setUserContext((prev) => ({ ...prev, details: null }));
                }
            }
        });
    }, [setUserContext, userContext.token]);

    useEffect(() => {
        if (!userContext.details && userContext.token) {
            fetchUserDetails();
        }
    }, [fetchUserDetails, userContext.details]);


    //logout
    const logoutHandler = () => {
        fetch(process.env.REACT_APP_API_ENDPOINT + "api/user/logout", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userContext.token}`,
            },
        }).then(async (response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            else {
                const data = await response.json()
                setUserContext(prev => ({ ...prev, details: undefined, token: null, cartId: null }))
                navigate('/')
            }

        });
    }

    return (
        <div>
            <Box radiusless display="flex" shadowless marginless justifyContent="center" style={{ backgroundColor: "#905960" }}>
                <Breadcrumb separator="bullet" className="header">
                    <Breadcrumb.Item active>
                        <a style={{ color: "white", flexDirection: "column", marginInline: "10px" }}>
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
                        <a style={{ color: "white", flexDirection: "column", marginInline: "10px" }}>
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
                        <a style={{ color: "white", flexDirection: "column", marginInline: "10px" }}>
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

            <Navbar  color="light" backgroundColor="danger-light">
                <Navbar.Brand style={{ display: 'flex', justifyContent: 'space-between' }} >
                    <div style={{ display: 'flex' }}>
                        <Navbar.Item href="/">
                            <img src="/logo.png" alt="logo" />
                        </Navbar.Item>
                        <Navbar.Item href="/">
                            Home
                        </Navbar.Item>
                    </div>
                    {!isDesktop && (
                        <div className="is-flex pr-4">
                            {
                                userContext.details ?
                                    (
                                        <>
                                            <Navbar.Item>
                                                <Icon size="large" style={{ color: "#905960" }}>
                                                    <i className={`fas fa-lg ${userContext.details.icon}`}></i>
                                                </Icon>
                                                <span>{userContext.details.username}</span>
                                            </Navbar.Item>
                                            <Navbar.Item>
                                                <Button onClick={logoutHandler}>
                                                    LogOut
                                                </Button>
                                            </Navbar.Item>
                                        </>
                                    ) :
                                    (
                                        <>
                                            <Navbar.Item href="/login">
                                                Login
                                            </Navbar.Item>
                                            <Navbar.Item href="/signup">
                                                SignUp
                                            </Navbar.Item>
                                        </>
                                    )
                            }
                            <Navbar.Item href="/shopping-cart">
                                <Icon size="large" style={{ color: "#905960" }}>
                                    <FontAwesomeIcon size="lg" icon={faCartShopping} />
                                </Icon>
                            </Navbar.Item>
                        </div>
                    )}

                </Navbar.Brand>
                {isDesktop ? (
                    <Navbar.Menu className="is-active" >

                        <Navbar.Container>
                            <Navbar.Item active={false} hoverable={true} >
                                <Navbar.Link>
                                    More
                                </Navbar.Link>
                                <Navbar.Dropdown>
                                    <Navbar.Item href="/breakfasts">
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
                            {
                                userContext.details ?
                                    (
                                        <>
                                            <Navbar.Item>
                                                <Icon size="large" style={{ color: "#905960" }}>
                                                    <i className={`fas fa-lg ${userContext.details.icon}`}></i>
                                                </Icon>
                                                <span>{userContext.details.username}</span>
                                            </Navbar.Item>
                                            <Navbar.Item>
                                                <Button onClick={logoutHandler}>
                                                    LogOut
                                                </Button>
                                            </Navbar.Item>
                                        </>
                                    ) :
                                    (
                                        <>
                                            <Navbar.Item href="/login">
                                                Login
                                            </Navbar.Item>
                                            <Navbar.Item href="/signup">
                                                SignUp
                                            </Navbar.Item>
                                        </>
                                    )
                            }
                            <Navbar.Item href="/shopping-cart">
                                <Icon size="large" style={{ color: "#905960" }}>
                                    <FontAwesomeIcon size="lg" icon={faCartShopping} />
                                </Icon>
                            </Navbar.Item>
                        </Navbar.Container>
                    </Navbar.Menu>
                ) : (
                    <Navbar.Menu className="is-active" >

                    <Navbar.Container>
                        <Navbar.Item active={false} hoverable={true} >
                            <Navbar.Dropdown>
                                <Navbar.Item href="/breakfasts">
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
                </Navbar.Menu>
                )}

            </Navbar>

        </div>
    )
}

export default Header