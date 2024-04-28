import { useEffect, useState } from "react";

export default function useGetImageHeight(imageRef) {
  const [imageHeight, setImageHeight] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (imageRef.current.offsetHeight > 0) {
        setImageHeight(imageRef.current.offsetHeight);
        clearInterval(interval);
      }
    }, 1);

    return () => clearInterval(interval);
  }, [imageRef]);

  return imageHeight;
}
