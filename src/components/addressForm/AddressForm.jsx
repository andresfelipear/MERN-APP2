import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { Section, Form, Button, Box, Heading } from "react-bulma-components"
import {UserContext} from "../../context/UserContext"

function AddressForm({ handleClose, address }) {
    const [fullname, setFullname] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [addressF1, setAddressF1] = useState("")
    const [addressF2, setAddressF2] = useState("")
    const [city, setCity] = useState("vancouver")
    const [postalCode, setPostalCode] = useState("")
    const [userContext, setUserContext] = useContext(UserContext)

    const [disabled, setDisabled] = useState(true)

    const submit = () => {
        const body = {fullname,phoneNumber,addressF1,addressF2,city,postalCode}
        fetch(process.env.REACT_APP_API_ENDPOINT + "api/admin/userAddress", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userContext.token}`,
            },
            body: JSON.stringify(body),
            credentials: "include",

        }).then(async (response) => {
            if (response.ok) {
                const data = await response.json;
                handleClose()
            }
        })
    }

    useEffect(() => {
        if (fullname && phoneNumber && addressF1 && city && postalCode) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [fullname, phoneNumber, addressF1, city, postalCode])

    return (
        <div className="modal" id="modal-container">
            <div className="modal-background"></div>
            <div className="modal-content">
                    <Section mt={6} >
                        <Box style={{margin: 'auto', padding: "50px 50px", backgroundColor: "#feecf0" }}>
                            <Heading>Enter your shipping address</Heading>
                            <Form.Field>
                                <Form.Label>Full name</Form.Label>
                                <Form.Control>
                                    <Form.Input value={fullname} type="text" name="fullname" onChange={(e) => { setFullname(e.target.value) }} />
                                </Form.Control>
                            </Form.Field>

                            <Form.Field>
                                <Form.Label>Phone number</Form.Label>
                                <Form.Control>
                                    <Form.Input value={phoneNumber} type="number" name="phoneNumber" onChange={(e) => { setPhoneNumber(e.target.value) }} />
                                </Form.Control>
                            </Form.Field>

                            <Form.Field>
                                <Form.Label>Address</Form.Label>
                                <Form.Control>
                                    <Form.Input value={addressF1} type="text" name="addressF1" onChange={(e) => { setAddressF1(e.target.value) }} />
                                    <Form.Input value={addressF2} type="text" name="addressF2" onChange={(e) => { setAddressF2(e.target.value) }} />
                                </Form.Control>
                            </Form.Field>

                            <Form.Field>
                                <Form.Label>City</Form.Label>
                                <Form.Control>
                                    <Form.Select value={city} onChange={(e) => setCity(e.target.value)}>
                                        <option value="vancouver">Vancouver</option>
                                        <option value="coquitlam">Coquitlam</option>
                                        <option value="surrey">Surrey</option>
                                        <option value="richmond">Richmond</option>
                                    </Form.Select>
                                </Form.Control>
                            </Form.Field>

                            <Form.Field>
                                <Form.Label>Province/Territory</Form.Label>
                                <Form.Control>
                                    <Form.Input value={"British Columbia"} type="text" disabled />
                                </Form.Control>
                            </Form.Field>

                            <Form.Field>
                                <Form.Label>Postal Code</Form.Label>
                                <Form.Control>
                                    <Form.Input value={postalCode} type="text" name="postalCode" onChange={(e) => { setPostalCode(e.target.value) }} />
                                </Form.Control>
                            </Form.Field>

                            <Button.Group align="center" mt={5}>
                                <Button
                                    color={disabled ? ("sucess") : ("danger")}
                                    onClick={submit}
                                    disabled={disabled}
                                    submit={false}
                                >Use this address
                                </Button>
                            </Button.Group>
                        </Box>
                    </Section>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={handleClose}></button>
        </div>




    )
}

export default AddressForm