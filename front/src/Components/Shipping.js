import React, {useState,Fragment} from "react";
import {useDispatch} from 'react-redux'
import {countries} from 'countries-list'
import {addShipping} from '../Store/Actions/ShipAction'
import { useNavigate } from "react-router-dom";


export const Shipping = () => {

    const countriesList = Object.values(countries)
    const dispatch = useDispatch()

    let navigate = useNavigate()

    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [phoneNumber, setNo] = useState('')
    const [postalCode, setPost] = useState('')
    const [Country, setCountry] = useState('')

    const Submit =(e)=>{
        e.preventDefault()
        dispatch(addShipping(address,city,phoneNumber,postalCode,Country))
        navigate('/confirm')
    }
    return (
        <Fragment>
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={Submit}>
                        <h1 className="mb-4">Shipping Info</h1>
                        <div className="form-group">
                            <label >Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label >City</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                onChange={e => setCity(e.target.value)}   
                                value={city}
                                required
                                />
                        </div>

                        <div className="form-group">
                            <label>Phone No</label>
                            <input
                                type="phone"
                                onChange={e => setNo(e.target.value)}  
                                id="phone_field"
                                className="form-control"
                                value={phoneNumber}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Postal Code</label>
                            <input
                                onChange={e => setPost(e.target.value)}   
                                type="number"
                                id="postal_code_field"
                                className="form-control"
                                value={postalCode}
                                required
                                />
                        </div>

                        <div className="form-group">
                            <label>Country</label>
                            <select
                                id="country_field"
                                className="form-control"
                                value={Country}
                                onChange={e => setCountry(e.target.value)}  
                                required
                            >
                                   {countriesList.map(country=>(<option key={country.name} value={country.name}>
                                        {country.name}
                                    </option>))}

                            </select>
                        </div>

                        <button
                            id="shipping_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            CONTINUE
                            </button>
                    </form>
                </div>
            </div>
            
        </Fragment>
    )
}
