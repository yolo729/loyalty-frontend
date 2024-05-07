import { useState } from 'react'
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';

export const SignIn = (props: any) => {

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const his = useHistory();


  const onSub = async (e: any) => {
    e.preventDefault();
    axios.post('http://localhost:5000/login', user)
      .then((e) => {
       
        localStorage.setItem("accessToken", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJlZHN0cm9uZ0BvdXRsb29rLmNvbSIsImlhdCI6MTcxNTE5Mzk2MywiZXhwIjoxNzE1MTk3NTYzfQ.2dhoQav95a4REwoPBJxDbvg_ugBIGZkEw5voG8r28WQ")
        console.log(e.data.accessToken,'efefefef');
        props.useToast({
          message: 'Data saved successfully',
          type: 'success'
        });
        his.push("/");
      })
      .catch(error => {
        if (error.response) {
          props.useToast({
            message: 'Backend error',
            type: 'error'
          });
        } else if (error.request) {
          props.useToast({
            message: 'Backend error',
            type: 'error'
          });
        } else {
          props.useToast({
            message: 'Backend error',
            type: 'error'
          });
        }
      });
  }

  const userInput = (event: any) => {
    const { name, value } = event.target;

    setUser((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })

  }

  return (
    <section className="container bg-white ">
      <div className="grid lg:grid-cols-[1fr,1fr] gap-8 place-items-center pt-0 p-32">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold">
            Sign In
          </h1> <br />
          <div className="bg-black p-5 flex shadow-lg max-w-3xl">
            <div className=" px-4">
              <p className="text-3xl md:text-3xl text-white font-bold">Enter your email address to log in or create an account</p>
              <form onSubmit={onSub} className="mt-6">
                <div>
                  <label className="block text-white text-gray-700">Email Address</label>
                  <input type="email" name="email" id="" value={user.email} onChange={userInput} placeholder="Enter Email Address" className="w-full px-4 py-3 rounded-full bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" required />
                </div>

                <div className="mt-4">
                  <input type="password" name="password" value={user.password} onChange={userInput} id="password" placeholder="Enter Password" className="w-full px-4 py-3 rounded-full bg-gray-200 mt-2 border focus:border-blue-500
                  focus:bg-white focus:outline-none" required />
                </div>
                <button type="submit" className="w-full block bg-yellow-600 hover:bg-yellow-400 focus:bg-yellow-400 text-white font-semibold rounded-full
                px-4 py-3 mt-6">
                  Countinue
                </button>
              </form>

              <div className="mt-7 grid grid-cols-3 items-center text-gray-500">
                <hr className="border-gray-500" />
                <p className="text-center text-sm">OR</p>
                <hr className="border-gray-500" />
              </div>
              <p className="text-1xl text-white md:text-1xl font-bold text-center">
                <span>By continuing, you agree to the updated Terms of </span> <br />
                <span>Sale, Terms of Service, and Privacy Policy.</span>
              </p>
              <div className="bg-black p-5 shadow-lg">
                <div className=" px-4">
                  <button className="flex justify-around items-center text-center w-full my-0 mx-auto py-2 px-2 rounded-full font-medium shadow-lg rounded bg-white hover:bg-four">
                    <span className="w-5/6">Sign up with Google</span>
                    <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="-0.5 0 48 48" version="1.1">
                      <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g id="Color-" transform="translate(-401.000000, -860.000000)">
                          <g id="Google" transform="translate(401.000000, 860.000000)">
                            <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"> </path>
                            <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"> </path>
                            <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"> </path>
                            <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"> </path>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </button> <br />
                  <button className="flex justify-around items-center text-center w-full my-0 mx-auto py-2 px-2 rounded-full font-medium shadow-lg rounded bg-white hover:bg-four">
                    <span className="w-5/6">Sign up with Facebook</span>
                    <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" version="1.1">
                      <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g id="Color-" transform="translate(-200.000000, -160.000000)" fill="#4460A0">
                          <path d="M225.638355,208 L202.649232,208 C201.185673,208 200,206.813592 200,205.350603 L200,162.649211 C200,161.18585 201.185859,160 202.649232,160 L245.350955,160 C246.813955,160 248,161.18585 248,162.649211 L248,205.350603 C248,206.813778 246.813769,208 245.350955,208 L233.119305,208 L233.119305,189.411755 L239.358521,189.411755 L240.292755,182.167586 L233.119305,182.167586 L233.119305,177.542641 C233.119305,175.445287 233.701712,174.01601 236.70929,174.01601 L240.545311,174.014333 L240.545311,167.535091 C239.881886,167.446808 237.604784,167.24957 234.955552,167.24957 C229.424834,167.24957 225.638355,170.625526 225.638355,176.825209 L225.638355,182.167586 L219.383122,182.167586 L219.383122,189.411755 L225.638355,189.411755 L225.638355,208 L225.638355,208 Z" id="Facebook">
                          </path>
                        </g>
                      </g>
                    </svg>
                  </button> <br />
                  <button className="flex justify-around items-center text-center w-full my-0 mx-auto py-2 px-2 rounded-full font-medium shadow-lg rounded bg-white hover:bg-four ">
                    <span className="w-5/6">Sign up with Apple</span>
                    <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="-1.5 0 20 20" version="1.1">
                      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g id="Dribbble-Light-Preview" transform="translate(-102.000000, -7439.000000)" fill="#000000">
                          <g id="icons" transform="translate(56.000000, 160.000000)">
                            <path d="M57.5708873,7282.19296 C58.2999598,7281.34797 58.7914012,7280.17098 58.6569121,7279 C57.6062792,7279.04 56.3352055,7279.67099 55.5818643,7280.51498 C54.905374,7281.26397 54.3148354,7282.46095 54.4735932,7283.60894 C55.6455696,7283.69593 56.8418148,7283.03894 57.5708873,7282.19296 M60.1989864,7289.62485 C60.2283111,7292.65181 62.9696641,7293.65879 63,7293.67179 C62.9777537,7293.74279 62.562152,7295.10677 61.5560117,7296.51675 C60.6853718,7297.73474 59.7823735,7298.94772 58.3596204,7298.97372 C56.9621472,7298.99872 56.5121648,7298.17973 54.9134635,7298.17973 C53.3157735,7298.17973 52.8162425,7298.94772 51.4935978,7298.99872 C50.1203933,7299.04772 49.0738052,7297.68074 48.197098,7296.46676 C46.4032359,7293.98379 45.0330649,7289.44985 46.8734421,7286.3899 C47.7875635,7284.87092 49.4206455,7283.90793 51.1942837,7283.88393 C52.5422083,7283.85893 53.8153044,7284.75292 54.6394294,7284.75292 C55.4635543,7284.75292 57.0106846,7283.67793 58.6366882,7283.83593 C59.3172232,7283.86293 61.2283842,7284.09893 62.4549652,7285.8199 C62.355868,7285.8789 60.1747177,7287.09489 60.1989864,7289.62485" id="apple-[#173]">
                            </path>
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
        <div className='mb-[65%]'>
          <h1 className="text-3xl md:text-5xl font-bold">
            New Customer?
          </h1> <br />
          <a href="signup">
            <button type="button" className="mt-2 w-full btn-outline-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline rounded-full border border-blue-500 hover:bg-blue-500 text-blue-500 hover:text-white font-normal py-2 px-4">
              Create an Account
            </button>
          </a> <br />
          <div className="bg-black p-5 mt-2 shadow-lg">
            <div className=" px-4">
              <button className="flex justify-around items-center text-center w-full my-0 mx-auto py-2 px-2 rounded-full font-medium shadow-lg rounded bg-white hover:bg-four">
                <span className="w-5/6">Sign up with Google</span>
                <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="-0.5 0 48 48" version="1.1">
                  <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="Color-" transform="translate(-401.000000, -860.000000)">
                      <g id="Google" transform="translate(401.000000, 860.000000)">
                        <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"> </path>
                        <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"> </path>
                        <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"> </path>
                        <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"> </path>
                      </g>
                    </g>
                  </g>
                </svg>
              </button> <br />
              <button className="flex justify-around items-center text-center w-full my-0 mx-auto py-2 px-2 rounded-full font-medium shadow-lg rounded bg-white hover:bg-four">
                <span className="w-5/6">Sign up with Facebook</span>
                <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" version="1.1">
                  <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="Color-" transform="translate(-200.000000, -160.000000)" fill="#4460A0">
                      <path d="M225.638355,208 L202.649232,208 C201.185673,208 200,206.813592 200,205.350603 L200,162.649211 C200,161.18585 201.185859,160 202.649232,160 L245.350955,160 C246.813955,160 248,161.18585 248,162.649211 L248,205.350603 C248,206.813778 246.813769,208 245.350955,208 L233.119305,208 L233.119305,189.411755 L239.358521,189.411755 L240.292755,182.167586 L233.119305,182.167586 L233.119305,177.542641 C233.119305,175.445287 233.701712,174.01601 236.70929,174.01601 L240.545311,174.014333 L240.545311,167.535091 C239.881886,167.446808 237.604784,167.24957 234.955552,167.24957 C229.424834,167.24957 225.638355,170.625526 225.638355,176.825209 L225.638355,182.167586 L219.383122,182.167586 L219.383122,189.411755 L225.638355,189.411755 L225.638355,208 L225.638355,208 Z" id="Facebook">
                      </path>
                    </g>
                  </g>
                </svg>
              </button> <br />
              <button className="flex justify-around items-center text-center w-full my-0 mx-auto py-2 px-2 rounded-full font-medium shadow-lg rounded bg-white hover:bg-four ">
                <span className="w-5/6">Sign up with Apple</span>
                <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="-1.5 0 20 20" version="1.1">
                  <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="Dribbble-Light-Preview" transform="translate(-102.000000, -7439.000000)" fill="#000000">
                      <g id="icons" transform="translate(56.000000, 160.000000)">
                        <path d="M57.5708873,7282.19296 C58.2999598,7281.34797 58.7914012,7280.17098 58.6569121,7279 C57.6062792,7279.04 56.3352055,7279.67099 55.5818643,7280.51498 C54.905374,7281.26397 54.3148354,7282.46095 54.4735932,7283.60894 C55.6455696,7283.69593 56.8418148,7283.03894 57.5708873,7282.19296 M60.1989864,7289.62485 C60.2283111,7292.65181 62.9696641,7293.65879 63,7293.67179 C62.9777537,7293.74279 62.562152,7295.10677 61.5560117,7296.51675 C60.6853718,7297.73474 59.7823735,7298.94772 58.3596204,7298.97372 C56.9621472,7298.99872 56.5121648,7298.17973 54.9134635,7298.17973 C53.3157735,7298.17973 52.8162425,7298.94772 51.4935978,7298.99872 C50.1203933,7299.04772 49.0738052,7297.68074 48.197098,7296.46676 C46.4032359,7293.98379 45.0330649,7289.44985 46.8734421,7286.3899 C47.7875635,7284.87092 49.4206455,7283.90793 51.1942837,7283.88393 C52.5422083,7283.85893 53.8153044,7284.75292 54.6394294,7284.75292 C55.4635543,7284.75292 57.0106846,7283.67793 58.6366882,7283.83593 C59.3172232,7283.86293 61.2283842,7284.09893 62.4549652,7285.8199 C62.355868,7285.8789 60.1747177,7287.09489 60.1989864,7289.62485" id="apple-[#173]">
                        </path>
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
