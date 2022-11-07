import { CommonProps } from "../type";
import usePage from './usePage';
import { composeClasses } from 'utils/composeClasses';
import styled from './pagination.module.scss';

export type PaginationProps = CommonProps & {
  page: number;
  total: number;
  showFirstButton?: boolean;
  showLastButton?: boolean;
  rowsPerPage?: number;
  pageSize?: number;
  onChange: (page: number) => void;
}

export default function Pagination (props: PaginationProps) {
  const { page: currentPage, onChange } = props;
  const pages = usePage(props);

  const handleClick = (selectedPage: number, disabled: boolean) => {
    if (disabled || currentPage === selectedPage) return;
    onChange(selectedPage);
  };

  return (
    <ul className={styled.pages}>
      {pages.map(({ type, page, disabled }, index) => (
        <li
          key={index}
          className={composeClasses(
            styled[type],
            disabled ? styled.disabled : '',
            page === currentPage ? styled.current : ''
          )}
          onClick={() => handleClick(page, disabled)}
        >
          {page}
        </li>
      ))}
    </ul>
  )
}