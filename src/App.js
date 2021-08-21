import ReactDOM from "react-dom";
import { useState } from "react";
import ThemeContext from "./components/theme";
import Header from "./components/header";
import Entries from "./components/entries";

const App = () => {
  const theme = useState("f3");
  return (
    <ThemeContext.Provider value={theme}>
      <main className={theme[0]}>
        <Header />
        <Entries />
        <footer>By George Price</footer>
      </main>
    </ThemeContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
