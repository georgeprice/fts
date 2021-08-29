const Controls = ({ onAdd, onClear, onReset }) => {
  return (
    <div className="entry controls">
      <button type="button" className="add" onClick={onAdd}>
        Add
      </button>
      <button type="button" className="add" onClick={onClear}>
        Clear
      </button>
      <button type="button" className="add" onClick={onReset}>
        Reset
      </button>
    </div>
  );
};

export default Controls;
