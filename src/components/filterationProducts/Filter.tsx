import React, { Fragment } from "react";
import { FilterProps } from "../../interfaces/props/filter/FilterProps";
import classes from "./FilterBar.module.css";

const Filter: React.FC<FilterProps> = (props) => {
  return (
    <Fragment>
      <div className={classes.filter}>
        <div className={classes.heading}>Filter:</div>
        <button
          className={classes.filterbtn}
          onClick={() => {
            props.tagHandler("All Products");
          }}
        >
          All Products
        </button>
        {props.tags.map((item, index) => (
          <button
            key={index}
            className={classes.filterbtn}
            onClick={() => props.tagHandler(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </Fragment>
  );
};

export default Filter;
