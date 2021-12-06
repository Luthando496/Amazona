import React, { Fragment, useEffect, useState } from 'react'
import {productDetails} from '../Store/Actions/ProductsActions'
import {useSelector,useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'
import Loader from './Loader'
import {addTocart} from '../Store/Actions/cartActions'
import {newRev} from '../Store/Actions/ShipAction'
import ListReviews from './ListReviews'




const ProductDetails =(props)=>{
    const dispatch = useDispatch()
    const {id} = useParams()
    const product = useSelector(state => state.det.product)
    const user = useSelector(state => state.auth.user)
    const loading = useSelector(state => state.det.loading)
    const err = useSelector(state => state.det.er)
    const [quantity,setQuantity] = useState(1)
    const [rating,setRating] = useState(1)
    const [comment,setComment] = useState('')

    useEffect(()=>{
        dispatch(productDetails(id))

    },[id])



    const cartAdd = (data)=>{


        dispatch(addTocart(data))

    }


    const Submit = ()=>{
        const formData = new FormData()
        formData.set('comment',comment)
        formData.set('rating',rating)
        formData.set('productId',id)

        console.log(id)

        dispatch(newRev(id,rating,comment))
    }



  
    return(

        <Fragment>
            {loading ? <Loader /> : err ? err.message : (
                <Fragment>
        <h3 className='display-5'>Product Details</h3>
        <div className="container container-fluid">
        <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
                <img src={product.image.map(i=>i.url)} alt="sdf" height="500" width="500"/>
            </div>

            <div className="col-12 col-lg-5 mt-5">
                <h3>{product.name}</h3>
                <p id="product_id">Product # {product.id}</p>

                <hr/>

                <div className="rating-outer">
                    <div className="rating-inner"></div>
                </div>
                <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

                <hr/>

                <p id="product_price">R {product.price}</p>


                {product.stock === 0 ? (<button type="button" id="cart_btn" className="btn btn-danger d-inline ml-4" disabled>Out Of Stock</button>):(
                 <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4" onClick={()=>cartAdd(product)}>Add to Cart</button>)}

                <hr/>

                <p>Status: <span id="stock_status">In Stock</span></p>

                <hr/>

                <h4 className="mt-2">Description:</h4>
                <p>{product.description}</p>
                <hr/>
                <p id="product_seller mb-3">Sold by: <strong>Amazon</strong></p>

                {user && user.user ? (
				<button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">
                            Submit Your Review
                </button>

                ) :<button  type="alert" className="btn btn-danger mt-4">
                Login to Submit Reviews
    </button> }
				
				
				<div className="row mt-2 mb-5">
                    <div className="rating w-50">

                        <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">

                                        <ul className="stars" >
                                            <li className="star"><i className="fa fa-star"></i></li>
                                            <li className="star"><i className="fa fa-star"></i></li>
                                            <li className="star"><i className="fa fa-star"></i></li>
                                            <li className="star"><i className="fa fa-star"></i></li>
                                            <li className="star"><i className="fa fa-star"></i></li>
                                        </ul>

                                        <textarea name="review" id="review" className="form-control mt-3" value={comment} onChange={e => setComment(e.target.value)}>

                                        </textarea>

                                        <button className={"btn my-3 float-right review-btn px-4 text-white"} data-dismiss="modal" aria-label="Close"   onClick={Submit}>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
						
            </div>

        </div>
        </div>

    </div>
    {product.reviews && product.reviews.length > 0 && (
           <ListReviews reviews={product.reviews}/>
    )}
    </Fragment>)}
            
    </Fragment>

    )
}



export default ProductDetails