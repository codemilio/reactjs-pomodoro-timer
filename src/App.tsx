import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { Button } from "./components/Button";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button />
    </ThemeProvider>
  )
}

