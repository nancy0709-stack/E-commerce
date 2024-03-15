import React from 'react';
import { ProductOptionProps } from '../../interfaces/props/product/ProductOption';
import classes from './ProductOptions.module.css';

const ProductOptions: React.FC<ProductOptionProps> = (props) => {
  return (
    <div className={classes.optionValue} onClick={props.onClick}>
      {props.size}
    </div>
  );
};

export default ProductOptions;