const express=require("express");
const {UserController}=require('../../controllers');
// const {UserMiddlewares}=require('../../middlewares');
const router=express.Router();
// router.delete('/:id',CityController.destroyCity);
router.post('/',UserController.signup);
// router.patch('/:id',CityController.updateCity);

module.exports=router;
