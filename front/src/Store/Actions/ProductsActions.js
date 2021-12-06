import {productAction,detailsAction} from '../store'
import axios from 'axios'


export const getproducts = (keyword = '',currentPage=1,price,category) =>
    async dispacth =>{
        try{

            console.log(keyword)

            let link = `/v1/api/amazona/products?keyword=${keyword}&page=${currentPage}&price=[lte]=${price[1]}&price[gte]=${price[0]}`

            if(category){
                link = `/v1/api/amazona/products?keyword=${keyword}&page=${currentPage}&price=[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}` 

            }

            const {data} = await axios.get(link)



            dispacth(productAction.ProductsSuccess(data))



        }catch(err){
            console.log(err)
            dispacth(productAction.ProductsFail(err || err.response || err.response.data))
        }
}




export const productDetails = (id) =>
    async dispacth =>{

        // dispacth(detailsAction.allProductsRequest())
        try{

            const {data} = await axios.get(`/v1/api/amazona/single-product/${id}`) 


            dispacth(detailsAction.ProductDetailsSuccess(data.product))



        }catch(err){
            console.log(err)
            dispacth(detailsAction.ProductsDetailsFail(err || err.response || err.response.data))
        }
}







export const newProduct = (name,description,price,seller,category,filer)=>{
    return async (dispatch,useState)=>{



        console.log(name,description,price,seller,category,filer)



        const config ={
            headers:{
                'Content-Type': 'application/json',
            }
        }

        let image = []
        image.push(filer)



        try {

            const {data} = await axios.post('/v1/api/amazona/admin/new-product',{name,description,price,seller,category,image},config)

            console.log(data)


            dispatch(productAction.newProduct(data))


        }catch(err){
            console.log(err.response && err.response.data.message
                ? err.response.data.message
                : err.message)
            dispatch(productAction.newProdFail(err.response && err.response.data.message
                ? err.response.data.message
                : err.message))
        }

    }
}
















