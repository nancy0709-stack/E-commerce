import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartItemProps } from "../../interfaces/props/cart/CartItem";
import { addToCart } from "../../store/cartAction";
import { RootState } from "../../interfaces/RootStateI";
import { findQuantityAtIndex } from "../../util/cartGetMethods/cartMethods";
import { AppDispatch } from "../../store";
import classes from "./CartItem.module.css";

const CartItem: React.FC<CartItemProps> = (props) => {
  const { id, sizeId, image_src, name, vendor, quantity, size, totalPrice } = props;
  const dispatch: AppDispatch = useDispatch();
  const cartProducts = useSelector((state: RootState) => state.cart.cart);

  const currentQuantity = useMemo(
    () => findQuantityAtIndex(cartProducts, id, sizeId),
    [cartProducts, id, sizeId]
  );

  const updateCart = (newQuantity: number) => {
    dispatch(addToCart({ productId: id, sizeId, quantity: newQuantity }));
  };

  const addHandler = () => {
    updateCart(currentQuantity + 1);
  };

  const removeHandler = () => {
    if (currentQuantity === 1) {
      dispatch(addToCart({ productId: id, sizeId }));
    } else {
      updateCart(currentQuantity - 1);
    }
  };

  return (
    <div className={classes.cartitemcontainer}>
      <div className={classes.cartsubcontainer}>
        <img className={classes.cartimage} src={image_src} alt="" />
      </div>
      <div className={classes.cartsubcontainer}>
        <div className={classes.productname}>{name}</div>
        <div>{vendor}</div>
        <button className={classes.actionbutton} onClick={removeHandler}>
          -
        </button>
        <button className={classes.actionbutton} onClick={addHandler}>
          +
        </button>
      </div>
      <div className={classes.cartsubcontainerprice}>
        <span className={classes.item}>Quantity: {quantity}</span>
        <div>
          <div>
            <span className={classes.item}>size: {size}</span>
          </div>
          <div>
            <span className={classes.item}>
              Total Price: &#8377;{totalPrice}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
