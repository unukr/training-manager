import React, { createContext, useState, useContext, useEffect } from "react";
import Header from "./Header";
import Interaction from "./Interaction";
import Display from "./Display";
import "./TrainingManager.css";

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

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

  const [width] = useWindowSize();

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
      {width <= 768 && (
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
      )}
      {width > 768 && <div className="inappropriate-size">Please make your screen smaller!</div>}
    </ManageTimeContext.Provider>
  );
};

export default ManageTime;
