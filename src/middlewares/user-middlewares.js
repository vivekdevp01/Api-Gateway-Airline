const {StatusCodes}=require('http-status-codes');
const {ErrorResponse}=require('../utils/common');
function validateCreateUser(req,res,next){
    if(!req.body.email){
        ErrorResponse.message="Something went wrong";
        ErrorResponse.error={explanation:"something wrong with name"}
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    next();
}
module.exports={
    validateCreateUser
}