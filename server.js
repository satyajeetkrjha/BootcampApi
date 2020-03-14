const express= require("express")
const dotenv = require("dotenv")

dotenv.config({path:'./config/config.env'});

const app =express()

const PORT= process.env.PORT || 5000
console.log(process.env)
app.listen(PORT,console.log(`Server Running in mode ${process.env.NODE_ENV} on port ${PORT}`))

