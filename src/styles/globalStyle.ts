import { createGlobalStyle } from 'styled-components';
import { MOBILE_MIN_WIDTH } from './devices';

const globalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
    }

    body {
        width: 100%;
        minWidth: ${MOBILE_MIN_WIDTH}
    }

    html {
        width: 100%;
        minWidth: ${MOBILE_MIN_WIDTH}
    }
`;

export default globalStyles;
