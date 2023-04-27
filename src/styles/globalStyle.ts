import { createGlobalStyle } from 'styled-components';
import { MOBILE_MIN_WIDTH } from './devices';

const globalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        font-size: 10px;
        &.toast-message {
            font-size: 1.6rem;
        }
    }

    html, body {
        width: 100%;
        height: 100%;
        minWidth: ${MOBILE_MIN_WIDTH}
    }

    body {
        margin: 0;
        font-family: 'Noto Sans Korean', 'sans-serif';
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    
    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
    }

    pre {
        font-family: 'Noto Sans Korean', 'sans-serif';
    }
    
    textarea {
        font-family: 'Noto Sans Korean', 'sans-serif';
        resize : none:
    }

    a {
        font-family: 'Noto Sans Korean', 'sans-serif';
        text-decoration: none;
        color: black;
    }

    p {
        letter-spacing: -0.5px;
    }

    button {
        font-family: 'Noto Sans Korean', 'sans-serif';
    }
`;

export default globalStyles;
