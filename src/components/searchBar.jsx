import React from 'react';

const SearchBar = ({ query, setQuery }) => {
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search by name"
      />
    </div>
  );
};

export default SearchBar;
