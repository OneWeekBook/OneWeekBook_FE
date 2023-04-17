import styled from 'styled-components';
import theme from 'styles/theme';

interface LabelProps {
  content: string | number;
  subContent?: string | number;
  className?: string;
}

interface StyleProps {
  fontSize?: number;
  fontColor?: string;
  fontWeight?: number;
  padding?: number;
  align?: string;
  reactive?: boolean;
}

function DefaultText({
  content,
  subContent,
  className,
  ...rest
}: LabelProps & StyleProps) {
  return (
    <DefaultTextAtom className={className} {...rest}>
      {content}
      {subContent && (
        <>
          <br />
          {subContent}
        </>
      )}
    </DefaultTextAtom>
  );
}

DefaultText.defaultProps = {
  fontSize: 1.6,
  fontColor: theme.color.COLOR_BLACK,
  fontWeight: 500,
  align: 'left',
  reactive: false,
};

export default DefaultText;

const DefaultTextAtom = styled.p<StyleProps>`
  padding: ${({ padding }) => padding}px;
  color: ${({ fontColor }) => fontColor};
  font-weight: ${({ fontWeight }) => fontWeight};
  font-size: ${({ fontSize }) => fontSize}rem;
  text-align: ${({ align }) => align};
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    font-size: ${({ fontSize, reactive }) =>
      reactive && fontSize && fontSize - 0.2}rem;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    font-size: ${({ fontSize, reactive }) =>
      reactive && fontSize && fontSize - 0.4}rem;
  }
`;
