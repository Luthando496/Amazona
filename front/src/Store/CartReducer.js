import {createSlice} from '@reduxjs/toolkit'

// const cartStore = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) :[]


const cartSlice = createSlice({
    name:'cart',
    initialState:{items:[]},
    reducers:{
        addTocart(state, action){
            const item = action.payload
            const exist = state.items.find(p => p.id === item.id)

            if(!exist){
                state.items.push({
                    _id:item._id,
                    name:item.name,
                    price:item.price,
                    description:item.description,
                    ratings:item.ratings,
                    category:item.category,
                    seller:item.seller,
                    stock:item.stock,
                    image:item.image,
                    numOfReviews:item.numOfReviews,
                    createdAt:item.createdAt,
                    id:item.id,
                    quantity:1
})
            }else{
                exist.stock--
                exist.quantity++
            }

            // if(exist.stock === 0){
            //     exist.stock = 0

            // }


        },
        removeItem(state, action){
            const id = action.payload
            const exist = state.items.find(p => p.id === id)
            if(exist.quantity === 1){
                state.items = state.items.filter(item => item.id !== id)

            }else{
                exist.quantity--
            }
        },
        // addQty(state, action){}

    }
})


export const cartAction = cartSlice.actions
export const cartReducer = cartSlice.reducer