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
    <tr className="pointbox">
      <td className="pointbox-checkbox pointbox-item">
        <CheckBox handleClick={props.handleClick} isChecked={props.isChecked} />
      </td>
      <td className="pointbox-text pointbox-item">
        <p>{text}</p>
      </td>
      <td className="pointbox-points pointbox-item">
        <p>{points}</p>
      </td>
    </tr>
  );
}

function CheckBox(props) {
  const checked = props.isChecked;
  const [isHovered, setHovered] = useState(false);

  const onMouseEnter = () => {
    setHovered(true);
  };

  const onMouseLeave = () => {
    setHovered(false);
  };

  const getBackgroundColor = () => {
    if (checked) {
      if (isHovered) {
        return "rgba(0, 206, 65, 1)";
      }
      return "rgba(0, 206, 65, .75)";
    } else {
      if (isHovered) {
        return "rgba(109, 234, 255, 1)";
      }
      return "rgba(109, 234, 255, .75)";
    }
  };

  return (
    <div
      className="checkbox-filled"
      onClick={props.handleClick}
      style={{ backgroundColor: getBackgroundColor() }}
      onChange={props.onChange}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    ></div>
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
    <div id="tableDiv">
      <table className="objectivesDisplay">
        <tr>
          <th>Finished</th>
          <th>Objective</th>
          <th>Points</th>
        </tr>
        {objectives.map((i, index) => {
          return (
            <PointBox
              text={i.text}
              points={i.points}
              isChecked={checkedState[index]}
              handleClick={() => handleOnChenge(index)}
            />
          );
        })}
        <tr>
          <td />
          <td id="totalPointsText">
            <p>total points:</p>
          </td>
          <td>
            <p id="pointsTotal">{findTotal()}</p>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default App;
