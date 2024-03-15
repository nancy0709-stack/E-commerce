import React from "react";
import { Link } from "react-router-dom";
import classes from "./InProgress.module.css";

const InProgress: React.FC = () => {
  return (
    <div>
      <div className={classes.subdiv}>
        <p className={classes.paragraph}>
          Sorry!! , We are working on this page right now.
        </p>
        <Link to="/">
          <button className={classes.btn}>Move to Home Page</button>
        </Link>
      </div>
    </div>
  );
};
export default InProgress;
