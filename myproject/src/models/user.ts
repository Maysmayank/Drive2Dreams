import mongoose,{Schema,Document} from "mongoose";

interface User extends Document{
    username:string,
    email:string,
    password:string
}

interface Form extends Document{
    username:string,
    email:string,
    course:string,
    phone_number:number,
    location:string,
}

const UserSchema:Schema<User>=new Schema({
    username:{
        type:String,
        required:[true,"username is required"],
        trim:true,
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'please use a valid email address']
    },
    password:{
        type:String,
        required:[true,"password is required"]
    }
})

const FormSchema:Schema<Form>=new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:[true,"email is required"],
    },
    course:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true
    },
    phone_number:{
        type:Number,
        required:true,
    }
})

const UserModel = mongoose.models.User || mongoose.model<User>("User", UserSchema);
const FormModel = mongoose.models.Form || mongoose.model<Form>("Form", FormSchema);
export {UserModel,FormModel}