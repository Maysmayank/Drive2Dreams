import mongoose, { Document, Schema, Types } from "mongoose";
import { UserModel } from "./user";

// Blog interface definition
export interface Blog extends Document {
  title: string;
  metadata:string[];
  blogImage:string[];
  thumbnail:string;
  description: string;
  publishedDate:Date;
  author: Types.ObjectId;
  content: string;
}

const BlogSchema = new mongoose.Schema<Blog>(
  {
    author: { type: Schema.Types.ObjectId, ref: UserModel, required: true },
    title: { type: String, required: true },
    description: { type: String, required: false },
    content: { type: String, required:false },
    metadata:{type:[String],required:false},
    thumbnail:{type:String,required:false},
    blogImage:{type:[String],required:false},
    publishedDate:{
      type:Date,
      default:Date.now
    },

  },
  { timestamps: true }
);

// Blog model
const BlogModel =
  mongoose.models?.Blog || mongoose.model<Blog>("Blog", BlogSchema);

export default BlogModel;
