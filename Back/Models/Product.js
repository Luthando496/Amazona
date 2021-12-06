const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please Enter Name Of The Product'],
        trim:true,
    },
    price:{
        type:Number,
        required:[true,'Please Enter Price Of The Product'],
        default:120
    },
    description:{
        type:String,
        required:[true,'Please Enter Description Of The Product'],
    },

    ratings:{
        type:Number,
        default:2.8
    },

    image:[{
        public_id:{
            type:String,
        },
        url:{
            type:String,
        }
    }],

    category:{
        type:String,
        required:[true,'Please Enter Category For This Product'],
        enum:{
            values:['Electronics','Furnisher','Beauty & Health','Audio & Media','Books','Fashion','Food']
        },
        message: 'Please enter Correct Category This Product'
    },
     seller:{
         type:String,
         required:[true,'Please Enter Seller Name For This Product'],
     },

     stock:{
         type:Number,
         required:[true,'Please Enter Stock For This Product'],
         maxlength:[15,'Maximum for this Stock should be 15'],
         default:0
     },
     numOfReviews:{
        type:Number,
        default:0
     },

     reviews:[
         {
             name:{
                 type:String
             },
             rating:{
                 type:Number,
                 default:3,
                 maxlength:5
             },
             comment:{
                type:String,
             },
             user:{
                type:mongoose.SchemaTypes.ObjectId,
             ref:'User',
             required:true
            }
         },
     ],

     createdAt:{
         type:Date,
         default:Date.now()
     }
    

},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})





const productModel = mongoose.model('Product',productSchema)

module.exports = productModel