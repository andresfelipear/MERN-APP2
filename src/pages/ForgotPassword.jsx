import React from 'react'
import { useState, useEffect } from 'react'
import { Heading, Form, Button, Section, Box } from 'react-bulma-components'
import { Link, useNavigate } from 'react-router-dom';
import Modal from "../components/notification/Modal"

function ForgotPassword() {
    const [username, setUsername] = useState("")
    const [status, setStatus] = useState("");
    const [disabled, setDisabled] = useState(true)
    //modal
    const [notiTitle, setNotiTitle] = useState("")
    const [notiBody, setNotiBody] = useState("")

    const navigate = useNavigate()

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

    //end modal

    const submit = () => {
        const body = { username };
        fetch(process.env.REACT_APP_API_ENDPOINT+"api/user/forgot", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
            credentials: "include"
        })
            .then(async (res) => {
                if (!res.ok) {
                    throw new Error(res.status);
                } else {
                    setStatus("success");
                    openModal("Recovery email send", "Please check your email");
                }
                return res.json()
            })
            .catch((err) => {
                console.log(err)
                openModal("Error Recovery", "Username or Email that you entered not exist. Try Again");
            });


    }

    useEffect(() => {
        if (username) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [username])
    return (
        <Section mt={6} >
            <Box style={{ width: 410, margin: 'auto', padding: "70px 50px", backgroundColor: "#feecf0" }}>
                <Heading>Forgot Password</Heading>
                <Form.Field>
                    <Form.Label>Username or Email</Form.Label>
                    <Form.Control>
                        <Form.Input value={username} type="text" name="username" onChange={(e) => { setUsername(e.target.value) }} />
                    </Form.Control>
                </Form.Field>

                <Button.Group align="center" mt={5}>
                    <Button
                        color={disabled ? ("sucess") : ("danger")}
                        onClick={submit}
                        disabled={disabled}
                        submit={false}
                    >Recovery
                    </Button>
                </Button.Group>
            </Box>

            <Modal notiTitle={notiTitle} notiBody={notiBody} handleClose={closeModal} />
        </Section>
    )
}

export default ForgotPassword