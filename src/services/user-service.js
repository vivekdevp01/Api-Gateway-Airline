// const {UserRepository}=require('../repositories')
const {StatusCodes}=require('http-status-codes');
const { UserRepository }=require('../repositories');
const AppError=require('../utils/errors/app-error')
 const userRepository=new UserRepository();

 async function createUser(data){
    try{

        const user=await userRepository.create(data);
        return user;
    }
    catch(error){
        if(error.name=='SequelizeUniqueConstraintError'){
            throw new AppError("please dont give existing user name")
        }
        if(error.name== 'TypeError'){
            throw new AppError('Cannot create a new user')
        }
        throw error;
    }
}module.exports={
    createUser
}