import { PropsWithChildren } from 'react';
import styled from 'styled-components';

function OnboardForm({ children }: PropsWithChildren) {
  return <Wrapper>{children}</Wrapper>;
}

export default OnboardForm;

const Wrapper = styled.div`
  box-sizing: border-box;
  background-color: white;
  border: solid 1px ${({ theme }) => theme.color.COLOR_MAIN};
  width: 375px;
  margin: auto;
  padding: 50px 50px;
  height: 500px;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    width: 355px;
  }
`;
