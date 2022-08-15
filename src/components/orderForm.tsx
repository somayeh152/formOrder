import { FC, useState } from "react";
import { useFormik } from "formik";
import { basicSchema } from "../schemas";
import { useFetchProduct, useSendOrder } from "./handelData";
import { FormValues, ProductType } from "../ProductInterface/index";

// const BasicForm = () => {
const BasicForm: FC = () => {
  const [formSuccess, setFormSuccess] = useState("");
  const [formError, setFormError] = useState("");

  const onSuccess = () => {
    setFormSuccess("سفارش با موفقیت ثبت شد");
  };

  const onError = () => {
    setFormError("مشکلی در ارسال فرم وجود دارد");
  };

  const { data } = useFetchProduct();
  const { mutate } = useSendOrder(onSuccess, onError);

  // const onSubmit = async (values, actions) => {
  const onSubmit = async (values: FormValues, actions: any) => {
    mutate(values);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      firstName: "ddss",
      lastName: "asdfd",
      email: "jsdflk@jsdkfj.com",
      mobile: "09117365985",
      productId: "",
    },
    validationSchema: basicSchema,
    onSubmit,
  });

  if (formSuccess) {
    return <p className="formSuccess">{formSuccess}</p>;
  }

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div className="fieldHolder">
        <label htmlFor="firstName">نام </label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          value={values.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.firstName && touched.firstName ? "input-error" : ""}
        />
      </div>
      {errors.firstName && touched.firstName && (
        <p className="error">{errors.firstName}</p>
      )}
      <div className="fieldHolder">
        <label htmlFor="lastName">نام خانوادگی</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          value={values.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.lastName && touched.lastName ? "input-error" : ""}
        />
        {errors.lastName && touched.lastName && (
          <p className="error">{errors.lastName}</p>
        )}
      </div>
      <div className="fieldHolder">
        <label htmlFor="mobile">تلفن همراه</label>
        <input
          id="mobile"
          name="mobile"
          type="phone"
          value={values.mobile}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.mobile && touched.mobile ? "input-error" : ""}
        />
        {errors.mobile && touched.mobile && (
          <p className="error">{errors.mobile}</p>
        )}
      </div>
      <div className="fieldHolder">
        <label htmlFor="email">پست الکترونیک</label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.email && touched.email ? "input-error" : ""}
        />
        {errors.email && touched.email && (
          <p className="error">{errors.email}</p>
        )}
      </div>
      <div className="fieldHolder">
        <label htmlFor="productId">محصول</label>
        <select
          id="productId"
          name="productId"
          value={values.productId}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.productId && touched.productId ? "input-error" : ""}
        >
          <option>انتخاب کنید</option>
          {data?.data.map((product: ProductType) => {
            // {data?.data.map((product) => {
            return (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            );
          })}
        </select>
        {errors.productId && touched.productId && (
          <p className="error">{errors.productId}</p>
        )}
      </div>
      <button disabled={isSubmitting} type="submit">
        ثبت
      </button>
      {formError ? <p className="formError">{formError}</p> : ""}
    </form>
  );
};
export default BasicForm;
