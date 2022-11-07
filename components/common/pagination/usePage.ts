import { PaginationProps } from './Pagination';

type PageType = 'first' | 'prev' | 'page' | 'next' | 'last';

interface Page {
  type: PageType;
  page: number;
  disabled: boolean;
}

const usePage = ({ 
  page, 
  total, 
  pageSize = 10, 
  rowsPerPage = 10, 
  showFirstButton = false, 
  showLastButton = false
}: PaginationProps): Page[] => {
  const list: Page[] = [];
  const lastPage = Math.ceil(total / rowsPerPage);
  const firstPage = Math.floor((page - 1) / pageSize) * pageSize + 1;
  let endPage = firstPage + pageSize - 1;
  endPage = endPage > lastPage ? lastPage : endPage;

  if (showFirstButton) {
    list.push({ type: 'first', page: 1, disabled: page === 1 });
  }

  list.push({ type: 'prev', page: page - 1, disabled: page === 1 });

  for (let i = firstPage; i <= endPage; i += 1) {
    list.push({ type: 'page', page: i, disabled: false });
  }

  list.push({ type: 'next', page: page + 1, disabled: page === lastPage });

  if (showLastButton) {
    list.push({ type: 'last', page: lastPage, disabled: page === lastPage });
  }

  return list;
}

export default usePage;