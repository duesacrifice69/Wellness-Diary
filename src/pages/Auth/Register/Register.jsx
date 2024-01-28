import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "../../../components";

const initState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function Register() {
  const [registerData, setRegisterData] = useState(initState);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
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
        <Input
          value={registerData.confirmPassword}
          onChange={handleChange}
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          required
        />
        <Button
          className="rounded-lg w-full text-white font-zen my-8"
          style={{ backgroundColor: "#212121" }}
        >
          GET STARTED
        </Button>
      </form>
      <div className="text-center">
        Already have an account?{" "}
        <span
          className="underline font-bold cursor-pointer"
          onClick={() => navigate("/Login")}
        >
          LOGIN HERE
        </span>
      </div>
    </div>
  );
}
