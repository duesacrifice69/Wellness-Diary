import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { Button, Input } from "../../../components/Common";
import { useAuth } from "../../../context/AuthContext";

const initState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function Register() {
  const [registerData, setRegisterData] = useState(initState);
  const { setNotification } = useOutletContext();
  const { register } = useAuth();
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;

  const isPasswordValid =
    registerData.password.length === 0 ||
    passwordRegex.test(registerData.password);
  const isPasswordMatches =
    registerData.confirmPassword.length === 0 ||
    registerData.password === registerData.confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = registerData;
    await register(
      { username, email, password },
      (msg) => {
        setNotification({
          type: "success",
          message: msg,
          timestamp: new Date(),
        });
      },
      (err) => {
        setNotification({ type: "error", message: err, timestamp: new Date() });
      }
    );
  };

  const handleChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-[#FAFAFA] w-[460px] rounded-3xl absolute bottom-0 right-0 rounded-b-none p-10 font-zen text-black">
      <div className="text-[13px] font-meduim">LET'S GET YOU STARTED</div>
      <div className="text-[25px] font-semibold my-2">Create an Account</div>
      <form onSubmit={handleSubmit} className="my-10">
        <Input
          value={registerData.username}
          onChange={handleChange}
          name="username"
          label="Username"
          required
        />
        <Input
          value={registerData.email}
          onChange={handleChange}
          name="email"
          label="Email"
          required
        />
        <Input
          value={registerData.password}
          onChange={handleChange}
          name="password"
          label="Password"
          type="password"
          required
        />
        {!isPasswordValid && (
          <div className="text-red-600 text-xs -mt-3 mb-4">
            Password must be at least 8 characters long and contain at least one
            lowercase letter, one uppercase letter, one number, and one special
            character.
          </div>
        )}
        <Input
          value={registerData.confirmPassword}
          onChange={handleChange}
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          required
        />
        {!isPasswordMatches && (
          <div className="text-red-600 text-xs -mt-3 mb-4">
            Password doesn't match
          </div>
        )}
        <Button
          className="rounded-lg w-full text-white font-zen mb-8"
          style={{ backgroundColor: "#212121" }}
          disabled={!isPasswordMatches}
        >
          GET STARTED
        </Button>
      </form>
      <div className="text-center">
        Already have an account?{" "}
        <Link className="underline font-bold cursor-pointer" to="/Login">
          LOGIN HERE
        </Link>
      </div>
    </div>
  );
}
