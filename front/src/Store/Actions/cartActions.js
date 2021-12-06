import {cartAction} from '../CartReducer'


export const addTocart =(data)=>{
    return (dispatch,getState) =>{


        dispatch(cartAction.addTocart(data))
        // console.log(getState().cart.items)
        // localStorage.setItem('cart', JSON.stringify(getState().cart.items))
    }
}