import { useState } from "react";

const Entry = ({ word, onDelete, onChange }) => {
  return (
    <div className="entry">
      <input
        type="text"
        className="word"
        onChange={({ target: { value } }) => onChange(value)}
        value={word}
      />
      <input type="number" min="0" className="matches" />
      <button type="button" className="delete" onClick={onDelete}>
        X
      </button>
    </div>
  );
};

export default Entry;
