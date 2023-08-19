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
        <ObjectivesDisplay />
      </div>
    );
  }
}

function PointBox(props) {
  const text = props.text;
  const points = props.points;
  return (
    <div className="pointBox">
      <input type="checkbox" />
      <p>the text is: {text}</p>
      <p>the points are: {points}</p>
    </div>
  );
}

function ObjectivesDisplay() {
  const objectives = pointsData.objectives;
  return (
    <div>
      <ul>
        {objectives.map((i) => {
          return (
            <li>
              <PointBox text={i.text} points={i.points} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
