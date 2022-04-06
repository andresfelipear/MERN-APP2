import React, { useState } from 'react'
import { Section, Container, Notification, Heading, } from "react-bulma-components"

function BreakfastsPage() {
    const [Breakfasts, setBreakfasts] = useState("")
    return (
        <Section>
            {Breakfasts.length > 0 ? (<></>) : (
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