import mongoose, { Schema, Document, Types } from "mongoose";
import { PlacedStudentModel } from "./PlacedStudents";

export interface UniversityInfo extends Document {
  placedStudents?: Types.ObjectId;
  universityName: string;
  aboutUniversity: string;
  cutoffs: string;
  ageOfUniversity: number;
  highestPackageOffered: number;
  industryConnections: number;
  placementRatio: number;
  cloudinaryImageUrl?: string;
  cloudinaryImageName?: string;
}

const UniversityInfoSchema: Schema = new mongoose.Schema<UniversityInfo>(
  {
    universityName: {
      type: String,
      trim: true,
      required: true,
    },
    aboutUniversity: {
      type: String,
      required: true,
    },

    cutoffs: {
      type: String,
      required: false,
    },
    ageOfUniversity: {
      type: Number, // Fixed typo and type
      required: true,
    },
    highestPackageOffered: {
      type: Number,
      required: true,
    },
    industryConnections: {
      type: Number,
      required: true,
    },
    placementRatio: {
      type: Number,
      required: true,
    },
    cloudinaryImageUrl: {
      type: String,
      default: "",
      required:false
    },
    cloudinaryImageName: {
      type: String,
      default: "",
      required:false
    },
  },
  {
    timestamps: true,
  }
);

const UniversityInfoModel =
  mongoose.models?.UniversityInfo ||
  mongoose.model<UniversityInfo>("UniversityInfo", UniversityInfoSchema);

export { UniversityInfoModel };
