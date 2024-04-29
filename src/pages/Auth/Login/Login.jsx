import { useRef, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { Button, Input } from "../../../components/Common";
import { useAuth } from "../../../context/AuthContext";
// import { Google } from "../../../components/Icon";

const initState = {
  username: "",
  password: "",
};

export default function Login() {
  const [loginData, setLoginData] = useState(initState);
  const { setNotification } = useOutletContext();
  const inputRef = useRef();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(loginData, (err) => {
      setNotification({ type: "error", message: err, timestamp: new Date() });
    });
  };

  const handleForgotPassword = () => {};

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-[#FAFAFA] w-[460px] rounded-3xl absolute bottom-0 right-0 rounded-b-none p-10 font-zen text-black">
      <div className="text-[13px] font-meduim">WELCOME BACK</div>
      <div className="text-[25px] font-semibold my-2">Sign to continue</div>
      <form ref={inputRef} onSubmit={handleSubmit} className="my-10">
        <Input
          value={loginData.username}
          onChange={handleChange}
          name="username"
          label="Username"
          required
        />
        <Input
          value={loginData.password}
          onChange={handleChange}
          name="password"
          type="password"
          label="Password"
          required
        />
        <div
          className="flex max-w-max ml-auto font-bold hover:underline mb-5 cursor-pointer"
          onClick={handleForgotPassword}
        >
          Forgot Password ?
        </div>
        <Button
          style={{ backgroundColor: "#212121" }}
          className="rounded-lg w-full text-white font-zen"
        >
          LOGIN
        </Button>
      </form>
      {/* <div className="relative mt-[-20px] mb-5">
        <hr />
        <div className="absolute top-[-12px] right-0 left-0 max-w-min font-bold bg-[#FAFAFA] px-4 m-auto">
          Or
        </div>
      </div>
      <button
        className="w-full flex items-center relative justify-center rounded-lg border-2 border-[#EEE] h-12"
        onClick={(e) => login(e, "google")}
      >
        <Google className="absolute left-10" /> Sign in with Google
      </button> */}

      <div className="text-center mt-4">
        Don't have an account?{" "}
        <Link className="underline font-bold cursor-pointer" to="/Register">
          REGISTER HERE
        </Link>
      </div>
    </div>
  );
}
