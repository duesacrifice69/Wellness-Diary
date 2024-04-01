import { useRef } from "react";
import useGetImageHeight from "../../hooks/useGetImageHeight";
import { BottomLine } from "../../components";
import { servicesSampleData } from "../../common";
import Service from "./ServiceComp";
import usePageLoaded from "../../hooks/usePageLoaded";

export default function Services() {
  const imgRef = useRef();
  const imgH = useGetImageHeight(imgRef);

  usePageLoaded(2);

  return (
    <div>
      <div className="absolute top-[160px] left-0 z-[-1]">
        <img
          ref={imgRef}
          src="/news-bg.svg"
          alt="news background"
          className="w-screen opacity-50"
        />
        <BottomLine />
      </div>
      <div
        style={{
          height: imgH === 0 ? "calc(100vh - 160px)" : imgH,
        }}
        className="text-primary font-work text-lg flex flex-col justify-center mb-5"
      >
        <div className="">Home / Services</div>
        <div className="h-7" />
      </div>
      <div className="flex flex-wrap gap justify-evenly my-20">
        {servicesSampleData.map(({ title, image, description }, i) => (
          <Service
            key={i}
            title={title}
            image={image}
            description={description}
          />
        ))}
      </div>
    </div>
  );
}
