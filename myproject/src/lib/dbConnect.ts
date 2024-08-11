import mongoose from "mongoose";

type ConnectionObject={
    isConnected?:number
}

const connection:ConnectionObject={}

export default async function dbConnect():Promise<void>{
    if(connection.isConnected){
        console.log("alresy connected to db");
        return 
    }

    try{
        const db=await mongoose.connect(process.env.MONGODB_URI||'',{})
        
        connection.isConnected=db.connections[0].readyState

        console.log("Db connected Successfully");
        
    }catch(err){
        console.log("Databse not connected ",err);
        process.exit(1);
    }
}