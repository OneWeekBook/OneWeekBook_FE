import styled from 'styled-components';

type PropsType = {
  onClick: (idx: number) => void;
};

function SlideButton({ onClick }: PropsType) {
  return (
    <>
      <Button type="button" onClick={() => onClick(-1)} direct="prev">
        <img
          src={`${process.env.PUBLIC_URL}/assets/slide-left-arrow.svg`}
          alt="left-arrow"
          width={20}
          height={20}
        />
      </Button>
      <Button type="button" onClick={() => onClick(1)} direct="next">
        <img
          src={`${process.env.PUBLIC_URL}/assets/slide-right-arrow.svg`}
          alt="right-arrow"
          width={20}
          height={20}
        />
      </Button>
    </>
  );
}

export default SlideButton;

const Button = styled.button<{ direct: string }>`
  box-shadow: 0px 0px 5px #000;
  border-radius: 25px;
  border: none;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: ${({ direct }) => direct === 'prev' && 10}px;
  right: ${({ direct }) => direct === 'next' && 10}px;
  z-index: 1;
  width: 35px;
  height: 35px;
  img {
    margin: auto;
  }
`;
