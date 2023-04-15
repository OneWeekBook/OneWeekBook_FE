import styled from 'styled-components';

interface InputProps {
  value: string;
  handleChange: () => void;
  placeholder: string;
}

interface StyleProps {
  fontSize?: number;
  fontColor?: string;
  fontWeight?: number;
}

function DefaultInput({
  value,
  handleChange,
  placeholder,
  ...rest
}: InputProps & StyleProps) {
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

const DefaultInputAtom = styled.input<StyleProps>`
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  border-radius: 5px;
  border: 2px solid #070707;
  color: ${({ fontColor }) => fontColor};
  font-size: ${({ fontSize }) => fontSize}rem;
  font-weight: ${({ fontWeight }) => fontWeight};
  padding: 5px 10px;
  :focus {
    outline: none;
    border: 2px solid #f07055;
    transition: 0.5s;
  }
`;
