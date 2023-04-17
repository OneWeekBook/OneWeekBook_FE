import styled from 'styled-components';

interface InputProps {
  value: string;
  handleBlur: () => void;
}

function ReviewInput({ value, handleBlur }: InputProps) {
  return (
    <ReviewInputAtom
      placeholder="리뷰를 작성해주세요."
      defaultValue={value}
      onBlur={handleBlur}
    />
  );
}

export default ReviewInput;

const ReviewInputAtom = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  min-height: 150px;
  padding: 10px 5px;
  border: none;
  font-size: 16px;
  font-weight: 700;
  outline: none;
  resize: vertical;
  &:focus {
    border: 2px solid ${({ theme }) => theme.color.COLOR_CORAL};
    border-radius: 5px;
  }
`;
