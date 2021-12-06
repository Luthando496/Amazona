import React,{Fragment,useEffect,useState} from 'react'
import {getproducts} from '../Store/Actions/ProductsActions'
import {useSelector,useDispatch} from 'react-redux'
import Products from './Products'
import Loader from './Loader'
import Pagination from 'react-js-pagination'
import { useParams } from 'react-router'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const Homepage = (props) => {
    const dispatch = useDispatch()
    
    const [currentPage,setCurrentPage] = useState(1)
    const [price,setPrice] = useState([1,9000])
    const [category,setCategory] = useState('')
    const {keyword} = useParams()

    const categories = ['Electronics','Furnisher','Beauty & Health','Audio & Media','Books','Fashion','Food']

    const {createSliderWithTooltip} = Slider
    const Range = createSliderWithTooltip(Slider.Range)


    const products = useSelector(state => state.prod.products)
    const loading = useSelector(state => state.prod.loading)
    const err = useSelector(state => state.prod.er)
    const resPerPage = useSelector(state => state.prod.products && products.resPerPage)
    const productsCount = useSelector(state => state.prod.products && products.productsCount)

    
    


    useEffect(()=>{

        dispatch(getproducts(keyword,currentPage,price,category))
        
    },[dispatch,currentPage,keyword,price,category])
    
    
    const setCurrentPageNo =(no) =>{
        setCurrentPage(no)
        // dispatch(getproducts(currentPage))
    }




    return (
        <div className='container container-fluid'>
            <h1 id="products_heading">Latest Products</h1>

            

            {loading ? <Loader /> : err ? <div class="alert alert-danger" role="alert">
  {err.message}
</div> :(
<section id="products" className="container mt-5" >
  <div className="row">
            {keyword ? (
                        <Fragment>
                            <div className="col-6 col-md-3 mt-5 mb-5">
                                <div className="px-5">
                                    <Range
                                    marks={{
                                        1:`R1`,
                                        9000:`R9000`
                                    }}
                                    min={1}
                                    max={9000}
                                    defaultValue={[1,9000]}
                                    tipFormatter={value=> `R${value}`}
                                    tipProps={{
                                        placement:"top",
                                        visible:true
                                    }}
                                    value={price}
                                    onChange={price => setPrice(price)}
                                    
                                    />

                                    <hr className='my-5'/>

                                    <div className='mt-5'>
                                    <h4 className='mb-3'>
                                        Categories
                                        </h4>
                                        <ul className='pl-0'>
                                            {categories.map(cate=>(
                                                <li style={{cursor:"pointer",listStyleType:'none'}} key={cate} onClick={()=> setCategory(cate)} >{cate}</li>

                                            ))}
                                        </ul>
                                    </div>
                                    </div>
                            </div>

                            <div className="col-6 col-md-9">
                                    <div className="row">

                                    {products && products.map((product) => (
                            <Products product={product} hello={props} id={product.id} col={4} />
                            ))}

                               </div>
                            </div>
                        </Fragment>
                    ):
                    (
                        products && products.products.map((product) => (
                            <Products product={product} hello={props} id={product.id} col={3} key={product.id} />

                    ))

      )}
  </div>
</section>)}
            <div className="d-flex justify-content-center mt-5">
                <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText={'Next'}
                prevPageText={'Previous'}
                firstPageText={'First'}
                lastPageText={'Last'}
                itemClass='page-item'
                linkClass='page-link'
                
                
                />

            </div>
        </div>
    )
}

export default Homepage
