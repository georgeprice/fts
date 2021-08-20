import ReactDOM from "react-dom";
import Entry from "./Entry";
import { useState } from "react";

const App = () => {
  const [words, setWords] = useState(["", "", "", "", "", ""]);

  let deleteWord = (index) => {
    let cloned = [...words];
    cloned.splice(index, 1);
    setWords(cloned);
  };

  let updateWord = (index, word) => {
    let cloned = [...words];
    cloned[index] = word;
    setWords(cloned);
  };

  return (
    <section>
      <h1>Enter Words:</h1>
      {words.map((word, i) => (
        <Entry
          key={i}
          word={word}
          onDelete={() => deleteWord(i)}
          onChange={(word) => updateWord(i, word)}
        />
      ))}
      <div className="entry">
        <button
          type="button"
          className="add"
          onClick={() => setWords(words.concat(""))}
        >
          Add
        </button>
      </div>
    </section>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
