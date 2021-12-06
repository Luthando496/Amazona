import {createSlice} from '@reduxjs/toolkit'

const userToken = localStorage.getItem('ship') ? JSON.parse(localStorage.getItem('ship')): {}



const ShipSlice = createSlice({
    name:'Ship',
    initialState:{ShippingInfo:userToken,review:{},err:null},
    reducers:{
        AddShipping(state, action){
            state.ShippingInfo = action.payload
        },
        newReview(state,action){
            state.review = action.payload
        },
        reviewFail(state,action){
            state.err = action.payload
            state.review = {}
        }

}
})


export const shippingAction = ShipSlice.actions
export const ShipReducer = ShipSlice.reducer