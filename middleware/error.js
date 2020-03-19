const ErrorResponse = require('../utils/errorResponse');
const errorHandler = (err, req, res, next) => {
    let error = {...err};
    error.message = err.message;
    // mmost important line on this planet if you don't want to die
    console.log(err);
    console.log(err.stack.red);
    //If id is not found i.e castError thrown by Mongodb
    if (err.name === 'CastError') {
        const message = `Bootcamp not found with the id of ${err.value}`;
        error = new ErrorResponse(message, 404);

    }
    //Mongoose duplicate Key Error
    if (err.code === 11000) {
        const message = 'Duplicate field value sent by client';
        error = new ErrorResponse(message, 400)
    }
    //Mongoose Validation Error
    if (err.name === 'ValidationError') {
        const message = Object.values((err.errors)).map(val => val.message);
        error = new ErrorResponse(message, 400);
        console.log("error", error);


    }
    res.status(error.statusCode || 500).json({
        success: false,
        msg: error.message || 'Server Error'
    })

};
module.exports = errorHandler;
