import React from 'react';
import { Button } from "@/components/ui/button";

const ConfirmationModal = ({ isVisible, onConfirm, onCancel }) => {
  if (!isVisible) return null;

  return (
    <div className=" fixed z-50 inset-0 flex  items-center justify-center bg-black bg-opacity-50">
      <div className="  m-4 bg-black text-white  p-7 rounded-md shadow-lg" >
        <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
        <p className="mb-4">Are you sure you want to delete this course?</p>
        <div className="flex gap-4">
          <Button onClick={onConfirm} className="bg-red-500 text-white">Delete</Button>
          <Button onClick={onCancel} className="bg-gray-500 text-white">Cancel</Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
