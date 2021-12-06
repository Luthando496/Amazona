const ErrorHandler = require('../Utils/errorHandler')



module.exports = (err, req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    if(process.env.NODE_ENV === 'DEVELOPMENT'){
        res.status(err.statusCode).json({
            success: false,
            error:err,
            errorMessage: err.message,
            stack:err.stack
        })
    }

    if(process.env.NODE_ENV === 'PRODUCTION'){
        let error = {...err}

        error.message =err.message

        // WRONG MONGOOSE ID
        if(err.name === 'CastError'){
            const message = `Resource Not found. Invalid ${err.path}`
            error = new ErrorHandler(message,400)
        }

        // MONGOOSE VALIDATION ERROR
        if(err.name === 'ValidationError'){
            const message = Object.values(err.errors).map(value => value.message)
            error = new ErrorHandler(message,400)
        }

        res.status(error.statusCode).json({
            succes:false,
            message:error.message || ' Internal Server Error'
        })
    }


}