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
  width?: number | string;
  height?: number;
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
  width: 120,
  height: 40,
};

export default DefaultButton;

const DefaultButtonAtom = styled.button<StyleProps>`
  cursor: pointer;
  color: ${({ fontColor }) => fontColor && fontColor[0]};
  font-size: ${({ fontSize }) => fontSize}rem;
  font-weight: ${({ fontWeight }) => fontWeight};
  width: ${({ width }) => (width === 'auto' ? '100%' : `${width}px`)};
  height: ${({ height }) => height}px;
  border: none;
  border-radius: 5px;
  background-color: ${({ bgColor }) => bgColor && `${bgColor[0]}`};
  &:hover {
    color: ${({ fontColor }) => fontColor && fontColor[1]};
    background-color: ${({ bgColor }) => bgColor && `${bgColor[1]}`};
  }
`;
