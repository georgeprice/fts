import { useEffect, useRef } from "react";

const Entry = ({
  model: { word, matches, focus, state },
  controller: { update, deleted, selected, key },
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
        onChange={(event) => update.word(event.target.value.toUpperCase())}
        onSelect={selected}
        onClick={selected}
        ref={textInput}
        placeholder={"Enter word"}
        value={word}
        disabled={state === "impossible"}
        onKeyDown={(event) => key(event.key)}
      />
      <input
        type="number"
        min="0"
        className="matches"
        value={matches}
        onChange={(event) => update.matches(parseInt(event.target.value))}
        disabled={state === "impossible"}
      />
      <button type="button" className="delete" onClick={deleted}>
        X
      </button>
    </div>
  );
};

export default Entry;
