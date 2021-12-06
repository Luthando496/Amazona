module.exports =func =>(er,req,res,next) => {
    Promise.resolve(func(req,res,next))
                .catch(next)
}