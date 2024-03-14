import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Banner, Footer, Loader, Navbar } from "../components";

export default function Layout({ auth }) {
  const [active, setActive] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(loading);
    if (!loading) setLoading(true);
  }, [navigate, loading]);

  return (
    <div>
      <Loader loading={loading} />
      <div className="w-screen fixed top-0 z-[1]">
        <Banner />
        <Navbar active={active} />
      </div>
      {auth ? (
        <Outlet context={[setActive, setLoading]} />
      ) : (
        <div className="max-w-screen-lg mx-auto mt-[160px]">
          <Outlet context={[setActive, setLoading]} />
        </div>
      )}
      <Footer />
    </div>
  );
}
