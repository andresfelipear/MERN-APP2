import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Box, Columns, Form, Heading, Icon, Section } from 'react-bulma-components'
import { Link } from 'react-router-dom'
import AddressForm from '../components/addressForm/AddressForm'

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
            <ol>
                <li>
                    <div>
                        <Heading>Choose a shipping address</Heading>
                        <Box>
                            <Icon size={"large"}>
                                <FontAwesomeIcon size='lg' icon={faPlus} />
                            </Icon>
                            <Link className='has-text-black is-italic has-text-weight-light' onClick={openModal}> Add a new address</Link>
                        </Box>

                    </div>
                </li>
                <li>
                    <div>
                        <Heading>Items and shipping</Heading>
                        <Box>
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
            <AddressForm handleClose={closeModal} />


        </Section>

    )
}

export default CheckoutPage