import React, { FC, PropsWithChildren } from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
from {
    transform: rotate(0deg);
}
to {
    transform: rotate(360deg);
}
`;

const Spinner = styled.div<{ selfalign: boolean }>`
  border-bottom: 3px solid black;
  border-radius: 50%;
  animation: ${rotate} 2s linear infinite;
  width: 60px;
  height: 60px;
  ${({ selfalign }) => selfalign && `align-self: center;`}
`;

interface LoaderProps extends PropsWithChildren {
  isLoading: boolean;
  selfAlign?: boolean;
}

export const Loader: FC<LoaderProps> = ({
  isLoading,
  selfAlign = false,
  children,
}) => {
  return isLoading ? <Spinner selfalign={selfAlign} /> : <>{children}</>;
};
