import React from 'react';
import styled from 'styled-components';

type PropType = {
  error: string;
  align?: string;
};

function ErrorForm({ error, align }: PropType) {
  return <Error align={align}>{error}</Error>;
}

export default ErrorForm;

const Error = styled.p<{ align?: string }>`
  font-size: 12px;
  padding: 5px;
  color: red;
  text-align: ${({ align }) => align};
`;
