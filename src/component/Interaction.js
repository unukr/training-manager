import React, { useRef, useEffect } from "react";
import "./Interaction.css";
import classNames from "classnames";
import { useManageTimeContext } from "./TrainingManager";

const Interaction = () => {
  const {
    exerciseName,
    setExerciseName,
    setNum,
    setSetNum,
    repNum,
    setRepNum,
    modeName,
    setModeName,
    modeSetNum,
    setModeSetNum,
    modeRepNum,
    setModeRepNum,
    duration,
    setDuration,
    items,
    setItems,
  } = useManageTimeContext();
  const EXERCISE_NAME = ["push up", "pull up", "leg raise", "squat"];
  const NUM = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["Delete", "0", "Enter"],
  ];
  const intervalRef = useRef(null);
  const secRef = useRef(-1);

  const handleExerciseName = (name) => {
    setExerciseName(name);
  };

  const handleNum = (arg) => {
    modeSetNum && setNum.length < 2 && setSetNum(setNum + arg);
    modeRepNum && repNum.length < 2 && setRepNum(repNum + arg);
  };

  const handleDelete = () => {
    if (modeSetNum) {
      setSetNum(setNum.slice(0, setNum.length - 1));
    } else if (modeRepNum) {
      setRepNum(repNum.slice(0, repNum.length - 1));
    }
  };
  const handleEnter = () => {
    if (modeName) {
      if (exerciseName !== "") {
        setModeName(false);
        setModeSetNum(true);
      }
    } else if (modeSetNum) {
      if (setNum !== "") {
        setModeSetNum(false);
        setModeRepNum(true);
      }
    } else if (modeRepNum) {
      if (repNum !== "") {
        setModeRepNum(false);
        setModeName(true);
        setItems([...items, { name: exerciseName, set: setNum, reps: repNum, duration: duration }]);
        setExerciseName("");
        setSetNum("");
        setRepNum("");
        secRef.current = -1;
        setDuration(null);
      }
    }
  };

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (modeRepNum) {
      intervalRef.current = setInterval(() => {
        secRef.current += 1;
        setDuration(secRef.current);
      }, 1000);
    }

    return () => clearTimeout(intervalRef.current);
  }, [modeRepNum, setDuration]);

  return (
    <div className="interaction">
      <div className="interaction__exercise">
        {EXERCISE_NAME.map((name, idx) => (
          <div
            className={classNames("exercise__name", { pointer: modeName })}
            onClick={(e) => {
              modeName && handleExerciseName(e.target.innerHTML);
            }}
            key={idx}
          >
            {name}
          </div>
        ))}
      </div>
      <div className="interaction__num-keypad">
        {NUM.map((row, idx) => (
          <div className="num-keypad__row" key={idx}>
            {row.map((num, idx2) => (
              <div
                className={classNames("row__num", { pointer: num === "Enter" || modeSetNum || modeRepNum })}
                onClick={(e) => {
                  if (e.target.innerHTML === "Delete") {
                    handleDelete();
                  } else if (e.target.innerHTML === "Enter") {
                    handleEnter();
                  } else handleNum(e.target.innerHTML);
                }}
                key={idx2}
              >
                {num}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Interaction;
