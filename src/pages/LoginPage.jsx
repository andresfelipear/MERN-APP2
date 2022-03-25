import React from 'react'
import { useState, useEffect, useContext} from 'react'
import { Section, Form, Button, Box } from "react-bulma-components"
import { UserContext } from '../context/UserContext'
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../components/notification/Modal';
function LoginPage() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [disabled, setDisabled] = useState(true)

    //modal
    const [notiTitle, setNotiTitle] = useState("")
    const [notiBody, setNotiBody] = useState("")

    const [userContext, setUserContext] = useContext(UserContext)

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
    }

    //end modal

    const submit = () => {
        const body = { username, password };
        fetch("http://localhost:8000/api/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
            credentials: "include"
        })
            .then(async (res) => {
                if (!res.ok) {
                    throw new Error(res.status);
                } else {
                    const data = await res.json()
                    setUserContext(prev => ({ ...prev, token: data.token }))
                    navigate("/")
                    return data
                }
            })
            .catch((err) => {
                openModal("Error Login", "Username or password that you entered is incorrect. Use a valid credential and try again");
                setUsername("")
                setPassword("")
            });


    }

    useEffect(() => {
        if (password && username) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [password, username])
    return (
        <Section mt={6} >
            <Box style={{ width: 410, margin: 'auto', padding: "70px 50px", backgroundColor: "#feecf0" }}>
                    <Form.Field>
                        <Form.Label>Username</Form.Label>
                        <Form.Control>
                            <Form.Input value={username} type="text" name="username" onChange={(e) => { setUsername(e.target.value) }} />
                        </Form.Control>
                    </Form.Field>

                    <Form.Field>
                        <Form.Label>Password</Form.Label>
                        <Form.Control>
                            <Form.Input value={password} type="password" name="password" onChange={(e) => { setPassword(e.target.value) }} />
                        </Form.Control>
                        <Link className='has-text-black is-italic has-text-weight-light' to={"/forgotPassword"}> Forgot Password?</Link>
                    </Form.Field>

                    <Button.Group align="center" mt={5}>
                        <Button
                            color={disabled ? ("sucess") : ("danger")}
                            onClick={submit}
                            disabled={disabled}
                            submit={false}
                        >Login
                        </Button>
                    </Button.Group>
            </Box>

            <Modal notiTitle={notiTitle} notiBody={notiBody} handleClose={closeModal} />
        </Section>
    )
}

export default LoginPage