import { useNavigate } from "react-router-dom";
import { Search } from "../icons";
import { Avatar, Button } from "../components";
import { useAuth } from "../context/AuthContext";

const navigation = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/AboutUs" },
  { name: "Services", path: "/Services" },
  { name: "Doctors", path: "/Doctors" },
  { name: "News", path: "/News" },
  { name: "Contact", path: "/Contact" },
];

export default function Navbar({ active }) {
  const navigate = useNavigate();
  const auth = active < 0;
  const { user, logout } = useAuth();

  return (
    <div className="w-full bg-primary h-20 px-4">
      <div className="flex content-center max-w-screen-lg h-full mx-auto justify-between font-work text-textPrimary text-lg conte">
        <div className="flex py-5 gap-[20px]">
          {navigation.map((item, i) => (
            <div
              key={i}
              onClick={() => navigate(item.path)}
              className={`${
                active === i ? "text-accent" : ""
              } flex hover:text-accent cursor-pointer flex-wrap content-center`}
            >
              {item.name}
            </div>
          ))}
        </div>
        {!auth && (
          <div className="flex gap-14 items-center my-auto">
            <Search className="cursor-pointer" />
            {user ? (
              <div className="group cursor-pointer h-full py-[15px]">
                <Avatar />
                <div className="relative">
                  <div className="hidden absolute top-[15px] left-[-35px] w-[120px] text-center bg-primary text-textPrimary hover:block group-hover:block">
                    <div onClick={logout} className="py-2 hover:text-accent">
                      Log Out
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Button onClick={() => navigate("/Login")}>Sign In</Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
