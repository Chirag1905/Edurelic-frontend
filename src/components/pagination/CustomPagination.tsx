// import { ArrowRightIcon } from "@/icons";

// type PaginationProps = {
//   currentPage: number;
//   totalPages: number;
//   onPageChange: (page: number) => void;
// };

// page, totalPages, handleChange, totalElements, rowsPerPage, handleChangeRowsPerPage
// const Pagination: React.FC<PaginationProps> = ({
//   currentPage,
//   totalPages,
//   onPageChange,
// }) => {
//   const pagesAroundCurrent = Array.from(
//     { length: Math.min(3, totalPages) },
//     (_, i) => i + Math.max(currentPage - 1, 1)
//   );

//   return (
//     <div className="px-6 py-4 border-t border-gray-200 dark:border-white/[0.05]">
//       <div className="flex items-center justify-between">
//         <button
//           onClick={() => onPageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//           className="inline-flex items-center justify-center font-medium gap-2 rounded-lg transition  px-4 py-3 text-sm bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300"
//         >
//           <span className="mr-2 rotate-180"><ArrowRightIcon /></span>
//           <span className="hidden sm:inline">Previous</span>
//         </button>
//         <div className="flex items-center gap-2">
//           {currentPage > 3 && <span className="px-2">...</span>}
//           {pagesAroundCurrent.map((page) => (
//             <button
//               key={page}
//               onClick={() => onPageChange(page)}
//               className={`px-4 py-2 rounded ${currentPage === page
//                 ? "bg-brand-500 text-white"
//                 : "text-gray-700 dark:text-gray-400"
//                 } flex h-10 w-10 items-center justify-center rounded-lg text-theme-sm font-medium bg-brand-500 text-white`}
//             >
//               {page}
//             </button>
//           ))}
//           {currentPage < totalPages - 2 && <span className="px-2">...</span>}
//         </div>
//         <button
//           onClick={() => onPageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className="ml-2.5 flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs text-sm hover:bg-gray-50 h-10 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
//         >
//           <span className="hidden sm:inline">Next</span>
//           <span className="ml-2"><ArrowRightIcon /></span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Pagination;


import { ArrowRightIcon } from "@/icons";
import React, { useState } from "react";

type CustomPaginationProps = {
  page: number; // current page (1-based index)
  totalPages: number; // total number of pages
  totalElements: number; // total number of records
  rowsPerPage: number; // records per page
  handleChange: (page: number) => void; // when user changes page
  handleChangeRowsPerPage: (rows: number) => void; // when user changes rows per page
};

const CustomPagination: React.FC<CustomPaginationProps> = ({
  page,
  totalPages,
  totalElements,
  rowsPerPage,
  handleChange,
  handleChangeRowsPerPage,
}) => {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const rowsOptions = [10, 25, 50, 100];

  // Generate page numbers dynamically
  const getPageNumbers = () => {
    const pages: number[] = [];
    const delta = 1; // how many pages to show around the current page

    // Always include the first page
    pages.push(1);

    // Calculate range around current page
    for (let i = page - delta; i <= page + delta; i++) {
      if (i > 1 && i < totalPages) {
        pages.push(i);
      }
    }

    // Always include the last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return [...new Set(pages)].sort((a, b) => a - b); // remove duplicates and sort
  };

  const pageNumbers = getPageNumbers();

  // Calculate current item range
  const startItem = totalElements === 0 ? 0 : (page - 1) * rowsPerPage + 1;
  const endItem = Math.min(page * rowsPerPage, totalElements);

  return (
    <div className="px-6 py-4 border-t border-gray-200 dark:border-white/[0.05]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div className="flex items-center gap-4">
          {/* Rows per page selector */}
          {/* Custom Rows per Page Dropdown */}
          {totalElements > 10 && <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between gap-2 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-400 w-20"
            >
              {rowsPerPage}
              <span className="text-gray-500">▼</span>
            </button>

            {isDropdownOpen && (
              <div className="absolute mt-2 w-24 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
                <ul className="max-h-40 overflow-auto">
                  {rowsOptions.map((size) => (
                    <li
                      key={size}
                      onClick={() => {
                        handleChangeRowsPerPage(size);
                        setIsDropdownOpen(false);
                      }}
                      className={`px-4 py-2 cursor-pointer text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${rowsPerPage === size
                        ? "bg-gray-100 dark:bg-gray-700 font-medium"
                        : ""
                        }`}
                    >
                      {size}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>}

          {/* Total Elements Info */}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing <span className="font-medium">{startItem}</span> -{" "}
            <span className="font-medium">{endItem}</span> of{" "}
            <span className="font-medium">{totalElements}</span>
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center gap-3">
          {/* Previous Button */}
          <button
            onClick={() => handleChange(page - 1)}
            disabled={page === 1}
            className="inline-flex items-center justify-center font-medium gap-2 rounded-lg transition px-2 py-2 text-sm bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300 disabled:opacity-50"
          >
            <span className="rotate-180">
              <ArrowRightIcon />
            </span>
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-2">
            {pageNumbers.map((pg, index) => {
              const prevPage = pageNumbers[index - 1];
              const isCurrent = pg === page;

              // Add dots if there's a gap between numbers
              if (prevPage && pg - prevPage > 1) {
                return (
                  <React.Fragment key={`dots-${index}`}>
                    <span className="px-2">...</span>
                    <button
                      onClick={() => handleChange(pg)}
                      className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition
                                ${isCurrent
                          ? "bg-brand-500 text-white"
                          : "text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                    >
                      {pg}
                    </button>
                  </React.Fragment>
                );
              }

              // Regular page button
              return (
                <button
                  key={pg}
                  onClick={() => handleChange(pg)}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition
                            ${isCurrent
                      ? "bg-brand-500 text-white"
                      : "text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                >
                  {pg}
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          <button
            onClick={() => handleChange(page + 1)}
            disabled={page === totalPages}
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
          >
            <span>
              <ArrowRightIcon />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomPagination;
