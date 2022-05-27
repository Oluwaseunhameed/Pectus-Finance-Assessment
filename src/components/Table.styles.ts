import styled from "styled-components"

export const TableWrapper = styled.table`
    border-collapse: collapse;
    overflow: hidden;
    margin-top: 30;
    border: 1px solid #dddddd;
    width: 100%;

        tr:nth-child(even) {
        background-color: #dddddd;

        }
        tr:nth-child(odd) {
        background-color: #EDEEF1;

        }

        thead th {
        position: sticky;
        top: 0;
        background-color: black;
        color: #E6E7E8;
        font-size: 15px;
        cursor: pointer;
        }

        tr:hover td {
            color: #44b478;
            cursor: pointer;
            background-color: #FFFFFF;
        }

        th,td {
            border-bottom: 1px solid #dddddd;
            padding: 10px 20px;
            font-size: 14px;
            text-align: center;
        }

        .total {
            font-weight: bold;
        }
`

export const Container = styled.div`
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 20px;

    label {
        align-content: middle;
        padding-right: 10px;
        font-weight: bold;
    }
`
export const SelectWrapper = styled.select`
    width: 200px;
    height: 30px;
    border: 1px solid #dddddd;
    font-size: 18px;
    color: #112020;
    background-color: #dddddd;
    border-radius: 5px;
    box-shadow: 4px 4px #dddddd;
     
`
