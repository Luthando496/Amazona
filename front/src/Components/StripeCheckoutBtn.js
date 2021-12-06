import React from 'react'
import { useNavigate } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutBtn = ({price}) => {
    let navigate = useNavigate()

    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51J2v2HJs01eB0g5WzvLLoULPk2RrtEK1eAA1evzj4lMkKoEvh34WlqMYsMbjWeqywDQ2lueqyRnczd1sz6Gs3rdt00YyBGgU7W'

    const onToken = token => {
        console.log(token)
        alert('payment succesful')
        navigate('/')
    }

    return (
        <StripeCheckout
            currency='ZAR'
            allowRememberMe
            label='Pay Now'
            name='Luthando Store'
            billingAddress
            shippingAddress
            image={`${`https://vast-bayou-09675.herokuapp.com`}/https://svgshare.com/s/YC8`}
            description={`Your Total is R${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey }
        />
    )
}


export default StripeCheckoutBtn;