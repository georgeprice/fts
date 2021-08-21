/**
 * Graph describes a set of interconnected nodes, with distances between them
 */
class Graph {
  /**
   * Constructor
   *
   * @param {[{word, matches}]} nodes the array of all nodes held in the graph
   * @param {function} weight the function for determining distance between two nodes
   */
  constructor(nodes, weight) {
    // initialising state fields
    [this.adj_matrix, this.matches, this.nodes] = [{}, {}, []];

    // append each param node to the graph's nodes field, and calculate adjacency matrix
    for (let i = 0; i < nodes.length; i++) {
      let [from, matches] = [nodes[i].word, nodes[i].matches];
      this.matches = Object.assign(this.matches, { [from]: matches });
      this.nodes = this.nodes.concat(from);
      let nested = {};
      for (let j = 0; j < nodes.length; j++) {
        if (i !== j) {
          let to = nodes[j].word;
          nested = Object.assign(nested, { [to]: weight(from, to) });
        }
      }
      this.adj_matrix = Object.assign(this.adj_matrix, {
        [from]: nested,
      });
    }
  }

  /**
   * valid confirms that a node could be a possible solution
   * @param {string} from the node to check is a valid solution
   * @returns bool for if this node could be a valid solution
   */
  valid(from) {
    // this node needs to have the same number of matching characters to each neighbour as those have to the actual solution
    for (let i = 0; i < this.nodes.length; i++) {
      // avoid comparing node to itself
      let to = this.nodes[i];
      if (from === to) {
        continue;
      }

      // if we don't know how much the neighbour matches the solution, then we can't check it
      let matches = this.matches[to];
      if (matches < 0) {
        continue;
      }

      // compare the number of matching characters between {from, to} against {to, solution}
      let different = this.adj_matrix[from][to];
      let same = from.length - different;
      let possible = same == matches;
      if (!possible) {
        return false;
      }
    }
    return true;
  }
}

/**
 * Solve returns a mapping of all nodes to if they are possible solutions
 * @param {[{word, matches}]} words is an array of all strings and their number of matching characters to the unknown correct password
 * @returns a mapping of a string to tristate {word: "selected" | "possible" | "impossible"}
 */
const Solve = (words) => {
  // avoid processing if we only have one node
  if (words.length < 2) {
    return [{}, 1];
  }

  let [graph, possibles, total] = [new Graph(words, Difference), {}, 0];
  for (const start of graph.nodes) {
    // assume the node has already been chosen
    possibles = Object.assign(possibles, { [start]: "selected" });

    // if matches are negative, then it hasn't been chosen yet so we need to check it
    if (graph.matches[start] < 0) {
      // check if this node is a possible solution, update running total and map
      let possible = graph.valid(start);
      total += possible ? 1 : 0;
      possibles = Object.assign(possibles, {
        [start]: possible ? "possible" : "impossible",
      });
    }
  }
  return [possibles, total];
};

export const Difference = (a, b) => {
  let total = 0;
  for (let i = 0; i < a.length; i++) {
    if (i >= b.length) {
      return total;
    }
    total += a[i] !== b[i] ? 1 : 0;
  }
  return total;
};

export default Solve;
