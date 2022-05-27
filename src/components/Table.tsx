import React, { useState, useContext } from "react";

import { UsersObj, handleFilter, toUserObj, titleLabel } from "../utils";

import { ExpenseContext, ExpenseContextType } from "./../expenseContext";
import { TableWrapper, Container, SelectWrapper } from "./Table.styles"

const Table: React.FC = () => {
  const { headerTitle, usersExp, setUsersExp } = useContext(
    ExpenseContext
  ) as ExpenseContextType;
  const [order, setOrder] = useState<string>("ASC");
  const [departmentFilter, setDepartmentFilter] = useState<string>("");
  const [isFiltering, setFiltering] = useState<{data: Partial<UsersObj[]> ,filtering: boolean, total: number}>({data: [], filtering: false, total: 0})

  const sorting = (key: keyof UsersObj): void => {
    if (order === "ASC") {
      if (key === "amount")
        setUsersExp(
          [...usersExp].sort((a, b) => Number(a[key]) - Number(b[key]))
        );
      if (key === "date")
        setUsersExp(
          [...usersExp].sort((a, b) =>
            new Date(a[key]) > new Date(b[key]) ? 1 : -1
          )
        );
      if (key !== "date" && key !== "amount")
        setUsersExp(
          [...usersExp].sort((a, b) =>
            a[key].toString().toLowerCase() > b[key].toString().toLowerCase()
              ? 1
              : -1
          )
        );
      setOrder("DSC");
    }
    if (order === "DSC") {
      if (key === "amount")
        setUsersExp(
          [...usersExp].sort((a, b) => Number(b[key]) - Number(a[key]))
        );
      if (key === "date")
        setUsersExp(
          [...usersExp].sort((a, b) =>
            new Date(a[key]) < new Date(b[key]) ? 1 : -1
          )
        );
      if (key !== "date" && key !== "amount")
        setUsersExp(
          [...usersExp].sort((a, b) =>
            a[key].toString().toLowerCase() < b[key].toString().toLowerCase()
              ? 1
              : -1
          )
        );
      setOrder("ASC");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const {data, total} = handleFilter(usersExp, event.target.value);
    console.log(data, total);
    
    setFiltering({filtering: true, data: toUserObj(data, event.target.value) as UsersObj[], total});
    setDepartmentFilter(event.target.value);
  };  

  return (
    <>
    <Container>
        <label>Total Expanses by: </label>
        <SelectWrapper
            onChange={handleChange}
            name="departments"
            id="departments"
            defaultValue="Select your option"
        >
            <option value="all">Select your option</option>
            {headerTitle
            ?.filter((e) => e.key !== "amount")
            .map(({ key, label }) => (
                <option key={key} value={key}>
                {label}
                </option>
            ))}
        </SelectWrapper>
      </Container>
      {isFiltering.filtering ? (
        <TableWrapper>
          <thead>
            <tr>
              {Object.keys(isFiltering.data[0] || {})
                .map((label) => (
                  <th key={label}>{titleLabel(label)}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {isFiltering.data.map((el, index) => (
              <tr key={index}>
                <td>{(el as any)[departmentFilter]}</td>
                <td>{el?.amount}</td>
              </tr>
            ))}
            <tr className="total"><td>Total: </td><td>{isFiltering.total}</td></tr>
          </tbody>
        </TableWrapper>
      ) : (
        <TableWrapper>
          <thead>
            <tr>
              {headerTitle?.map(({ key, label }) => (
                <th onClick={() => sorting(key as keyof UsersObj)} key={key}>
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {usersExp.map(
              ({
                id,
                departments,
                project_name,
                amount,
                date,
                member_name,
              }) => (
                <tr key={id}>
                  <td>{departments}</td>
                  <td>{project_name}</td>
                  <td>{amount}</td>
                  <td>{date}</td>
                  <td>{member_name}</td>
                </tr>
              )
            )}
          </tbody>
        </TableWrapper>
      )}
    </>
  );
};

export default Table;
