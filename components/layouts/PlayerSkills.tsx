import { useState } from 'react';

// Create a simple react component with one input tag and a button tag. The input tag should have a placeholder of "Enter your name" and the button tag should have the text "Submit". When the button is clicked, an alert should pop up with the text "Hello, [name]!" where [name] is the value of the input tag. The component should be exported as a default export.
export const PlayerSkills = () => {
  const [name, setName] = useState('');
  const onClick = () => {
    alert(`Hello, ${name}!`);
  };
  return (
    <div className="text-base">
      <input
        className="p-2 block bg-blue-100 rounded-md border-blue-600 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        placeholder="Enter you Pixels Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <button className="my-2 p-1 border text-sm" onClick={onClick}>
        Submit
      </button>
    </div>
  );
};
