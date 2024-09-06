import React, { useEffect, useState } from 'react';
import AdminCourseinfoFormComponent from './admin/AdminCourseinfoForm';
import { Button } from './ui/button';
import axios from 'axios';



type Props = {
  isVisible: boolean;
  onCancel: () => void;
  sendidtoEditModal: string;
};

function EditCourseinfoModal({ isVisible, onCancel, sendidtoEditModal }: Props) {
  
  
  
  // Ensure that the number of hooks remains constant between renders
  if (!isVisible) return null;

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[rgb(244,243,239)] py-5 font-medium text-black max-h-[95vh] overflow-y-auto px-14">
        <div className="flex justify-end">
          <Button onClick={onCancel}>X</Button>
        </div>
        <AdminCourseinfoFormComponent  id={sendidtoEditModal} />
      </div>
    </div>
  );
}

export default EditCourseinfoModal;
