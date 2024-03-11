import { Outlet, useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import Slider from "react-slick";
import { Logo } from "../../components";

const sliderSettings = {
  dots: true,
  autoplay: true,
  arrows: false,
  dotsClass: "slick-bars",
  speed: 1000,
};

export default function AuthLayout() {
  const [setActive] = useOutletContext();

  useEffect(() => setActive(-1), [setActive]);

  return (
    <div className="pt-[160px] bg-[url('../public/authBg.png')] h-[700px] bg-cover bg-no-repeat">
      <div className="bg-gradient-to-tr from-[#212121d6] to-[#4242423d] w-full h-full">
        <div className="max-w-screen-lg h-full relative mx-auto">
          <div className="absolute top-20 w-[500px] text-white font-zen leading-7">
            <Logo className="my-10" />
            <Slider {...sliderSettings}>
              <div>
                <h1 className="text-4xl font-bold my-8">
                  Building the Future...
                </h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div>
                <h1 className="text-4xl font-bold my-8">
                  Building the Future...
                </h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div>
                <h1 className="text-4xl font-bold my-8">
                  Building the Future...
                </h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </Slider>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
