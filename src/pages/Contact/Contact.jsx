import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export default function Contact() {
  const [setActive] = useOutletContext();

  useEffect(() => setActive(5), [setActive]);
  return <div>Contact</div>;
}
