import React, { useState, useEffect, useContext } from 'react'
import { Section, Container, Notification, Heading, Columns, Card, Button, Box, Media, Content, Icon } from "react-bulma-components"
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext';
import Modal from '../components/notification/Modal';

function BreakfastsPage() {
    const [breakfasts, setBreakfasts] = useState([
        {
            "Name": "dulce despertar",
            "Price": 65,
            "Img": "breakfast1",
            "Items": ["Strawberry Nutella Waffles or Sandwich", "Fruit", "Gummies", "Brownie", "Orange Juice", "Oreo Cookies", "Mini chips", "M&M or Snicker or Hersheys", "Wood Crate", "Picnic Blanket", "Greeting Card", "Cutlery", "Balloons Decoration"],
            "likes": 0
        },
        {
            "Name": "balde saludable",
            "Price": 80,
            "Img": "breakfast28",
            "Items": ["Pure Leaf Tea", "Orange Juice", "Fruit", "Two (2) Apples", "Pear", "Peach", "Bunch of grapes", "Dragon Fruit", "Two (2) Tangerines", "Two (2) Oreo Cookies", "One (1) Photo", "Wood Bucket", "Greeting Card", "Balloons Decoration"]
            , "likes": 0
        },
        {
            "Name": "amor mio",
            "Price": 53,
            "Img": "breakfast2",
            "Items": ["Strawberry Nutella Waffles or Sandwich", "Fruit", "Brownie", "Pirouline Rolled Wafers", "Orange Juice", "Yogurt", "Oreo Cookies", "Mini chips", "M&M or Snicker or Hersheys", "Wood Crate", "Picnic Blanket", "Greeting Card", "Cutlery", "Balloons Decoration"]
            , "likes": 0
        }])

    //modal
    const [notiTitle, setNotiTitle] = useState("")
    const [notiBody, setNotiBody] = useState("")
    const [userContext, setUserContext] = useContext(UserContext);

    const navigate = useNavigate()

    const submitLike = () => {
        console.log("hola")

    }

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
    return (
        <Section>
            {breakfasts.length > 0 ? (
                <Columns m={4} multiline>
                    {breakfasts && breakfasts.map((breakfast) => {
                        return (
                            <Columns.Column size={"one-quarter"} key={breakfast._id}>
                                <Card>
                                    <Card.Image size="4by3" src={`/images/breakfasts/${breakfast.Img}.${process.env.REACT_APP_API_FORMAT_IMAGES}`} />
                                    <Card.Content style={{ paddingTop: "10px" }}>
                                        <Box alignItems='center' shadowless display='flex' style={{ padding: "0px", margin:"0px" }}>
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
                            {userContext.details.username === "admin" ?
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