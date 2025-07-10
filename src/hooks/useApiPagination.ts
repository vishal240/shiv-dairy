import { useState, useEffect, useCallback } from 'react';

interface UseApiPaginationProps {
  apiCall: (page: number, limit: number) => Promise<any>;
  itemsPerPage?: number;
  initialPage?: number;
  dependencies?: any[];
}

interface UseApiPaginationReturn {
  data: any[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  loading: boolean;
  error: string | null;
  goToPage: (page: number) => void;
  refresh: () => void;
}

export const useApiPagination = ({
  apiCall,
  itemsPerPage = 10,
  initialPage = 1,
  dependencies = []
}: UseApiPaginationProps): UseApiPaginationReturn => {
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (page: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiCall(page, itemsPerPage);
      
      // Assuming API response structure like:
      // { data: { list: [], total: number, page: number, limit: number } }
      // Adjust this based on your actual API response structure
      const responseData = response.data || response;
      
      setData(responseData.list || responseData.data || []);
      setTotalItems(responseData.total || responseData.totalItems || 0);
      setTotalPages(Math.ceil((responseData.total || responseData.totalItems || 0) / itemsPerPage));
      setCurrentPage(page);
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching data');
      console.error('API Pagination Error:', err);
    } finally {
      setLoading(false);
    }
  }, [apiCall, itemsPerPage]);

  const goToPage = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage && !loading) {
      fetchData(page);
    }
  }, [fetchData, totalPages, currentPage, loading]);

  const refresh = useCallback(() => {
    fetchData(currentPage);
  }, [fetchData, currentPage]);

  // Initial load and dependency changes
  useEffect(() => {
    fetchData(initialPage);
  }, [fetchData, initialPage, ...dependencies]);

  return {
    data,
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    loading,
    error,
    goToPage,
    refresh
  };
};