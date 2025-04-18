import { useMemo } from 'react';

export default function usePagination(data, currentPage, pageSize) {
  return useMemo(() => {
    const totalPages = Math.ceil(data.length / pageSize);
    const start = (currentPage - 1) * pageSize;
    const pagedData = data.slice(start, start + pageSize);
    return { pagedData, totalPages };
  }, [data, currentPage, pageSize]);
}