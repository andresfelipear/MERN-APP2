import React, { useState } from 'react'
import { Section, Container, Notification, Heading, Columns, Card} from "react-bulma-components"

function BreakfastsPage() {
    const [breakfasts, setBreakfasts] = useState("")
    return (
        <Section>
            {breakfasts.length > 0 ? (
            <Columns m={4} multiline> 
                {breakfasts && breakfasts.map((breakfast)=>{
                    return(
                        <Columns.Column size={"one-quarter"} key={breakfast._id}>
                            <Card>
                                <Card.Image size="4by3" src={`/images/breakfasts/${breakfast.Image}.${process.env.REACT_APP_API_FORMAT_IMAGES}`}/>
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