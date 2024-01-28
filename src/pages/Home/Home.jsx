import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export default function Home() {
  const [setActive] = useOutletContext();

  useEffect(() => setActive(0), [setActive]);

  return (
    <div className="min-h-screen">
      <div className="absolute right-0 top-[100px] w-full bg-[url('../public/home-bg.png')] h-[700px] bg-cover"></div>
    </div>
  );
}
