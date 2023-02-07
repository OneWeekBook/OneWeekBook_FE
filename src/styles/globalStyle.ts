import { createGlobalStyle } from 'styled-components';
import { MOBILE_MIN_WIDTH } from './devices';

const globalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
    }

    html, body {
        width: 100%;
        height: 100%;
        minWidth: ${MOBILE_MIN_WIDTH}
    }
    
    textarea {
        font-family: 'Spoqa Han Sans', 'sans-serif';
        resize : none:
    }

    a {
        font-family: 'Spoqa Han Sans', 'sans-serif';
        text-decoration: none;
        color: inherit;
    }

    p {
        letter-spacing: -0.5px;
    }

    button {
        font-family: 'Spoqa Han Sans', 'sans-serif';
    }
`;

export default globalStyles;
