const express=require("express");
const {UserController}=require('../../controllers');
const {AuthMiddlewares}=require('../../middlewares');
const router=express.Router();
// router.delete('/:id',CityController.destroyCity);
router.post('/signup',UserController.signup);
// router.patch('/:id',CityController.updateCity);
router.post('/signin',AuthMiddlewares.validateAuthRequest
,UserController.signIn);
router.post('/role',AuthMiddlewares.checkAuth,AuthMiddlewares.isAdmin,UserController.addRoleToUser)
module.exports=router;
