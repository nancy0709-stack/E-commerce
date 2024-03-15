import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { displayProductActions } from "../../../store/productSlice";
import { makePaymentApi } from "../../../util/api/paymentApi";
import { CardData } from "../../../interfaces/AddCard";
import { RootState } from "../../../interfaces/RootStateI";
import { PaymentResponse } from "../../../interfaces/Payment";
import { SavedCardsProps } from "../../../interfaces/SavedCards";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../store";
import Modal from "../../../common/ui/modal/Modal";
import classes from "./SavedCards.module.css";

const SavedCards: React.FC<SavedCardsProps> = (props) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [paymentResponse, setPaymentResponse] = useState<
  PaymentResponse | undefined
  >();
  const isLoading = useSelector(
    (state: RootState) => state.displayProduct.isLoading
  );

  const cardHandler = async (id: string) => {
    dispatch(displayProductActions.setLoading(true));
    const response = await makePaymentApi(id);
    dispatch(displayProductActions.setLoading(false));
    if (response) {
      setPaymentResponse(response);
    }
  };

  if (paymentResponse) {
    navigate("/payment-details", { state: { data: paymentResponse } });
  }

  return (
    <Fragment>
      {isLoading}
      {!isLoading && (
        <Modal onClose={props.onClose}>
          <button className={classes.close} onClick={props.onClose}>
            Close
          </button>
          {!isLoading && (
            <div className={classes.container}>
              {Array.isArray(props.savedCards) ? (
                props.savedCards.map((card: CardData, index: number) => (
                  <div className={classes.cardContainer} key={index}>
                    <div className={classes.card}>
                      <div className={classes.visaInfo}>
                        <p>**** **** **** {card.last4}</p>
                        <div className={classes.creditInfo}>
                          <p>
                            {card.expMonth}/{card.expYear}
                          </p>
                          <p>{card.name}</p>
                        </div>
                      </div>
                    </div>
                    <button
                      className={classes.payButton}
                      onClick={() => cardHandler(card.cardID)}
                    >
                      Pay with {card.brand}
                    </button>
                  </div>
                ))
              ) : (
                <p className={classes.message}>{props.savedCards}</p>
              )}
            </div>
          )}
        </Modal>
      )}
    </Fragment>
  );
};

export default SavedCards;
