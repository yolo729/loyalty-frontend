import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignIn } from "./components/auth/SignIn";
import { SignUp } from "./components/auth/SignUp";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./components/Home";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      <Footer />

    </>
  );
}

export default App;
