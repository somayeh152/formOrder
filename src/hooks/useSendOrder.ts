import { useMutation } from "react-query";
import axios from "axios";
import { FormValues } from "../types/ProductInterface/index";

const sendOrder = (data: FormValues) => {
  return axios.post(
    "https://62944c7a63b5d108c188cbce.mockapi.io/api/orders",
    data
  );
};

export const useSendOrder = (onSuccess: () => void, onError: () => void) => {
  return useMutation(sendOrder, {
    onSuccess,
    onError,
  });
};
