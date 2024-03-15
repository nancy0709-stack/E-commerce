import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CartProps } from "../../interfaces/props/cart/Cart";
import { clearCartData } from "../../store/cartAction";
import { RootState } from "../../interfaces/RootStateI";
import { AppDispatch } from "../../store";
import CartItem from "./CartItem";
import Modal from "../../common/ui/modal/Modal";
import classes from './Cart.module.css';

const Cart: React.FC<CartProps> = (props) => {
  const products = useSelector((state: RootState) => state.cart.cart);
  const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);
  const isLoading = useSelector(
    (state: RootState) => state.displayProduct.isLoading
  );
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const checkoutHandler = useCallback(() => {
    navigate("/payment");
  }, [navigate]);

  const clearCartHandler = useCallback(() => {
    dispatch(clearCartData());
  }, [dispatch]);

  const cartItem = useMemo(
    () =>
      products.map((items, index) => (
        <CartItem
          key={index}
          id={items.productId}
          price={items.product.price}
          image_src={items.product.imageSrc}
          vendor={items.product.vendor}
          name={items.product.name}
          quantity={items.quantity}
          totalPrice={items.totalPrice}
          size={items.size.size}
          sizeId={items.size.id}
        />
      )),
    [products]
  );

  return (
    <Modal onClose={props.onClose}>
      <button className={classes.close} onClick={props.onClose}>
        Close
      </button>
      <div className={classes.container}>
        <h1 className={classes.myCart}>My Cart</h1>
        {(totalAmount > 0) && (
          <h1 className={classes.totalAmount}>
            Total Amount: <span className={classes.rupee}>&#8377;</span>
            {totalAmount}
          </h1>
        )}
        {totalAmount === 0 && <p className={classes.para}>Empty Cart , Add Something!!!</p>}
        {isLoading}
        {!isLoading && cartItem}
      </div>

      {!(totalAmount === 0 && totalAmount >= 0) && (
        <div className={classes.div}>
          <button className={classes.clearCart} onClick={clearCartHandler}>
            Clear Cart
          </button>
          <button className={classes.checkout} onClick={checkoutHandler}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </Modal>
  );
};

export default Cart;
