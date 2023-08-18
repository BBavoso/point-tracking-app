import React from "react";
import "./App.css";

function PointBox() {
  return (
    <div className="pointBox">
      <div className="pointBox-checkBox"></div>
      <h1>points: </h1>
    </div>
  );
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <h1>
          hello! <br />
          pretty cool
        </h1>
        <PointBox points={2} />
      </div>
    );
  }
}

export default App;
