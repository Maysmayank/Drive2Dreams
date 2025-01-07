import mongoose, { Schema, Document } from "mongoose";

interface UniversityInfo extends Document{
    universityName:string;
    aboutUniversity:string;
    admissionProcess:string;
    cutoffs:string,
    cloudinaryImageUrl?:string,
    cloudinaryImageName?:string
}

const UniversityInfoSchema: Schema = new mongoose.Schema<UniversityInfo>({
    universityName:{
        type:String,trim:true,
        required:true
    },
    aboutUniversity: {
        type: String,
        required: true,
    },
    admissionProcess: {
        type: String,
        required: true,
    },
    cutoffs: {
        type: String,
        required: true,
    },
    cloudinaryImageUrl:{
        type:String,
        default:""   
    },
    cloudinaryImageName:{
        type:String,
        default:""
    }
},{
    timestamps:true
});

const UniversityInfoModel = mongoose.models?.UniversityInfo || mongoose.model<UniversityInfo>('UniversityInfo', UniversityInfoSchema);

export { UniversityInfoModel };
