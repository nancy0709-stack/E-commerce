import React from "react";
import { CardProps } from "../../../interfaces/props/uiCard/Card";
import classes from "./Card.module.css";

const Card: React.FC<CardProps> = (props) => {
  return <div className={classes.card}>{props.children}</div>;
};

export default Card;

