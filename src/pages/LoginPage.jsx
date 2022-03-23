import React from 'react'
import { useState, useEffect } from 'react'
import { Section, Container, Form, Button } from "react-bulma-components"
import { Link } from 'react-router-dom';
import Modal from '../components/notification/Modal';
function LoginPage() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
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

    const submit = () => {
        openModal("Confirmation Login", "Login Correct")


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
            <Container >
                <form className='formWidth borderRadius'>
                    <Form.Field>
                        <Form.Label>Username</Form.Label>
                        <Form.Control>
                            <Form.Input value={username} type="email" name="username" onChange={(e) => { setUsername(e.target.value) }} />
                        </Form.Control>
                    </Form.Field>

                    <Form.Field>
                        <Form.Label>Password</Form.Label>
                        <Form.Control>
                            <Form.Input value={password} type="password" name="password" onChange={(e) => { setPassword(e.target.value) }} />
                        </Form.Control>
                        <Form.Help color="danger">{(password.length !== 0 && password.length <= 3) && ("Password should have more than 3 characters")}</Form.Help>
                        <Link className='has-text-info is-italic has-text-weight-light' to={"/forgotPassword"}> Forgot Password?</Link>
                    </Form.Field>

                    <Button.Group align="center" mt={5}>
                        <Button
                            color={disabled ? ("danger") : ("link")}
                            onClick={submit}
                            disabled={disabled}
                            submit={false}
                        >Login
                        </Button>
                    </Button.Group>
                </form>

            </Container>
            <Modal notiTitle={notiTitle} notiBody={notiBody} handleClose={closeModal} />
        </Section>
    )
}

export default LoginPage