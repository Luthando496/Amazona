import {configureStore,createSlice} from '@reduxjs/toolkit';
import {authReducer} from './userReducder'
import {cartReducer} from './CartReducer'
import {ShipReducer} from './ShipReducer'



const productSlice = createSlice({
    name:'product',
    initialState:{products:null,loading:true,er:null,resPerPage:null,newProd:{},proErr:null,proLoad:true,image:[] },
    reducers:{
        allProductsRequest(state, action){
            state.products =[]
            state.loading =true
        },
        ProductsSuccess(state, action){
            state.products =action.payload
            state.loading =false
            state.resPerPage = action.payload.resPerPage
        },
        ProductsFail(state, action){
            state.er =action.payload
            state.loading =false
            state.products = []
        },
        newProduct(state, action){
            state.newProd = action.payload
            state.proErr = null
            state.proLoad = false
        },
        newPhoto(state, action){
            state.image = action.payload
        },

        newProdFail(state, action){
            state.newProd = {}
            state.proErr = action.payload
            state.proLoad = false
        }

    }
})






const productDetailsSlice = createSlice({
    name:'details',
    initialState:{product:null,loading:true,er:null},
    reducers:{
        allProductsRequest(state, action){
            state.product =
            state.loading =true
        },
        ProductDetailsSuccess(state, action){
            state.product =action.payload
            state.loading =false
        },
        ProductsDetailsFail(state, action){
            state.er =action.payload
            state.loading =false
            state.product = null
        }

    }
})



export const productAction = productSlice.actions
export const detailsAction = productDetailsSlice.actions


const store = configureStore({
    reducer:{
        prod:productSlice.reducer,
        det:productDetailsSlice.reducer,
        auth:authReducer.reducer,
        cart:cartReducer,
        ship:ShipReducer
    }
})


export default store