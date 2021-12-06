import React,{useState} from 'react'
import {useNavigate } from 'react-router-dom'

const Search = () => {
    const [keyword , setKeyword] = useState(null)
    let navigate = useNavigate()

    const setProduct =(e)=>{
        e.preventDefault()
        
        if(keyword){
            navigate(`/search/${keyword}`)
        }else{
            navigate(`/`)
        }
      
    }

//   const Submit =()=>{
//     setProduct()
//   }
    return (
        <form onSubmit={setProduct}>
             <div className="input-group">
          <input
            type="text"
            id="search_field"
            // value={name}
            className="form-control"
            placeholder="Enter Product Name ..."
            onChange={e =>setKeyword(e.target.value)
            }
          />
          <div className="input-group-append">
            <button id="search_btn" className="btn">
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </div>

        </form>
    )
}

export default Search
