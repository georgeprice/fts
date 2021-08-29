import { useEffect, useRef } from "react";

const Entry = ({
  word,
  matches,
  on: { update, deleted, selected, key },
  focus,
  state,
}) => {
  const textInput = useRef(null);

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
        onChange={(event) => update(event.target.value.toUpperCase(), matches)}
        onSelect={selected}
        onClick={selected}
        ref={textInput}
        placeholder={"Enter word"}
        value={word}
        disabled={state === "impossible"}
        onKeyDown={key}
      />
      <input
        type="number"
        min="0"
        className="matches"
        value={matches}
        onChange={(event) => update(word, parseInt(event.target.value))}
        disabled={state === "impossible"}
      />
      <button type="button" className="delete" onClick={deleted}>
        X
      </button>
    </div>
  );
};

export default Entry;
