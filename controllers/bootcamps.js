const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');

const colors = require('colors');
// Get all bootcamps
// GET /api/v1/bootcamps
//@acess public
exports.getBootcamps = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.find();// gets all the data from this collection
        res.status(200).json({
            success: true,
            count: bootcamp.length,
            data: bootcamp
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            error: e
        })
    }

};

// Get a single  bootcamp
// GET /api/v1/bootcamps/:id
//@acess public 
exports.getBootcamp = async (req,res,next) =>{
    try {
        const bootcamp = await Bootcamp.findById(req.params.id);
        if (!bootcamp) {
            return next(new ErrorResponse(`Bootcamp not found with the id of ${req.params.id}`, 404))
        }

        res.status(200).json({
            success: true,
            data: bootcamp
        })
    } catch (e) {
        next(new ErrorResponse(`Bootcamp not found with the id of ${req.params.id}`, 404))
    }

};

// Post  Create new bootcamp
// POST /api/v1/bootcamps
//@acess private
exports.createBootcamp = async (req,res,next) =>{
    try {
        const bootcamp = await Bootcamp.create(req.body);
        res.status(201).json({
            success: true,
            data: bootcamp
        });
    } catch (e) {
        console.log(colors.red(e));
        res.status(400).json({
            success: false,
            error: e
        });
    }

};

// PUT  Update bootcamp
// PUT /api/v1/bootcamp/:id
//@acess private
exports.updateBootcamp = async (req,res,next) =>{
    try{
        const bootcamp = await  Bootcamp.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        });
        if (!bootcamp) {
            return res.status(400).json({
                success: false,
                msg: 'This id does not exist and cannot be updated'
            })
        }
        res.status(200).json({
            data: bootcamp,
            success: true
        })
    } catch (e) {
        console.log(colors.red(e));
        res.status(400).json({
            success: false,
            error: e
        });
    }


};

//DELETE Delete Bootcamp
//DELETE /api/v1/bootcamp/:id
//@acess private
exports.deleteBootcamp = async (req,res,next) =>{
    try{
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

        if(!bootcamp){
            return res.status(200).json({
                success: true,
                msg: 'This id does not exist'
            })
        }
        res.status(200).json({
            success: true,
            msg: 'Deleted '
        })

    } catch (e) {
        console.log(colors.red(e));
        res.status(400).json({
            success: false,
            error: e
        });
    }

};