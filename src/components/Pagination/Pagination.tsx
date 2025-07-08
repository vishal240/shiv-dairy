import React from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  showInfo?: boolean;
  maxVisiblePages?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  showInfo = true,
  maxVisiblePages = 5
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getVisiblePages = () => {
    const pages: number[] = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);
    
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);
    
    // Adjust if we're near the beginning or end
    if (endPage - startPage + 1 < maxVisiblePages) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      } else {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="table_footer mt-3">
      {showInfo && (
        <p className="row_counts">
          Showing {startItem}-{endItem} from {totalItems}
        </p>
      )}
      <div className="pagination">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          style={{ 
            opacity: currentPage === 1 ? 0.5 : 1,
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
          }}
        >
          <ChevronLeft />
        </button>
        
        <ul>
          {/* Show first page if not in visible range */}
          {visiblePages[0] > 1 && (
            <>
              <li onClick={() => handlePageClick(1)}>1</li>
              {visiblePages[0] > 2 && <li className="ellipsis">...</li>}
            </>
          )}
          
          {/* Show visible pages */}
          {visiblePages.map((page) => (
            <li
              key={page}
              className={currentPage === page ? 'active' : ''}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </li>
          ))}
          
          {/* Show last page if not in visible range */}
          {visiblePages[visiblePages.length - 1] < totalPages && (
            <>
              {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                <li className="ellipsis">...</li>
              )}
              <li onClick={() => handlePageClick(totalPages)}>{totalPages}</li>
            </>
          )}
        </ul>
        
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          style={{ 
            opacity: currentPage === totalPages ? 0.5 : 1,
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
          }}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;