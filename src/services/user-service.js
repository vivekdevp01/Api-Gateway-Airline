// const {UserRepository}=require('../repositories')
const {StatusCodes}=require('http-status-codes');
const { UserRepository,RoleRepository }=require('../repositories');
const AppError=require('../utils/errors/app-error');
const {Auth, Enums}=require('../utils/common');
 const userRepository=new UserRepository();
 const roleRepository=new RoleRepository();

 async function createUser(data){
    try{

        const user=await userRepository.create(data);
        const role=await roleRepository.getRoleByName(Enums.USER_ROLES_ENUMS.CUSTOMER);
        user.addRole(role);
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
}
async function signIn(data){
    try{
        const user=await userRepository.getUserByEmail(data.email);
        if(!user){
            throw new AppError("No user is found",StatusCodes.NOT_FOUND);
        }
        const passwordMatch=Auth.checkPassword(data.password,user.password);
        if(!passwordMatch){
            throw new AppError("password is wrong",StatusCodes.NOT_FOUND);
        }
        const jwt=Auth.createToken({id:user.id,email:user.email});
        return jwt;
    }
    catch(error){
        if(error instanceof AppError) throw error;
        console.log(error);
        throw new AppError('something went wrong,',StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
async function isAuthenticated(token){
    try{
        if(!token){
            throw new AppError('jwt token not presnet',StatusCodes.BAD_REQUEST);
        }
        const response=Auth.verifyToken(token);
        const user=await userRepository.get(response.id);
        if(!user){
            throw new AppError('no user find',StatusCodes.BAD_REQUEST);
        }
        return user.id;
    }
    catch(error){
        if(error instanceof AppError) throw error;
        if(error.name=='JsonWebTokenError'){
            throw new AppError('invalid jwt token',StatusCodes.BAD_REQUEST);
        }
        console.log(error);
        throw error;
    }
}
async function addRoletoUser(data){
    try{
const user=await userRepository.get(data.id);
if(!user){
    throw new AppError("no user found for thr given ",StatusCodes.NOT_FOUND);
}
const role=await roleRepository.getRoleByName(data.role);
if(!role){
    throw new AppError("no user found for thr given ",StatusCodes.NOT_FOUND);
}
user.addRole(role);
    }
    catch(error){
        if(error instanceof AppError) throw error;
        console.log(error);
        throw new AppError('something went wrong,',StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
async function isAdmin(id){
    try{
        const user=await userRepository.get(id);
        if(!user){
            throw new AppError("no user found for thr given ",StatusCodes.NOT_FOUND);
        }
        const adminrole=await roleRepository.getRoleByName(Enums.USER_ROLES_ENUMS.ADMIN);
        if(!adminrole){
            throw new AppError("no user found for thr given ",StatusCodes.NOT_FOUND);
        }
        return user.hasRole(adminrole);
    }
    catch(error){
        if(error instanceof AppError) throw error;
        console.log(error);
        throw new AppError('something went wrong,',StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
module.exports={
    createUser,
    signIn,
    isAuthenticated,
    addRoletoUser,
    isAdmin
}