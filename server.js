const express = require("express")
const dotenv = require("dotenv")
const connectDB = require('./config/db')
const colors = require('colors')
const morgan = require('morgan')
//Route files
const bootcamps = require('./routes/bootcamps')


dotenv.config({path: './config/config.env'});

//connect to database
connectDB();

const app = express()
// Body parser to use req.body
app.use(express.json())

//Dev logging Middleware and Not in Production
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}


//Mounting all the routers here
app.use('/api/v1/bootcamps', bootcamps);


const PORT = process.env.PORT || 5000
console.log(colors.cyan(process.env))

const server = app.listen(PORT, console.log(`Server Running in mode ${process.env.NODE_ENV} on port ${PORT}`.underline.green))

//Handling unhandled promise rejection
process.on('unhandledRejection',(err,promise) =>{
    console.log(`Error :${err.message}`.red);
    // We will close the server and exit the application
    server.close(()=>process.exit(1));
})
