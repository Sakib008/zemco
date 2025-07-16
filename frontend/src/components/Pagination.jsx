import { useTheme } from "@/context/themeContext";
import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  let startPage = currentPage;
  let endPage = Math.min(currentPage + 2, totalPages);
  const {theme} = useTheme()
  
  if (endPage - startPage < 2 && startPage > 1) {
    startPage = Math.max(1, endPage - 2);
  }
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={`flex justify-center items-center ${theme==="dark"? "bg-black text-white" : 'bg-white'} gap-2 py-5 w-full  z-10 border-t`}>
      <button
        className="px-3 py-1 rounded border disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {pageNumbers.map((num) => (
        <button
          key={num}
          className={`px-3 py-1 rounded border ${num === currentPage ? "bg-blue-500 text-white" : "bg-white text-blue-500"}`}
          onClick={() => onPageChange(num)}
          disabled={num === currentPage}
        >
          {num}
        </button>
      ))}
      <button
        className="px-3 py-1 rounded border disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
