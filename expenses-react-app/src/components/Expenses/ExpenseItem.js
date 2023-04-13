import Card from "../UI/Card";
import ExpenseDate from "./ExpenseDate";

import "./ExpenseItem.css";

const ExpenseItem = ({ expense }) => {
  return (
    <li>
      <Card className="expense-item">
        <ExpenseDate expense={expense} />
        <div className="expense-item__description">
          <h2>{expense.title}</h2>
          <div className="expense-item__price">${expense.amount}7</div>
        </div>
      </Card>
    </li>
  );
};
export default ExpenseItem;
