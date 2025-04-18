import { useMemo } from 'react';

export default function useFilter(data, columns, filterText) {
  return useMemo(() => {
    if (!filterText) return data;
    const lower = filterText.toLowerCase();
    return data.filter(row =>
      columns.some(col => String(row[col.key]).toLowerCase().includes(lower))
    );
  }, [data, columns, filterText]);
}