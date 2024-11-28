'use client'
import { useEffect, useState } from "react";
import { Button } from "./ui/button";


const Pagination = ({ currentPage, totalPages,onPageChange }) => {

  function LoadMore(){
    if(currentPage<totalPages){
      onPageChange(currentPage+1)

    }
  }
  return (
    <div className=" mt-16">

          <Button disabled={totalPages==currentPage} onClick={LoadMore} >See More</Button>
         
    </div>
  )
};

export default Pagination;
