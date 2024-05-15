import { useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import { useHistory } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

export const SignIn = (props: any) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const his = useHistory();
  const onSub = async (e: any) => {
    e.preventDefault();
    axios
      .post(`${apiUrl}/signin`, user)
      .then((response) => {
        const accessToken = response.data.accessToken;
        const decodedToken = jwtDecode(accessToken) as { payload: any };
        const { userId, firstName, lastName, email, zinrelo_token } =
          decodedToken?.payload;
        console.log(decodedToken?.payload);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userId", userId);
        localStorage.setItem("userName", firstName + " " + lastName);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("zinrelo_token", zinrelo_token);
        props.useToast({
          message: "Data saved successfully",
          type: "success",
        });
        his.push("/");
      })
      .catch((error) => {
        if (error.response) {
          props.useToast({
            message: "Not correct the mail or password",
            type: "error",
          });
        }
      });
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

  // const hasAccess = hasGrantedAllScopesGoogle(
  //   gToken,
  //   "google-scope-1",
  //   "google-scope-2"
  // );

  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      await axios
        .post(`${apiUrl}/auth/google`, {
          code,
        })
        .then((response) => {
          console.log(response, "fefefef");
          return;
          const accessToken = response.data.accessToken;
          const decodedToken = jwtDecode(accessToken) as { payload: any };
          const { userId, firstName, lastName, email } = decodedToken?.payload;
          console.log(decodedToken?.payload);
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("userId", userId);
          localStorage.setItem("userName", firstName + " " + lastName);
          localStorage.setItem("userEmail", email);

          props.useToast({
            message: "Data saved successfully",
            type: "success",
          });
          his.push("/");
        })
        .catch((error) => {
          alert();
          if (error.response) {
            props.useToast({
              message: "Not correct the mail or password",
              type: "error",
            });
          }
        });
    },
    flow: "auth-code",
  });

  return (
    <section className="container bg-[whitesmoke]">
      <div className="pt-[5%] grid lg:grid-cols-[1fr,1fr] gap-8 place-items-center pt-0 p-32">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold">Sign In</h1> <br />
          <div className="bg-white rounded-lg p-5 flex shadow-lg max-w-3xl">
            <div className=" px-4">
              <p className="text-3xl md:text-3xl text-black font-bold">
                Enter your email address to log in or create an account
              </p>
              <form onSubmit={onSub} className="mt-6">
                <div>
                  <label className="block text-white text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id=""
                    value={user.email}
                    onChange={userInput}
                    placeholder="Enter Email Address"
                    className="w-full px-4 py-3 rounded-full bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                    required
                  />
                </div>

                <div className="mt-4">
                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={userInput}
                    id="password"
                    placeholder="Enter Password"
                    className="w-full px-4 py-3 rounded-full bg-gray-200 mt-2 border focus:border-blue-500
                  focus:bg-white focus:outline-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="transform hover:scale-[1.1] duration-500 w-full block bg-[gray] hover:bg-[#E5E7EB] focus:bg-[#E5E7EB] text-white font-semibold rounded-full
                px-4 py-3 mt-6"
                >
                  Countinue
                </button>
              </form>

              <div className="mt-7 grid grid-cols-3 items-center text-gray-500">
                <hr className="border-gray-500" />
                <p className="text-center text-sm">OR</p>
                <hr className="border-gray-500" />
              </div>
              <p className="text-1xl text-white md:text-1xl font-bold text-center">
                <span>By continuing, you agree to the updated Terms of </span>{" "}
                <br />
                <span>Sale, Terms of Service, and Privacy Policy.</span>
              </p>
              <div className="p-5 shadow-lg">
                <div className=" px-4">
                  <button
                    onClick={() => googleLogin()}
                    className="transform hover:scale-[1.1] duration-500 flex justify-around items-center text-center w-full my-0 mx-auto py-2 px-2 rounded-full font-medium shadow-lg rounded bg-white hover:bg-four"
                  >
                    <span className="w-5/6">Continue with Google</span>
                    <svg
                      className="h-6 w-6 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="-0.5 0 48 48"
                      version="1.1"
                    >
                      <g
                        id="Icons"
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                      >
                        <g
                          id="Color-"
                          transform="translate(-401.000000, -860.000000)"
                        >
                          <g
                            id="Google"
                            transform="translate(401.000000, 860.000000)"
                          >
                            <path
                              d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                              id="Fill-1"
                              fill="#FBBC05"
                            >
                              {" "}
                            </path>
                            <path
                              d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                              id="Fill-2"
                              fill="#EB4335"
                            >
                              {" "}
                            </path>
                            <path
                              d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                              id="Fill-3"
                              fill="#34A853"
                            >
                              {" "}
                            </path>
                            <path
                              d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                              id="Fill-4"
                              fill="#4285F4"
                            >
                              {" "}
                            </path>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </button>{" "}
                  <br />
                  <button className="transform hover:scale-[1.1] duration-500 flex justify-around items-center text-center h-10 w-full my-0 mx-auto py-2 px-2 rounded-full font-medium shadow-lg text-black bg-[#3B4DD2] rounded bg-white hover:bg-four">
                    <span className="w-5/6">Continue with FaceBook</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      viewBox="-204.79995 -341.33325 1774.9329 2047.9995"
                    >
                      <path
                        d="M1365.333 682.667C1365.333 305.64 1059.693 0 682.667 0 305.64 0 0 305.64 0 682.667c0 340.738 249.641 623.16 576 674.373V880H402.667V682.667H576v-150.4c0-171.094 101.917-265.6 257.853-265.6 74.69 0 152.814 13.333 152.814 13.333v168h-86.083c-84.804 0-111.25 52.623-111.25 106.61v128.057h189.333L948.4 880H789.333v477.04c326.359-51.213 576-333.635 576-674.373"
                        fill="#1877f2"
                      />
                      <path
                        d="M948.4 880l30.267-197.333H789.333V554.609C789.333 500.623 815.78 448 900.584 448h86.083V280s-78.124-13.333-152.814-13.333c-155.936 0-257.853 94.506-257.853 265.6v150.4H402.667V880H576v477.04a687.805 687.805 0 00106.667 8.293c36.288 0 71.91-2.84 106.666-8.293V880H948.4"
                        fill="#fff"
                      />
                    </svg>
                  </button>{" "}
                  <br />
                  <button
                    style={{ border: "1px solid cadetblue" }}
                    className="transform hover:scale-[1.1] duration-500 border-[#243c5a] flex justify-around items-center text-center w-full my-0 mx-auto py-2 px-2 rounded-full font-medium shadow-lg text-white rounded bg-[cadetblue] hover:bg-four "
                  >
                    <span className="w-5/6">Continue with Apple</span>
                    <svg
                      className="h-6 w-6 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="-1.5 0 20 20"
                      version="1.1"
                    >
                      <g
                        id="Page-1"
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                      >
                        <g
                          id="Dribbble-Light-Preview"
                          transform="translate(-102.000000, -7439.000000)"
                          fill="#000000"
                        >
                          <g
                            id="icons"
                            transform="translate(56.000000, 160.000000)"
                          >
                            <path
                              d="M57.5708873,7282.19296 C58.2999598,7281.34797 58.7914012,7280.17098 58.6569121,7279 C57.6062792,7279.04 56.3352055,7279.67099 55.5818643,7280.51498 C54.905374,7281.26397 54.3148354,7282.46095 54.4735932,7283.60894 C55.6455696,7283.69593 56.8418148,7283.03894 57.5708873,7282.19296 M60.1989864,7289.62485 C60.2283111,7292.65181 62.9696641,7293.65879 63,7293.67179 C62.9777537,7293.74279 62.562152,7295.10677 61.5560117,7296.51675 C60.6853718,7297.73474 59.7823735,7298.94772 58.3596204,7298.97372 C56.9621472,7298.99872 56.5121648,7298.17973 54.9134635,7298.17973 C53.3157735,7298.17973 52.8162425,7298.94772 51.4935978,7298.99872 C50.1203933,7299.04772 49.0738052,7297.68074 48.197098,7296.46676 C46.4032359,7293.98379 45.0330649,7289.44985 46.8734421,7286.3899 C47.7875635,7284.87092 49.4206455,7283.90793 51.1942837,7283.88393 C52.5422083,7283.85893 53.8153044,7284.75292 54.6394294,7284.75292 C55.4635543,7284.75292 57.0106846,7283.67793 58.6366882,7283.83593 C59.3172232,7283.86293 61.2283842,7284.09893 62.4549652,7285.8199 C62.355868,7285.8789 60.1747177,7287.09489 60.1989864,7289.62485"
                              id="apple-[#173]"
                              fill="#FFFFFF"
                            ></path>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-[65%]">
          <h1 className="text-3xl md:text-5xl font-bold">New Customer?</h1>{" "}
          <br />
          <a href="signup">
            <button
              type="button"
              className="mt-2 w-full btn-outline-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline rounded-full border border-blue-500 hover:bg-blue-500 text-blue-500 hover:text-white font-normal py-2 px-4"
            >
              Create an Account
            </button>
          </a>{" "}
          <br />
          <div className="bg-white rounded-lg p-5 mt-2 shadow-lg">
            <div className=" px-4">
              <button
                onClick={() => googleLogin()}
                className="transform hover:scale-[1.1] duration-500 flex justify-around items-center text-center w-full my-0 mx-auto py-2 px-2 rounded-full font-medium shadow-lg rounded bg-white hover:bg-four"
              >
                <span className="w-5/6">Continue with Google</span>
                <svg
                  className="h-6 w-6 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="-0.5 0 48 48"
                  version="1.1"
                >
                  <g
                    id="Icons"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <g
                      id="Color-"
                      transform="translate(-401.000000, -860.000000)"
                    >
                      <g
                        id="Google"
                        transform="translate(401.000000, 860.000000)"
                      >
                        <path
                          d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                          id="Fill-1"
                          fill="#FBBC05"
                        >
                          {" "}
                        </path>
                        <path
                          d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                          id="Fill-2"
                          fill="#EB4335"
                        >
                          {" "}
                        </path>
                        <path
                          d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                          id="Fill-3"
                          fill="#34A853"
                        >
                          {" "}
                        </path>
                        <path
                          d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                          id="Fill-4"
                          fill="#4285F4"
                        >
                          {" "}
                        </path>
                      </g>
                    </g>
                  </g>
                </svg>
              </button>{" "}
              <br />
              <button className="transform hover:scale-[1.1] duration-500 flex justify-around items-center text-center h-10 w-full my-0 mx-auto py-2 px-2 rounded-full font-medium shadow-lg text-black bg-[#3B4DD2] rounded bg-white hover:bg-four">
                <span className="w-5/6">Continue with FaceBook</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  viewBox="-204.79995 -341.33325 1774.9329 2047.9995"
                >
                  <path
                    d="M1365.333 682.667C1365.333 305.64 1059.693 0 682.667 0 305.64 0 0 305.64 0 682.667c0 340.738 249.641 623.16 576 674.373V880H402.667V682.667H576v-150.4c0-171.094 101.917-265.6 257.853-265.6 74.69 0 152.814 13.333 152.814 13.333v168h-86.083c-84.804 0-111.25 52.623-111.25 106.61v128.057h189.333L948.4 880H789.333v477.04c326.359-51.213 576-333.635 576-674.373"
                    fill="#1877f2"
                  />
                  <path
                    d="M948.4 880l30.267-197.333H789.333V554.609C789.333 500.623 815.78 448 900.584 448h86.083V280s-78.124-13.333-152.814-13.333c-155.936 0-257.853 94.506-257.853 265.6v150.4H402.667V880H576v477.04a687.805 687.805 0 00106.667 8.293c36.288 0 71.91-2.84 106.666-8.293V880H948.4"
                    fill="#fff"
                  />
                </svg>
              </button>{" "}
              <br />
              <button
                style={{ border: "1px solid cadetblue" }}
                className="transform hover:scale-[1.1] duration-500 border-[#243c5a] flex justify-around items-center text-center w-full my-0 mx-auto py-2 px-2 rounded-full font-medium shadow-lg text-white rounded bg-[cadetblue] hover:bg-four "
              >
                <span className="w-5/6">Continue with Apple</span>
                <svg
                  className="h-6 w-6 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="-1.5 0 20 20"
                  version="1.1"
                >
                  <g
                    id="Page-1"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <g
                      id="Dribbble-Light-Preview"
                      transform="translate(-102.000000, -7439.000000)"
                      fill="#000000"
                    >
                      <g
                        id="icons"
                        transform="translate(56.000000, 160.000000)"
                      >
                        <path
                          d="M57.5708873,7282.19296 C58.2999598,7281.34797 58.7914012,7280.17098 58.6569121,7279 C57.6062792,7279.04 56.3352055,7279.67099 55.5818643,7280.51498 C54.905374,7281.26397 54.3148354,7282.46095 54.4735932,7283.60894 C55.6455696,7283.69593 56.8418148,7283.03894 57.5708873,7282.19296 M60.1989864,7289.62485 C60.2283111,7292.65181 62.9696641,7293.65879 63,7293.67179 C62.9777537,7293.74279 62.562152,7295.10677 61.5560117,7296.51675 C60.6853718,7297.73474 59.7823735,7298.94772 58.3596204,7298.97372 C56.9621472,7298.99872 56.5121648,7298.17973 54.9134635,7298.17973 C53.3157735,7298.17973 52.8162425,7298.94772 51.4935978,7298.99872 C50.1203933,7299.04772 49.0738052,7297.68074 48.197098,7296.46676 C46.4032359,7293.98379 45.0330649,7289.44985 46.8734421,7286.3899 C47.7875635,7284.87092 49.4206455,7283.90793 51.1942837,7283.88393 C52.5422083,7283.85893 53.8153044,7284.75292 54.6394294,7284.75292 C55.4635543,7284.75292 57.0106846,7283.67793 58.6366882,7283.83593 C59.3172232,7283.86293 61.2283842,7284.09893 62.4549652,7285.8199 C62.355868,7285.8789 60.1747177,7287.09489 60.1989864,7289.62485"
                          id="apple-[#173]"
                          fill="#FFFFFF"
                        ></path>
                      </g>
                    </g>
                  </g>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
