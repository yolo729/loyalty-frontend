import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SignIn } from "./components/auth/SignIn";
import { Dashboard } from "./components/ZinreloRewards/Dashboard";
import { SignUp } from "./components/auth/SignUp";
import { Navbar } from "./components/Navbar";
import { Profile } from "./components/Profile";
import { Footer } from "./components/Footer";
import { Home } from "./components/Home";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css";

function App() {
  const useToast = (data: any) => {
    toast(data.message, { type: data.type });
  };

  const client_id = import.meta.env.VITE_CLIENT_ID;

  return (
    <>
      <GoogleOAuthProvider clientId={client_id}>
        <ToastContainer />
        <Navbar />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              path="/profile"
              render={(props) => <Profile {...props} useToast={useToast} />}
            />
            <Route
              path="/signin"
              render={(props) => <SignIn {...props} useToast={useToast} />}
            />
            <Route
              path="/signup"
              render={(props) => <SignUp {...props} useToast={useToast} />}
            />
            <Route path="/wesite_rewards" component={Dashboard} />
          </Switch>
        </BrowserRouter>
        <Footer />
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
