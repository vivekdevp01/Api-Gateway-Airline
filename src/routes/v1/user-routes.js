const express=require("express");
const {UserController}=require('../../controllers');
// const {UserMiddlewares}=require('../../middlewares');
const router=express.Router();
// router.delete('/:id',CityController.destroyCity);
router.post('/signup',UserController.signup);
// router.patch('/:id',CityController.updateCity);
router.post('/signin',UserController.signIn);
module.exports=router;
