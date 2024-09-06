'use client'
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
// we will get total courses as the number of documents in DB
// limit = 2
const Pagination = ({totalCourses, limit ,pageNumber,setpageNumber}) => {   

  const totalPages = Math.ceil(totalCourses / limit);
  
 
  
  return (
    <div>
      
      <Button disabled={pageNumber===1}>Prev</Button>
      {
        [...Array(totalPages)].map((_,index)=>(
          <Button key={index+1} disabled={pageNumber===index+1} onClick={()=>setpageNumber(index+1)} >{index+1}</Button>
        ))
      }
      <Button disabled={pageNumber===totalPages}>Next</Button>

    </div>
  )
  };
  
  export default Pagination;
  