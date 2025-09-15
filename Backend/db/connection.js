const mongoose=require('mongoose')
require('dotenv').config()

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            UseUnifiedTopology:true,
        })
        console.log('MongoDB Connected...')
    }catch(err){
            console.log(err)
            process.exit(1)
        
    }
}
module.exports=connectDB