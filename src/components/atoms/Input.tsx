import React from 'react';
import styled from 'styled-components';

export const Input = styled.input<{ error?: boolean }>`
  ${({ error }) => (error ? 'border: 1px solid red' : 'border: none')};
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.2);
  padding: 8px;
  border-radius: 6px;
`;
