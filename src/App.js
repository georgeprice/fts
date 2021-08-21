import ReactDOM from "react-dom";
import Entry from "./Entry";
import { useState } from "react";
import Solve from "./Solve";

const App = () => {
  const [entries, setEntries] = useState([]);

  let equalLength = entries
    .map(({ word }) => word.length)
    .every((length, i, arr) => length === arr[0] && length > 0);

  let tutorial = null;
  let solutions = {};
  if (entries.length == 0) {
    tutorial = "Enter words";
  } else if (equalLength) {
    let total = 0;
    [solutions, total] = Solve(entries);
    if (total == 0) {
      tutorial = `No possible solutions - check your inputs`;
    } else if (total == 1) {
      tutorial = `${total} possible solution`;
    } else {
      tutorial = `${total} possible solutions`;
    }
  } else {
    tutorial = "Words must be same length";
  }

  const onChange = ({ index, word, matches, deleted }) => {
    if (deleted === true) {
      let cloned = [...entries];
      cloned.splice(index, 1);
      setEntries(cloned);
      return;
    }
    let cloned = [...entries];
    cloned[index] = { word, matches };
    setEntries(cloned);
  };

  return (
    <section>
      <h1>Enter Words:</h1>
      {tutorial ? <p>{tutorial}</p> : null}
      {entries.map(({ word, matches }, i) => (
        <Entry
          key={i}
          index={i}
          word={word}
          matches={matches}
          onChange={onChange}
          state={solutions[word]}
        />
      ))}
      <div className="entry">
        <button
          type="button"
          className="add"
          onClick={() => {
            setEntries(entries.concat({ word: "", matches: -1 }));
          }}
        >
          Add
        </button>
      </div>
    </section>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
