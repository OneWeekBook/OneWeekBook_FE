import styled from 'styled-components';
import { DefaultTextTypes, TextStyleTypes } from 'types/atom';

function ReviewText({
  content,
  className,
  ...rest
}: DefaultTextTypes & TextStyleTypes) {
  return (
    <ReviewTextAtom className={className} {...rest}>
      {content}
    </ReviewTextAtom>
  );
}

export default ReviewText;

const ReviewTextAtom = styled.pre<TextStyleTypes>`
  color: ${({ theme }) => theme.color.COLOR_BLACK};
  font-size: 1.6rem;
  font-weight: 300;
  white-space: pre-wrap;
`;
