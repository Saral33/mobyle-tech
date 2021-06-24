const User = require('../Models/userModel')
const asyncHandler = require('express-async-handler')


const admin = asyncHandler(async(req,res,next)=>{
    const user = await User.findById(req.user.id)
    if(user.role!=='admin'){
        throw new Error('This route is only for admin')
    }
    next()
})


module.exports =admin