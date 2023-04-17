import { Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from 'styles/theme';
import { DefaultLinkTypes, LinkStyleTypes } from 'types/atom';

function DefaultLink({
  to,
  content,
  handleClick,
  ...rest
}: React.PropsWithChildren<DefaultLinkTypes & LinkStyleTypes>) {
  return (
    <DefaultLinkAtom
      to={to}
      replace={rest.replace}
      onClick={handleClick}
      {...rest}
    >
      {content}
    </DefaultLinkAtom>
  );
}

DefaultLink.defaultProps = {
  replace: false,
  fontSize: 1.6,
  color: theme.color.COLOR_CORAL,
  fontWeight: 300,
};

export default DefaultLink;

const DefaultLinkAtom = styled(Link)<LinkStyleTypes>`
  color: ${({ color }) => color};
  font-size: ${({ fontSize }) => fontSize}rem;
  font-weight: ${({ fontWeight }) => fontWeight};
`;
