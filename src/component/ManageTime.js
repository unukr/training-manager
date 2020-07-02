import React, { createContext, useState, useContext } from "react";
import Header from "./Header";
import Interaction from "./Interaction";
import Display from "./Display";
import "./ManageTime.css";

const ManageTimeContext = createContext({
  exerciseName: "",
  setExerciseName: () => {},
  setNum: "",
  setSetNum: () => {},
  repNum: "",
  setRepNum: () => {},
  modeName: true,
  setModeName: () => {},
  modeSetNum: false,
  setModeSetNum: () => {},
  modeRepNum: false,
  setModeRepNum: () => {},
  duration: null,
  setDuration: () => {},
  items: [],
  setItems: () => {},
});

export const useManageTimeContext = () => useContext(ManageTimeContext);

const ManageTime = () => {
  const [exerciseName, setExerciseName] = useState("");
  const [setNum, setSetNum] = useState("");
  const [repNum, setRepNum] = useState("");
  const [modeName, setModeName] = useState(true);
  const [modeSetNum, setModeSetNum] = useState(false);
  const [modeRepNum, setModeRepNum] = useState(false);
  const [duration, setDuration] = useState(null);
  const [items, setItems] = useState(() => {
    const item = localStorage.getItem("items");
    return item ? JSON.parse(item) : [];
  });

  return (
    <ManageTimeContext.Provider
      value={{
        exerciseName,
        setExerciseName,
        setNum,
        setSetNum,
        repNum,
        setRepNum,
        modeSetNum,
        setModeSetNum,
        modeName,
        setModeName,
        modeRepNum,
        setModeRepNum,
        duration,
        setDuration,
        items,
        setItems,
      }}
    >
      <div className="manage-time">
        <Header />
        <Interaction />
        <Display />
        <div
          className="local-storage-clear-btn"
          onClick={() => {
            localStorage.clear();
            setItems([]);
          }}
        >
          Clear
        </div>
      </div>
    </ManageTimeContext.Provider>
  );
};

export default ManageTime;
