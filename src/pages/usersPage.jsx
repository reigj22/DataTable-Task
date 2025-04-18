import React, { useState } from "react";
import { useUsers } from "../hooks/getUsers";
import DataTable from "../components/userTable";
import Pagination from "../components/Pagination";
import SearchBar from "../components/searchBar";

const UsersPage = () => {
  // Hook to fetch users
  const { users } = useUsers();

  // State for search query, sorting key, sorting order, and current page
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);

  // The number of items to display per page
  const itemsPerPage = 5;

  // Filter users based on the search query
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(query.toLowerCase())
  );

  // Sort users based on the selected key and order
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const valA = a[sortKey].toLowerCase?.() || "";
    const valB = b[sortKey].toLowerCase?.() || "";

    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Calculate the total number of pages based on the filtered and sorted users
  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);

  // Paginate the sorted users based on the current page
  const paginatedUsers = sortedUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handlers for sorting and pagination
  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div style={{ padding: "1rem" }} className="container">
      <SearchBar query={query} setQuery={setQuery} />
      <DataTable
        data={paginatedUsers}
        onSort={handleSort}
        sortKey={sortKey}
        sortOrder={sortOrder}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
};

export default UsersPage;
