import {shippingAction} from '../ShipReducer'
import axios from 'axios'




export const addShipping =(address,city,phoneNumber,postalCode,Country) =>{
    return dispatch =>{
        const data = {address,city,phoneNumber,postalCode,Country}
        dispatch(shippingAction.AddShipping(data))

        localStorage.setItem('ship',JSON.stringify(data))
    }
}




// rating,comment,productId


export const newRev = (id,rating,comment)=>{
    return async(dispatch,useState) =>{

        const productId = id;


       const token = JSON.parse(localStorage.getItem('token'))

       const config ={
        headers:{
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : ''
        }
    }

    try{

        const {data} = await axios.put('/v1/api/amazona/products/reviews',{productId,rating,comment},config)
        

        dispatch(shippingAction.newReview(data))

    }catch(err){
        console.log(err.response && err.response.data.message
            ? err.response.data.message
            : err.message)
        dispatch(shippingAction.reviewFail(err.response && err.response.data.message
            ? err.response.data.message
            : err.message))
    }
    }
}