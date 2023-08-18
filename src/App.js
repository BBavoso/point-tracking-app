import React from "react";
import "./App.css";
import pointsData from "./points.json";

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    console.log(pointsData);
    return (
      <div className="App">
        <h1>
          hello! <br />
          pretty cool
        </h1>
        <PointBox points={2} />
        {/* <Test /> */}
      </div>
    );
  }
}

function PointBox(props) {
  return (
    <div className="pointBox">
      <div className="pointBox-checkBox">
        <input type="checkbox" />
      </div>
      <h1>points: {props.points}</h1>
    </div>
  );
}

function Test() {
  return (
    <div>
      test object <br />
      {JSON.parse(pointsData)}
    </div>
  );
}

export default App;
