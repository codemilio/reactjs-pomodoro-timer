import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #333;
    color: #FFF;
  }

  button {
    border: 0;
    color: #FFF;
  }
`