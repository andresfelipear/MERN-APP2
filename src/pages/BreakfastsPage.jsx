import React, { useState } from 'react'
import { Section, Container, Notification, Heading, Columns, Card, Button, Box, Media } from "react-bulma-components"

function BreakfastsPage() {
    const [breakfasts, setBreakfasts] = useState("")
    return (
        <Section>
            {breakfasts.length > 0 ? (
                <Columns m={4} multiline>
                    {breakfasts && breakfasts.map((breakfast) => {
                        return (
                            <Columns.Column size={"one-quarter"} key={breakfast._id}>
                                <Card>
                                    <Card.Image size="4by3" src={`/images/breakfasts/${breakfast.Image}.${process.env.REACT_APP_API_FORMAT_IMAGES}`} />
                                    <Card.Content>
                                        <Box display='flex' mb={1}>
                                            <Box pr={2}>
                                                {userContext.details ? (
                                                        <Button 
                                                        onClick={()=>{submitLike(breakfast._id)}} 
                                                        isStatic p={0} 
                                                        style={{fontSize:"24px", height:"40px", color:"black"}} 
                                                        >
                                                            <i className="far fa-thumbs-up p-8"></i>
                                                        </Button>
                                                ) : (
                                                    <Button 
                                                        onClick={()=>{openModal("No Authenticated User", "Error you should be logged for like a breakfast") }} 
                                                        isStatic p={0} 
                                                        style={{fontSize:"24px", height:"40px", color:"black"}} 
                                                        >
                                                            <i className="far fa-thumbs-up p-8"></i>
                                                        </Button>
                                                )}

                                            </Box>
                                        </Box>
                                        <Box textWeight='bold' mb={3}>
                                            {breakfast.likes === 0 ? ("Be the first to like this") : (`${breakfast.likes} likes`)}
                                        </Box>
                                        <Media>
                                            <Media.Item>
                                                    <Heading size={4} autoCapitalize>{post.title}</Heading>
                                                    <Heading subtitle size={6}>@{breakfast.name}</Heading>
                                            </Media.Item>
                                        </Media>

                                        <div className="content">
                                            {post.description.length >= 25 ? (post.description.slice(0, 25).concat('...')) : (post.description)}
                                        </div>
                                    </Card.Content>
                                </Card>

                            </Columns.Column>

                        )
                    })}
                </Columns>) : (
                <>
                    <Container backgroundColor='light' mt={6} style={{ width: "35vw", margin: auto, padding: "20px 20px", borderRadius: "10px" }}>
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
        </Section >
    )
}

export default BreakfastsPage