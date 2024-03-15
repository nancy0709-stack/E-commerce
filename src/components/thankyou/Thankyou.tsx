import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../interfaces/RootStateI";
import classes from "./Thankyou.module.css";

const Thankyou: React.FC = () => {
  const navigate = useNavigate();
  const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);

  useEffect(() => {
    if (totalAmount === 0) {
      navigate("/");
    }
    const timer = setTimeout(() => {
      navigate("/");
    }, 8000);

    return () => clearTimeout(timer);
  }, [navigate, totalAmount]);

  return (
    <Fragment>
      <div className={classes.thankYou}>
        Thank You!!!
      </div>
      <p className={classes.redirection}>
          You will be redirected to the home page.......
        </p>
    </Fragment>
  );
};

export default Thankyou;
