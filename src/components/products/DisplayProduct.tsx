import React, { useEffect, useState, useCallback, useMemo ,Fragment} from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../interfaces/RootStateI";
import { Product } from "../../interfaces/Product";
import { filterApi } from "../../util/api/filterApi";
import { paginationApi } from "../../util/api/paginationApi";
import ProductItem from "./ProductItem";
import Filter from "../filterationProducts/Filter";
import Option from "../OptionBar/Option";
import Pagination from "./Pagination";
import classes from "./DisplayProduct.module.css";

const DisplayProduct: React.FC = () => {
  const apiProductData = useSelector(
    (state: RootState) => state.displayProduct.products
  );
  const totalRecords = useSelector(
    (state: RootState) => state.displayProduct.totalRecords
  );

  const [filteredName, setFilteredName] = useState("All Products");
  const [count, setCount] = useState(totalRecords);
  const [filteredData, setFilteredData] = useState<Product[] | undefined>(
    apiProductData
  );
  const [filterButton, setFilterButton] = useState<string[]>([]);

  useEffect(() => {
    const data = new Set(apiProductData.map((product: Product) => product.tag));
    setFilterButton(Array.from(data));
    setFilteredData(apiProductData);
    setCount(totalRecords);
  }, [apiProductData, totalRecords]);

  const filterHandler = useCallback(
    async (tag: string) => {
      const response = await filterApi(tag,null);
      if (tag === "All Products") {
        setFilteredName("All Products");
      }

      if (response) {
        setCount(response.totalRecords);
        setFilteredData(response.products);
        setFilteredName(tag);
      }
    },
    []
  );

  const handlePageClick = useCallback(
    async (data: number) => {
      const tag =
        filteredName === "All Products" ? "All Products" : filteredName;
      const productsPerPage = await paginationApi(
        data,
        tag,
        null
      );
      setFilteredData(productsPerPage);
    },
    [filteredName]
  );

  const filteredDataProducts = useMemo(() => {
    return filteredData && filteredData.length > 0
      ? filteredData.map((data: Product) => (
        <ProductItem
          className={classes.productItem}
          key={data.id}
          id={data.id}
          price={data.price}
          image_src={data.imageSrc}
          vendor={data.vendor}
          name={data.name}
          compareAtPrice={+data.compareAtPrice}
          options={data.options}
        />
      ))
      : null;
  }, [filteredData]);

  return (
    <Fragment>
      <Option filteredName={filteredName} count={count} />
      <Filter tags={filterButton} tagHandler={filterHandler} />
      <div className={classes.prodlist}>{filteredDataProducts}</div>
      <Pagination handlePageClick={handlePageClick} />
    </Fragment>
  );
};

export default DisplayProduct;
