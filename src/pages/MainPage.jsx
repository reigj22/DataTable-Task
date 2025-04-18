import React, { useState, useEffect } from 'react';
import DataTable from '../components/UsersTable';
import { testUsers } from '../data/FakeData'; 

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(setUsers)
      .catch(console.error);
  }, []);

  const columns = [
    { key: 'name',  label: 'Name',  sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'phone', label: 'Phone', sortable: true },
    { key: 'website', label: 'Website', sortable: true },
    
  ];

  return (
    <div>
      <DataTable
        columns={columns}
        data={users.length ? users : testUsers}
        pageSize={5}
      />
    </div>
  );
}