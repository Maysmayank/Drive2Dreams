"use client";
import { RefreshCw } from 'lucide-react';

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
function ShowCount() {
    const [count, setCount] = useState(0);
    const [Loading,setLoading]=useState(false);
    async function getSubmissionCount() {
        setLoading(true)
        try {
            const response = await axios.get("/api/post/update-submitcount");
            const countData = response.data.message;
            setCount(countData);
        } catch (error) {
            console.error("Error fetching submission count:", error);
            setError("Failed to fetch submission count.");
        }finally{
            setLoading(false)
        }
    }
    useEffect(() => {
        
        getSubmissionCount();
    }, []);
    return (
        <div className="flex bg-white justify-between text-black font-semibold text-md p-2 rounded-md max-w-[300px]">
            <p>Form Submitted : {count} </p>
            <button onClick={getSubmissionCount} disabled={Loading} >
                {Loading?(<Loader2 className="animate-spin"/>):(<RefreshCw />)}
            </button>
        </div>
    );
}

export default ShowCount;
