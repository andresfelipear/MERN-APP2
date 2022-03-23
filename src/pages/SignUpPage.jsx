import React from 'react'
import { useState, useEffect } from 'react'
import { Section, Container, Form, Icon, Select } from "react-bulma-components"
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
    return (
        <Section mt={6} >
            <Container >
                <form className='formWidth'>
                    <Form.Label>Username</Form.Label>
                    <Form.Field>
                        <Form.Control>

                            <Form.Select onChange={(e) => setSelectAvatar(e.target.value)}>
                                <option value="avatar 1">#1</option>
                                <option value="avatar 2">#2</option>
                                <option value="avatar 3">#3</option>
                                <option value="avatar 4">#4</option>
                            </Form.Select>
                            <Icon align='left' size="large">
                                <i className={`fas fa-user`}></i>
                            </Icon>
                        </Form.Control>

                    </Form.Field>



                </form>

            </Container>

        </Section>
    )
}

export default SignUpPage