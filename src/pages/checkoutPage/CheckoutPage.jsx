import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useContext, useEffect } from 'react'
import { Box, Button, Columns, Form, Heading, Icon, Section } from 'react-bulma-components'
import { Link } from 'react-router-dom'
import AddressForm from '../../components/addressForm/AddressForm'
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import "./CheckoutPage.css"
import { UserContext } from "../../context/UserContext"

function CheckoutPage() {
    const [typeDelivery, setTypeDelivery] = useState("regular")
    const [address, setAddress] = useState()
    const [userContext, setUserContext] = useContext(UserContext)
    const [gst, setGst] = useState(0)
    const [pst, setPst] = useState(0)
    const [shipping, setShipping] = useState(0)
    const [grandTotal, setGrandTotal] = useState(0)
    const [subTotal, setSubTotal] = useState(0)

    const openModal = () => {
        const modalContainer = document.getElementById("modal-container");
        modalContainer.classList.add("is-active");

    }

    const closeModal = () => {
        const modalContainer = document.getElementById("modal-container");
        modalContainer.classList.remove("is-active");
    }

    useEffect(() => {
        if (userContext.cart) {
            setShipping(typeDelivery === 'regular' ? 6.35 : 9.99)
            setSubTotal(shipping + userContext.cart.totalPrice)
            setGst(subTotal * 0.05)
            setPst(subTotal * 0.07)
            setGrandTotal(subTotal + gst + pst)
        }

    }, [userContext.cart, typeDelivery, gst, pst, grandTotal, shipping])


    return (
        <Section>
            {userContext.cart && (
                <Columns gap={4}>
                    <Columns.Column size={"two-thirds"}>
                        <ol>
                            <li>
                                <div>
                                    {address ? (
                                        <>
                                            <Heading size={4}>Shipping address</Heading>
                                            <Box display='flex' alignItems='center' shadowless style={{ border: "1px solid #905960" }}>
                                                <Columns style={{ width: '100%' }}>
                                                    <Columns.Column>
                                                        <ul>
                                                            <li style={{ textTransform: 'capitalize' }}>{address.fullname}</li>
                                                            <li style={{ textTransform: 'capitalize' }}>{address.addressF1}</li>
                                                            <li style={{ textTransform: 'capitalize' }}>{`${address.city}, British Columbia ${address.postalCode}`}</li>
                                                        </ul>
                                                    </Columns.Column>
                                                    <Columns.Column display='flex' justifyContent='right'>
                                                        <a style={{ color: "#905960", textDecoration: "underline", fontStyle: "italic" }} onClick={openModal}>Change</a>
                                                    </Columns.Column>
                                                </Columns>

                                            </Box>
                                        </>) : (
                                        <>
                                            <Heading size={4}>Choose a shipping address</Heading>
                                            <Box display='flex' alignItems='center' shadowless style={{ border: "1px solid #905960" }}>
                                                <Icon onClick={openModal} size={"medium"} style={{ cursor: "pointer" }}>
                                                    <FontAwesomeIcon size='lg' icon={faPlus} />
                                                </Icon>
                                                <a style={{ color: "#905960", textDecoration: "underline", fontStyle: "italic" }} onClick={openModal}>Add a new address</a>
                                            </Box>
                                        </>
                                    )}


                                </div>
                            </li>
                            <li style={{ marginTop: "20px" }}>
                                <div>
                                    <Heading size={4}>Items and shipping</Heading>
                                    <Box shadowless style={{ border: "1px solid #905960" }}>
                                        <Columns>
                                            <Columns.Column>
                                                <ul>
                                                    {userContext.cart.products.map(product => {
                                                        const breakfast = product.product
                                                        return (
                                                            <li key={breakfast._id} style={{ marginBottom: '5px' }}>
                                                                <h5 style={{ fontWeight: 'bold', textTransform: "capitalize" }}>{breakfast.Name}</h5>
                                                                <h4 style={{ color: '#905960' }}>{`$${product.price}`}</h4>
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
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
                            {(shipping!==0 && subTotal!==0 && gst!==0 && pst!==0)&&(
                            <>
                                    <table width={"100%"} className='shippingTable'>
                                        <tbody>
                                            <tr>
                                                <th>{`Items(${userContext.cart.products.length})`}:</th>
                                                <td>{`$${userContext.cart.totalPrice}`}</td>
                                            </tr>
                                            <tr>
                                                <th>Shipping:</th>
                                                <td>{`$${shipping}`}</td>
                                            </tr>
                                            <tr>
                                                <th>Total before tax</th>
                                                <td>{`$${subTotal}`}</td>
                                            </tr>
                                            <tr>
                                                <th>Estimated GST/HST:</th>
                                                <td>{`$${gst.toFixed(2)}`}</td>
                                            </tr>
                                            <tr>
                                                <th>Estimated PST/RST/QST:</th>
                                                <td>{`$${pst.toFixed(2)}`}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <Heading mt={3} size={4} style={{color:"#905960"}}>{`Order Total:    $${grandTotal.toFixed(2)}`}</Heading>
                                </>
                                )
                            }

                        </Box>
                    </Columns.Column>
                </Columns>

            )}


            <AddressForm handleClose={closeModal} address={(data) => { console.log(data); setAddress(data) }} />


        </Section>

    )
}

export default CheckoutPage