import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useCallback, useEffect } from 'react'
import { Table, Notification, Heading, Icon, Image } from 'react-bulma-components'
import Modal from '../components/notification/Modal'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

function ShoppingCart() {

    const [loading, setLoading] = useState(false)
    const [notiTitle, setNotiTitle] = useState("")
    const [notiBody, setNotiBody] = useState("")
    const [cart, setCart] = useState()

    const fetchCart = useCallback(() => {
        setLoading(true);
        //fetch breakfast
        fetch(process.env.REACT_APP_API_ENDPOINT + `api/user/getCart`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(async (response) => {
            if (response.ok) {
                const data = await response.json();
                setCart(data.cart)
                setLoading(false);
            }
            else {
                openModal("Error", "fetching data (breakfast)")
                setLoading(false);
            }
        }).catch(err => { console.log(err); setLoading(false) });
    }, [cart])

    useEffect(() => {
        if (cart === undefined) {
            fetchCart();
        }
    }, [cart]);


    const closeModal = () => {
        const modalContainer = document.getElementById("modal-container");
        modalContainer.classList.remove("is-active");
    }

    const openModal = (title, message) => {
        const modalContainer = document.getElementById("modal-container");
        modalContainer.classList.add("is-active");
        setNotiTitle(title);
        setNotiBody(message);
    }

    const removeItem = () => {

    }

    const addItem = () => {

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
                    <Table mt={4} ml="auto" mr="auto" size='fullwidth' style={{maxWidth:'1000px'}} >
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
                                            <div style={{display:"flex"}}>
                                                <div style={{cursor:'pointer'}} onClick={() => removeItem()}>&#10094;</div>
                                                <span style={{marginInline:'10px'}}>{product.quantity}</span>
                                                <div style={{cursor:'pointer'}} onClick={() => addItem()}>&#10095;</div>
                                            </div>

                                        </td>
                                        <td style={{ verticalAlign: "middle" }} >{product.price}</td>
                                        <td style={{ verticalAlign: "middle" }} >
                                            <Icon size="large" style={{ color: "#905960" }}>
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
                </>

            )}

            <Modal notiTitle={notiTitle} notiBody={notiBody} handleClose={closeModal} />
        </>

    )
}

export default ShoppingCart