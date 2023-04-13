import { useEffect, useState } from "react";

import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import ExpenseList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart";

import "./Expenses.css";

const Expenses = ({ expenses }) => {
  const [filteredYear, setFilteredYear] = useState(2022);
  const [displayedExpenses, setDisplayExpenses] = useState([]);

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  useEffect(() => {
    const filteredExpenses = expenses.filter(
      (expense) => expense.date.getFullYear() == filteredYear
    );
    setDisplayExpenses(filteredExpenses);
  }, [filteredYear, expenses]);

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter
          selected={filteredYear}
          onChangeFilter={filterChangeHandler}
        />
        <ExpensesChart expenses={displayedExpenses} />
        <ExpenseList displayedExpenses={displayedExpenses} />
      </Card>
    </div>
  );
};

export default Expenses;
