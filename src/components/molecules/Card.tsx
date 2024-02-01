import React, { FC, useState } from 'react';
import styled from 'styled-components';

import { Image } from '../atoms/Image';
import { H3 } from '../atoms/Headers';

import { Product } from '../../types/api/products';

const Container = styled.div``;

const Button = styled.button`
  // Remove Default Button Values
  background-color: transparent;
  border: none;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 200px;
  width: 90%;
  height: 300px;
  padding: 10px;
  margin: 10px;
  border-radius: 15px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.4);

  transition: all 0.25s ease-in-out;

  &:hover {
    transform: scale(1.04, 1.02);
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.4);
  }
`;

const Section = styled.div<{ center?: boolean }>`
  display: flex;
  flex-direction: column;
  text-align: left;
  ${({ center }) =>
    center && `align-items: center; text-align: center; width: 100%;`}
`;

const Span = styled.span``;

export const Card: FC<Product> = ({
  name,
  type,
  price,
  image,
  storeName,
  brandName,
}) => {
  const [showAdditionalInfo, setShowAdditionalInfo] = useState<boolean>(false);

  const toggleClick = () => setShowAdditionalInfo(!showAdditionalInfo);

  return (
    <Container>
      <Button onClick={toggleClick}>
        <H3>{name}</H3>
        {image ? (
          <Image
            style={{ alignSelf: 'center', marginBottom: '10px' }}
            width={150}
            height={150}
            src={image}
            alt={name || `Image of ${name}`}
          />
        ) : (
          <Section center>
            <Span>No Image</Span>
          </Section>
        )}
        <Section>
          <Span>{type}</Span>
          <Span>{storeName}</Span>
        </Section>
        <Section>
          {showAdditionalInfo ? (
            <>
              {brandName && <Span>Brand: {brandName}</Span>}
              {price && <Span>Price: {price}</Span>}
            </>
          ) : (
            <Span>Click to see more information</Span>
          )}
        </Section>
      </Button>
    </Container>
  );
};
