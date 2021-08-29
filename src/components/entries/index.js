import Solve from "../../util";
import { useEffect, useState } from "react";
import Entry from "./entry";
import Controls from "./controls";
import Tutorial from "./tutorial";

/**
 * decode unpacks the url search parameters from a raw string and converts them into an array of {word, matches} ready to be made into entries
 * @param {string} raw the string url-encoded query parameters
 * @returns array of {word, matches} objects
 */
const decode = (raw) => {
  const params = new URLSearchParams(raw);
  let initial = [];
  for (const [word, matches] of params.entries()) {
    initial = initial.concat({
      word: word.toUpperCase(),
      matches: parseInt(matches) || -1,
    });
  }
  return initial;
};

/**
 * encode converts the array of {word, matches} objects into url-encoded queries
 * @param {[{word, matches}]} entries is the array of entry objects
 * @returns url-encoded query strings
 */
const encode = (entries) => {
  let encoded = [];
  for (const [, { word, matches }] of entries.entries()) {
    encoded = encoded.concat(`${word}=${matches}`);
  }
  return `?${encoded.join("&")}`;
};

/**
 * Entries maintains the state of words and matches that have been entered by the user, it will ensure the URL matches what has been entered and render the entries to the user
 */
const Entries = () => {
  const [entries, setEntries] = useState([]);
  const [solutions, setSolutions] = useState({});
  const [focus, setFocus] = useState(-1);

  // initial load to decode the URL into entries
  useEffect(() => {
    setEntries(decode(window.location.search));
  }, []);

  // whenever the entries change, encode them and push them onto the window history
  useEffect(() => {
    window.history.pushState("", "", encode(entries));
    let equalLength = entries
      .map(({ word }) => word.length)
      .every((length, _, arr) => length === arr[0] && length > 0);
    setSolutions(equalLength ? Solve(entries) : {});
  }, [entries]);

  const onAdd = () => {
    setEntries(entries.concat({ word: "", matches: -1 }));
    setFocus(entries.length);
  };
  const onClear = () => setEntries([]);
  const onReset = () =>
    setEntries(entries.map(({ word }) => ({ word, matches: -1 })));

  class EntryController {
    constructor(index) {
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
        console.log("key: ", key);
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
              setFocus(focus - 1);
            }
            break;
          case "ArrowDown":
            if (focus === entries.length - 1) {
              setFocus(0);
            } else {
              setFocus(focus + 1);
            }
            break;
        }
      };
    }
  }

  return (
    <section>
      <Tutorial entries={entries} solutions={solutions} />
      <div className="entries">
        {entries.map(({ word, matches }, i) => {
          let controller = new EntryController(i);
          let state = solutions
            ? solutions.possibles
              ? solutions.possibles[word]
              : "possible"
            : "possible";
          let model = {
            word,
            matches,
            focus: i === focus,
            state,
          };
          return (
            <Entry key={i} index={i} model={model} controller={controller} />
          );
        })}
      </div>
      <Controls onAdd={onAdd} onClear={onClear} onReset={onReset} />
    </section>
  );
};

export default Entries;
