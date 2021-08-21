const Entry = ({ index, word, matches, onChange, state }) => {
  const onWordChange = (event) => {
    onChange({ index, word: event.target.value.toUpperCase(), matches });
  };

  const onMatchesChange = (event) => {
    onChange({ index, word, matches: parseInt(event.target.value) });
  };

  const onDelete = () => {
    onChange({ index, deleted: true });
  };

  return (
    <div className={"entry " + state}>
      <input
        type="text"
        className="word"
        onChange={onWordChange}
        placeholder={"Enter word"}
        value={word}
        disabled={state === "impossible"}
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
