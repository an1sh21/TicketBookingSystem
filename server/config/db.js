import mongoose from "mongoose"

export const connectDB = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Mongo DB connected : ${conn.xonnection.host}`)
    }catch(error){
        console.error(`Error: ${error.message}`);


    }
    

}
