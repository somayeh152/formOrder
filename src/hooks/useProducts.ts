import { useQuery } from "react-query";
import axios from "axios";
import { ProductType } from "../types/ProductInterface/index";

const fetchProducts = () => {
  return axios.get<ProductType[]>(
    "https://62944c7a63b5d108c188cbce.mockapi.io/api/products"
  );
};

export const useProducts = () => {
  return useQuery("products", fetchProducts);
};
