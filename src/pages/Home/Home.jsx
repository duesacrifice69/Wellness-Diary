import { useRef } from "react";
import { Calendar, Cash, Team } from "../../components/Icon";
import { BottomLine, Heading } from "../../components/Common";
import { chunkArray } from "../../utils";
import Slider from "react-slick";
import NewsCard from "../../components/Home/NewsCard";
import useGetImageHeight from "../../hooks/useGetImageHeight";
import { useGetArticlesQuery } from "../../api";

const sliderSettings = {
  dots: true,
  autoplay: true,
  arrows: false,
  speed: 1000,
  dotsClass: "slick-dots-large",
};

export default function Home() {
  const { data: news } = useGetArticlesQuery();
  const imgRef = useRef();
  const heroHeight = useGetImageHeight(imgRef);

  return (
    <div>
      <img
        ref={imgRef}
        src="/home-bg.png"
        alt="doctor"
        className=" absolute w-screen left-0 top-28 z-[-1]"
      />
      <div
        style={{
          height: heroHeight === 0 ? "calc(100vh - 160px)" : heroHeight,
        }}
        className="flex flex-col justify-between px-4"
      >
        <div></div>
        <div className="text-primary text-5xl font-yeseva">
          <div className="text-secondary text-lg font-bold font-work tracking-[0.2rem]">
            CARING FOR LIFE
          </div>
          <div className="">Leading the Way</div>
          <div className="">in Medical Excellence</div>
        </div>
        <div className="flex justify-center gap-10 text-textPrimary">
          <div className="bg-primary px-3 py-5 rounded-md flex items-center justify-between gap-16 cursor-pointer">
            Check Your Blood Presure
            <Calendar />
          </div>
          <div className="bg-accent text-primary px-3 py-5 rounded-md flex items-center justify-between gap-16 cursor-pointer">
            Check Medical Test
            <Team />
          </div>
          <div className="bg-secondary px-3 py-5 rounded flex items-center justify-between gap-16 cursor-pointer">
            Book An Appoiment
            <Cash />
          </div>
        </div>
      </div>

      <div className="text-center my-16">
        <Heading>A Great Place to Receive Care</Heading>
        <div className="w-[700px] m-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          placerat scelerisque tortor ornare ornare. Convallis felis vitae
          tortor augue. Velit nascetur proin massa in. Consequat faucibus
          porttitor enim et.
        </div>
        <div className="my-20 mx-auto">
          <img src="/Blackdoctors.png" alt="doctors" className="w-full" />
          <BottomLine />
        </div>
      </div>
      <div className="my-16">
        <Heading className="text-center">Check Medical Tests Results</Heading>
        <div className="flex my-12">
          <div className="p-6">
            <div className="text-primary my-4 font-semibold text-2xl">
              A passion for putting patients first.
            </div>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              placerat scelerisque tortor ornare ornare. Quisque placerat
              scelerisque tortor ornare ornare Convallis felis vitae tortor
              augue. Velit nascetur proin massa in. Consequat faucibus porttitor
              enim et.
            </div>
          </div>
          <div className="w-[1000px] flex flex-col justify-between">
            <div>
              <img src="/Medical-Test-1.png" alt="Medical Test" />
              <BottomLine />
            </div>
            <div>
              <img src="/Medical-Test-2.png" alt="Medical Test" />
              <BottomLine />
            </div>
          </div>
        </div>
      </div>
      <div className="my-16">
        <div className="text-secondary text-center text-lg font-bold font-work tracking-[0.2rem]">
          BETTER INFORMATION, BETTER HEALTH
        </div>
        <Heading className="text-center">Artices</Heading>
        <Slider {...sliderSettings}>
          {chunkArray(news ?? [], 4).map((array, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-5 mt-10 p-4">
                {array.map((news) => (
                  <NewsCard data={news} key={news.articleId} />
                ))}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
