import Solve from "./Solve";
import { useEffect, useState } from "react";
import Entry from "./Entry";

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
      matches: parseInt(matches),
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

  // initial load to decode the URL into entries
  useEffect(() => {
    setEntries(decode(window.location.search));
  }, []);

  // whenever the entries change, encode them and push them onto the window history
  useEffect(() => {
    window.history.pushState("", "", encode(entries));
  }, [entries]);

  let equalLength = entries
    .map(({ word }) => word.length)
    .every((length, i, arr) => length === arr[0] && length > 0);

  let [tutorial, solutions] = [null, {}];
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

  // callback passed into Entry objects to return their state changes back up the tree
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

export default Entries;
