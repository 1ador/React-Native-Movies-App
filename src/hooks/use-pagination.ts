import { useState, useEffect } from "react";
import axios from "axios";

interface UsePaginationProps {
  fetchUrl: string;
}

export const usePagination = ({ fetchUrl }: UsePaginationProps) => {
  const [fetchedData, setFetchedData] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (url: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`${fetchUrl}&page=${page}`);
      const { results, total_pages } = response.data;
      setFetchedData(results);
      setTotalPages(total_pages);
    } catch (err) {
      console.error("API Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(fetchUrl);
  }, [fetchUrl, page]);

  const handleNextPage = () => {
    if (!disableNext) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const getCurrentPageData = () => {
    return fetchedData.slice(0, 10);
  }

  const disableNext = fetchedData.length === 0 || (fetchedData.length < 10 && page >= totalPages);
  const disablePrev = page === 1;

  return {
    fetchedData,
    loading,
    page,
    totalPages,
    handleNextPage,
    handlePreviousPage,
    disableNext,
    disablePrev,
    getCurrentPageData,
  };
};
