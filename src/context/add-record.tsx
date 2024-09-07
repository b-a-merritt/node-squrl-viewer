'use client';
import React from "react";

export const AddRecordContext = React.createContext<{
  addRecord: boolean;
  setAddRecord: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  addRecord: false,
  setAddRecord: () => undefined,
});

export const AddRecordContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [addRecord, setAddRecord] = React.useState(false);

  return (
    <AddRecordContext.Provider value={{ addRecord, setAddRecord }}>
      {children}
    </AddRecordContext.Provider>
  );
};
