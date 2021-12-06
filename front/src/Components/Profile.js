import React,{Fragment, useEffect} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {useAlert} from 'react-alert'
import {useSelector} from 'react-redux'


const Profile = () => {

    const user = useSelector(state => state.auth.user)
    const {er} = useSelector(state => state.auth)
    let navigate = useNavigate()
    const alert = useAlert()

    console.log(user === true)



    useEffect(()=>{
        if(!user){
            navigate('/user/login')
        }
    })
    return (
        <Fragment>
            {er ? alert.error(er) :user ? (
            <div class="container container-fluid">
        <h2 class="mt-5 ml-5">My Profile</h2>
        <div class="row justify-content-around mt-5 user-info">
            <div class="col-12 col-md-3">
                <figure class='avatar avatar-profile'>
                    <img class="rounded-circle img-fluid" src={user.user.avatar.url} alt='' />
                </figure>
                <a href="#" id="edit_profile" class="btn btn-primary btn-block my-5">
                    Edit Profile
                </a>
            </div>
     
            <div class="col-12 col-md-5">
                 <h4>Full Name</h4>
                 <p>{user.user.name}</p>
     
                 <h4>Email Address</h4>
                 <p>{user.user.email}</p>

                 {user.user.role === "admin" && (<Link to="my/orders" class="btn btn-danger btn-block mt-5">
                    My Orders
                </Link>)}

                <Link to='/profile/password' class="btn btn-primary btn-block mt-3">
                    Change Password
                </Link>
            </div>
        </div>
    </div>): navigate('/user/login')}
        </Fragment>
    )
}

export default Profile
