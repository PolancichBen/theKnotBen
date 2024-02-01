import React, { FC } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
`;

const Button = styled.button<{ selected?: boolean }>`
  background-color: ${({ selected }) =>
    selected ? 'light-gray' : 'transparent'};
  border: 1px solid black;
  cursor: pointer;
  margin: 0 2px;

  border-radius: 5px;

  transition: all 0.25s ease-in-out;
  &:hover {
    transform: scale(1.04, 1.02);
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.4);
  }
`;

interface PaginationProps {
  numberOfPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = ({
  numberOfPages,
  currentPage,
  setCurrentPage,
}) => {
  return (
    <Container data-cy="pagination-section">
      <Button
        data-cy="pagination-prev"
        disabled={currentPage === 0}
        onClick={
          currentPage !== 0 ? () => setCurrentPage(currentPage - 1) : () => {}
        }
      >
        Previous
      </Button>
      {Array.from({ length: numberOfPages }, (v, i) => i).map((index) => (
        <Button
          data-cy={`pagination-${index + 1}`}
          key={`${index}-pagination`}
          selected={currentPage === index}
          onClick={() => setCurrentPage(index)}
        >
          {index + 1}
        </Button>
      ))}
      <Button
        data-cy="pagination-next"
        disabled={currentPage + 1 >= numberOfPages}
        onClick={
          currentPage + 1 < numberOfPages
            ? () => setCurrentPage(currentPage + 1)
            : () => {}
        }
      >
        Next
      </Button>
    </Container>
  );
};
