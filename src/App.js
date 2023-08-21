import React from "react";
import "./App.scss";
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
    <div className="pointbox">
      <div className="pointbox-checkbox pointbox-item">
        <input type="checkbox" />
      </div>
      <div className="pointbox-text pointbox-item">
        <p>the text is: {text}</p>
      </div>
      <div className="pointbox-points pointbox-item">
        <p>the points are: {points}</p>
      </div>
    </div>
  );
}

function ObjectivesDisplay() {
  const objectives = pointsData.objectives;
  return (
    <ul className="objectivesDisplay">
      {objectives.map((i) => {
        return (
          <li>
            <PointBox text={i.text} points={i.points} />
          </li>
        );
      })}
    </ul>
  );
}

export default App;
