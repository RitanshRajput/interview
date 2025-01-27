import React, { useState, useEffect } from "react";
const BuggyCode = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      console.log(`Count is: ${count}`);
    }, 1000);
  }, [count]);
  return (
    <div className="flex justify-center flex-col items-center w-full h-[95vh] bg-gray-950 text-white">
      {" "}
      <p>Count: {count}</p>
      <button
        className="bg-blue-400 w-[100px] rounded  h-[40px]"
        onClick={() => setCount(count + 1)}
      >
        Increment
      </button>{" "}
    </div>
  );
};
export default BuggyCode;
