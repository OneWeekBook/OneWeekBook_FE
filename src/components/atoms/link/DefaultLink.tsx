import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface LinkProps {
  to: string;
  content: string;
  replace?: boolean;
  handleClick?: () => void;
}

interface StyleProps {
  fontSize?: number;
  color?: string;
  fontWeight?: number;
}

function DefaultLink({
  to,
  content,
  handleClick,
  ...rest
}: React.PropsWithChildren<LinkProps & StyleProps>) {
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
  color: '#f07055',
  fontWeight: 300,
};

export default DefaultLink;

const DefaultLinkAtom = styled(Link)<StyleProps>`
  color: ${({ color }) => color};
  font-size: ${({ fontSize }) => fontSize}rem;
  font-weight: ${({ fontWeight }) => fontWeight};
`;
