import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect, useContext } from 'react'
import { Table, Notification, Heading, Icon, Image, Button } from 'react-bulma-components'
import Modal from '../components/notification/Modal'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from "../context/UserContext"
import { useNavigate } from 'react-router-dom'

function ShoppingCart() {

    const [loading, setLoading] = useState(false)
    const [notiTitle, setNotiTitle] = useState("")
    const [notiBody, setNotiBody] = useState("")
    const [cart, setCart] = useState()
    const [updQuantity, setUpdQuantity] = useState(false)

    const [userContext, setUserContext] = useContext(UserContext)

    //Navigate
    const navigate = useNavigate()

    useEffect(() => {
        if (userContext.cartId && userContext.cart) {
            setCart(userContext.cart)
        }

    }, [userContext.cartId, userContext.cart])

    useEffect(() => {
        if (updQuantity) {
            const userId = userContext.details ? userContext.details._id : undefined
            //fetch cart
            fetch(process.env.REACT_APP_API_ENDPOINT + `api/user/getCart/${userId}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(async (response) => {
                if (response.ok) {
                    const data = await response.json();
                    setCart(data.cart)
                    setUserContext(prev => ({ ...prev, cartId: data.cart._id }))
                }
                else {
                    openModal("Error", "fetching data (breakfast)")
                }
            }).catch(err => { console.log(err) });
            setUpdQuantity(false);
        }
    }, [updQuantity])


    const closeModal = () => {
        const modalContainer = document.getElementById("modal-container");
        modalContainer.classList.remove("is-active");
    }

    const openModal = (title, message) => {
        setNotiTitle(title);
        setNotiBody(message);
        const modalContainer = document.getElementById("modal-container");
        modalContainer.classList.add("is-active");

    }

    const updateQuantity = (quantity, breakfast) => {
        const userId = userContext.details ? userContext.details._id : undefined;
        const cartId = userContext.cartId ? userContext.cartId : undefined;
        const body = { quantity, breakfast, userId, cartId }

        fetch(process.env.REACT_APP_API_ENDPOINT + "api/user/addItem", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
            credentials: "include",

        }).then((response) => {
            if (response.ok) {
                setUpdQuantity(true)
            }
            else {
                openModal("Update Cart Error", "Something happened, try again!")
            }
        })
    }

    const removeItem = (breakfast) => {
        const quantity = -1;
        updateQuantity(quantity, breakfast)

    }

    const addItem = (breakfast) => {
        const quantity = 1;
        updateQuantity(quantity, breakfast)
    }

    const deleteItem = (breakfast, quantity) => {
        const revQuantity = quantity * (-1);
        updateQuantity(revQuantity, breakfast)
    }

    const checkOut = () => {
        if (userContext.details) {


        } else {
            navigate("/login")
        }
    }

    if (loading) {
        return (
            <Notification>
                <Heading>Loading...</Heading>
            </Notification>
        )
    }
    return (
        <>
            {cart && (
                <>
                    <Table mt={4} ml="auto" mr="auto" size='fullwidth' style={{ maxWidth: '1000px' }} >
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Description</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.products.map((product) => {
                                const breakfast = product.product;
                                return (
                                    <tr key={product._id}>
                                        <td style={{ verticalAlign: "middle" }} >
                                            <Image className='tableCart' src={`/images/breakfasts/${breakfast.Img}.${process.env.REACT_APP_API_FORMAT_IMAGES}`} />
                                        </td>
                                        <td style={{ verticalAlign: "middle" }} >{breakfast.Name}</td>
                                        <td style={{ verticalAlign: "middle" }} >
                                            <div style={{ display: "flex" }}>
                                                <div style={{ cursor: 'pointer' }} onClick={() => removeItem(breakfast)}>&#10094;</div>
                                                <span style={{ marginInline: '10px' }}>{product.quantity}</span>
                                                <div style={{ cursor: 'pointer' }} onClick={() => addItem(breakfast)}>&#10095;</div>
                                            </div>

                                        </td>
                                        <td style={{ verticalAlign: "middle" }} >{product.price}</td>
                                        <td style={{ verticalAlign: "middle" }} >
                                            <Icon onClick={() => deleteItem(breakfast, product.quantity)} size="large" style={{ color: "#905960", cursor: 'pointer' }}>
                                                <FontAwesomeIcon size="lg" icon={faXmark} />
                                            </Icon>
                                        </td>
                                    </tr>
                                )
                            })

                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tfoot>



                    </Table>
                    <Heading textAlign="center" size={2} weight="normal">
                        {`TOTAL: $${cart.totalPrice}`}
                    </Heading>
                    <div style={{ display: 'flex', justifyContent: 'right', maxWidth: '1000px', margin: 'auto' }}>
                        <Button onClick={checkOut} marginless style={{ backgroundColor: '#905960', color: 'white', borderRadius: '5px' }}>Proceed to Check Out</Button>
                    </div>

                </>

            )}

            <Modal notiTitle={notiTitle} notiBody={notiBody} handleClose={closeModal} />
        </>

    )
}

export default ShoppingCart