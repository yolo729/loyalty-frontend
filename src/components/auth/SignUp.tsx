import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";

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
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirm: "",
    birthday: "",
    firstname: "",
    lastname: "",
    phone: "",
    country: "",
    postcode: "",
    address1: "",
    address2: "",
  });

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const reCaptchaToken = recaptchaRef.current?.getValue();
    if (!reCaptchaToken) {
      props.useToast({
        message: "Please check the Bot verify",
        type: "warning",
      });

      return;
    }

    if (user.password !== user.confirm) {
      props.useToast({
        message: "Not match",
        type: "warning",
      });
    } else {
      axios
        .post(`${apiUrl}/users`, user)
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
    }
  };

  const verifyToken = async (token: any) => {
    let APIResponse = [];

    try {
      let response = await axios.post(`${apiUrl}/verify-token`, {
        reCAPTCHA_TOKEN: token,
        Secret_Key: SECRET_KEY,
      });

      props.useToast({
        message: "passed verify",
        type: "success",
      });
      APIResponse.push(response["data"]);
      return APIResponse;
    } catch (error) {
      console.log(error);
    }
  };

  const userInput = (event: any) => {
    const { name, value } = event.target;

    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <section className="container bg-white">
      <div className="p-8 w-full my-16 pt-8 p-32">
        <h2 className="text-[#173B4C] mb-6 text-center text-3xl md:text-4xl font-bold">
          New Account
        </h2>
        <form onSubmit={handleSubmit}>
          {valid_token?.length > 0 && valid_token[0].success === true ? (
            <h3 className="textSuccess">{SuccessMsg}</h3>
          ) : (
            <h3 className="textError">{ErrorMsg} </h3>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-600"
              >
                EMAIL ADDRESS
              </label>
              <input
                type="text"
                id="email"
                onChange={userInput}
                name="email"
                className="mt-1 p-2 w-full border text-gray-800"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                onChange={userInput}
                className="text-sm font-medium text-gray-600"
              >
                PASSWORD
              </label>
              <input
                type="password"
                onChange={userInput}
                id="password"
                name="password"
                className="mt-1 p-2 w-full border text-gray-800"
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirm"
                className="text-sm font-medium text-gray-600"
              >
                CONFIRM PASSWORD
              </label>
              <input
                type="password"
                id="confirm"
                onChange={userInput}
                name="confirm"
                className="mt-1 p-2 w-full border text-gray-800"
                required
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
              <label
                htmlFor="Preference"
                className="text-sm font-medium text-gray-600"
              >
                Contact Preference
              </label>
              <select
                defaultValue={1}
                onChange={userInput}
                id="Preference"
                name="Preference"
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
                referred Stores
              </label>
              <div className="grid grid-cols-2 pt-5 gap-4">
                <div>
                  <input className="p-2" onChange={userInput} type="checkbox" />
                  <span className="p-2">1407 Lexington Avenue</span>
                </div>
                <div>
                  <input className="p-2" onChange={userInput} type="checkbox" />
                  <span className="p-2">2840 Broadway</span>
                </div>
                <div>
                  <input className="p-2" onChange={userInput} type="checkbox" />
                  <span className="p-2">170 West 23rd Street</span>
                </div>
                <div>
                  <input className="p-2" onChange={userInput} type="checkbox" />
                  <span className="p-2">77 Seventh Ave</span>
                </div>
                <div>
                  <input className="p-2" onChange={userInput} type="checkbox" />
                  <span className="p-2">180 Third Ave</span>
                </div>
                <div>
                  <input className="p-2" onChange={userInput} type="checkbox" />
                  <span className="p-2">84 Third Ave</span>
                </div>
                <div>
                  <input className="p-2" onChange={userInput} type="checkbox" />
                  <span className="p-2">2589 Broadway</span>
                </div>
                <div>
                  <input className="p-2" type="checkbox" />
                  <span className="p-2">Maywood's Market</span>
                </div>
              </div>
            </div>
            <div className="w-48">
              <label
                htmlFor="birthday"
                className="text-sm font-medium text-gray-600"
              >
                BIRTHDAY
              </label>
              <input
                type="date"
                id="birthday"
                onChange={userInput}
                name="birthday"
                className="mt-1 p-2 w-full border text-gray-800"
                required
              />
            </div>
            <hr className="w-[87rem]" /> <br />
            <div>
              <label
                htmlFor="firstname"
                className="text-sm font-medium text-gray-600"
              >
                FIRST NAME
              </label>
              <input
                type="text"
                id="firstname"
                onChange={userInput}
                name="firstname"
                className="mt-1 p-2 w-full border text-gray-800"
                required
              />
            </div>
            <div>
              <label
                htmlFor="lastname"
                className="text-sm font-medium text-gray-600"
              >
                LAST NAME
              </label>
              <input
                type="text"
                id="lastname"
                onChange={userInput}
                name="lastname"
                className="mt-1 p-2 w-full border text-gray-800"
                required
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="text-sm font-medium text-gray-600"
              >
                PHONE NUMBER
              </label>
              <input
                type="number"
                id="phone"
                onChange={userInput}
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
                onChange={userInput}
                id="country"
                name="country"
                className="mt-1 p-2 w-full border text-gray-800"
              >
                <option value={1}>United status</option>
                <option value={2}>Poland</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="address1"
                className="text-sm font-medium text-gray-600"
              >
                ADDRESS LINE 1
              </label>
              <input
                type="text"
                onChange={userInput}
                id="address1"
                name="address1"
                className="mt-1 p-2 w-full border text-gray-800"
              />
            </div>
            <div>
              <label
                htmlFor="address2"
                className="text-sm font-medium text-gray-600"
              >
                ADDRESS LINE 2
              </label>
              <input
                type="text"
                onChange={userInput}
                id="address2"
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
                onChange={userInput}
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
              <label
                htmlFor="postcode"
                className="text-sm font-medium text-gray-600"
              >
                ZIP/POSTCODE
              </label>
              <input
                type="text"
                id="postcode"
                onChange={userInput}
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
