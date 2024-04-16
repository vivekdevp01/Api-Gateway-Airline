const { logger }=require('../config')
const {StatusCodes}=require('http-status-codes');
const AppError=require('../utils/errors/app-error');
class CrudRepository{
    constructor(model){
        this.model=model;
    }
    async create(data){
        try{
            const response=await this.model.create(data);
            return response;
        }
        catch(error){
         logger.error("Something get aerror get")
        throw error;
        }
    }
    async destroy(data){
        
            const response=await this.model.destroy({
                where:{
                    id:data
                }

            });
            if(!response){
                throw new AppError('not able to find the resource',StatusCodes.NOT_FOUND)
                    }
            return response;
    }
    async get(data){
        // try{
            const response=await this.model.findByPk(data);
            if(!response){
        throw new AppError('not able to find the resource',StatusCodes.NOT_FOUND)
            }
            return response;
        // }
//         catch(error){
// logger.error("Something get aerror find")
// throw error;
//         }
    }
    async getAll(){
        try{
            const response=await this.model.findAll();
            return response;
        }
        catch(error){
logger.error("Something get aerror get")
throw error;
        }
    }
    async update(id,data){
        
            const response=await this.model.update(data,{
                where:{
                    id:id
                }
            });
            if(response[0]==0){
                throw new AppError("not able to find the ",StatusCodes.NOT_FOUND);
            }
            return response;

     
l
    }
}
module.exports=CrudRepository;