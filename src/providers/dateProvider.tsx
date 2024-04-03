"use client";

import {
  createContext,
  useContext,
  useState,
  Dispatch,
  ReactNode,
} from "react";

const dateContext = createContext<DateContext>({
  selectedDate: "",
  setSelectedDate: () => {},
});

export default function DateProvider({ children }: { children: ReactNode }) {
  const [selectedDate, setSelectedDate] = useState("");

  return (
    <dateContext.Provider value={{ selectedDate, setSelectedDate }}>
      {children}
    </dateContext.Provider>
  );
}

export function useDate() {
  return useContext(dateContext);
}

type DateContext = {
  selectedDate: string;
  setSelectedDate: Dispatch<React.SetStateAction<string>>;
};
