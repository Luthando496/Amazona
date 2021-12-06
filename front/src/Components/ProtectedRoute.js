import React from 'react'
import { useSelector } from 'react-redux'
import {Navigate,useNavigate} from 'react-router-dom'
// import {} from 'rea'




const ProtectedRoute = ({ children }) =>{
    let navigate =useNavigate()
    // console.log(children)
    const isAuth = useSelector(state => state.auth)

        return isAuth ? children : isAuth === false ? <Navigate to='/login'/> : navigate('/login')
      }

export default ProtectedRoute
