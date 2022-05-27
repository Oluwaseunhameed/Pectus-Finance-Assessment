import React, { useState, useEffect, createContext } from "react";

import { CSVStringToArray, header, UsersObj, HeaderTitle } from "./utils";

type ExpenseContextProviderProps = {
  children: React.ReactNode;
};

export interface ExpenseContextType {
  usersExp: UsersObj[];
  headerTitle?: HeaderTitle[];
  setUsersExp: React.Dispatch<React.SetStateAction<UsersObj[]>>;
  setHeaderTitle?: React.Dispatch<React.SetStateAction<HeaderTitle[]>>;
}

export const ExpenseContext = createContext<ExpenseContextType | []>([]);

export const ExpenseContextProvider = ({
  children,
}: ExpenseContextProviderProps) => {
  const [usersExp, setUsersExp] = useState<UsersObj[]>([]);
  const [headerTitle, setHeaderTitle] = useState<HeaderTitle[]>([]);

  useEffect(() => {
    if(usersExp.length){
      setHeaderTitle(header(usersExp[0]));
    }
  }, [usersExp])

  useEffect(() => {
    function fetchData() {
      fetch(`../expenses.csv`)
        .then((response) => response.text())
        .then((data) => {
          setUsersExp(CSVStringToArray(data, ","));
        })
        .catch((err) => console.log("ERROR: ", err));
    }
    fetchData();
  }, []);

  return (
    <ExpenseContext.Provider value={{ usersExp, setUsersExp, headerTitle, setHeaderTitle }}>
      {children}
    </ExpenseContext.Provider>
  );
};

