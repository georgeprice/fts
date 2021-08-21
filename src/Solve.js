import Graph from "./Graph";
import { Difference } from "./Utils";

const Solve = (words) => {
  if (words.length < 2) {
    return [{}, 1];
  }

  let graph = new Graph(words, Difference);
  let possibles = {};
  let total = 0;
  for (const start of graph.nodes) {
    possibles = Object.assign(possibles, { [start]: "selected" });
    if (graph.matches[start] < 0) {
      let possible = graph.walk(start);
      total += possible ? 1 : 0;
      possibles = Object.assign(possibles, {
        [start]: possible ? "possible" : "impossible",
      });
    }
  }
  return [possibles, total];
};

export default Solve;
