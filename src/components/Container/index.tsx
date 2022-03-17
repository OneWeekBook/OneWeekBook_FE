import React, { ElementType, HTMLAttributes, PropsWithChildren } from 'react';
import styled from 'styled-components';

type ContainerTypes = {
  pc?: boolean;
  mobile?: boolean;
  as?: ElementType;
};

function Index({
  pc,
  mobile,
  as,
  className = '',
  children,
  ...rest
}: PropsWithChildren<ContainerTypes> & HTMLAttributes<HTMLDivElement>) {
  return (
    <Component
      as={as}
      className={
        pc ? `${className} pc` : mobile ? `${className} mobile` : className
      }
      {...rest}
    >
      <ContentsWrapper>{children}</ContentsWrapper>
    </Component>
  );
}

export default Index;

const Component = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;

  &.mobile {
    display: none;
  }

  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    &.pc {
      display: none;
    }
    &.mobile {
      display: block;
    }
  }
`;

const ContentsWrapper = styled.section`
  max-width: 1000px;
  width: 100%;
  min-width: 375px;
`;
