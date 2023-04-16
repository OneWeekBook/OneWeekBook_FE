import styled from 'styled-components';

interface ErrorProps {
  error: string;
  align?: string;
}

function ErrorText({ error, align }: ErrorProps) {
  return <ErrorTextAtom align={align}>{error}</ErrorTextAtom>;
}

export default ErrorText;

const ErrorTextAtom = styled.p<{ align?: string }>`
  font-size: 12px;
  color: red;
  text-align: ${({ align }) => align};
`;
