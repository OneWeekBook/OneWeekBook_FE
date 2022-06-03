import styled from 'styled-components';
import {
  ImgBtnOptionTypes,
  ImgBtnStyleTypes,
  ImgBtnImageTypes,
} from 'types/components';

function ImageButton({
  component,
  className,
  type,
  onClick,
  pc,
  mobile,
  bgColor,
  margin,
  marginM,
  src,
  alt,
}: React.PropsWithChildren<
  ImgBtnOptionTypes & ImgBtnStyleTypes & ImgBtnImageTypes
>) {
  return (
    <Button
      type={type}
      as={component}
      className={className}
      pc={pc}
      mobile={mobile}
      bgColor={bgColor}
      margin={margin}
      marginM={marginM}
      onClick={onClick}
    >
      <img src={src} alt={alt} width={25} height={25} />
    </Button>
  );
}

ImageButton.defaultProps = {
  component: 'button',
  color: 'black',
  bgColor: 'white',
  margin: [0, 0, 0, 0],
  marginM: [0, 0, 0, 0],
};

export default ImageButton;

const Button = styled.button<{
  pc: number[];
  mobile: number[];
  bgColor?: string;
  margin: number[];
  marginM: number[];
}>`
  width: ${({ pc }) => pc[0]}px;
  hegiht: ${({ pc }) => pc[1]}px;
  border: none;
  background-color: ${({ bgColor }) => bgColor};
  margin: ${({ margin }) =>
    margin && `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`}
  border: none;
  border-radius: 5px;
`;
