import { PropsWithChildren } from 'react';
import styled from 'styled-components';

function SignForm({ children }: PropsWithChildren) {
  return <SignFormBody>{children}</SignFormBody>;
}

export default SignForm;

const SignFormBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  background-color: transperant;
  border-radius: 5px;
  border: solid 1px ${({ theme }) => theme.color.COLOR_MAIN};
  width: 375px;
  margin: 0 auto;
  padding: 0px 50px;
  height: 500px;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    width: 355px;
  }
`;
