import * as Yup from "yup";

const phoneRegExp = /^(\+98|0)?9\d{9}$/g;

export const basicSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "نام باید بیشتر از سه کاراکتر باشد")
    .required("این فیلد اجباری است"),
  lastName: Yup.string()
    .min(3, "نام‌خانوادگی باید بیشتر از سه کاراکتر باشد")
    .required("این فیلد اجباری است"),
  email: Yup.string()
    .email("لطفا ایمیل معتبر وارد کنید")
    .required("این فیلد اجباری است"),
  mobile: Yup.string()
    .matches(phoneRegExp, "شماره موبایل صحیح نیست")
    .required("این فیلد اجباری است"),
  productId: Yup.string().required("این فیلد اجباری است"),
});
