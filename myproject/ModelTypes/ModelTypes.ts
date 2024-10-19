type UniversityInfoType =
{       _id?:string;
        universityName: string;
        aboutUniversity: string;
        admissionProcess: string;
        cutoffs: string,
        cloudinaryImageUrl?: string;
        cloudinaryImageName?: string;
}

type CourseInfoType = {
    _id: string;
    university: UniversityInfoType; // Full university object
    title: string;
    courseInfo: string;
    courseOverview: string;
    courseContent?: string[];
    duration?: string;
    syllabus?: string;
}

export type {CourseInfoType,UniversityInfoType}