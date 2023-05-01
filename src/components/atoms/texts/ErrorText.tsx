import styled from 'styled-components';
import { ErrorTypes } from 'types/atom';

function ErrorText({ error, align }: ErrorTypes) {
  return <ErrorTextAtom align={align}>{error}</ErrorTextAtom>;
}

export default ErrorText;

const ErrorTextAtom = styled.p<{ align?: string }>`
  font-size: 12px;
  color: ${({ theme }) => theme.color.COLOR_RED};
  text-align: ${({ align }) => align};
`;
