import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export default function Services() {
  const [setActive] = useOutletContext();

  useEffect(() => setActive(2), [setActive]);

  return <div>Services</div>;
}
