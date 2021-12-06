import React,{useState,Fragment,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Link,useNavigate,useLocation} from 'react-router-dom'
import {login} from '../Store/Actions/authActions'
import Loader from '../Components/Loader'
import {useAlert} from 'react-alert'
import axios from 'axios'
import { newProduct } from '../Store/Actions/ProductsActions'


const NewProduct = () => {
    const alert = useAlert()
    const [name , setName] = useState('')
    const [seller , setSeller] = useState('')
    const [price,setPrice] = useState(0)
    const [description,setDescription] = useState('')
    const categories= ['Electronics','Furnisher','Beauty & Health','Audio & Media','Books','Fashion','Food']

    const [category, setCategory] = useState('')
    let [filer,setFile] = useState({})
    const [stock,setStock] = useState(0)

    const dispacth = useDispatch()



    const setImagee = async(e)=>{
        const file = e.target.files[0];

        let formData = new FormData()
        formData.set('image', file)
        console.log([...formData])


        const config ={
          headers:{
              'Content-type':'application/json',
          }
      }


        try{

          const {data} = await axios.post('/v1/api/amazona/users/uploader',formData,config)
          console.log(data)

          setFile(data)


        }catch(err){
            console.log(err)
        }
        
    } 
    
   let navigate = useNavigate()

    const submit =()=>{
        dispacth(newProduct(name,description,price,seller,category,filer))
        

        alert.success('Product uploaded successfully')
        navigate('/')

    }



    return (
        <Fragment>
             <div className="container container-fluid">
        <div className="wrapper my-5"> 
        <form className="shadow-lg" encType='multipart/form-data' onSubmit={submit}>
            <h1 className="mb-4">New Product</h1>

            <div className="form-group">
              <label for="name_field">Name</label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
                <label for="price_field">Price</label>
                <input
                  type="text"
                  id="price_field"
                  className="form-control"
                  value={price}
                  onChange={e=> setPrice(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label for="description_field">Description</label>
                <textarea className="form-control" id="description_field" rows="8" value={description} onChange={e => setDescription(e.target.value)}></textarea>
              </div>

              <div className="form-group">
                <label for="category_field">Category</label>
                <select className="form-control" id="category_field" onChange={(e) => setCategory(e.target.value)} value={category}>
                    {categories.map(cate =>(
                    <option key={cate} value={cate}>{cate}</option>

                        
                    ))}
                  </select>
              </div>
              <div className="form-group">
                <label for="stock_field">Stock</label>
                <input
                  type="number"
                  id="stock_field"
                  className="form-control"
                  value={stock}
                  onChange={e => setStock(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label for="seller_field">Seller Name</label>
                <input
                  type="text"
                  id="seller_field"
                  className="form-control"
                  value={seller}
                  onChange={e => setSeller(e.target.value)}
                />
              </div>
              
              <div className='form-group'>
                <label>Images</label>
                
                    <div className='custom-file'>
                        <input
                            type='file'
                            name='product_images'
                            className='custom-file-input'
                            id='customFile'
                            multiple
                            onChange={setImagee}
                        />
                        <label className='custom-file-label' for='customFile'>
                            Choose Images
                        </label>
                    </div>
            </div>

  
            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
            >
              CREATE
            </button>

          </form>
    </div>
</div>
            
        </Fragment>
    )
}

export default NewProduct
