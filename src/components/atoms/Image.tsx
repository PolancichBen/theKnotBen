import React, { FC } from 'react';
import styled from 'styled-components';

export const Image = styled.img<{ width: number; height: number }>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;
