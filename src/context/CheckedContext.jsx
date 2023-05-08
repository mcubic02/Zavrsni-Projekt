import { createContext } from "react";

const CheckedContext = createContext({
    checked: true,
    handleChange: () => {}
  });

export default CheckedContext