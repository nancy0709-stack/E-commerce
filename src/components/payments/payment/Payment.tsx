import React, { useState, useEffect, useCallback ,Fragment} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CardData } from "../../../interfaces/AddCard";
import { RootState } from "../../../interfaces/RootStateI";
import { displayProductActions } from "../../../store/productSlice";
import { getCardsApi } from "../../../util/api/paymentApi";
import { AppDispatch } from "../../../store";
import SavedCards from "../savedCards/SavedCards";
import AddCard from "../addCards/AddCard";
import classes from "./Payment.module.css";

const Payment: React.FC = () => {
  const [cardsData, setCardsData] = useState<CardData[] | undefined>([]);
  const [isCardActive, setIsCardActive] = useState(false);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);

  const loadingState = useSelector(
    (state: RootState) => state.displayProduct.isLoading
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (totalAmount === 0) {
      navigate("/");
    }
  }, [navigate, totalAmount]);

  const cardsHandler = useCallback(async () => {
    dispatch(displayProductActions.setLoading(true));
    const data = await getCardsApi();
    setCardsData(data);
    setShowModal(true);
    dispatch(displayProductActions.setLoading(false));
  }, [dispatch]);

  const addCardHandler = useCallback(() => {
    setIsCardActive(true);
    setMessage("");
  }, []);

  const hideModalHandler = useCallback(() => {
    setShowModal(false);
  }, []);

  const showAddCardHandler = useCallback((data: boolean, message: string) => {
    setIsCardActive(data);
    setMessage(message);
  }, []);

  const pageHandler = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <Fragment>
      {loadingState}
      <div className={classes.header}>Pay With Card</div>
      <div className={classes.cards}>
        <button className={classes.card} onClick={cardsHandler}>
          Saved Cards
        </button>
        <button className={classes.card} onClick={addCardHandler}>
          Add Card
        </button>
        <button className={classes.card} onClick={pageHandler}>
          Move to HomePage
        </button>
      </div>

      {showModal && (
        <SavedCards onClose={hideModalHandler} savedCards={cardsData} />
      )}

      {isCardActive && <AddCard showAddCard={showAddCardHandler} />}
      {message && (
        <div className={classes.messageContainer}>
          <p className={classes.message}>{message}</p>
        </div>
      )}
    </Fragment>
  );
};

export default Payment;
