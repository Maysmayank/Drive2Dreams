"use client";
import { Button } from "./ui/button";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  function LoadMore() {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  }
  
  return (
    <div className=" mt-16">
      <Button
        className={`${currentPage === totalPages ? "hidden" : ""}`}
        onClick={LoadMore}
      >
        See More
      </Button>
    </div>
  );
};

export default Pagination;
