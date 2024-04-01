import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export default function usePageLoaded(activePage) {
  const [setActive, setLoading] = useOutletContext();

  useEffect(() => {
    setActive(activePage);
    const x = setTimeout(() => {
      setLoading(false);
    }, 100);
    return () => clearTimeout(x);
  }, [setLoading, setActive, activePage]);
}
