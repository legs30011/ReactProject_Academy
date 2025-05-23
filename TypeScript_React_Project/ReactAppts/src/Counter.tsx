import React, { useState, useEffect } from "react";

const Counter: React.FC = () => {
const [count, setCount] = useState(0);

const increment = () => {
setCount((prevCount) => prevCount + 1);
};

const decrement = () => {
setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0)); // Prevent going below 0
};

useEffect(() => {
const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowUp") {
    increment();
    } else if (event.key === "ArrowDown") {
    decrement();
    }
};
window.addEventListener("keydown", handleKeyDown);

// Cleanup function to remove the event listener when the component unmounts
return () => {
    window.removeEventListener("keydown", handleKeyDown);
};
}, []); // Empty dependency array ensures this effect runs only once

return (
<div>
    <h2>Counter</h2>
    <p>Count: {count}</p>
    <button className="increment" onClick={increment}>Increment</button>
    <br/>
    <button className="decrement" onClick={decrement}>Decrement</button>
</div>
);
};

export default Counter;
