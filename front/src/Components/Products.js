import React from 'react'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'

const Products = ({product,col}) => {

    return (
        <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
      <div className="card p-3 rounded" key={product.id}>
        <img
          className="card-img-top mx-auto"
          src={product.image.map(i => i.url)}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </h5>
          <div className="ratings mt-auto">
            <div className="rating-outer">
              <div className="rating-inner"></div>
            </div>
            <span id="no_of_reviews">{product.numOfReviews} Reviews</span>
          </div>
          <p className="card-text">R{product.price}</p>
          <Link to={`/product/${product.id}`} id="view_btn" className="btn btn-block">View Details</Link>
        </div>
      </div>
    </div>

    )
}

export default Products
