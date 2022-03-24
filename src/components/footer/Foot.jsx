import React from 'react'
import { Footer, Breadcrumb, Box, Icon, Image } from "react-bulma-components"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faFacebook, faInstagram} from "@fortawesome/free-brands-svg-icons"
// import {solid, regular, brands} from "@fortawesome/fontawesome-svg-core/import.macro"
function Foot() {
    return (
        <Footer style={{ paddingInline: "0px" }} textAlign="center" backgroundColor='white'>
            <Box radiusless display="flex" shadowless marginless justifyContent="center" style={{ backgroundColor: "#905960" }}>
                <Breadcrumb separator="arrow">
                    <Breadcrumb.Item active>
                        <a style={{ color: "white", flexDirection: "column", marginInline: "10px" }}>
                            <strong>Account Details</strong>
                            <div>
                                <Icon size="large" style={{ marginLeft: "0px" }}>
                                    <i className={`fas fa-lg fa-sack-dollar`}></i>
                                </Icon>
                                +1 (236)-986-3592
                            </div>

                        </a>
                    </Breadcrumb.Item>

                    <Breadcrumb.Item active>
                        <a style={{ color: "white", flexDirection: "column", marginInline: "10px" }}>
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

                        </a>
                    </Breadcrumb.Item>

                    <Breadcrumb.Item active>
                        <a style={{ color: "white", flexDirection: "column", marginInline: "10px" }}>
                            <strong> Coverage Map</strong>
                            <div style={{ marginTop: "10px" }}>
                                <Image src='https://bulma.io/images/placeholders/128x128.png' />
                            </div>
                        </a>
                        <a style={{ color: "white", flexDirection: "column", marginInline: "10px" }}>
                            <strong> Social Media</strong>
                            <div style={{ marginTop: "10px" }}>
                                <Icon size="large">
                                    <FontAwesomeIcon size="lg" icon={faFacebook}/>
                                </Icon>
                                <Icon size="large">
                                    <FontAwesomeIcon size="lg" icon={faInstagram}/>
                                </Icon>
                            </div>
                        </a>
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