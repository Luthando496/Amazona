const Order = require('../Models/Orders')
const Product = require('../Models/Product')
const ErrorHandler = require('../Utils/errorHandler')

const catchA = require('../Middlewares/catch')



exports.newOrder = async (req,res,next) =>{
    try{
        const {
            shippingInfo,
            city,
            phoneNumber,
            postalCode,
            Country,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt,
            orderStatus,

    } = req.body

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt,
        user: req.user._id
    })

    return res.status(201).json(order);

    
    
    
}catch(err){
        return res.status(500).json({message:err});
    }
}


exports.getSingleOrder = async (req, res, next)=>{
    try{
        const order = await Order.findById(req.params.id)
        
        if(!order){
            return res.status(400).json({success: false,err:"No Order Found"})
            
        }

        return res.status(200).json({success: true,order})
    }catch(err) {
        return res.status(500).json({success: false,err:"hello"})
    }
}


exports.getAllOrders = async (req, res, next)=>{
    try{
        const orders = await Order.find()

        if(!orders){
            return res.status(400).json({success: false,err})
            
        }

        let totalAmount = 0;


        orders.forEach(ord => {
            totalAmount += ord.totalPrice
        })

        return res.status(200).json({success: true,results:orders.length,orders,totalAmount})
    }catch(err) {
        return res.status(500).json({success: false,err})
    }
}


exports.getMyOrders = async (req, res, next)=>{
    try{
        const order = await Order.findOne({user: req.user._id})


        if(!order){
            return res.status(400).json({success: false,err})

        }

        return res.status(200).json({success: true,order})
    }catch(err) {
        return res.status(500).json({success: false,err})
    }
}


exports.deleteOrder = catchA(async (req, res, next)=>{
        const order = await Order.findByIdAndDelete(req.params.id)
        if(!order){
            return res.status(400).json({success: false,message:"Order Doesn Not Exist"})

        }

        return res.status(200).json({success: true,message:"Order Deleted"})

})