const express= require("express")
const dotenv = require("dotenv")

dotenv.config({path:'./config/config.env'});

const app =express()

app.get('/api/v1/bootcamps',(req,res)=>{
    res.status(200).json({success:true,msg:'Show all bootcamps'});
})

app.get('/api/v1/bootcamps/:id',(req,res)=>{
    res.status(200).json({success:true,msg:`Get a bootcamp with ${req.params.id}`});
})

app.post('/api/v1/bootcamps',(req,res)=>{
    res.status(200).json({success:true,msg:'Show all bootcamps'});
})

app.put('/api/v1/bootcamps/:id',(req,res)=>{
    res.status(200).json({success:true,msg:`Update bootcamp ${req.params.id}`});
})

app.delete('/api/v1/bootcamps/:id"',(req,res)=>{
    res.status(200).json({success:true,msg:`Delete bootcamp with ${req.params.id}`});
})


const PORT= process.env.PORT || 5000
console.log(process.env)
app.listen(PORT,console.log(`Server Running in mode ${process.env.NODE_ENV} on port ${PORT}`))

