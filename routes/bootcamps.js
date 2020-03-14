const express = require('express')

const {
    getBootcamp,
    getBootcamps,
    deleteBootcamp,
    updateBootcamp,
    createBootcamp
} = require('../controllers/bootcamps')
const router=express.Router()
router.
route('/').
get(getBootcamps()).
post(createBootcamp()).

router.
    route('/:id')
    .put(updateBootcamp())
    .delete(deleteBootcamp())

module.exports=router;