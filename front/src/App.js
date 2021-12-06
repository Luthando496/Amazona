import './design.css';
import {Routes,Route} from 'react-router-dom'
import {useEffect,useState} from 'react'
import Header from './Components/Header';
import Footer from './Components/Footer';
import Homepage from './Components/Homepage';
import ProductDetails from './Components/ProductDetails';
import Auth from './Components/Auth';
import Register from './Components/Register';
import {getMe} from './Store/Actions/authActions'
import {useDispatch, useSelector} from 'react-redux'
import Profile from './Components/Profile';
import ProtectedRoute from './Components/ProtectedRoute';
import Cart from './Components/Cart';
import NoPage from './Components/NoPage';
import { Shipping } from './Components/Shipping';
import OrderDetails from './Components/OrderDetails';
import axios from 'axios';
import {Elements} from '@stripe/react-stripe-js'
import Payment from './Components/Payment';
import {loadStripe} from '@stripe/stripe-js'
import Dashboard from './Admin/Dashboard'
import NewProduct from './Admin/NewProduct';


const App =(props)=> {

  const token = useSelector(state => state.auth)
  const [stripekey,setKey] = useState(null)





  const dispatch = useDispatch()

  const config ={
    headers:{
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token.token}` : ''
    }
}

  useEffect(() =>{
    dispatch(getMe())
     
    async function getStripe() {
     const {data} = await axios.get('/v1/api/amazona/pay/stripe-api',config)

     console.log(data)
     setKey(data)
    }
    
    getStripe()

  },[dispatch])


  return (
    <div className="App">
      <Header />
      <Routes>
      <Route exact path="/" element={<Homepage/>}>
        </Route>

      <Route path="/search/:keyword" element={<Homepage/>}>
        </Route>

        <Route path="/user/login" element={<Auth/>}>
        </Route>


        <Route path="/*" element={<NoPage/>}>
        </Route>


        <Route path="/shipping" element={<Shipping/>}>
          </Route>

        <Route path="/confirm" element={<OrderDetails/>}>
          </Route>

        <Route path="/user/payment" element={<Payment/>}>
          </Route>

        <Route path="/user/reg" element={<Register/>}>
        </Route>

        <Route path="/admin/dashboard" element={<ProtectedRoute>
        <Dashboard/>
        </ProtectedRoute>}>
        </Route>
        
        <Route path="/user/cart" element={<Cart/>}>
          </Route>
        {/* <Route path="/*" element={<NoPage/>}>
          </Route> */}
      
      <Route path="/user/my-profile" element={<ProtectedRoute>
        <Profile/>
        </ProtectedRoute>}>
        </Route>

        <Route path="/admin/new-product" element={<ProtectedRoute>
        <NewProduct/>
        </ProtectedRoute>}>
        </Route>

        <Route exact path={`/product/:id`} children={({ match }) => (
    match)} element={<ProductDetails props={props}/>}>
        </Route>
    </Routes>
      <Footer />
     
    </div>
  );
}

export default App;
