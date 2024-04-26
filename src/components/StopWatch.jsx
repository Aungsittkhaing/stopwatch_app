import React, { useEffect, useRef, useState } from "react";

const StopWatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [expireTime, setExpireTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setExpireTime(Date.now() - startTimeRef.current);
      }, 10);
    }
    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [isRunning]);

  let start = () => {
    setIsRunning(true);
    startTimeRef.current = Date.now() - expireTime;
    console.log(startTimeRef.current);
  };
  let stop = () => {
    setIsRunning(false);
  };
  let reset = () => {
    setExpireTime(0);
    setIsRunning(false);
  };
  let formatTime = () => {
    let hours = Math.floor(expireTime / (1000 * 60 * 60));
    let minutes = Math.floor((expireTime / (1000 * 60)) % 60);
    let seconds = Math.floor((expireTime / 1000) % 60);
    let milliseconds = Math.floor((expireTime % 1000) / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");
    return `${minutes} : ${seconds} : ${milliseconds}`;
  };
  return (
    <div className="flex flex-col items-center border border-gray-600 p-[40px] rounded-lg">
      <div className="display text-4xl text-gray-500 font-mono font-bold shadow-lg">
        {formatTime()}
      </div>
      <div className="controls p-5 cursor-pointer">
        <button
          onClick={start}
          className="py-3 px-2 mx-5 text-white rounded-lg active:ring-2 active:ring-blue-600 bg-blue-400 duration-200"
        >
          Start
        </button>
        <button
          onClick={stop}
          className="py-3 px-2 mx-5 text-white rounded-lg active:ring-2 active:ring-yellow-600 bg-yellow-400 duration-200"
        >
          Stop
        </button>
        <button
          onClick={reset}
          className="py-3 px-2 mx-5 text-white rounded-lg active:ring-2 active:ring-red-600 bg-red-400 duration-200"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default StopWatch;
