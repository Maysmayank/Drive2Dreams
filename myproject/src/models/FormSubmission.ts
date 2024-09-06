import mongoose, { Schema, Document } from "mongoose";
interface FormSubmissionCount extends Document{
    count:number,
}
const FormSubmissionCountSchema:Schema=new Schema<FormSubmissionCount>({
    count:{
        type:Number,
        default:0
    }
})

const FormSubmissionCountModel=mongoose.models.FormSubmissionCount || mongoose.model<FormSubmissionCount>('FormSubmissionCount',FormSubmissionCountSchema)
export {FormSubmissionCountModel}