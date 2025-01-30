import { User } from "@/models/user";

type PlacedStudentsType={
    _id:string;   
    studentName: string; 
    companyName?: string;
    companyImage?: string;
    studentImage?: string;

}

type UniversityInfoType = {
    _id?: string;
    universityName: string;
    aboutUniversity: string;
    cutoffs: string;
    ageOfUniversity?: number;
    highestPackageOffered: number;
    industryConnections: number;
    placementRatio: number;
    cloudinaryImageUrl?: string;
    cloudinaryImageName?: string;
  };


type CourseInfoType = {
    _id: string;
    university: UniversityInfoType; // Full university object
    courseInfo: string;
    eligibilityCriteria:string[];
    duration?: string;
    syllabus?: string;
    title: string; // Title of the course
    courseRating:number;
    affilitatedWith:string;
    admissionProcess?: string; // Optional array of strings for course content like syllabus
    Brochure?: string; // Optional field for storing file path or URL to PDF
}

type BlogType={
  _id:string;
    title: string;
      metadata:string;
      blogImage:string;
      description: string;
      author: User;
      content: string;
      thumbnail:string;
      publishedDate:string;
}
export type {CourseInfoType,UniversityInfoType,PlacedStudentsType,BlogType}