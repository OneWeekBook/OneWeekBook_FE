import { PropsWithChildren } from 'react';
import styled from 'styled-components';

function SignForm({ children }: PropsWithChildren) {
  return (
    <SignFormContainer>
      <SignFormBody>{children}</SignFormBody>
    </SignFormContainer>
  );
}

export default SignForm;

const SignFormContainer = styled.div`
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

const SignFormBody = styled.div`
  box-sizing: border-box;
  text-align: center;
  button {
    margin-top: 10px;
  }
`;
