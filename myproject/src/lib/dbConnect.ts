import mongoose from "mongoose";

type ConnectionObject={
    isConnected?:boolean
}

const connection:ConnectionObject={}

export default async function dbConnect():Promise<void>{
    if(connection.isConnected){
        console.log("already connected to db");
        return 
    }

    try{
        const db=await mongoose.connect(process.env.MONGODB_URI||'',{})
        
        connection.isConnected=db.connections[0].readyState===1

        console.log("Db connected Successfully");
        
    }catch(err){
        console.log("Databse not connected ",err);
        process.exit(1);
    }
}