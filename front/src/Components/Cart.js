import React,{Fragment} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {cartAction} from '../Store/CartReducer'

const Cart = () => {
    const cart = useSelector(state => state.cart.items)
    const dispatch = useDispatch()
    const removeCart =(id)=>{

        dispatch(cartAction.removeItem(id))

    }

    const addQtyCart =(car)=>{

        dispatch(cartAction.addTocart({
            id:car.id,
            name:car.name,
            quantity:car.quantity
        }))

    }

    let navigate = useNavigate()

    const checkout =()=>{
        navigate('/user/login?redirect=shipping')

    }
    return (
        
        <Fragment>
        {cart.length === 0 ? <h2 class="mt-5">Your Cart  is Empty!</h2> :(
            <Fragment>
            
            <div class="container container-fluid">
        <h2 class="mt-5">Your Cart: <b>2 items</b></h2>
        
        <div class="row d-flex justify-content-between">
            <div class="col-12 col-lg-8">
                <hr />
                        {cart.map(car =>(
                            <Fragment>
                                <div class="cart-item">
                    <div class="row">
                        <div class="col-4 col-lg-3">
                            <img src={car.image.map(i => i.url)} alt="Laptop" height="90" width="115" className='rounded' />
                        </div>

                        <div class="col-5 col-lg-3">
                            <a href="">{car.name}</a>
                        </div>


                        <div class="col-4 col-lg-2 mt-4 mt-lg-0">
                            <p id="card_item_price">{car.price}</p>
                        </div>

                        <div class="col-4 col-lg-3 mt-4 mt-lg-0">
                            <div class="stockCounter d-inline">
                                <span class="btn btn-danger minus" onClick={()=>removeCart(car.id)} >-</span>

                                <input type="number" class="form-control count d-inline" value={car.quantity} readOnly />

								<span class="btn btn-primary plus" onClick={()=> addQtyCart(car)}>+</span>
                            </div>
                        </div>

                        <div class="col-4 col-lg-1 mt-4 mt-lg-0">
                            <i id="delete_cart_item" class="fa fa-trash btn btn-danger"></i>
                        </div>

                    </div>
                </div>
                            </Fragment>
                        ))}
                
                <hr />
            </div>

            <div class="col-12 col-lg-3 my-4">
                <div id="order_summary">
                    <h4>Order Summary</h4>
                    <hr />
                    <p>Subtotal:  <span class="order-summary-values">
                        {cart.reduce((acc,item) => (acc + Number(item.quantity)),0)} (Units)
                        </span></p>
                    <p>Est. total: <span class="order-summary-values">$ {cart.reduce((acc,item) => acc + item.quantity * item.price,0)}</span></p> 
    
                    <hr />
                    <button id="checkout_btn" class="btn btn-primary btn-block" onClick={checkout}>Check out</button>
                </div>
            </div>
    </div>
        </div>
        </Fragment>
        )}
            
        </Fragment>
    )
}

export default Cart
