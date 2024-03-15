import React, { useEffect, useState, useCallback } from "react";
import { useRouteLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react";
import { RootState } from "../../interfaces/RootStateI";
import { getCartData } from "../../store/cartAction";
import { fetchProductData } from "../../store/productAction";
import { AppDispatch } from "../../store";
import Header from "../header/Header";
import StaticBar from "../../common/ui/staticBar/StaticBar";
import DisplayProduct from "../products/DisplayProduct";
import Cart from "../cartComponents/Cart";

const Home: React.FC = () => {
  const [showCart, setShowCart] = useState(false);
  const isLoading = useSelector(
    (state: RootState) => state.displayProduct.isLoading
  );
  const dispatch: AppDispatch = useDispatch();
  const token = useRouteLoaderData("root") as string;

  useEffect(() => {
    dispatch(fetchProductData());
  }, [dispatch]);

  const showCartHandler = useCallback(() => {
    setShowCart(true);
    dispatch(getCartData());
  }, [dispatch]);

  const hideCartHandler = useCallback(() => {
    setShowCart(false);
  }, []);

  useEffect(() => {
    token && dispatch(getCartData());
  }, [dispatch, token]);

  return (
    <Fragment>
      <Header showCart={showCartHandler} />
      <StaticBar />
      {isLoading}
      {!isLoading && <DisplayProduct />}
      {showCart && <Cart onClose={hideCartHandler} />}
    </Fragment>
  );
};

export default Home;
