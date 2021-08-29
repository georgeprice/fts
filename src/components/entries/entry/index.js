import { useEffect, useRef } from "react";

export class EntryController {
  constructor(index, entries, setEntries, focus, setFocus, onAdd) {
    this.update = {
      word: (word) => {
        {
          if (index !== focus) {
            return;
          }
          let cloned = [...entries];
          cloned[index].word = word;
          setEntries(cloned);
        }
      },
      matches: (matches) => {
        {
          let cloned = [...entries];
          cloned[index].matches = matches;
          setEntries(cloned);
        }
      },
    };
    this.deleted = () => {
      let cloned = [...entries];
      cloned.splice(index, 1);
      setFocus(index - 1);
      setEntries(cloned);
    };
    this.selected = () => {
      if (index < entries.length) {
        setFocus(index);
      }
    };
    this.key = (key) => {
      switch (key) {
        case "Enter":
          if (index === entries.length - 1) {
            onAdd();
          } else {
            setFocus(index + 1);
          }
          break;
        case "Backspace":
          if (entries[index].word.length === 0) {
            this.deleted();
          }
          break;
        case "ArrowUp":
          if (focus === 0) {
            setFocus(entries.length - 1);
          } else {
            setFocus(index - 1);
          }
          break;
        case "ArrowDown":
          if (focus === entries.length - 1) {
            setFocus(0);
          } else {
            setFocus(index + 1);
          }
          break;
      }
    };
  }
}

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
