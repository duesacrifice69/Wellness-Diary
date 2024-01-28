import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Banner, Footer, Navbar } from "../components";

export default function Layout({ auth }) {
  const [active, setActive] = useState();

  return (
    <div>
      <div className="w-screen fixed top-0 z-[1]">
        <Banner />
        <Navbar active={active} />
      </div>
      {auth ? (
        <Outlet context={[setActive]} />
      ) : (
        <div className="max-w-screen-lg mx-auto mt-[160px]">
          <Outlet context={[setActive]} />
        </div>
      )}
      <Footer />
    </div>
  );
}
