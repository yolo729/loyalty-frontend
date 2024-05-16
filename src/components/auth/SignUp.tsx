import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { signupSchema } from "./validations";

export const SignUp = (props: any) => {
  interface ReCaptchaRef {
    execute: () => void;
    getValue: () => string | null;
    reset: () => void;
  }
  //API URL
  const apiUrl = import.meta.env.VITE_API_URL;

  const recaptchaRef = useRef<ReCaptchaRef>(null);
  //Google_ReCaptch KEY
  const SITE_KEY = import.meta.env.VITE_SITE_KEY_URL;
  const SECRET_KEY = import.meta.env.VITE_SECRET_KEY_URL;

  const [SuccessMsg, setSuccessMsg] = useState("");
  const [ErrorMsg, setErrorMsg] = useState("");
  const [valid_token, setValidToken] = useState<{ success: boolean }[]>([]);

  const his = useHistory();

  const onChangeBot = async (token: string | null) => {
    if (token) {
      let valid_token: any = await verifyToken(token);
      setValidToken(valid_token);

      if (valid_token && valid_token[0]?.success === true) {
        console.log("verified");
        setSuccessMsg("Hurray!! you have submitted the form");
      } else {
        console.log("not verified");
        setErrorMsg(" Sorry!! Verify you are not a bot");
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirm: "",
      birthday: "",
      firstname: "",
      lastname: "",
      phone: "",
      country: 0,
      province: 0,
      postcode: "",
      address1: "",
      address2: "",
      preference: 1,
      _store1407: 0,
      _store170: 0,
      _store180: 0,
      _store2589: 0,
      _store2840: 0,
      _store77: 0,
      _store84: 0,
      _store_may: 0,
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const onSubmit = async (user: any) => {
    // e.preventDefault();
    const reCaptchaToken = recaptchaRef.current?.getValue();
    if (!reCaptchaToken) {
      props.useToast({
        message: "Please check the Bot verify",
        type: "warning",
      });

      return;
    }

    // if (user.password !== user.confirm) {
    //   props.useToast({
    //     message: "Not match",
    //     type: "warning",
    //   });
    // } else {
    axios
      .post(`${apiUrl}/signup`, user)
      .then(() => {
        props.useToast({
          message: "Data saved successfully",
          type: "success",
        });
        his.push("/signin");
      })
      .catch((error) => {
        if (error.response) {
          props.useToast({
            message: "Backend error",
            type: "error",
          });
        } else if (error.request) {
          props.useToast({
            message: "Backend error",
            type: "error",
          });
        } else {
          props.useToast({
            message: "Backend error",
            type: "error",
          });
        }
      });
    // }
  };

  const verifyToken = async (token: any) => {
    let APIResponse = [];

    try {
      let response = await axios.post(`${apiUrl}/verify-token`, {
        reCAPTCHA_TOKEN: token,
        Secret_Key: SECRET_KEY,
      });

      props.useToast({
        message: "Human verification was done",
        type: "success",
      });
      APIResponse.push(response["data"]);
      return APIResponse;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="container bg-white">
      <div className="p-8 w-full my-16 pt-8 p-32">
        <h2 className="text-[#173B4C] mb-6 text-center text-3xl md:text-4xl font-bold">
          New Account
        </h2>
        <form onSubmit={formik.handleSubmit}>
          {valid_token?.length > 0 && valid_token[0].success === true ? (
            <h3 className="textSuccess">{SuccessMsg}</h3>
          ) : (
            <h3 className="textError">{ErrorMsg} </h3>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="flex justify-between items-center">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-600"
                >
                  EMAIL ADDRESS
                </label>
                <span className="text-red-600 text-xs">
                  {formik.touched.email && formik.errors.email ? (
                    <div className="error">{formik.errors.email}</div>
                  ) : null}
                </span>
              </span>
              <input
                type="text"
                id="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                name="email"
                className="mt-1 p-2 w-full border text-gray-800"
              />
            </div>
            <div>
              <span className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-600"
                >
                  PASSWORD
                </label>
                <span className="text-red-600 text-xs">
                  {formik.touched.password && formik.errors.password ? (
                    <div className="error">{formik.errors.password}</div>
                  ) : null}
                </span>
              </span>
              <input
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                id="password"
                name="password"
                className="mt-1 p-2 w-full border text-gray-800"
              />
            </div>
            <div>
              <span className="flex justify-between items-center">
                <label
                  htmlFor="confirm"
                  className="text-sm font-medium text-gray-600"
                >
                  CONFIRM PASSWORD
                </label>
                <span className="text-red-600 text-xs">
                  {formik.touched.confirm && formik.errors.confirm ? (
                    <div className="error">{formik.errors.confirm}</div>
                  ) : null}
                </span>
              </span>
              <input
                type="password"
                id="confirm"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirm}
                name="confirm"
                className="mt-1 p-2 w-full border text-gray-800"
              />
            </div>
            <br />
            <hr className="w-[87rem]" /> <br />
            <div className="flex">
              <label className="block text-gray-500 font-bold my-4" />
              <input type="checkbox" className="leading-loose text-pink-600" />
              <span className="py-2 text-sm p-2 text-gray-600 leading-snug">
                <h1 className="p-4">
                  Consent to recieve markating communication
                </h1>
              </span>
              <label className="block text-gray-500 font-bold my-4">
                <a
                  href="#"
                  className="cursor-pointer tracking-tighter text-black border-b-2 border-gray-200 hover:border-gray-400"
                ></a>
              </label>
            </div>
            <div className="w-48">
              <span className="flex justify-between items-center">
                <label
                  htmlFor="preference"
                  className="text-sm font-medium text-gray-600"
                >
                  Contact Preference
                </label>
                <span className="text-red-600 text-xs">
                  {formik.touched.preference && formik.errors.preference ? (
                    <div className="error">{formik.errors.preference}</div>
                  ) : null}
                </span>
              </span>
              <select
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirm}
                id="preference"
                name="preference"
                className="mt-1 p-2 w-full border text-gray-800"
              >
                <option value={1}>Email</option>
                <option value={2}>Phone</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="referred"
                className="md:text-2xl text-sm font-medium text-gray-600 pt-5"
              >
                Preferred Stores
              </label>
              <div className="grid grid-cols-2 pt-5 gap-4">
                <div>
                  <input
                    className="p-2"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values._store1407}
                    type="checkbox"
                    id="_store1407"
                    name="_store1407"
                  />
                  <span className="p-2">1407 Lexington Avenue</span>
                </div>
                <div>
                  <input
                    className="p-2"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values._store2840}
                    type="checkbox"
                    id="_store2840"
                    name="_store2840"
                  />
                  <span className="p-2">2840 Broadway</span>
                </div>
                <div>
                  <input
                    className="p-2"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values._store170}
                    type="checkbox"
                    id="_store170"
                    name="_store170"
                  />
                  <span className="p-2">170 West 23rd Street</span>
                </div>
                <div>
                  <input
                    className="p-2"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values._store77}
                    type="checkbox"
                    id="_store77"
                    name="_store77"
                  />
                  <span className="p-2">77 Seventh Ave</span>
                </div>
                <div>
                  <input
                    className="p-2"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values._store180}
                    type="checkbox"
                    id="_store180"
                    name="_store180"
                  />
                  <span className="p-2">180 Third Ave</span>
                </div>
                <div>
                  <input
                    className="p-2"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values._store84}
                    type="checkbox"
                    id="_store84"
                    name="_store84"
                  />
                  <span className="p-2">84 Third Ave</span>
                </div>
                <div>
                  <input
                    className="p-2"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values._store2589}
                    type="checkbox"
                    id="_store2589"
                    name="_store2589"
                  />
                  <span className="p-2">2589 Broadway</span>
                </div>
                <div>
                  <input
                    className="p-2"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values._store_may}
                    type="checkbox"
                    id="_store_may"
                    name="_store_may"
                  />
                  <span className="p-2">Maywood's Market</span>
                </div>
              </div>
            </div>
            <div className="w-48">
              <span className="flex justify-between items-center">
                <label
                  htmlFor="birthday"
                  className="text-sm font-medium text-gray-600"
                >
                  BIRTHDAY
                </label>
                <span className="text-red-600 text-xs">
                  {formik.touched.birthday && formik.errors.birthday ? (
                    <div className="error">{formik.errors.birthday}</div>
                  ) : null}
                </span>
              </span>
              <input
                type="date"
                id="birthday"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.birthday}
                name="birthday"
                className="mt-1 p-2 w-full border text-gray-800"
              />
            </div>
            <hr className="w-[87rem]" /> <br />
            <div>
              <span className="flex justify-between items-center">
                <label
                  htmlFor="firstname"
                  className="text-sm font-medium text-gray-600"
                >
                  FIRST NAME
                </label>
                <span className="text-red-600 text-xs">
                  {formik.touched.firstname && formik.errors.firstname ? (
                    <div className="error">{formik.errors.firstname}</div>
                  ) : null}
                </span>
              </span>
              <input
                type="text"
                id="firstname"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstname}
                name="firstname"
                className="mt-1 p-2 w-full border text-gray-800"
              />
            </div>
            <div>
              <span className="flex justify-between items-center">
                <label
                  htmlFor="lastname"
                  className="text-sm font-medium text-gray-600"
                >
                  LAST NAME
                </label>
                <span className="text-red-600 text-xs">
                  {formik.touched.lastname && formik.errors.lastname ? (
                    <div className="error">{formik.errors.lastname}</div>
                  ) : null}
                </span>
              </span>
              <input
                type="text"
                id="lastname"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastname}
                name="lastname"
                className="mt-1 p-2 w-full border text-gray-800"
              />
            </div>
            <div>
              <span className="flex justify-between items-center">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-gray-600"
                >
                  PHONE NUMBER
                </label>
                <span className="text-red-600 text-xs">
                  {formik.touched.phone && formik.errors.phone ? (
                    <div className="error">{formik.errors.phone}</div>
                  ) : null}
                </span>
              </span>
              <input
                type="text"
                id="phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                name="phone"
                className="mt-1 p-2 w-full border text-gray-800"
              />
            </div>
            <div>
              <label
                htmlFor="country"
                className="text-sm font-medium text-gray-600"
              >
                COUNTRY
              </label>
              <select
                defaultValue={1}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.country}
                id="country"
                name="country"
                className="mt-1 p-2 w-full border text-gray-800"
              >
                <option value={1}>United status</option>
                <option value={2}>Poland</option>
              </select>
            </div>
            <div>
              <span className="flex justify-between items-center">
                <label
                  htmlFor="address1"
                  className="text-sm font-medium text-gray-600"
                >
                  ADDRESS LINE 1
                </label>
                <span className="text-red-600 text-xs">
                  {formik.touched.address1 && formik.errors.address1 ? (
                    <div className="error">{formik.errors.address1}</div>
                  ) : null}
                </span>
              </span>
              <input
                type="text"
                id="address1"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address1}
                name="address1"
                className="mt-1 p-2 w-full border text-gray-800"
              />
            </div>
            <div>
              <span className="flex justify-between items-center">
                <label
                  htmlFor="address2"
                  className="text-sm font-medium text-gray-600"
                >
                  ADDRESS LINE 2
                </label>
                <span className="text-red-600 text-xs">
                  {formik.touched.address2 && formik.errors.address2 ? (
                    <div className="error">{formik.errors.address2}</div>
                  ) : null}
                </span>
              </span>
              <input
                type="text"
                id="address2"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address2}
                name="address2"
                className="mt-1 p-2 w-full border text-gray-800"
              />
            </div>
            <div>
              <label
                htmlFor="province"
                className="text-sm font-medium text-gray-600"
              >
                STATE/PROVINCE
              </label>
              <select
                defaultValue={1}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.province}
                id="province"
                name="province"
                className="mt-1 p-2 w-full border text-gray-800"
              >
                <option value={1}>New York</option>
                <option value={2}>Miami</option>
                <option value={3}>California</option>
                <option value={4}>Florida</option>
              </select>
            </div>
            <div>
              <span className="flex justify-between items-center">
                <label
                  htmlFor="postcode"
                  className="text-sm font-medium text-gray-600"
                >
                  ZIP/POSTCODE
                </label>
                <span className="text-red-600 text-xs">
                  {formik.touched.postcode && formik.errors.postcode ? (
                    <div className="error">{formik.errors.postcode}</div>
                  ) : null}
                </span>
              </span>
              <input
                type="text"
                id="postcode"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.postcode}
                name="postcode"
                className="mt-1 p-2 w-full border text-gray-800"
              />
            </div>
            <br />
          </div>
          <ReCAPTCHA
            className="recaptcha"
            onChange={onChangeBot}
            sitekey={SITE_KEY}
            ref={recaptchaRef as React.RefObject<ReCAPTCHA>}
          />
          <div className="text-center">
            <button
              type="submit"
              className="p-3 text-white bg-[#173B4C] w-[10rem]"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
