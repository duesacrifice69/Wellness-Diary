import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export default function Doctors() {
  const [setActive] = useOutletContext();

  useEffect(() => setActive(3), [setActive]);
  return <div>Doctors</div>;
}
