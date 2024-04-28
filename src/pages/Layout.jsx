import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Banner, Footer, Navbar, Notification } from "../components/Common";

export default function Layout({ auth }) {
  const [notification, setNotification] = useState();

  return (
    <div>
      <div className="w-screen fixed top-0 z-[1]">
        <Banner />
        <Navbar />
      </div>
      <Notification {...notification} setNotification={setNotification} />
      {auth ? (
        <Outlet context={{ setNotification }} />
      ) : (
        <div className="max-w-screen-lg mx-auto mt-[160px]">
          <Outlet context={{ setNotification }} />
        </div>
      )}
      <Footer />
    </div>
  );
}
