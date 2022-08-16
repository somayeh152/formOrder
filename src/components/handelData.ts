import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { FormValues, ProductType } from "../ProductInterface/index";

const fetchProduct = () => {
  return axios.get<ProductType[]>(
    "https://62944c7a63b5d108c188cbce.mockapi.io/api/products"
  );
};

const sendOrder = (data: FormValues) => {
  return axios.post(
    "https://62944c7a63b5d108c188cbce.mockapi.io/api/orders",
    data
  );
};

export const useFetchProduct = () => {
  return useQuery("products", fetchProduct);
};

export const useSendOrder = (onSuccess: () => void, onError: () => void) => {
  return useMutation(sendOrder, {
    onSuccess,
    onError,
  });
};
