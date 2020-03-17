const errorHandler = (err, req, res, next) => {
    // mmost important line on this planet if you don't want to die
    console.log(err.stack.red);
    res.status(err.statusCode || 500).json({
        success: false,
        msg: err.message || 'Server Error'
    })

};
module.exports = errorHandler;