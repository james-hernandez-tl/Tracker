"use client";

import {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
} from "react";

const showDatesContext = createContext<ShowDatesContext>({
  showDates: false,
  setShowDates: () => {},
});

export default function ShowDatesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [showDates, setShowDates] = useState(false);

  return (
    <showDatesContext.Provider value={{ showDates, setShowDates }}>
      {children}
    </showDatesContext.Provider>
  );
}

export const useShowDates = () => {
  return useContext(showDatesContext);
};

type ShowDatesContext = {
  showDates: boolean;
  setShowDates: Dispatch<React.SetStateAction<boolean>>;
};
