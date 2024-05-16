import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export const Profile = (props: any) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  console.log(apiUrl);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirm: "",
    firstName: "",
    lastName: "",
    id: "",
    user_data: [
      {
        country: "",
        postcode: "",
        address1: "",
        address2: "",
        birthday: "",
        phone: "",
      },
    ],
  });
  const [showInput, setShowInput] = useState(false);
  const [value, setValue] = useState("");
  const his = useHistory();

  useEffect(() => {
    const user_id = localStorage.getItem("userId");
    axios
      .get(`${apiUrl}/users/${user_id}`)
      .then((userdata) => {
        setUser(userdata.data);
      })
      .catch((error) => {
        if (error.response) {
          props.useToast({
            message: "Not correct the mail or password",
            type: "error",
          });
        }
      });
  }, []);

  const [otherValue, setOtherValue] = useState("");
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const reason = otherValue == "" ? value : otherValue;
    console.log("reason", reason);

    axios
      .put(`${apiUrl}/delete`, { reason: reason, user_id: user.id })
      .then(() => {
        props.useToast({
          message: "Data Deleted successfully",
          type: "success",
        });
        localStorage.clear();
        his.push("/");
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
  };

  const handleChange = (event: any) => {
    const selectedValue = event.target.value;
    setValue(selectedValue);
    setShowInput(selectedValue === "other");
    if (selectedValue !== "other") {
      setOtherValue("");
      setShowInput(false);
    } else {
      setShowInput(true);
    }
  };

  const handleInputChange = (event: any) => {
    setOtherValue(event.target.value);
  };

  const onSub = async (e: any) => {
    e.preventDefault();
    if (user.password !== user.confirm) {
      props.useToast({
        message: "Not match",
        type: "warning",
      });
    } else {
      axios
        .put(`${apiUrl}/users`, user)
        .then(() => {
          alert();
          props.useToast({
            message: "Data updated successfully",
            type: "success",
          });
          his.push("/");
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
          Update Account
        </h2>
        <form>
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
                value={user.email}
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
                defaultValue={user.user_data[0].birthday}
                onChange={userInput}
                name="birthday"
                className="mt-1 p-2 w-full border text-gray-800"
                required
              />
            </div>
            <hr className="w-[87rem]" /> <br />
            <div>
              <label
                htmlFor="firstName"
                className="text-sm font-medium text-gray-600"
              >
                FIRST NAME
              </label>
              <input
                type="text"
                id="firstname"
                onChange={userInput}
                value={user.firstName}
                name="firstName"
                className="mt-1 p-2 w-full border text-gray-800"
                required
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="text-sm font-medium text-gray-600"
              >
                LAST NAME
              </label>
              <input
                type="text"
                id="lastname"
                onChange={userInput}
                value={user.lastName}
                name="lastName"
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
                defaultValue={user.user_data[0].phone}
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
                onChange={userInput}
                id="country"
                defaultValue={user.user_data[0].country}
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
                defaultValue={user.user_data[0].address1}
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
                defaultValue={user.user_data[0].address2}
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
                defaultValue={user.user_data[0].postcode}
                onChange={userInput}
                name="postcode"
                className="mt-1 p-2 w-full border text-gray-800"
              />
            </div>
            <br />
          </div>
          <div className="text-center">
            <button
              type="submit"
              onClick={onSub}
              className="p-3 text-white bg-[#173B4C] w-[10rem]"
            >
              Update Account
            </button>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="p-3 float-right text-white bg-red-400 w-[10rem]"
            >
              Delete
            </button>
          </div>
        </form>
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                  {/*body*/}
                  <form onSubmit={handleSubmit}>
                    <div className="relative p-6 flex-auto">
                      <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                        Are you sure windows?
                      </p>
                      <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                        Reason for leaving
                      </p>
                      <div className="grid grid-cols-1 pt-5 gap-4">
                        <div>
                          <input
                            type="radio"
                            checked={value === "Moving"}
                            onChange={handleChange}
                            value="Moving"
                          />
                          <span className="p-2">Moving</span>
                        </div>
                        <div>
                          <input
                            type="radio"
                            checked={value === "Too many message"}
                            onChange={handleChange}
                            value="Too many message"
                          />
                          <span className="p-2">Too many message</span>
                        </div>
                        <div>
                          <input
                            type="radio"
                            checked={value === "other"}
                            onChange={handleChange}
                            value="other"
                          />
                          <span className="p-2">other</span>
                          <input
                            onChange={handleInputChange}
                            disabled={!showInput}
                            type="text"
                            id="other"
                            value={otherValue}
                            name="other"
                            className="mt-1 p-2 w-full border text-gray-800"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Yes
                      </button>
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        No
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </div>
    </section>
  );
};
