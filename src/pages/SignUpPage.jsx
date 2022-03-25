import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { Section, Form, Icon, Button, Box } from "react-bulma-components"
import { useLocation, useNavigate } from 'react-router-dom'
import { UserContext } from "../context/UserContext"

import Modal from '../components/notification/Modal';

function SignUpPage() {
    //values fontawesome icons avatar
    const iconTie = "fa-user-tie";
    const iconNinja = "fa-user-ninja";
    const iconPlus = "fa-user-plus";
    const iconAstronaut = "fa-user-astronaut";

    const [selectAvatar, setSelectAvatar] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [icon, setIcon] = useState(iconTie);
    const [disabled, setDisabled] = useState(true)

    //modal
    const [notiTitle, setNotiTitle] = useState("")
    const [notiBody, setNotiBody] = useState("")


    const openModal = (title, message) => {
        setNotiTitle(title);
        setNotiBody(message);
        const modalContainer = document.getElementById("modal-container");
        modalContainer.classList.add("is-active");

    }

    const closeModal = () => {
        const modalContainer = document.getElementById("modal-container");
        modalContainer.classList.remove("is-active");
    }

    //end modal

    //User Context
    const [userContext, setUserContext] = useContext(UserContext)

    //Navigate
    const navigate = useNavigate()
    const location = useLocation()

    const submit = () => {
        if (confirmPassword === password) {
            const body = { username, email, password, icon };
            fetch("http://localhost:8000/api/user/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
                credentials: "include"
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(res.status);
                    }else{
                        setUserContext(prev => ({ ...prev, token: res.token }))
                        navigate("/")
                    }
                })
                .catch((err) => {
                    openModal("Error Signing Up!", "Username and/or Email already exists")
                });

        } else {
            openModal("Incorrect Credentials", "Password and confirm password do not match. Try Again!")
            setConfirmPassword("")
            setPassword("")
        }

    }
    useEffect(() => {
        if (selectAvatar) {
            if (selectAvatar === "avatar 1") {
                setIcon(iconTie)
            } else if (selectAvatar === "avatar 2") {
                setIcon(iconNinja)
            }
            else if (selectAvatar === "avatar 3") {
                setIcon(iconPlus)
            }
            else if (selectAvatar === "avatar 4") {
                setIcon(iconAstronaut)
            }
        }
    }, [selectAvatar])

    useEffect(() => {
        if (password && confirmPassword) {
            if (password.length > 3 && confirmPassword > 3) {
                setDisabled(false)
            }
        } else {
            setDisabled(true)
        }
    }, [password, confirmPassword])
    return (
        <Section mt={6} >
            <Box style={{ width: 410, margin: 'auto', padding: "70px 50px", backgroundColor: "#feecf0" }}>
                    <Form.Label>Username</Form.Label>
                    <Form.Field kind="group">
                        <Form.Control>
                            <Form.Select value={selectAvatar} onChange={(e) => setSelectAvatar(e.target.value)}>
                                <option value="avatar 1">#1</option>
                                <option value="avatar 2">#2</option>
                                <option value="avatar 3">#3</option>
                                <option value="avatar 4">#4</option>
                            </Form.Select>
                            <Icon align='left' size="large" style={{ color: "#905960" }} >
                                <i className={`fas fa-lg ${icon && icon}`}></i>
                            </Icon>
                        </Form.Control>
                        <Form.Control fullwidth>
                            <Form.Input value={username} name='username' onChange={(e) => setUsername(e.target.value)} />

                        </Form.Control>

                    </Form.Field>

                    <Form.Field>
                        <Form.Label>Email</Form.Label>
                        <Form.Control>
                            <Form.Input value={email} type="email" name="email" onChange={(e) => { setEmail(e.target.value) }} />
                        </Form.Control>
                    </Form.Field>

                    <Form.Field>
                        <Form.Label>Password</Form.Label>
                        <Form.Control>
                            <Form.Input value={password} type="password" name="password" onChange={(e) => { setPassword(e.target.value) }} />
                        </Form.Control>
                        <Form.Help color="danger">{(password.length !== 0 && password.length <= 3) && ("Password must have more than 3 characters")}</Form.Help>
                    </Form.Field>

                    <Form.Field>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control>
                            <Form.Input value={confirmPassword} type="password" name="confirmPassword" onChange={(e) => { setConfirmPassword(e.target.value) }} />
                        </Form.Control>
                        <Form.Help color="danger">{(confirmPassword.length !== 0 && confirmPassword.length <= 3) && ("Confirm Password must have more than 3 characters")}</Form.Help>
                    </Form.Field>
                    <Button.Group align="center" mt={5}>
                        <Button
                            color={disabled ? ("sucess") : ("danger")}
                            onClick={submit}
                            disabled={disabled}
                            submit={false}
                        >Sign Up
                        </Button>
                    </Button.Group>
            </Box>
            <Modal notiTitle={notiTitle} notiBody={notiBody} handleClose={closeModal} />
        </Section>
    )
}

export default SignUpPage