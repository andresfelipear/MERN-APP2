import React from 'react'
import { useState, useEffect } from 'react'
import { Section, Container, Form, Icon, Button } from "react-bulma-components"
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


    const submit = ()=>{

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
            if(password.length>3 && confirmPassword>3){
                setDisabled(password!==confirmPassword)
            }
        }else{
            setDisabled(true)
        }
    }, [password,confirmPassword])
    return (
        <Section mt={6} >
            <Container >
                <form className='formWidth'>
                    <Form.Label>Username</Form.Label>
                    <Form.Field kind="group">
                        <Form.Control>
                            <Form.Select onChange={(e) => setSelectAvatar(e.target.value)}>
                                <option value="avatar 1">#1</option>
                                <option value="avatar 2">#2</option>
                                <option value="avatar 3">#3</option>
                                <option value="avatar 4">#4</option>
                            </Form.Select>
                            <Icon align='left' size="large" color="info" >
                                <i className={`fas fa-lg ${icon && icon}`}></i>
                            </Icon>
                        </Form.Control>
                        <Form.Control fullwidth>
                            <Form.Input name='username' onChange={(e) => setUsername(e.target.value)} />

                        </Form.Control>

                    </Form.Field>

                    <Form.Field>
                        <Form.Label>Email</Form.Label>
                        <Form.Control>
                            <Form.Input type="email" name="email" onChange={(e)=>{setEmail(e.target.value)}} />
                        </Form.Control>
                    </Form.Field>

                    <Form.Field>
                        <Form.Label>Password</Form.Label>
                        <Form.Control>
                            <Form.Input type="password" name="password" onChange={(e)=>{setPassword(e.target.value)}} />
                        </Form.Control>
                        <Form.Help color="danger">{(password.length!=0 &&password.length<=3) && ("Password must have more than 3 characters") }</Form.Help>
                    </Form.Field>

                    <Form.Field>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control>
                            <Form.Input type="password" name="confirmPassword" onChange={(e)=>{setConfirmPassword(e.target.value)}} />
                        </Form.Control>
                        <Form.Help color="danger">{(confirmPassword.length!=0 &&confirmPassword.length<=3) && ("Confirm Password must have more than 3 characters") }</Form.Help>
                    </Form.Field>

                    <Button
                    color={disabled?("danger"):("link")}
                    onClick={submit}
                    disabled={disabled}
                    >Sign Up
                    </Button>


                </form>

            </Container>

        </Section>
    )
}

export default SignUpPage