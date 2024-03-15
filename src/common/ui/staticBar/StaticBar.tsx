import React from "react";
import { Fragment } from "react";
import classes from "./StaticBar.module.css";

const StaticBar: React.FC = () => {
  return (
    <Fragment>
      <div className={classes.invitation}>
        <div className={classes.textline}>
          Invite friends to Fashion Festival & get up to &#8377;150 Bonus for every Referral
        </div>
      </div>
    </Fragment>
  );
};

export default StaticBar;
