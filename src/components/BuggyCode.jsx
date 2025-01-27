import React, { useState, useEffect } from "react";
const BuggyCode = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      console.log(`Count is: ${count}`);
    }, 1000);
  }, [count]);
  return (
    <div>
      {" "}
      <p>Count: {count}</p> <button onClick={() => setCount(count + 1)}>Increment</button>{" "}
    </div>
  );
};
export default BuggyCode;
