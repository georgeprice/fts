const Entry = ({
  word,
  matches,
  onDelete,
  onWordChange,
  onMatchesChange,
  possible,
}) => {
  let state =
    possible === undefined
      ? "answered"
      : possible === true
      ? "possible"
      : "impossible";
  return (
    <div className={"entry " + state}>
      <input
        type="text"
        className="word"
        onChange={({ target: { value } }) => onWordChange(value.toUpperCase())}
        value={word}
        disabled={state === "impossible"}
      />
      <input
        type="number"
        min="0"
        className="matches"
        value={matches}
        onChange={({ target: { value } }) => onMatchesChange(value)}
        disabled={state === "impossible"}
      />
      <button type="button" className="delete" onClick={onDelete}>
        X
      </button>
    </div>
  );
};

export default Entry;
