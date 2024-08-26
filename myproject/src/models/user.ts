import mongoose,{Schema,Document} from "mongoose";

interface User extends Document{
    username:string,
    email:string,
    password?:string,
    role:string,
}

interface Form extends Document{
    username:string,
    email:string,
    program:string,
    phone_number:string,

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
    },
    role:{
        type:String,
        default:'user'
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
    program:{
        type:String,
        required:true,
    },
    phone_number:{
        type:String,
        required:true,
    }
})

const UserModel = mongoose.models.User || mongoose.model<User>("User", UserSchema);
const FormModel = mongoose.models.Form || mongoose.model<Form>("Form", FormSchema);
export {UserModel,FormModel}