import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Box, Button, Columns, Form, Heading, Icon, Section } from 'react-bulma-components'
import { Link } from 'react-router-dom'
import AddressForm from '../../components/addressForm/AddressForm'
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import "./CheckoutPage.css"

function CheckoutPage() {
    const [typeDelivery, setTypeDelivery] = useState("regular")

    const openModal = () => {
        const modalContainer = document.getElementById("modal-container");
        modalContainer.classList.add("is-active");

    }

    const closeModal = () => {
        const modalContainer = document.getElementById("modal-container");
        modalContainer.classList.remove("is-active");
    }
    return (
        <Section>
            <Columns gap={4}>
                <Columns.Column size={"two-thirds"}>
                    <ol>
                        <li>
                            <div>
                                <Heading size={4}>Choose a shipping address</Heading>
                                <Box display='flex' alignItems='center' shadowless style={{ border: "1px solid #905960" }}>
                                    <Icon onClick={openModal} size={"medium"} style={{ cursor: "pointer" }}>
                                        <FontAwesomeIcon size='lg' icon={faPlus} />
                                    </Icon>
                                    <a style={{ color: "#905960", textDecoration: "underline", fontStyle: "italic" }} onClick={openModal}>Add a new address</a>
                                </Box>

                            </div>
                        </li>
                        <li style={{ marginTop: "20px" }}>
                            <div>
                                <Heading size={4}>Items and shipping</Heading>
                                <Box shadowless style={{ border: "1px solid #905960" }}>
                                    <Columns>
                                        <Columns.Column>
                                            items
                                        </Columns.Column>

                                        <Columns.Column>
                                            <h4>Choose your delivery option</h4>
                                            <Form.Control>
                                                <Form.Radio value='regular' name='typeDelivery' checked={typeDelivery === "regular"} onChange={(e) => { setTypeDelivery(e.target.value) }}>
                                                    <strong>$6.35</strong> regular
                                                </Form.Radio>
                                                <Form.Radio value='express' name='typeDelivery' checked={typeDelivery === "express"} onChange={(e) => { setTypeDelivery(e.target.value) }}>
                                                    <strong>$9.99</strong> express
                                                </Form.Radio>
                                            </Form.Control>
                                        </Columns.Column>
                                    </Columns>
                                </Box>
                            </div>
                        </li>
                    </ol>
                </Columns.Column>

                <Columns.Column>
                    <Box shadowless style={{ border: "1px solid #905960" }}>
                        <Heading size={4}>Order Summary</Heading>
                        <table width={"100%"} className='shippingTable'>
                            <tbody>
                                <tr>
                                    <th>Items(6):</th>
                                    <td>$240</td>
                                </tr>
                                <tr>
                                    <th>Shipping:</th>
                                    <td>$9.99</td>
                                </tr>
                                <tr>
                                    <th>Total before tax</th>
                                    <td>$600</td>
                                </tr>
                                <tr>
                                    <th>Estimated GST/HST:</th>
                                    <td>$15</td>
                                </tr>
                                <tr>
                                    <th>Estimated PST/RST/QST:</th>
                                    <td>$10</td>
                                </tr>
                            </tbody>
                        </table>
                    </Box>
                </Columns.Column>
            </Columns>

            <AddressForm handleClose={closeModal} />


        </Section>

    )
}

export default CheckoutPage