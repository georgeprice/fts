import { useEffect, useRef } from "react";

const Entry = ({
  index,
  word,
  matches,
  on: { change, done, selected },
  focus,
  state,
}) => {
  const textInput = useRef(null);

  const onWordChange = (event) => {
    change({ index, word: event.target.value.toUpperCase(), matches });
  };

  const onMatchesChange = (event) => {
    change({ index, word, matches: parseInt(event.target.value) });
  };

  const onDelete = () => {
    change({ index, deleted: true });
  };

  const keyListener = (key) => {
    console.log(key);
    switch (key) {
      case "Enter":
        done();
        break;
      case "Backspace":
        if (word.length === 0) {
          onDelete();
        }
        break;
    }
  };

  useEffect(() => {
    if (focus) {
      textInput.current.focus();
    }
  }, [focus]);

  return (
    <div className={"entry " + state}>
      <input
        type="text"
        className="word"
        onChange={onWordChange}
        onSelect={selected}
        onClick={selected}
        ref={textInput}
        placeholder={"Enter word"}
        value={word}
        disabled={state === "impossible"}
        onKeyDown={({ key }) => keyListener(key)}
      />
      <input
        type="number"
        min="0"
        className="matches"
        value={matches}
        onChange={onMatchesChange}
        disabled={state === "impossible"}
      />
      <button type="button" className="delete" onClick={onDelete}>
        X
      </button>
    </div>
  );
};

export default Entry;
