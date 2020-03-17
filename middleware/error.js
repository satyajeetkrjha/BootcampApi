const colors = require('colors')
const errorHandler = (err, req,res,next) =>{
    // mmost important line on this planet if you don't want to die
    console.log(err.stack.red)
    res.status(500).json({
        success:false,
        msg:err.message
    })

}
module.exports=errorHandler;