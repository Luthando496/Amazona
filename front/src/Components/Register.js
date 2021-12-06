import React,{useState,useEffect} from 'react'
import {register} from '../Store/Actions/authActions'
import {useDispatch,useSelector} from 'react-redux'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


const Register = () => {

  const dispatch = useDispatch()
  let navigate = useNavigate()

  const {isAuth} = useSelector(state=>state.auth)



    
    const [password,setPassword] = useState('')
    const [email,setEmail] = useState('')
    const [name,setName] = useState('')
    const [avatar,setAvatar] = useState('')

    useEffect(() => {
      if(isAuth) {
          navigate('/')
      }

  })


    const setImage = async(e)=>{
        const file = e.target.files[0];

        let formData = new FormData()
        formData.append('avatar', file)
        console.log([...formData])


        const config ={
          headers:{
              'Content-type':'application/json',
          }
      }


        try{

          const {data} = await axios.post('/v1/api/amazona/users/upload',formData,config)
          console.log(data)

          setAvatar(data)


        }catch(err){
          console.log(err)
        }
        
    } 

    const Submit = (e)=>{
      e.preventDefault()

      

      const userData = {name,email,password,avatar}
      dispatch(register(userData))
    }

    return (
        <div className="container container-fluid">
        <div className="row wrapper">
		<div className="col-10 col-lg-5">
        <form className="shadow-lg" encType='multipart/form-data' onSubmit={Submit}>
            <h1 className="mb-3">Register</h1>

          <div className="form-group">
            <label>Name</label>
            <input type="name" id="name_field" className="form-control" value={name} onChange={e => setName(e.target.value)} />
          </div>

            <div className="form-group">
              <label >Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email} onChange={e => setEmail(e.target.value)}
              />
            </div>
  
            <div className="form-group">
              <label >Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password} onChange={e => setPassword(e.target.value)}
              />
            </div>

            <div className='form-group'>
              <label >Avatar</label>
              <div className='d-flex align-items-center'>
                  <div>
                      <figure className='avatar mr-3 item-rtl'>
                          <img
                              src=""
                              className='rounded-circle'
                              alt='image'
                          />
                      </figure>
                  </div>
                  <div className='custom-file'>
                      <input
                          type='file'
                          name='avatar'
                          className='custom-file-input'
                          id='customFile'
                          onChange={setImage}
                      />
                      <label className='custom-file-label' >
                          Choose Avatar
                      </label>
                  </div>
              </div>
          </div>
  
            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
              onSubmit={Submit}
            >
              REGISTER
            </button>
          </form>
		  </div>
    </div>
</div>
    )
}

export default Register
