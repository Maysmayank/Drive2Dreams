type PlacedStudentsType={
    _id:string;   
    studentName: string; 
    companyName?: string;
    companyImage?: string;
    studentImage?: string;

}

type UniversityInfoType =
{       _id?:string;
        placedStudents:PlacedStudentsType[];
        universityName: string;
        aboutUniversity: string;
        cutoffs: string,
        cloudinaryImageUrl?: string;
        cloudinaryImageName?: string;
        
}


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

export type {CourseInfoType,UniversityInfoType,PlacedStudentsType}