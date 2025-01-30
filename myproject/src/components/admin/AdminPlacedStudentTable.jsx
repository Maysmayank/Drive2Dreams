'use client';
import { Delete, Edit2, Trash2 } from "lucide-react";
import React, { useState } from "react";
import EditinfoModal from "../EditinfoModal";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { revalidateCourseData } from "@/lib/action";
import ConfirmationModal from "../ConfirmationModal";

const UniversityTable = ({ universityName, studentId, studentName, companyName }) => {
    const [visible, setIsVisible] = useState(false);
    const [confirmModalVisible, setConfirmModalVisible] = useState(false)

    function handleEdit() {
        setIsVisible(true);  // Simply set visibility to true when edit is clicked
    }

    function handleConfirmModalVisibility(studentId) {
        setConfirmModalVisible(true)
    }
    function handleOnCancel() {
        setConfirmModalVisible(false)
    }
    function handleDeleteConfirmation(id) {
        handleDelete(id)
    }

    async function handleDelete(id) {

        try {
            const response = await axios.delete(`/api/delete-placedStudent?studentId=${id}`)

            if (response.data.success) {
                revalidateCourseData();

                toast({
                    variant: 'constructive',
                    description: response.data.message,
                })
            } else {
                toast({
                    variant: 'constructive',
                    title: response.data.message,
                })
            }
        } catch (error) {
            toast({
                variant: 'destructive',
                title: error.response.data.message,
            })
        }

    }
    
    return (
        <>
            <tr className="border-b">
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

            <EditinfoModal
                isVisible={visible}
                placedStudentId={studentId}
                onCancel={() => setIsVisible(false)}

            />
            <ConfirmationModal isVisible={confirmModalVisible} onCancel={handleOnCancel} onConfirm={() => handleDeleteConfirmation(studentId)} />

        </>
    );
};

export default UniversityTable;
