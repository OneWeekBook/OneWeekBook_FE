import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface LinkProps {
  link: string;
  replace?: boolean;
}

interface StyleProps {
  fontSize?: number;
  fontColor?: string;
  fontWeight?: number;
}

function DefaultLink({ link, ...rest }: LinkProps & StyleProps) {
  const navigate = useNavigate();

  const onClickLink = () => {
    navigate(`${link}`, { replace: rest.replace });
  };

  return (
    <DefaultLinkAtom {...rest} onClick={onClickLink}>
      Link
    </DefaultLinkAtom>
  );
}

DefaultLink.defaultProps = {
  replace: false,
  fontSize: 1,
  fontColor: 'black',
  fontWeight: 500,
};

export default DefaultLink;

const DefaultLinkAtom = styled.p<StyleProps>`
  color: ${({ fontColor }) => fontColor};
  font-size: ${({ fontSize }) => fontSize}rem;
  font-weight: ${({ fontWeight }) => fontWeight};
`;
