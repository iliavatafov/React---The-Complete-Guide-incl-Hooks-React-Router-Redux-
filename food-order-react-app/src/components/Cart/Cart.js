import { Fragment, useContext, useState } from "react";
import CartContext from "../../store/car-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = ({ onHideCart }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSumbit, setDidSubmit] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item, index) => (
        <CartItem
          key={item.id + index}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const modalActions = (
    <div className={classes.actions}>
      <button onClick={onHideCart} className={classes["button--alt"]}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://food-ordering-app-a1487-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cardModalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Totl Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onComfirm={submitOrderHandler} onCancel={onHideCart} />
      )}
      {!isCheckout && modalActions}
    </Fragment>
  );

  const isSubmmitingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button onClick={onHideCart} className={classes.button}>
          Close
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal onClose={onHideCart}>
      {!isSubmitting && !didSumbit && cardModalContent}
      {isSubmitting && isSubmmitingModalContent}
      {!isSubmitting && didSumbit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
