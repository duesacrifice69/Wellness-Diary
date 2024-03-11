import { ArrowRight, Checkup } from "../../icons";

export default function Service({ title, description, image }) {
  return (
    <div className="hover:cursor-pointer w-80 text-primary font-work group rounded-lg shadow-lg border my-5 overflow-hidden">
      <div className="relative">
        <img src={image} className="h-80" alt="service" />
        <div className="absolute flex justify-center items-center opacity-0 top-0 w-80 h-80 bg-primary group-hover:opacity-80">
          <Checkup className="w-12 h-12" color="#BFD2F8" />
        </div>
        <div className="group-hover:opacity-0 absolute flex items-center justify-center bottom-[-40px] right-4 w-20 h-20 rounded-full bg-primary">
          <Checkup color="#BFD2F8" />
        </div>
      </div>
      <div className="p-5">
        <div className="text-[26px] font-medium my-2">{title}</div>
        <div className="text-black h-[100px] overflow-hidden">
          {description}
        </div>
        <div className="flex items-center gap-2 my-5">
          <div className="text-secondary">Learn More</div>
          <ArrowRight />
        </div>
      </div>
    </div>
  );
}
