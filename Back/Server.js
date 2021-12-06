const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config({path:'../Back/config.env'})
const mongoose = require('mongoose')
const morgan = require('morgan')
const users = require('./Routes/User')
const products = require('./Routes/Product')
const pay = require('./Routes/payment')
const orders = require('./Routes/Order')
const bodyparser = require('body-parser')
const errorMiddleware = require('./Middlewares/errors')
const path = require('path')
const { resolve } = require('path')





app.use(express.json())
app.use(morgan('dev'))
app.use(bodyparser.urlencoded({ extended:true}))










app.use('/v1/api/amazona/users/',users)
app.use('/v1/api/amazona/pay/',pay)
app.use('/v1/api/amazona/',products)
app.use('/v1/api/amazona/orders',orders)


if(process.env.NODE_ENV='PRODUCTION'){
    app.use(express.static(path.join(__dirname,'../front/build')))

    app.get('*', (req,res)=>{
        res.sendFile(resolve(__dirname,'../front/build/index.html'))
    })
}



// MIDDLEWARE TO HANDLE MIDDLEWARES
app.use(errorMiddleware)




const DB = process.env.DB
console.log(process.env.DB)
const connectDB = async()=>{
    try{
        await mongoose.connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology:true}
        );
    
    console.log('DB CONNECTED')

    }catch(err){
        console.error(err.message)
        process.exit(1)
    }
}

connectDB()


// UNHANDLED EXCEPTIONS

process.on('uncaughtException',err=>{
    console.log('uncaught Exception Server Shutting Down')
    console.log(`ERROR = ${err.stack}`)
    process.exit(1)

})

const port = 7000



const server = app.listen(port || process.env.PORT,()=>{
    console.log(`Server is Running At 7000 In ${process.env.NODE_ENV}`)
})



// unhandledRejection
process.on('unhandledRejection',err=>{
    console.log(`ERROR REJECTION  ${err.message}`)
    coonsole.log('SERVER SHUTTING DOWN')

    server.close(()=>{
        process.exit(1)
    })

})