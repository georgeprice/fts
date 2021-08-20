import Graph from "./Graph";
import { Difference } from "./Utils";

const Solve = (words) => {
  console.log("solve", words);
  if (words.length < 2) {
    return;
  }

  let graph = new Graph(words, Difference);
  console.log(graph);
  let possibles = {};
  for (const start of graph.nodes) {
    if (graph.matches[start] < 0) {
      let possible = graph.walk(start);
      possibles = Object.assign(possibles, { [start]: possible });
    }
  }
  return possibles;
};

export default Solve;
