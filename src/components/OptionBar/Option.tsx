import React from "react";
import { OptionProps } from "../../interfaces/props/option/Option";
import classes from "./Option.module.css";

const Option: React.FC<OptionProps> = (props) => {
  const { filteredName, count } = props;
  return (
    <div className={classes.infocontainer}>
      <div className={classes.category}>
        Home / Clothing / Mens Clothing / All Mens Clothing
      </div>
      <div className={classes.list}>
        {filteredName} ({count} Products)
      </div>
    </div>
  );
};

export default Option;
