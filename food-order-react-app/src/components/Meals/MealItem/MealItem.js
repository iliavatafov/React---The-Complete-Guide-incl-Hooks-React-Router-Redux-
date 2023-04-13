import { useContext } from "react";
import CartContext from "../../../store/car-context";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

const MealItem = ({ name, description, price, id }) => {
  const cartCtx = useContext(CartContext);
  const modifiedPrice = `$${price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: id,
      name: name,
      amount: amount,
      price: price,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>{modifiedPrice}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
