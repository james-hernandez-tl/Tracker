"use client";

import {
  createContext,
  useState,
  ReactNode,
  useContext,
  Dispatch,
} from "react";

const optionContext = createContext<OptionContext>({
  option: "",
  setOption: () => {},
});

export function OptionProvider({ children }: { children: ReactNode }) {
  const [option, setOption] = useState("");

  return (
    <optionContext.Provider value={{ option, setOption }}>
      {children}
    </optionContext.Provider>
  );
}

export function useOptions() {
  return useContext(optionContext);
}

type OptionContext = {
  option: string;
  setOption: Dispatch<React.SetStateAction<string>>;
};
