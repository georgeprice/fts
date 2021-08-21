import ThemeContext from "./Theme";
import { useContext } from "react";

const THEMES = ["f3", "fnv", "blue", "white"];

const Header = () => {
  const [theme, setTheme] = useContext(ThemeContext);
  return (
    <header>
      <h1>Fallout Terminal Solver</h1>
      <select
        className="theme"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        onBlur={(e) => setTheme(e.target.value)}
      >
        {THEMES.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </header>
  );
};

export default Header;
