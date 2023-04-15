import styled from 'styled-components';

interface ButtonProps {
  handleClick?: () => void;
  content: string;
  type?: 'button' | 'submit';
}

interface StyleProps {
  fontSize?: number;
  fontColor?: string[];
  fontWeight?: number;
  bgColor?: string[];
}

function DefaultButton({
  handleClick,
  content,
  type,
  ...rest
}: ButtonProps & StyleProps) {
  return (
    <DefaultButtonAtom type={type} onClick={handleClick} {...rest}>
      {content}
    </DefaultButtonAtom>
  );
}

DefaultButton.defaultProps = {
  type: 'button',
  fontSize: 1.6,
  fontColor: ['white', 'white'],
  fontWeight: 500,
  bgColor: ['#f07055', '#ffa07a'],
};

export default DefaultButton;

const DefaultButtonAtom = styled.button<StyleProps>`
  cursor: pointer;
  color: ${({ fontColor }) => fontColor};
  font-size: ${({ fontSize }) => fontSize}rem;
  font-weight: ${({ fontWeight }) => fontWeight};
  background-color: ${({ bgColor }) => bgColor && `${bgColor[0]}`};
  &:hover {
    background-color: ${({ bgColor }) => bgColor && `${bgColor[1]}`};
  }
`;
