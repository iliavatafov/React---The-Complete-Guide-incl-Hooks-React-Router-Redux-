import { useState } from "react";

import "./ExpenseForm.css";

const ExpenseForm = ({ onSaveExpenseData }) => {
  const [showForm, setShowForm] = useState(false);
  const [input, setInput] = useState({
    title: "",
    amount: "",
    date: "",
  });

  const inputChangeHandler = (event) => {
    setInput((current) => {
      return {
        ...current,
        [event.target.name]: event.target.value,
      };
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const expenseData = {
      ...input,
      date: new Date(input.date),
    };

    onSaveExpenseData(expenseData);

    setInput({
      title: "",
      amount: "",
      date: "",
    });
  };

  const showFormHandler = (event) => {
    event.preventDefault();
    setShowForm(true);
  };
  const hideFormHandler = (event) => {
    event.preventDefault();
    setShowForm(false);
  };

  const closedForm = (
    <form>
      <div className="new-expense__actions_add">
        <button type="text" onClick={showFormHandler}>
          Add New Expense
        </button>
      </div>
    </form>
  );

  return (
    <>
      {!showForm && closedForm}
      {showForm && (
        <form onSubmit={submitHandler}>
          <div className="new-expense__controls">
            <div className="new-xpense__control">
              <label>Title</label>
              <input
                type="text"
                name="title"
                onChange={inputChangeHandler}
                value={input.title}
              />
            </div>
            <div className="new-xpense__control">
              <label>Amount</label>
              <input
                type="number"
                name="amount"
                min="0.01"
                step="0.01"
                onChange={inputChangeHandler}
                value={input.amount}
              />
            </div>
            <div className="new-xpense__control">
              <label>Date</label>
              <input
                type="date"
                name="date"
                min="2019-01-01"
                step="2022-12-31"
                onChange={inputChangeHandler}
                value={input.date}
              />
            </div>
          </div>
          <div className="new-expense__actions">
            <button type="submit" onClick={hideFormHandler}>
              Cancel
            </button>
            <button type="submit">Add Expense</button>
          </div>
        </form>
      )}
    </>
  );
};

export default ExpenseForm;
