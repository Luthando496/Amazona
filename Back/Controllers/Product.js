const Product = require('../Models/Product')
const errorHandler = require('../Utils/errorHandler')
const catchAsync = require('../Middlewares/catchAsync')
const ApiFeatures = require('../Utils/apiFeatures')
const catchA = require('../Middlewares/catch')



exports.newProduct = async (req,res,next) => {
    try{

        console.log(req.body)
        
        const product = await Product.create(req.body)

        if(!product){
            return res.status(400).json({message: 'Product not found'});
        }



        return res.status(201).json({success:true,product});
    }catch(err){
        return res.status(500).json({message:err});

    }
        
 
}



exports.getAdminProducts = catchA(async (req,res,next) => {
    const products = await Product.find()

    return res.status(200).json({success:true,products});
    
})


exports.getAllProducts = async (req,res,next) => {

    try{

        const productsCount = await Product.countDocuments()
        const resPerPage = 4;

        
        const apiFeatures = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resPerPage)

        const product = await apiFeatures.query

        if(!product){
            return res.status(400).json({message: 'Product not found'});
        }




        return res.status(200).json({success:true,resPerPage,productsCount,products:product})
    }catch(err){
        console.log(err)
        return res.send(err)

    }
    next()


    }





exports.getSingleProduct = catchA(async (req,res,next) => {

        const product = await Product.findById(req.params.id)
        if(!product){
            // return res.status(400).json({message: 'Product not found'});
            return next(new errorHandler('Product not found',404))
        }



        return res.status(200).json({success:true,product});

  
})




exports.updateProduct = async (req,res,next) => {
    try{

        let product = await Product.findById(req.params.id)

        if(!product){
            return res.status(400).json({message: 'Product not found'});
        }


        product = await Product.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        })




        return res.status(200).json({success:true,product});

    }catch(err){
        console.log(err)
        return res.send(err)

    }
    next()
}


exports.deleteProduct = async (req,res,next) => {
    try{

        const product = await Product.findByIdAndDelete(req.params.id)

        if(!product){
            return res.status(400).json({message: 'Product not found'});
        }



        return res.status(200).json({success:true,message:'Product has Now been deleted'});

    }catch(err){
        console.log(err)
        return res.send(err)

    }
    next()
}


exports.newReview = catchA(async (req,res,next) => {
    const {rating,comment,productId} = req.body; 

    
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }
    
    const product = await Product.findById(productId)
    
    const isReviewed = product.reviews.find(r=> r.user.toString() === req.user._id.toString())
    
    
    if(isReviewed){
        product.reviews.forEach(r => {
            if(r=>r.user.toString() === req.user._id.toString()){
                r.comment = comment;
                r.rating = rating;
            }
        })
    }else{
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length

    }

    product.ratings = product.reviews.reduce((acc,rev)=> rev.rating + acc ,0) / product.reviews.length

    await product.save()

    res.status(200).json({success:true,product})
})




exports.getProductReviews = catchA(async (req,res,next) => {

    console.log(req.params.id)
    const product = await Product.findById(req.params.id)



    res.status(200).json({success:true,reviews:product.reviews})

})