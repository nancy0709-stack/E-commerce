import React, { Fragment, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { PaymentResponse } from "../../../interfaces/Payment";
import { getCartData } from "../../../store/cartAction";
import { AppDispatch } from "../../../store";
import classes from "./PayConfirmation.module.css";

const PaymentDetail: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const paymentResponse: PaymentResponse = location.state.data;

  const handleClick = () => {
    window.open(paymentResponse.verifyPayment);
    navigate("/thanks");
  };

  useEffect(() => {
    dispatch(getCartData());
  }, [dispatch]);

  return (
    <Fragment>
      <div className={classes.verification}>Proceed to Pay</div>

      <div className={classes.verifyForm}>
        <div className={classes.totalAmt}>
          Total Amount To Pay: &#8377;{paymentResponse.amount}
        </div>
        <button className={classes.verifyBtn} onClick={handleClick}>
          Verify
        </button>
      </div>
    </Fragment>
  );
};

export default PaymentDetail;
