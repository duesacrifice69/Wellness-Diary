import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export default function AboutUs() {
  const [setActive] = useOutletContext();

  useEffect(() => setActive(1), [setActive]);
  return <div>AboutUs</div>;
}
