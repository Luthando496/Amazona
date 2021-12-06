import React from 'react'
import Search from './Search'
import {Link} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {useAlert} from 'react-alert'
import {logout} from '../Store/Actions/authActions'

const Header = () => {
  const dispatch = useDispatch()

  const {user} = useSelector(state => state.auth)
  const {items} = useSelector(state => state.cart)
  const alert = useAlert()

  const Logout =() =>{
    alert.success('You have successfully Logged Out')
    dispatch(logout())

  }


  return (
    <div>
            <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to='/'>
          <img src="https://onlinelearning.msmc.edu/wp-content/uploads/2020/03/amazon-com-online-shopping-retail-sales-amazon-logo-thumbnail.jpg" width='45px'/>
          </Link>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
       <Search/>
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <Link to='/user/cart'>
        <span id="cart" className="mr-1">Cart</span>
        <span className="ml-1" id="cart_count">{items ? items.length : 0}</span>

        </Link>

        {user ? (
          <div className='dropdown d-inline'>
            <Link to='#' className='btn dropdown-toggle text-white' id='dropDownMenuButton' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
              <firgure className='avatar avatar-nav'>
                <img src={user.user.avatar && user.user.avatar.url} alt='avatar' className='rounded-circle'></img>
                <span>
                  { user.user && user.user.name}
                </span>

              </firgure>
            </Link>

            <div className='dropdown-menu text-danger' aria-labelledby='dropDownMenuButton'>

              {user.user && user.user.role !== 'admin' ?(
                <Link to='/user/orders' className='dropdown-item text-danger'>
                Orders
              </Link>
              ): (<Link to='/admin/dashboard' className='dropdown-item text-danger'>
              Dashboard
            </Link>)}
{/* 
            {user.user && user.user.role === 'admin' && (
                <Link to='/user/orders' className='dropdown-item text-secondary'>
                Orders
              </Link>
              )} */}

              <Link to='/' className='dropdown-item text-danger' onClick={Logout}>
                Logout
              </Link>
              <Link to='user/my-profile' className='dropdown-item text-danger'>
                Profile
              </Link>


            </div>

          </div>
        ):(<Link to="/user/login" className="btn ml-2" id="login_btn">Login</Link>)}

      </div>
    </nav>
        </div>
    )
}

export default Header
