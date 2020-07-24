import { useState } from 'react';

const PAGINATE_LIMIT = 20;

function usePagination(totalDataCount, limit = PAGINATE_LIMIT) {

  const [page, setPage] = useState(1);
  const fetchMoreData = () => {
    if(!totalDataCount) return;
    if (page * limit < totalDataCount) {
      setPage(page + 1);
    }
  };

  return { page, fetchMoreData };
}

export default usePagination;
