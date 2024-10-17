import React, { useEffect, useState } from 'react';
import AdminCourseinfoFormComponent from './admin/AdminCourseinfoForm';
import { Button } from './ui/button';
import axios from 'axios';
import AdminUniversityinfoFormComponent from './admin/AdminUniversityinfoForm';



type Props = {
  isVisible: boolean;
  onCancel: () => void;
  courseid?: string;      // getting the course id if course edit button is clicked 
  universityid?: string // getting the university id if university edit button is clicked 
};

function EditinfoModal({ isVisible, onCancel, courseid, universityid }: Props) {
  // Ensure that the number of hooks remains constant between renders
  if (!isVisible) return null;

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[rgb(244,243,239)] py-5 font-medium text-black max-h-[95vh] md:w-[60%] overflow-y-auto px-14">
        <div className="flex justify-end">
          <Button onClick={onCancel}>X</Button>
        </div>

        {
          courseid ? (               
            <AdminCourseinfoFormComponent id={courseid} />
          ) : (
            <AdminUniversityinfoFormComponent id={universityid}/>
          )
        }

      </div>
    </div>
  );
}

export default EditinfoModal;
