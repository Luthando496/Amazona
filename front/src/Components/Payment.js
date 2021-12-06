import React, { Fragment, useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useAlert} from 'react-alert'
import axios from 'axios'

const Payment = () => {

    const alert = useAlert()
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const cart = useSelector(state => state.cart.items)
    const ship = useSelector(state => state.ship.Shippinginfo)


    return (
        <Fragment>
        <div className="row wrapper">
		<div className="col-10 col-lg-5">
            <form className="shadow-lg">
                <h1 className="mb-4">Card Info</h1>
                <div className="form-group">
                  <label>Card Number</label>
                  <input
                    type="text"
                    id="card_num_field"
                    className="form-control"

                    value=""
                  />
                </div>
				
				<div className="form-group">

                  <label>Card Expiry</label>
                  <input
                    type="text"
                    id="card_exp_field"
                    className="form-control"
                    value=""

                  />
                </div>
				
				<div className="form-group">
                  <label>Card CVC</label>
                  <input
                    type="text"
                    id="card_cvc_field"
                    className="form-control"
                    value=""
                  />
                </div>
      
            
                <button
                  id="pay_btn"
                  type="submit"
                  className="btn btn-block py-3"
                >
                  Pay
                </button>
    
              </form>
			  </div>
        </div>
        </Fragment>
    )
}

export default Payment
