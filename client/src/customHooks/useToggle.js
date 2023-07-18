import { useState } from "react";

const useToggle = () => {
  const [value, setValue] = useState(false);

  const toggleValue = () => setValue((prev) => !prev);

  return [value, toggleValue];
};

export default useToggle;
