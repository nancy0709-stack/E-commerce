import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductItemProps } from "../../interfaces/props/product/ProductItem";
import { RootState } from "../../interfaces/RootStateI";
import { getAuthToken } from "../../util/authentication/tokenAuth";
import { checkIfExists, findQuantityAtIndex } from "../../util/cartGetMethods/cartMethods";
import { addToCart } from "../../store/cartAction";
import { AppDispatch } from "../../store";
import Card from "../../common/ui/card/Card";
import ProductOptions from "./ProductOptions";
import classes from "./ProductItem.module.css";

const ProductItem: React.FC<ProductItemProps> = (props) => {
  const cart = useSelector((state: RootState) => state.cart.cart),
    [isSelected, setIsSelected] = useState(false),
    [hoverId, setHoverId] = useState<number | null>(null),
    [sizeId, setSize] = useState<number | null>(null);

  const token = getAuthToken(), dispatch: AppDispatch = useDispatch();

  const onMouseOverHandler = (id: number) => setHoverId(id);
  const onMouseOutHandler = () => setHoverId(null);

  const showAddtoCartButtonHandler = (id: number) => {
    setSize(id);
    setIsSelected(true);
  };

  const AddtoCartButtonHandler = (id: number, sizeId: number) => {
    const exists = checkIfExists(cart, id, sizeId);
    const quantity = findQuantityAtIndex(cart, id, sizeId);
    if (token) {
      dispatch(
        addToCart({
          productId: id,
          sizeId: sizeId,
          quantity: exists ? quantity + 1 : 1,
        })
      );
    } else {
      window.alert("Login First");
    }
  };
  return (
    <div
      className={props.className}
      onMouseOver={() => onMouseOverHandler(props.id)}
      onMouseOut={onMouseOutHandler}
    >
      <Card>
        <div>
          <img src={props.image_src} alt="" className={classes.img} />
        </div>
        <div className={classes.vendor}>{props.vendor}</div>
        <div>{props.name}</div>
        <span className={classes.discountedPrice}>&#8377;{props.price}</span>
        <span className={classes.originalPrice}>
          <s>&#8377;{props.compareAtPrice}</s>
        </span>
        <span className={classes.discount}>
          ({(((props.compareAtPrice - props.price) / props.compareAtPrice) * 100).toFixed(0)} % OFF )
        </span>
        <div className={classes.optionlist}>
          {hoverId === props.id &&
            props.options.map((item) => (
              <ProductOptions
                onClick={() => showAddtoCartButtonHandler(item.id)}
                key={item.id}
                size={item.size}
              />
            ))}
        </div>
        {isSelected && (
          <button
            className={classes.addtocart}
            onClick={() => AddtoCartButtonHandler(props.id, sizeId ?? -1)}
          >
            Add to Cart
          </button>
        )}
      </Card>
    </div>
  );
};

export default ProductItem;