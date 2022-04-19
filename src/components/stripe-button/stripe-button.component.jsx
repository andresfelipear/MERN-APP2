import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

import brandLogo from 'public/logo.png'

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100
    const publishableKey = process.env.REACT_APP_STRIPE_KEY

    const onToken = token => {
        alert('Payment Successful')
    }

    return (
        <StripeCheckout
            label='Pay Now'
            name='Breakfast App'
            image={brandLogo}
            description={`Your total price is $${price}`}
            amount={priceForStripe}
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton