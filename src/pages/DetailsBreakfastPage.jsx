import React, { useState, useCallback, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Notification, Heading, Section, Box, Image, Icon } from "react-bulma-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import Modal from '../components/notification/Modal';

function DetailsBreakfastPage() {
    const [searchParams] = useSearchParams()
    const breakfastId = searchParams.get('id')

    const [breakfast, setBreakfast] = useState("")
    const [loading, setLoading] = useState(false)
    const [notiTitle, setNotiTitle] = useState("")
    const [notiBody, setNotiBody] = useState("")

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

    useEffect(() => {
        if (breakfast) {
            const array = breakfast.Items[0];
            console.log(array)
        }

    }, [breakfast])

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

    // const joinValuesObject = (obj) => {
    //     let stringObject = "";
    //     for()

    // }

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
                <Box>
                    <div>
                        <Heading>BREAKFAST - {breakfast.Name}</Heading>
                        <div>
                            <Heading subtitle>Details: </Heading>
                            <ul>
                                {breakfast.Items.map((item) => {
                                    const stringObject = Object.values(item).map((val)=> {return val}).join("");
                                    return (
                                        <li style={{display:"flex", alignItems:"center"}}>
                                            <Icon mr={2} size="medium" style={{ color: "#905960" }}>
                                                <FontAwesomeIcon size='lg' icon={faStar} />
                                            </Icon>
                                            <span>{stringObject}</span>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </Box>

            )}

            <Modal notiTitle={notiTitle} notiBody={notiBody} handleClose={closeModal} />
        </Section>
    )
}

export default DetailsBreakfastPage