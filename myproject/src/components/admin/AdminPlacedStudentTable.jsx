'use client';
import { Edit2, Trash2 } from "lucide-react";
import React, { useState } from "react";
import EditinfoModal from "../EditinfoModal";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { revalidateCourseData } from "@/lib/action";
import ConfirmationModal from "../ConfirmationModal";

const UniversityTable = ({ universityName, studentId, studentName, companyName }) => {
    const [visible, setIsVisible] = useState(false);
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);

    function handleEdit() {
        setIsVisible(true);
    }

    function handleConfirmModalVisibility() {
        setConfirmModalVisible(true);
    }

    function handleOnCancel() {
        setConfirmModalVisible(false);
    }

    function handleDeleteConfirmation(id) {
        handleDelete(id);
    }

    async function handleDelete(id) {
        try {
            const response = await axios.delete(`/api/delete-placedStudent?studentId=${id}`);

            if (response.data.success) {
                revalidateCourseData();
                toast({
                    variant: 'constructive',
                    description: response.data.message,
                });
            } else {
                toast({
                    variant: 'constructive',
                    title: response.data.message,
                });
            }
        } catch (error) {
            toast({
                variant: 'destructive',
                title: error.response?.data?.message || "Something went wrong",
            });
        }
    }

    return (
        <>
            {/* ✅ Table Row for Larger Screens */}
            <tr className="hidden md:table-row border-b">
                <td className="py-2 px-4">{universityName}</td>
                <td className="py-2 px-4">{studentName}</td>
                <td className="py-2 px-4">{companyName}</td>
                <td className="py-2 px-4 hover:scale-90 cursor-pointer">
                    <Edit2 onClick={handleEdit} />
                </td>
                <td className="py-2 px-4 hover:scale-105 cursor-pointer">
                    <Trash2 size={18} onClick={handleConfirmModalVisibility} />
                </td>
            </tr>

            {/* ✅ Card Layout for Mobile Screens */}
            <div className="md:hidden bg-gray-800 text-white p-4 rounded-lg shadow-md mb-4">
                <p><span className="font-bold text-gray-300">University:</span> {universityName}</p>
                <p><span className="font-bold text-gray-300">Student:</span> {studentName}</p>
                <p><span className="font-bold text-gray-300">Company:</span> {companyName}</p>
                <div className="flex justify-end gap-4 mt-2">
                    <button 
                        className="bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-1" 
                        onClick={handleEdit}
                    >
                        <Edit2 size={16} /> Edit
                    </button>
                    <button 
                        className="bg-red-500 text-white px-3 py-1 rounded flex items-center gap-1" 
                        onClick={handleConfirmModalVisibility}
                    >
                        <Trash2 size={16} /> Delete
                    </button>
                </div>
            </div>

            {/* ✅ Modals */}
            <EditinfoModal
                isVisible={visible}
                placedStudentId={studentId}
                onCancel={() => setIsVisible(false)}
            />
            <ConfirmationModal 
                isVisible={confirmModalVisible} 
                onCancel={handleOnCancel} 
                onConfirm={() => handleDeleteConfirmation(studentId)} 
            />
        </>
    );
};

export default UniversityTable;
