const mongoose = require('mongoose');


const orderSchema = mongoose.Schema({
    shippingInfo: {
        address:{
            type:String,

        },
        city:{
            type:String,

        },
        phoneNumber:{
            type:Number,

        },
        postalCode:{
            type:String,

        },
        Country:{
            type:String,

        },
    },
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:'User'
    },

    orderItems:[
        {
            name:{
                type:String,
                required:true
            },
            quantity:{
                type:Number,
                required:true
            },
            image:{
                type:String,
                required:true
            },
            price:{
                type:Number,
                required:true
            },
            product:{
                type:mongoose.SchemaTypes.ObjectId,
                required:true,
                ref:'Product'
            }
        }
    ],
    paymentInfo:{
        id:{
            type:String,
        },
        status:{
            type:String,
        }
    },
    itemsPrice:{
        type:Number,
        required:true,
        default:0.0
    },
    taxPrice:{
        type:Number,
        required:true,
        default:0.0
    },
    shippingPrice:{
        type:Number,
        required:true,
        default:0.0
    },
    totalPrice:{
        type:Number,
        required:true,
        default:0.0
    },
    paidAt:{
            type:Date,
    },
    orderStatus:{
        type:String,
        default:'Processing',
        required:true
    },
    deliveredAt:{
        type:Date,
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
    

},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})


orderSchema.virtual('id').get(function(){
    return this._id.toHexString();
});


const orderModel = mongoose.model('Order', orderSchema)

module.exports = orderModel;