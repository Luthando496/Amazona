import React, { Fragment } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import StripeCheckoutBtn from './StripeCheckoutBtn'

const OrderDetails = () => {

    let navigate = useNavigate()
    const name = useSelector(state => state.auth.user)
    const cart = useSelector(state => state.cart.items)
    const {address,phoneNumber,city,Country,PostalCode} = useSelector(state => state.ship.ShippingInfo)

    const itemPrice = cart.reduce((acc,item) => acc + item.quantity * item.price,0)

    const Shipping = itemPrice  > 500 ? 85 : 56

    const tax = Number(itemPrice * 0.25)

    const total = tax + Shipping + itemPrice

    const proceed =() =>{
        const data ={
            itemPrice:itemPrice.toFixed(2),
            shippingPrice:Shipping,
            taxPrice:tax,
            totalPrice:total,
        }

        sessionStorage.setItem('order',JSON.stringify(data))
        navigate('/user/payment')
    }
    return (
        <Fragment>
    <div class="container container-fluid">
        
        <div class="row d-flex justify-content-between">
            <div class="col-12 col-lg-8 mt-5 order-confirm">

                <h4 class="mb-3">Shipping Info</h4>
                <p><b>Name:</b> {name ? name.user.name : 'Your Name'}</p>
                <p><b>Phone:</b>{phoneNumber}</p>
                <p class="mb-4"><b>Address:</b>{address},{city},{Country},{PostalCode}</p>
                
                <hr />
                <h4 class="mt-4">Your Cart Items:</h4>

                <hr />
                <div class="cart-item my-1">
                        {cart.map((item) =>(
                            
                    <div class="row">
                        <div class="col-4 col-lg-2">
                            <img src={item.image.map((image) => image.url)} alt="Laptop" height="45" width="65" />
                        </div>

                        <div class="col-5 col-lg-6">
                            <Link to={`/product/${item.id}`}>{item.name}</Link>
                        </div>


                        <div class="col-4 col-lg-4 mt-4 mt-lg-0">
                            <p><b>$ {itemPrice}</b></p>
                        </div>

                    </div>
                        ))}
                </div>
                <hr />

            </div>
			
			<div class="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Subtotal:  <span class="order-summary-values">${itemPrice}</span></p>
                        <p>Shipping: <span class="order-summary-values">${Shipping}</span></p>
                        <p>Tax: <span class="order-summary-values">${tax} </span></p>

                        <hr />

                        <p>Total: <span class="order-summary-values">${total}</span></p>

                        <hr />
                        {/* <button id="checkout_btn" class="btn btn-primary btn-block" onClick={proceed}>Proceed to Payment</button> */}
                        <StripeCheckoutBtn price={total} class="btn btn-primary btn-block" />
                    </div>
                </div>
			
			
        </div>
    </div>


            
        </Fragment>
    )
}

export default OrderDetails
