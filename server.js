const express= require("express")
const dotenv = require("dotenv")

//Route files
const bootcamps = require('./routes/bootcamps')


dotenv.config({path:'./config/config.env'});

const app =express()

//Mounting all the routers here
app.use('/api/v1/bootcamps',bootcamps);


const PORT= process.env.PORT || 5000
console.log(process.env)
app.listen(PORT,console.log(`Server Running in mode ${process.env.NODE_ENV} on port ${PORT}`))

