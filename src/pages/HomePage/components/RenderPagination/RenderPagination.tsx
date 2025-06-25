const renderPagination = () => {

  const pages = [];
  const totalPages = Math.ceil(allPages / limit); // 👈 total pages

  const maxVisible = 5;
  const halfVisible = Math.floor(maxVisible / 2);

  let start = Math.max(currentPage - halfVisible, 1);
  let end = Math.min(start + maxVisible - 1, totalPages);

  if (end - start < maxVisible - 1) {
    start = Math.max(end - maxVisible + 1, 1);
  }

  // Prev button
  pages.push(
    <button
      key="prev"
      disabled={currentPage === 1}
      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
      className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md border border-gray-200 disabled:opacity-50"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-3 w-3 sm:h-4 sm:w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  );

  // First page + ...
  if (start > 1) {
    pages.push(
      <button
        key={1}
        onClick={() => setCurrentPage(1)}
        className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md ${
          currentPage === 1 ? "bg-green-600 text-white" : "border border-gray-200"
        }`}
      >
        1
      </button>
    );
    if (start > 2) {
      pages.push(
        <span key="start-ellipsis" className="px-2 text-gray-400">
          ...
        </span>
      );
    }
  }

  // Middle pages
  for (let i = start; i <= end; i++) {
    if (i === 1 || i === totalPages) continue; // уже отрисованы отдельно
    pages.push(
      <button
        key={i}
        onClick={() => setCurrentPage(i)}
        className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md ${
          i === currentPage ? "bg-green-600 text-white" : "border border-gray-200"
        }`}
      >
        {i}
      </button>
    );
  }

  // ... + Last page
  if (end < totalPages) {
    if (end < totalPages - 1) {
      pages.push(
        <span key="end-ellipsis" className="px-2 text-gray-400">
          ...
        </span>
      );
    }
    pages.push(
      <button
        key={totalPages}
        onClick={() => setCurrentPage(totalPages)}
        className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md ${
          currentPage === totalPages ? "bg-green-600 text-white" : "border border-gray-200"
        }`}
      >
        {totalPages}
      </button>
    );
  }

  // Next button
  pages.push(
    <button
      key="next"
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
      className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md border border-gray-200 disabled:opacity-50"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-3 w-3 sm:h-4 sm:w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );

  return <div className="flex items-center justify-center sm:justify-end space-x-1">{pages}</div>;
};
