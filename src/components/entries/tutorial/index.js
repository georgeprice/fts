const Tutorial = ({ entries, solutions: { total } }) => {
  let equalLength = entries
    .map(({ word }) => word.length)
    .every((length, i, arr) => length === arr[0] && length > 0);

  let tutorial = null;
  if (entries.length == 0) {
    tutorial = "Enter words";
  } else if (equalLength) {
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

  if (tutorial === null) {
    return tutorial;
  }
  return <p>{tutorial}</p>;
};

export default Tutorial;
