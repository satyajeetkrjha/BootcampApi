const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');
const colors = require('colors');
// Get all bootcamps
// GET /api/v1/bootcamps
//@acess public
exports.getBootcamps = asyncHandler(async (req, res, next) => {

    let queryStr = JSON.stringify(req.query);
    queryStr=queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g,match =>`$${match}`)
    query=Bootcamp.find(JSON.parse(queryStr));

    const bootcamp = await query
    res.status(200).json({
        success: true,
        count: bootcamp.length,
        data: bootcamp
    })


});

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
        next(e);
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
        next(e)
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
        next(e)
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
        next(e)
    }

};

//Get all bootcamps in  a radius r  with zipcode provided
// @route     GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access    Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
    const {zipcode, distance} = req.params;


    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;


    const radius = distance / 3963;

    const bootcamps = await Bootcamp.find({
        location: {$geoWithin: {$centerSphere: [[lng, lat], radius]}}
    });

    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps
    });
});