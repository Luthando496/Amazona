import React,{useState,Fragment,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Link,useNavigate,useLocation} from 'react-router-dom'
import {login} from '../Store/Actions/authActions'
import Loader from './Loader'
import {useAlert} from 'react-alert'


const Auth = () => {
    const alert = useAlert()
    const dispatch = useDispatch()


    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const {isAuth,loading,er,user} = useSelector(state=>state.auth)
    let navigate = useNavigate()
    const {search} = useLocation()
    
    const redirect = search ? search.split('=')[1] : '/'
    

    useEffect(() => {
        if(user && user.user) {
            navigate(redirect)
        }

    },[user])
    const Submit =(e) =>{
        e.preventDefault()

        dispatch(login(email,password))
        alert.success('Logged In')
    }
    return (
        <Fragment>


            {loading ? <Loader /> :(
                <Fragment>

            <div className="container container-fluid">
        <div className="row wrapper"> 
		<div className="col-10 col-lg-5 text-center">
    <div className="alert-danger">{er}</div>
        <form className="shadow-lg" onSubmit={Submit}>
            <h1 className="mb-3">Login</h1>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
  
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Link to='/users/forgot-pass' className="float-right mb-4">Forgot Password?</Link>
  
            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
            >
              LOGIN
            </button>

            <Link to='/users/register' className="float-right mb-mt-3">New User?</Link>
          </form>
		  </div>
    </div>
</div>
                </Fragment>
            )}
            <div>

            </div>
            
        </Fragment>
    )
}

export default Auth
