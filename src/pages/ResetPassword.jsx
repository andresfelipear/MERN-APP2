import React, { useState } from 'react'
import Modal from "../components/notification/Modal"
import {Section, Box, Heading, Form, Button} from "react-bulma-components"
function ResetPassword() {

    const [password, setPassword] = useState("")
    const [notiTitle, setNotiTitle] = useState("")
    const [notiBody, setNotiBody] = useState("")
    const [status, setStatus] = useState("");

    const openModal = (title, message) => {
        setNotiTitle(title);
        setNotiBody(message);
        const modalContainer = document.getElementById("modal-container");
        modalContainer.classList.add("is-active");

    }

    const closeModal = () => {
        const modalContainer = document.getElementById("modal-container");
        modalContainer.classList.remove("is-active");
        if (status === "success") {
            setStatus("")
            navigate("/login")
        }
    }


  return (

    
    <Section mt={6} >
            <Box style={{ width: 410, margin: 'auto', padding: "70px 50px", backgroundColor: "#feecf0" }}>
                <Heading>Reset Password</Heading>
                <Form.Field>
                    <Form.Label>New Password</Form.Label>
                    <Form.Control>
                        <Form.Input value={username} type="password" name="password" onChange={(e) => { setPassword(e.target.value) }} />
                    </Form.Control>
                </Form.Field>

                <Button.Group align="center" mt={5}>
                    <Button
                        color={disabled ? ("sucess") : ("danger")}
                        onClick={submit}
                        disabled={disabled}
                        submit={false}
                    >Reset Password
                    </Button>
                </Button.Group>
            </Box>

            <Modal notiTitle={notiTitle} notiBody={notiBody} handleClose={closeModal} />
        </Section>
  )
}

export default ResetPassword