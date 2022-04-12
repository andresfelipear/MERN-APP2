import React, { useState, useCallback, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Notification, Heading, Section, Box, Image, Icon, Form, Button } from "react-bulma-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from "@fortawesome/free-regular-svg-icons"
import Modal from '../../components/notification/Modal';
import "./DetailsBreakfastPage.css"
function DetailsBreakfastPage() {
    const [searchParams] = useSearchParams()
    const breakfastId = searchParams.get('id')

    const [breakfast, setBreakfast] = useState("")
    const [loading, setLoading] = useState(false)
    const [notiTitle, setNotiTitle] = useState("")
    const [notiBody, setNotiBody] = useState("")
    const [quantity, setQuantity] = useState(1)

    const fetchBreakfast = useCallback(() => {
        setLoading(true);
        //fetch breakfast
        fetch(process.env.REACT_APP_API_ENDPOINT + `api/user/getBreakfast/${breakfastId}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(async (response) => {
            if (response.ok) {
                const data = await response.json();
                setBreakfast(data.breakfast)
                setLoading(false);
            }
            else {
                openModal("Error", "fetching data (breakfast)")
                setLoading(false);
            }
        }).catch(err => { console.log(err); setLoading(false) });
    }, [breakfast])

    useEffect(() => {
        if (breakfast.length === 0) {
            fetchBreakfast();
        }
    }, [breakfast]);


    const closeModal = () => {
        const modalContainer = document.getElementById("modal-container");
        modalContainer.classList.remove("is-active");
    }

    const openModal = (title, message) => {
        const modalContainer = document.getElementById("modal-container");
        modalContainer.classList.add("is-active");
        setNotiTitle(title);
        setNotiBody(message);
    }


    if (loading) {
        return (
            <Notification>
                <Heading>Loading...</Heading>
            </Notification>
        )
    }

    return (
        <Section>
            {breakfast && (
                <Box display='flex' style={{ alignItems: "center", justifyContent: "space-evenly" }}>
                    <Image src={`/images/breakfasts/${breakfast.Img}.${process.env.REACT_APP_API_FORMAT_IMAGES}`} style={{maxHeight:"600px!important"}}/>
                    <div style={{ paddingLeft: "20px" }}>
                        <Heading textTransform='uppercase'>{breakfast.Name}</Heading>
                        <div>
                            <Heading subtitle>Details: </Heading>
                            <ul>
                                {breakfast.Items.map((item) => {
                                    const stringObject = Object.values(item).map((val) => { return val }).join("");
                                    return (
                                        <li style={{ display: "flex", alignItems: "center" }}>
                                            <Icon mr={2} size="small" style={{ color: "#905960" }}>
                                                <FontAwesomeIcon size='sm' icon={faStar} />
                                            </Icon>
                                            <span>{stringObject}</span>
                                        </li>
                                    )
                                })}
                            </ul>
                            <Heading my={4} subtitle>This price don't include the cost of delivery</Heading>
                            <Heading size={3} subtitle weight='semibold' style={{ fontStyle: "italic" }}>${breakfast.Price.toFixed(2)}</Heading>
                            <Form.Field display='flex' alignItems='center'>
                                <Form.Label mr={2}>Quantity</Form.Label>
                                <Form.Select size={'small'} value={quantity} onChange={(e) => { setQuantity(e.target.value) }}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </Form.Select>
                            </Form.Field>

                            <Button style={{color:"#905960", borderColor:"#905960", fontWeight:"500"}}>ADD TO THE CART</Button>

                        </div>
                    </div>
                </Box>

            )}

            <Modal notiTitle={notiTitle} notiBody={notiBody} handleClose={closeModal} />
        </Section>
    )
}

export default DetailsBreakfastPage