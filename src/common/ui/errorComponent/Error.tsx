import React , {Fragment} from "react";
import classes from "./Error.module.css";
import error from "../../../assets/images/error.jpg";

const ResourceNotFound: React.FC = () => {
  return (
    <Fragment>
      <div className={classes.container}>
        <div className={classes.notFound}>
          <div className={classes.notFoundContainer}>
            <h3>Oops! Page not found or An Error Occurred</h3>
            <h1>
              <span>4</span>
              <span>0</span>
              <span>4</span>
            </h1>
          </div>
          <h2>We are sorry, but the resource you requested was not found</h2>
          <img src={error} alt="error" className={classes.errImg} />
        </div>
      </div>
    </Fragment>
  );
};

export default ResourceNotFound;
