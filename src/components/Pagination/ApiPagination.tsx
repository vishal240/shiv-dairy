import React from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';

interface ApiPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
  showInfo?: boolean;
  maxVisiblePages?: number;
}

const ApiPagination: React.FC<ApiPaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  loading = false,
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
    if (currentPage > 1 && !loading) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages && !loading) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    if (page !== currentPage && !loading) {
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
          {loading ? 'Loading...' : `Showing ${startItem}-${endItem} from ${totalItems}`}
        </p>
      )}
      <div className="pagination">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1 || loading}
          style={{ 
            opacity: (currentPage === 1 || loading) ? 0.5 : 1,
            cursor: (currentPage === 1 || loading) ? 'not-allowed' : 'pointer'
          }}
        >
          <ChevronLeft />
        </button>
        
        <ul>
          {/* Show first page if not in visible range */}
          {visiblePages[0] > 1 && (
            <>
              <li 
                onClick={() => handlePageClick(1)}
                style={{ 
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.5 : 1
                }}
              >
                1
              </li>
              {visiblePages[0] > 2 && <li className="ellipsis">...</li>}
            </>
          )}
          
          {/* Show visible pages */}
          {visiblePages.map((page) => (
            <li
              key={page}
              className={currentPage === page ? 'active' : ''}
              onClick={() => handlePageClick(page)}
              style={{ 
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.5 : 1
              }}
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
              <li 
                onClick={() => handlePageClick(totalPages)}
                style={{ 
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.5 : 1
                }}
              >
                {totalPages}
              </li>
            </>
          )}
        </ul>
        
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages || loading}
          style={{ 
            opacity: (currentPage === totalPages || loading) ? 0.5 : 1,
            cursor: (currentPage === totalPages || loading) ? 'not-allowed' : 'pointer'
          }}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default ApiPagination;