import { Link, NavLink, useLocation } from "react-router-dom";
import { Search } from "../Icon";
import { Avatar, Button } from "./";
import { useAuth } from "../../context/AuthContext";
import { navigation } from "../../constants";

export default function Navbar() {
  const location = useLocation();
  const authPage = ["/login", "/register"].includes(
    location.pathname.toLowerCase()
  );
  const { user, logout } = useAuth();
  const childRouteIsActive = (parentRoute) =>
    location.pathname.toLowerCase().startsWith(parentRoute.toLowerCase());

  return (
    <div className="w-full bg-primary h-20 px-4">
      <div className="flex content-center max-w-screen-lg h-full mx-auto justify-between font-work text-textPrimary text-lg conte">
        <nav className="flex py-5 gap-[20px]">
          {navigation.map((item, i) => (
            <div key={i} className="pt-[6px]">
              {item?.sub ? (
                <div
                  tabIndex="0"
                  className={
                    (childRouteIsActive(item.path) ? "active " : "") +
                    "relative flex hover:text-accent cursor-pointer flex-wrap gap-1 content-center group focus:outline-none"
                  }
                >
                  {item.name}
                  <span className="border-[6px] ml-1 mt-3 group-hover:border-t-accent group-focus:rotate-180 group-focus:mt-0 group-focus:mb-3 border-t-inherit border-transparent"></span>
                  <div className="absolute transition-[visibility,opacity] invisible opacity-0 duration-300 group-focus:visible group-focus:opacity-100 left-[75%] top-[75%] mt-2 rounded-md w-48 bg-white py-1 shadow-lg">
                    {item.sub.map((sub, i) => (
                      <NavLink
                        key={i}
                        to={sub.path}
                        className="py-2 block px-4 hover:text-black text-primary hover:bg-accent"
                      >
                        {sub.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink
                  to={item.path}
                  className="flex hover:text-accent cursor-pointer flex-wrap content-center"
                >
                  {item.name}
                </NavLink>
              )}
            </div>
          ))}
        </nav>
        {!authPage && (
          <div className="flex gap-14 items-center my-auto">
            <Search className="cursor-pointer" />
            {user ? (
              <div
                tabIndex="0"
                className="relative cursor-pointer h-full py-[15px] group focus:outline-none"
              >
                <Avatar />
                <div className="absolute transition-[visibility,opacity] invisible opacity-0 duration-300 group-focus:visible group-focus:opacity-100 right-0 mt-2 rounded-md w-48 bg-white py-1 shadow-lg">
                  <Link
                    to="/Profile"
                    className="py-2 block px-4 hover:text-black text-primary hover:bg-accent"
                  >
                    Profile
                  </Link>
                  <div
                    onClick={logout}
                    className="py-2 px-4 hover:text-black text-primary hover:bg-accent"
                  >
                    Log Out
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/Login">
                <Button>Sign In</Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
