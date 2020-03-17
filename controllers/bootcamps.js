
const Bootcamp = require('../models/Bootcamp');
const colors = require('colors')
// Get all bootcamps
// GET /api/v1/bootcamps
//@acess public
exports.getBootcamps =(req,res,next) =>{
    res.status(200).json({success:true,msg:'Show all bootcamps',hello:req.hello});
}

// Get a single  bootcamp
// GET /api/v1/bootcamps/:id
//@acess public
exports.getBootcamp =(req,res,next) =>{

    res.status(200).json({ success:true,msg:`Get a bootcamp with ${req.params.id}`});
}

// Post  Create new bootcamp
// POST /api/v1/bootcamps
//@acess private
exports.createBootcamp = async (req,res,next) =>{
    try{
        const bootcamp = await Bootcamp.create(req.body);
        res.status(201).json({
            success:true,
            data:bootcamp
        });
    }catch (e) {
       console.log(colors.red(e)) ;
       res.status(400).json({
           success:false,
           error:e
       });
    }

}

// PUT  Update bootcamp
// PUT /api/v1/bootcamp/:id
//@acess private
exports.updateBootcamp =(req,res,next) =>{
    res.status(200).json({success:true,msg:`Update a bootcamp with ${req.params.id}`});
}

//DELETE Delete Bootcamp
//DELETE /api/v1/bootcamp/:id
//@acess private
exports.deleteBootcamp =(req,res,next) =>{
    res.status(200).json({success:true,msg:`Delete bootcamp with ${req.params.id}`});
}