import { useState } from 'react';

/**
 * Custom hook for managing input values.
 * @param {any} initialValue - The initial value of the input.
 * @returns {Array} An array containing the input value and a change handler function.
 */
const useInput = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return [value, handleChange];
};

export default useInput;
