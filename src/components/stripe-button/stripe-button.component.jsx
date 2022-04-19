import React, {useContext} from 'react'
import { Button } from 'react-bulma-components'
import StripeCheckout from 'react-stripe-checkout'

import brandLogo from '../../assets/images/logo.png'
import { UserContext } from '../../context/UserContext'

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100
    const publishableKey = process.env.REACT_APP_STRIPE_KEY
    const [userContext, setUserContext] = useContext(UserContext)

    const onToken = token => {
        const cart = userContext.cart
        const body = { token, cart, price }
        fetch(process.env.REACT_APP_API_ENDPOINT + "api/admin/process-order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userContext.token}`,
            },
            body: JSON.stringify(body),
            credentials: "include",

        }).then(async (response) => {
            if (response.ok) {
                const data = await response.json;
                alert('Payment Successful')

            }
        })
        
    }

    return (
        <StripeCheckout
            label='Place your Order'
            name='Breakfast App'
            image={brandLogo}
            description={`Your total price is $${price}`}
            amount={priceForStripe}
            token={onToken}
            stripeKey={publishableKey}
        >
            <Button style={{backgroundColor:'#905960', color:'white'}}>Place your Order</Button>
            </StripeCheckout>
    )
}

export default StripeCheckoutButton