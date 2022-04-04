import React, { useState, useEffect } from 'react'
import Modal from "../components/notification/Modal"
import { Section, Box, Heading, Form, Button } from "react-bulma-components"
import { useNavigate, useSearchParams } from 'react-router-dom'

function ResetPassword() {

    const [password, setPassword] = useState("")
    const [notiTitle, setNotiTitle] = useState("")
    const [notiBody, setNotiBody] = useState("")
    const [status, setStatus] = useState("");
    const [disabled, setDisabled] = useState(true)

    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const userId = searchParams.get('id')
    const token = searchParams.get('token') 

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

    const submit = () => {
        const body = { password, userId, token };
        console.log(body)
        fetch("http://localhost:8000/api/user/resetPassword", {
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
                    openModal("Reset Password Confirm", "Please login with your new password");
                }
                return res.json()
            })
            .catch((err) => {
                setStatus("error");
                openModal("Error Recovery", "The reset token expires or the user do not exist. Try again");
            });
    };

    useEffect(() => {
        if (password) {
            setDisabled(false)
        }else{
            setDisabled(true)
        }
    }, [password])

    useEffect(() => {
        console.log(userId);
        console.log(token);
        if (!userId || !token) {
            navigate("/")
        }
    }, [userId, token])

    return (


        <Section mt={6} >
            <Box style={{ width: 410, margin: 'auto', padding: "70px 50px", backgroundColor: "#feecf0" }}>
                <Heading>Reset Password</Heading>
                <Form.Field>
                    <Form.Label>New Password</Form.Label>
                    <Form.Control>
                        <Form.Input value={password} type="password" name="password" onChange={(e) => { setPassword(e.target.value) }} />
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