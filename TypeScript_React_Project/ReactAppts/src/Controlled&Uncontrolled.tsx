import React, { useState, useRef } from 'react';

const ControlledUncontrolled = () => {
const [controlledValue, setControlledValue] = useState('');
const uncontrolledInputRef = useRef<HTMLInputElement>(null);

const handleButtonClick = () => {
console.log('Controlled Value:', controlledValue);
console.log('Uncontrolled Value:', uncontrolledInputRef.current?.value);
};

const handleControlledInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
setControlledValue(event.target.value);
};

return (
<div>
    <h2>Controlled Component</h2>
    <input
    type="text"
    value={controlledValue}
    onChange={handleControlledInputChange}
    placeholder="Controlled Input"
    />

    <h2>Uncontrolled Component</h2>
    <input
    type="text"
    ref={uncontrolledInputRef}
    placeholder="Uncontrolled Input"
    />

    <button onClick={handleButtonClick}>Log Values</button>
</div>
);
};

export default ControlledUncontrolled;