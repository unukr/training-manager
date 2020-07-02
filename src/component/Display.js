import React from "react";
import "./Display.css";
import classNames from "classnames";
import { useManageTimeContext } from "./ManageTime";

const Display = () => {
  const { exerciseName, setNum, repNum, modeName, modeSetNum, modeRepNum, duration, items } = useManageTimeContext();
  return (
    <div className="display">
      <div className="display__title">
        <div className="title__element">Exercise name</div>
        <div className="title__element">Set</div>
        <div className="title__element">Reps</div>
        <div className="title__element">Duration of time</div>
      </div>
      <div className="display__border"></div>
      <div className="display__main">
        <div className="main__row">
          <div className={classNames("row__element element-1", { "mode-on": modeName })}>{exerciseName}</div>
          <div className={classNames("row__element element-2", { "mode-on": modeSetNum })}>{setNum}</div>
          <div className={classNames("row__element element-3", { "mode-on": modeRepNum })}>{repNum}</div>
          <div className={classNames("row__element element-4")}>{duration}</div>
        </div>
        {[...items].reverse().map((item, idx) => {
          return (
            <div className="main__row" key={idx}>
              <div className="row__element element-1 element-saved">{item.name}</div>
              <div className="row__element element-2 element-saved">{item.set}</div>
              <div className="row__element element-3 element-saved">{item.reps}</div>
              <div className="row__element element-4 element-saved">{item.duration}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Display;
