const {UserService}=require('../services');
const {StatusCodes}=require("http-status-codes");
const {SuccessResponse, ErrorResponse}=require('../utils/common');

// post ;? signup

async function signup(req,res){
      try{
        const user=await UserService.createUser({
            email:req.body.email,
            password:req.body.password
        });
        console.log(user);
        SuccessResponse.data=user;
        return res
        .status(StatusCodes.CREATED)
        .json(SuccessResponse);
      }
      catch(error){
        ErrorResponse.error=error;
       return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ErrorResponse);
      }
} 
async function signIn(req,res){
    try{
      const user=await UserService.signIn({
          email:req.body.email,
          password:req.body.password
      });
      console.log(user);
      SuccessResponse.data=user;
      return res
      .status(StatusCodes.CREATED)
      .json(SuccessResponse);
    }
    catch(error){
      ErrorResponse.error=error;
     return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
    }
} 


module.exports={
    signup,
    signIn
}