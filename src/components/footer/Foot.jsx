import React from 'react'
import { Footer, Breadcrumb, Box, Icon, Image, Heading } from "react-bulma-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons"

import "./Foot.css"
function Foot() {
    return (
        <Footer style={{ paddingInline: "0px" }} textAlign="center" backgroundColor='white'>
            <Box shadowless radiusless backgroundColor='danger-light' marginless style={{ paddingBottom: 0 }}>
                <Heading marginless textAlign="center"> Our Payment Methods</Heading>
                <img src='/images/medios-de-pago.png' alt='payment methods' />
            </Box>
            <Box radiusless display="flex" shadowless marginless justifyContent="center" style={{ backgroundColor: "#905960" }}>
                <Breadcrumb separator="arrow">
                    <Breadcrumb.Item >
                        <div style={{ color: "white", flexDirection: "column", marginInline: "10px" }}>
                            <strong>Account Details</strong>
                            <div>
                                <Icon size="large" style={{ marginLeft: "0px" }}>
                                    <i className={`fas fa-lg fa-sack-dollar`}></i>
                                </Icon>
                                +1 (236)-986-3592
                            </div>

                        </div>
                    </Breadcrumb.Item>

                    <Breadcrumb.Item >
                        <div style={{ color: "white", flexDirection: "column", marginInline: "10px" }}>
                            <strong> Contact Us</strong>
                            <div style={{ flexDirection: "row", display: "flex", alignItems: "center" }}>
                                <Icon size="large">
                                    <i className={`fas fa-lg fa-envelope`}></i>
                                </Icon>
                                <div>
                                    <p>desayunosbogota22@gmail.com</p>
                                    <p>andresfelipear@gmail.com</p>
                                </div>
                            </div>

                        </div>
                    </Breadcrumb.Item>

                    <Breadcrumb.Item >
                        <div style={{ color: "white", flexDirection: "column", marginInline: "10px" }}>
                            <strong >  Coverage Map</strong>
                            <div style={{ marginTop: "10px" }}>
                                <Image src='https://bulma.io/images/placeholders/128x128.png' />
                            </div>
                        </div>
                        <div style={{ color: "white", flexDirection: "column", marginInline: "10px" }}>
                            <strong > Social Media</strong>
                            <div style={{ marginTop: "10px", display:'flex'}}>
                                <a href={'https://www.facebook.com/Desayunosbogota22'} target="_blank">
                                    <Icon size="large">
                                        <FontAwesomeIcon size="lg" icon={faFacebook} />
                                    </Icon>
                                </a>
                                <a href='https://www.instagram.com/desayunosbogota22' target="_blank">
                                    <Icon size="large">
                                        <FontAwesomeIcon size="lg" icon={faInstagram} />
                                    </Icon>
                                </a>

                            </div>
                        </div>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </Box>
            <p style={{
                fontSize: "12px",
                fontStyle: "italic",
            }}>© 2022 Andres Arevalo - Breakfast App </p>
        </Footer>
    )
}

export default Foot