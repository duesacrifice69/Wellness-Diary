import { useRef } from "react";
import { Calendar, Cash, Team } from "../../components/Icon";
import { BottomLine, Heading } from "../../components/Common";
import { chunkArray } from "../../utils";
import Slider from "react-slick";
import NewsCard from "../../components/Home/NewsCard";
import useGetImageHeight from "../../hooks/useGetImageHeight";
import { useGetArticlesQuery } from "../../api";
import { Link } from "react-router-dom";

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

      <div className="text-center my-32">
        <Heading>A Great Place to Receive Care</Heading>
        <div className="w-[700px] m-auto">
          At Wellness Diary, we believe that your health is your greatest asset.
          That's why we've created a platform packed with features to help you
          take control of your well-being and live your best life.
        </div>
        <div className="mb-36 mt-16 mx-auto">
          <img src="/home.png" alt="doctors" className="w-full" />
          <BottomLine />
        </div>
      </div>
      <div className="my-16">
        <Heading className="text-center">Unlock Your Wellness Journey</Heading>
        <div className="flex my-12">
          <div className="p-6">
            <div className="w-[600px] tracking-wider">
              Ready to embark on your wellness journey? Join Wellness Diary
              today and unlock personalized health insights, connect with a
              supportive community, and access exclusive features designed to
              enhance your well-being. From tracking your health metrics to
              setting goals and accessing educational resources, Wellness Diary
              has everything you need to prioritize your health and live your
              best life. Don't wait any longer -
              <Link className="text-primary" to="/Register">
                sign up
              </Link>{" "}
              now and start your journey towards a healthier, happier you!
            </div>
          </div>
          <div className="w-[1000px] flex flex-col gap-2 justify-between">
            <div>
              <img src="/Medical-Test-1.png" alt="Medical Test" />
              <BottomLine />
            </div>
          </div>
        </div>
      </div>
      <div className="my-36">
        <div className="text-secondary text-center text-lg font-bold font-work tracking-[0.2rem]">
          BETTER INFORMATION, BETTER HEALTH
        </div>
        <Heading className="text-center">Artices</Heading>
        <Slider {...sliderSettings}>
          {chunkArray(news ?? [], 4).map((array, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-5 p-4">
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
