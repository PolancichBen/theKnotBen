import React, { FC } from 'react';
import styled from 'styled-components';

interface HRProps {
  width?: string;
  color?: string;
}

const Line = styled.hr<HRProps>`
  width: ${({ width }) => (width ? width : '100%')};
  border-bottom: 1px solid ${({ color }) => (color ? color : 'black')};
`;

const HorizontalLine: FC<HRProps> = ({ width, color }) => {
  return <Line width={width} color={color} />;
};

export default HorizontalLine;
