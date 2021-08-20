import ReactDOM from "react-dom";

const App = () => {
  return (
    <main>
      <section>
        <h1>Enter Words:</h1>
        <div className="entry">
          <input type="text" className="word" />
          <input type="number" min="0" className="matches" />
          <button type="button" className="delete">
            Remove
          </button>
        </div>
        <div className="entry">
          <input type="text" className="word" />
          <input type="number" min="0" className="matches" />
          <button type="button" className="delete">
            Remove
          </button>
        </div>
        <div className="entry">
          <input type="text" className="word" />
          <input type="number" min="0" className="matches" />
          <button type="button" className="delete">
            Remove
          </button>
        </div>
        <div className="entry">
          <button type="button" className="add">
            Add
          </button>
        </div>
      </section>
      <aside>
        <h1>Tutorial</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sapien
          risus, posuere in velit vel, accumsan laoreet odio. Vivamus vel
          vulputate leo. Integer elit purus, iaculis et libero vitae,
          pellentesque venenatis tellus. Ut nibh sapien, blandit in ultricies
          non, dignissim vitae orci. Donec sagittis rutrum nisi. Vivamus maximus
          ante in eleifend congue. Vivamus a suscipit augue. Pellentesque arcu
          justo, porta a venenatis sit amet, sodales id massa. Nulla ut ex ac
          urna efficitur tristique. Curabitur iaculis sem nibh, at malesuada
          libero commodo non. Aliquam interdum sit amet risus et faucibus. Sed
          eget eleifend urna, id scelerisque lacus. Mauris congue et est vitae
          tempus. Suspendisse vel arcu eleifend, elementum nisl tristique,
          euismod turpis. Maecenas erat sem, aliquam dignissim mollis sit amet,
          dignissim id nulla. Maecenas lobortis facilisis nulla, in pharetra
          diam feugiat a. Sed mattis convallis lacus et pellentesque. Maecenas a
          mi congue, vestibulum nunc at, finibus augue. Nunc justo ex, sagittis
          non felis iaculis, ullamcorper ultricies mi. Maecenas lobortis a risus
          in dictum. Nunc feugiat mi eget felis tincidunt, nec molestie metus
          pellentesque. Duis tincidunt velit id nibh iaculis eleifend. In
          euismod sed risus et pharetra. Suspendisse id rutrum tortor. Donec
          vitae viverra nisi.
        </p>
      </aside>
    </main>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
