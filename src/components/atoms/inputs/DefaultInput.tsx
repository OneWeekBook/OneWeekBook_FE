import styled from 'styled-components';
import { DefaultInputTypes, InputStyleTypes } from 'types/atom';

function DefaultInput({
  value,
  handleChange,
  placeholder,
  ...rest
}: DefaultInputTypes & InputStyleTypes) {
  return (
    <DefaultInputAtom
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      autoComplete="off"
      {...rest}
    />
  );
}

DefaultInput.defaultProps = {
  fontSize: 1.6,
};

export default DefaultInput;

const DefaultInputAtom = styled.input<InputStyleTypes>`
  width: 100%;
  height: 35px;
  box-sizing: border-box;
  border-radius: 5px;
  border: 2px solid ${({ theme }) => theme.color.COLOR_GRAY};
  color: ${({ fontColor }) => fontColor};
  font-size: ${({ fontSize }) => fontSize}rem;
  font-weight: ${({ fontWeight }) => fontWeight};
  padding: 2px 5px;
  :focus {
    outline: none;
    border: 2px solid ${({ theme }) => theme.color.COLOR_CORAL};
    transition: 0.5s;
  }
`;
