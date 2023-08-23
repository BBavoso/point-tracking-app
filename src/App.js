import React from "react";
// import "bootstrap/dist/css/bootstrap.css";
import "./App.scss";
// import pointsData from "./points.json";
import { useState } from "react";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <ObjectivesDisplay />
      </div>
    );
  }
}

function ObjectivesDisplay() {
  const getSentParams = () => {
    const params = new URLSearchParams(window.location.search);
    console.log(params);
    if (params.size === 0) {
      return [];
    }
    const base64 = params.get("objectives");
    const startingObjectives = JSON.parse(atob(base64));
    return startingObjectives["objectives"];
  };

  const [objectives, setObjectives] = useState(getSentParams());
  const [checkedState, setCheckedState] = useState(
    new Array(objectives.length).fill(false)
  );

  const handleOnChenge = (position) => {
    const updatedCheckedState = checkedState.map((item, index) => {
      return index === position ? !item : item;
    });

    setCheckedState(updatedCheckedState);
  };

  const getURLParams = () => {
    const jsonString = JSON.stringify({ objectives });
    const base64 = btoa(jsonString);
    return base64;
  };

  const findTotal = () => {
    return objectives.reduce((acc, cur, index) => {
      if (checkedState[index]) {
        return acc + Number(cur.points);
      }
      return acc;
    }, 0);
  };

  const addObjective = (text, points) => {
    setObjectives([...objectives, { text, points }]);

    const updatedCheckedState = [...checkedState, false];
    setCheckedState(updatedCheckedState);
  };

  return (
    <div id="tableDiv">
      <table className="objectivesDisplay">
        <thead>
          <tr>
            <th id="objective-header" className="col-8">
              Objective
            </th>
            <th id="points-header" className="col-4">
              Points
            </th>
          </tr>
        </thead>
        <tbody>
          {objectives.map((i, index) => {
            return (
              <CheckableRow
                text={i.text}
                points={i.points}
                isChecked={checkedState[index]}
                handleClick={() => handleOnChenge(index)}
                key={index}
              />
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td id="totalPointsText">
              <p>total points:</p>
            </td>
            <td>
              <p id="pointsTotal">{findTotal()}</p>
            </td>
          </tr>
        </tfoot>
      </table>
      <AddRowForm addObjectiveFunction={addObjective} />
      <Share getURLParams={getURLParams} getSentParams={getSentParams} />
    </div>
  );
}

function CheckableRow(props) {
  const checked = props.isChecked;
  const text = props.text;
  const points = props.points;

  const getBackgroundColor = () => {
    return checked ? "checked" : "unchecked";
  };

  const className = "checkbox-filled " + getBackgroundColor();

  return (
    <tr
      className={className}
      onClick={props.handleClick}
      // style={{ backgroundColor: getBackgroundColor() }}
      onChange={props.onChange}
    >
      <td className="pointbox-text pointbox-item">
        <p>{text}</p>
      </td>
      <td className="pointbox-points pointbox-item">
        <p>{points}</p>
      </td>
    </tr>
  );
}

function AddRowForm(props) {
  const [objectiveText, setObjectiveText] = useState("");
  const [pointsText, setPointsText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addObjectiveFunction(objectiveText, pointsText);
    resetText();
  };

  const resetText = () => {
    setObjectiveText("");
    setPointsText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="new objective"
        value={objectiveText}
        onChange={(e) => setObjectiveText(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="amount of points"
        value={pointsText}
        onChange={(e) => setPointsText(e.target.value)}
        required
      />
      <button>add row</button>
    </form>
  );
}

function Share(props) {
  const [link, setLink] = useState("");
  const [url, setUrl] = useState("");
  const handleClick = () => {
    const params = props.getURLParams();
    setLink(params.toString());
    setUrl("http://bbavoso.github.io/point-tracking-app/?objectives=" + params);
  };

  return (
    <div id="share">
      <button onClick={handleClick} type="button" className="btn btn-primary">
        Share
      </button>
      {link ? (
        <button onClick={() => navigator.clipboard.writeText(url)}>
          Copy to Clipboard
        </button>
      ) : (
        ""
      )}
      {link ? (
        <p>
          Link To This Objective Tracker: <a href={url}>{url}</a>
        </p>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
