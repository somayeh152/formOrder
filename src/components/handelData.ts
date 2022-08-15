import {
  useQuery,
  useMutation,
  MutationKey,
  MutationFunction,
} from "react-query";
import axios from "axios";
import { FormValues, ProductType } from "../ProductInterface/index";

// const fetchProduct: () => Promise<ProductType> = () => {
const fetchProduct = () => {
  // return axios.get("https://62944c7a63b5d108c188cbce.mockapi.io/api/products");
  return axios.get<ProductType[]>(
    "https://62944c7a63b5d108c188cbce.mockapi.io/api/products"
  );
};

const sendOrder = (data: FormValues) => {
  // const sendOrder = (data) => {
  // const sendOrder: (data: Product) => Promise<Product> = (data: Product) => {
  return axios.post(
    "https://62944c7a63b5d108c188cbce.mockapi.io/api/orders",
    data
  );
};

export const useFetchProduct = () => {
  return useQuery("products", fetchProduct, {
    // onError: (ErrorData) => console.log(ErrorData.message),
    onError: (ErrorData) => console.log(ErrorData),
  });
};

export const useSendOrder = (onSuccess: () => {}, onError: () => {}) => {
  return useMutation(sendOrder, {
    onSuccess,
    onError,
    // onSuccess: (successData) => console.log(successData),
    // // onError: (ErrorData, data) => console.log(ErrorData.message, data),
    // onError: (ErrorData) => console.log(ErrorData),
  });
};
