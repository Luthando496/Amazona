import {createSlice} from '@reduxjs/toolkit';

const userToken = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')): ''
// const userStore = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')): null

const authSlice = createSlice({
    name:'auth',
    initialState:{user:null,loading:null,er:null,isAuth:false,token:userToken},
    reducers:{
        userRequest(state, action){
            state.loading =true
        },
        userLogin(state, action){
            state.loading = false
            state.user = action.payload
            state.isAuth = true
        },
        tokes(state, action){
            state.token = action.payload.token

        },
        userFail(state, action){
            state.er = action.payload
            state.loading =false
            state.user = null
            state.isAuth = false
        },
        userRegister(state, action){
            state.user = action.payload
            state.loading = false
            state.isAuth =true
        },
        userLogout(state, action){
            state.loading = false
            state.user = null
            state.token = localStorage.removeItem('token')
            state.isAuth = false
        },
        loadUser(state, action){
            state.loading = false
            state.user = action.payload
            state.isAuth = true
            state.er = null
        },
        loadUserFail(state, action){
            state.loading = false
            state.user = null
            state.isAuth = false
            state.er = action.payload
        },


    }
})




export const authAction = authSlice.actions
export const authReducer = authSlice

