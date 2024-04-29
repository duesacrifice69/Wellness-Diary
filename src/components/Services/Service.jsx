import { Checkup } from "../Icon";

export default function Service({ title, description, image, benefits }) {
  return (
    <div className="hover:cursor-pointer w-80 text-primary font-work group rounded-lg shadow-lg border my-5 overflow-hidden">
      <div className="relative">
        <img src={image} className="h-64" alt="service" />
        <div className="absolute flex justify-center items-center opacity-0 top-0 w-80 h-64 bg-primary group-hover:opacity-80">
          <Checkup className="w-12 h-12" color="#BFD2F8" />
        </div>
        <div className="group-hover:opacity-0 absolute flex items-center justify-center bottom-[-40px] right-4 w-20 h-20 rounded-full bg-primary">
          <Checkup color="#BFD2F8" />
        </div>
      </div>
      <div className="p-5">
        <div className="text-[26px] font-medium my-2 h-[80px] flex items-center">
          {title}
        </div>
        <div className="text-black my-2">{description}</div>
        <div className="text-black">{benefits}</div>
      </div>
    </div>
  );
}
