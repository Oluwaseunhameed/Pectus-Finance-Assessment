import { ExpenseContextProvider } from './../expenseContext'
import { Wrapper } from "./App.styles"
import Table from "./Table"

function App() {
  return (
    <Wrapper>
      <ExpenseContextProvider>
        <Table />
      </ExpenseContextProvider>
    </Wrapper>
  );
}

export default App;
