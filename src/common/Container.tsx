import { HTMLAttributes, PropsWithChildren, Suspense } from 'react';
import styled from 'styled-components';
import { ContainerTypes } from 'types/common';

function Container({
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
      <Suspense>
        <ContentsWrapper>{children}</ContentsWrapper>
      </Suspense>
    </Component>
  );
}

export default Container;

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
  min-width: 350px;
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    width: 95%;
    margin: 0px auto;
  }
`;
