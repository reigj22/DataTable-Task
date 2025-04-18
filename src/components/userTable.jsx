import React from "react";

const DataTable = ({ data, onSort, sortKey, sortOrder }) => {
    const renderSortIcon = (key) => {
      if (key !== sortKey) return "⇅";
      return sortOrder === "asc" ? "↑" : "↓";
    };
  
    return (
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th onClick={() => onSort("name")}>
              User Name {renderSortIcon("name")}
            </th>
            <th onClick={() => onSort("email")}>
              Email {renderSortIcon("email")}
            </th>
            <th onClick={() => onSort("phone")}>
              Phone {renderSortIcon("phone")}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };


export default DataTable;
  