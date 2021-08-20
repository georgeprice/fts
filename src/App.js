import ReactDOM from "react-dom";
import Entry from "./Entry";
import { useState } from "react";
import Solve from "./Solve";

const App = () => {
  const [words, setWords] = useState(["", "", "", ""]);
  const [matches, setMatches] = useState([-1, -1, -1, -1]);

  let deleteEntry = (index) => {
    let cloned = [...words];
    cloned.splice(index, 1);
    setWords(cloned);
  };

  let updateWord = (index, word) => {
    let cloned = [...words];
    cloned[index] = word;
    setWords(cloned);
  };

  let updateMatches = (index, matches) => {
    let cloned = [...matches];
    cloned[index] = matches;
    setMatches(cloned);
  };

  let equalLength = words
    .map((word) => word.length)
    .every((length, i, arr) => length === arr[0] && length > 0);

  let solutions = {};
  if (equalLength) {
    let state = words.map((_, i) => {
      return { word: words[i], matches: matches[i] };
    });
    solutions = Solve(state);
    console.table(solutions);
  }

  return (
    <section>
      <h1>Enter Words:</h1>
      {words.map((word, i) => (
        <Entry
          key={i}
          word={word}
          matches={matches[i]}
          onDelete={() => deleteEntry(i)}
          onWordChange={(word) => updateWord(i, word)}
          onMatchesChange={(count) => updateMatches(i, count)}
          possible={solutions[word]}
        />
      ))}
      <div className="entry">
        <button
          type="button"
          className="add"
          onClick={() => {
            setWords(words.concat(""));
            setMatches(matches.concat(-1));
          }}
        >
          Add
        </button>
      </div>
    </section>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
