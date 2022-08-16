import { FC, useState } from "react";
import { useFormik } from "formik";
import { basicSchema } from "../schemas";
import { useProducts } from "../hooks/useProducts";
import { useSendOrder } from "../hooks/useSendOrder";
import { FormValues, ProductType } from "../types/ProductInterface/index";
import LoadingSpinner from "../uikit/loading/LoadingSpinner";

const BasicForm: FC = () => {
  const [formSuccess, setFormSuccess] = useState<string>("");
  const [formError, setFormError] = useState<string>("");

  const onSuccess = (): void => {
    setFormSuccess("سفارش با موفقیت ثبت شد");
  };

  const onError = (): void => {
    setFormError("مشکلی در ارسال فرم وجود دارد");
  };

  const productsList = useProducts();
  const order = useSendOrder(onSuccess, onError);

  const onSubmit = (values: FormValues) => {
    order.mutate(values);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        productId: "",
      },
      validationSchema: basicSchema,
      onSubmit,
    });

  if (productsList.isLoading) {
    return <LoadingSpinner />;
  }

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
          placeholder="علی"
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
          placeholder="جوان"
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
          placeholder="09121315682"
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
          placeholder="javan@gmail.com"
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
          {productsList.data?.data.map((product: ProductType) => {
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
      <button disabled={order.isLoading} type="submit">
        {order.isLoading ? <LoadingSpinner /> : "ثبت"}
      </button>
      {formError ? <p className="formError">{formError}</p> : ""}
    </form>
  );
};
export default BasicForm;
