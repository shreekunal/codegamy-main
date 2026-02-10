import React from "react";

const CustomInput = ({ customInput, setCustomInput }) => {
  return (
    <>
      <textarea
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        className="flex-grow focus:outline-none w-full border-2 border-light-4 dark:border-dark-4 bg-light-3 dark:bg-dark-3 dark:text-light-1 mt-2 rounded-lg p-2 font-mono resize-none focus:ring-2 focus:ring-accent"
      ></textarea>
    </>
  );
};

export default CustomInput;
