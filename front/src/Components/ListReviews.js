import React, { Fragment } from 'react'

const ListReviews = ({reviews}) => {
    return (
        <Fragment>
            <div className="container container-fluid">
		<div className="reviews w-75">
            <h3>Other's Reviews:</h3>
            <hr />
            {reviews && reviews.map(rev => (
                <div className="review-card my-3" key={rev._id}>
                    <div className="rating-outer">
                        <div className="rating-inner" style={{width:`${(rev.rating /5) * 100}%`}}></div>
                    </div>
                    <p className="review_user">{rev.name}</p>
                    <p className="review_comment">{rev.comment}</p>

                    <hr />
                </div>

            ))}
        </div>
    </div>
            
        </Fragment>
    )
}

export default ListReviews
