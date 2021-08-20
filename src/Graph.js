class Graph {
  constructor(nodes, weight) {
    this.adj_matrix = {};
    this.matches = {};
    this.nodes = [];
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

  walk(from) {
    for (let i = 0; i < this.nodes.length; i++) {
      let to = this.nodes[i];
      if (from === to) {
        continue;
      }
      let matches = this.matches[to];
      if (matches < 0) {
        continue;
      }
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

export default Graph;
