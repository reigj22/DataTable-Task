import React, { useState } from "react";
import useFilter from "../hooks/filterData";
import useSort from "../hooks/sortData";
import usePagination from "../hooks/dataPagination";
import "./UsersTable.css";

export default function DataTable({ columns, data, pageSize = 5 }) {
  const [filterText, setFilterText] = useState("");
  const [sortConfig, setSortConfig] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState(null);

  const filteredData = useFilter(data, columns, filterText);
  const sortedData = useSort(filteredData, sortConfig);
  const { pagedData, totalPages } = usePagination(
    sortedData,
    currentPage,
    pageSize
  );

  function handleSort(key) {
    setCurrentPage(1);
    setSortConfig((prev) =>
      prev?.key === key
        ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" }
    );
  }

  return (
    <div className="datatable-container">
      <input
        type="text"
        placeholder="Search..."
        value={filterText}
        onChange={(e) => {
          setFilterText(e.target.value);
          setCurrentPage(1);
        }}
        className="datatable-filter"
      />

      <table className="datatable-table">
        <thead>
          <tr>
            {columns.map((col) => {
              const isSorted = sortConfig?.key === col.key;
              const arrow = isSorted
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : "⇅";

              return (
                <th
                  key={col.key}
                  onClick={() => col.sortable !== false && handleSort(col.key)}
                  className={`sortable-header ${isSorted ? "sorted" : ""}`}
                >
                  {col.label} <span className="sort-arrow">{arrow}</span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {pagedData.map((row) => (
            <React.Fragment key={row.id}>
              <tr>
                {columns.map((col) => (
                  <td key={col.key}>
                    {col.key === "name" ? (
                      <span
                        className="expand-toggle"
                        onClick={() =>
                          setExpandedRow(expandedRow === row.id ? null : row.id)
                        }
                      >
                        {expandedRow === row.id ? "▼ " : "▶ "}
                        {row[col.key]}
                      </span>
                    ) : (
                      row[col.key]
                    )}
                  </td>
                ))}
              </tr>
              {expandedRow === row.id && (
                <tr className="expanded-row">
                  <td colSpan={columns.length}>
                    <div>
                      <strong>Address:</strong> {row.address.street},{" "}
                      {row.address.city}
                    </div>
                    <div>
                      <strong>Company:</strong> {row.company.name} -{" "}
                      {row.company.catchPhrase}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          ← Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
