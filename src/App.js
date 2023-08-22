import React from "react";
import "./App.scss";
import pointsData from "./points.json";
import { useState } from "react";

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
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
        <input
          type="checkbox"
          checked={props.isChecked}
          onChange={props.onChange}
        />
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
  const [checkedState, setCheckedState] = useState(
    new Array(objectives.length).fill(false)
  );

  const handleOnChenge = (position) => {
    const updatedCheckedState = checkedState.map((item, index) => {
      return index === position ? !item : item;
    });

    setCheckedState(updatedCheckedState);
  };

  const findTotal = () => {
    return objectives.reduce((acc, cur, index) => {
      if (checkedState[index]) {
        return acc + Number(cur.points);
      }
      return acc;
    }, 0);
  };

  return (
    <div>
      <ul className="objectivesDisplay">
        {objectives.map((i, index) => {
          return (
            <li>
              <PointBox
                text={i.text}
                points={i.points}
                isChecked={checkedState[index]}
                onChange={() => handleOnChenge(index)}
              />
            </li>
          );
        })}
      </ul>
      <PointTotal total={findTotal()} />
    </div>
  );
}

function PointTotal(props) {
  return <p>The total points is: {props.total}</p>;
}

export default App;
