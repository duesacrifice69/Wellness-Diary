import { useRef } from "react";
import useGetImageHeight from "../../hooks/useGetImageHeight";
import { BottomLine, Heading } from "../../components/Common";
import { servicesData } from "../../constants";
import Service from "../../components/Services/Service";

export default function Services() {
  const imgRef = useRef();
  const imgH = useGetImageHeight(imgRef);

  return (
    <div>
      <div className="absolute top-[160px] left-0 z-[-1]">
        <img
          ref={imgRef}
          src="/services-bg.jpg"
          alt="services background"
          className="w-screen opacity-50"
        />
        <BottomLine />
      </div>
      <div
        style={{
          height: imgH === 0 ? "calc(100vh - 160px)" : imgH,
        }}
        className="text-primary font-work text-lg flex flex-col justify-center"
      >
        <div className="">Home / Services</div>
      </div>
      <Heading className="pt-16 pb-5">Our Services</Heading>
      <div className="flex flex-wrap justify-evenly mb-20">
        {servicesData.map(({ title, image, description, benefits }, i) => (
          <Service
            key={i}
            title={title}
            image={image}
            description={description}
            benefits={benefits}
          />
        ))}
      </div>
    </div>
  );
}
