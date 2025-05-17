import { Link } from 'react-router-dom';

const linkStyle = {
  textDecoration: 'none',
  color: 'white',
};

const LinkWithoutDecoration = ({ redirectUrl, text, style }) => {
  return (
    <Link to={redirectUrl} style={{ ...linkStyle, ...style }}>
      {text}
    </Link>
  );
};

export default LinkWithoutDecoration;
