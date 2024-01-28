import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export default function News() {
  const [setActive] = useOutletContext();

  useEffect(() => setActive(4), [setActive]);
  return <div>News</div>;
}
