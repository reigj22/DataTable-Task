import React from 'react';

const Pagination = ({ currentPage, totalPages, onNext, onPrev }) => {
  return (
    <div style={{ marginTop: "1rem" }}>
      <button onClick={onPrev} disabled={currentPage === 1}>
        Previous
      </button>
      <span style={{ margin: "0 1rem" }}>
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={onNext} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
