import React, { useState, useEffect, useContext, useCallback } from 'react'
import { Section, Container, Notification, Heading, Columns, Card, Button, Box, Media, Content, Icon } from "react-bulma-components"
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext';
import Modal from '../components/notification/Modal';

function BreakfastsPage() {
    const [breakfasts, setBreakfasts] = useState([])
    const [fetchData, setFetchData] = useState(true)
    const [userContext, setUserContext] = useContext(UserContext);
    const [loading, setLoading] = useState(false)

    //modal
    const [notiTitle, setNotiTitle] = useState("")
    const [notiBody, setNotiBody] = useState("")

    const navigate = useNavigate()

    const submitLike = () => {
        console.log("hola")

    }

    const fetchBreakfasts = useCallback(() => {
        setLoading(true);
        fetch(process.env.REACT_APP_API_ENDPOINT + "api/user/getBreakfasts", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(async (response) => {
            if (response.ok) {
                const data = await response.json();
                setBreakfasts(data.breakfasts);
                setFetchData(false);
            }
            else {
                openModal("Error Post", "Error fetching data")
            }
            setLoading(false);
        }).catch(err => { setLoading(false) });
    }, [fetchData])

    useEffect(() => {
        if (breakfasts.length === 0) {
            fetchBreakfasts();
        }
    }, [breakfasts, fetchBreakfasts]);

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
            {breakfasts.length > 0 ? (
                <Columns m={4} multiline>
                    {breakfasts && breakfasts.map((breakfast) => {
                        return (
                            <Columns.Column size={"one-quarter"} key={breakfast._id}>
                                <Card>
                                    <Card.Image size="4by3" src={`/images/breakfasts/${breakfast.Img}.${process.env.REACT_APP_API_FORMAT_IMAGES}`} />
                                    <Card.Content flexDirection='column' display='flex' alignItems='center' justifyContent='center' style={{ paddingTop: "10px", minHeight:"226px" }}>
                                        <Box alignItems='center' shadowless display='flex' style={{ padding: "0px", margin: "0px" }}>
                                            {userContext.details ? (
                                                <Icon size='medium' onClick={() => { submitLike(breakfast._id) }} >
                                                    <i className="far fa-lg fa-thumbs-up p-8"></i>
                                                </Icon>

                                            ) : (
                                                <Icon size='medium' onClick={() => { openModal("No Authenticated User", "Error you should be logged for like a breakfast") }} >
                                                    <i className="far fa-lg fa-thumbs-up p-8"></i>
                                                </Icon>

                                            )}
                                            <Heading ml={3} textWeight="bold" subtitle size={6} style={{ padding: "0px" }}>
                                                {breakfast.likes === 0 ? ("Be the first to like this") : (`${breakfast.likes} likes`)}
                                            </Heading>
                                        </Box>

                                        <Media mt={4}>
                                            <Media.Item>
                                                <Heading textWeight='normal' textAlign="center" size={4} style={{ textTransform: "uppercase", color: "#905960" }} >{breakfast.Name}</Heading>
                                                <Heading textAlign="center" subtitle size={4}>${breakfast.Price}</Heading>
                                            </Media.Item>
                                        </Media>

                                        <Content textAlign="center">
                                            <Link to={`/breakfast?id:${breakfast._id}`} style={{ color: "#905960", textDecoration: "underline" }}>Details</Link>
                                        </Content>
                                    </Card.Content>
                                </Card>

                            </Columns.Column>

                        )
                    })}
                </Columns>) : (
                <>
                    <Container backgroundColor='light' mt={6} style={{ width: "35vw", margin: "auto", padding: "20px 20px", borderRadius: "10px" }}>
                        <Notification>
                            <Heading >No Breakfasts Found!</Heading>
                            {userContext.details ?
                                (<Heading subtitle>Click < a href="/admin/add-post">here</a> to create a Breakfast</Heading>) :
                                (<Heading subtitle>Click < a href="/login">here</a> to go to Login page</Heading>)
                            }
                        </Notification>

                    </Container>
                </>

            )}
            <Modal notiTitle={notiTitle} notiBody={notiBody} handleClose={closeModal} />
        </Section >
    )
}

export default BreakfastsPage