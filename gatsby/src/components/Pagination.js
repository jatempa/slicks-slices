import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const PaginationStyles = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-items: center;
  border: 1px solid var(--grey);
  margin: 2rem 0;
  border-radius: 5px;
  & > * {
    padding: 1rem;
    flex: 1;
    border-right: 1px solid var(--grey);
    text-decoration: none;
    &[aria-current], .current {
      color: var(--red);
    }
    &[disabled] {
      pointer-events: none;
      color: var(--grey);
    }
  }
  @media (max-width: 800px) {
    .word {
      display: none;
    }
    font-size: 1.4rem;
  }
`;

export default function Pagination({
  pageSize,
  totalCount,
  currentPage,
  skip,
  base
}) {
  const totalPages = Math.ceil(totalCount / pageSize);
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const hasPrevPage = prevPage >= 1;
  const hasNextPage = nextPage <= totalPages;
  const arr = Array.from({ length: totalPages });

  return (
    <PaginationStyles>
      <Link title="Prev Page" disabled={!hasPrevPage} to={`${base}/${prevPage}`}>
        <span className="word">Prev</span>
      </Link>
      {arr.map((_, i) => (
        <Link className={currentPage === i && i === 0 ? 'current' : ''} to={`${base}/${i > 0 ? i + 1 : ''}`} key={`page${i}`}>{ i + 1 }</Link>
      ))}
      <Link title="Next Page" disabled={!hasNextPage} to={`${base}/${nextPage}`}>
        <span className="word">Next</span>
      </Link>
    </PaginationStyles>
  );
}