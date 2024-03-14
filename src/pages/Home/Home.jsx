import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Blood,
  Calendar,
  Cardiogram,
  Cash,
  Checkup,
  Dna,
  Team,
} from "../../icons";
import { BottomLine, Heading, Input } from "../../components";
import { chunkArray } from "../../utils";
import Slider from "react-slick";
import NewsCard from "./NewsCardComp";
import useGetImageHeight from "../../hooks/useGetImageHeight";
import { sampleData } from "../../common";

const initState = {
  systolic: "",
  diastolic: "",
  date: "",
  time: "",
};

const sliderSettings = {
  dots: true,
  autoplay: true,
  arrows: false,
  speed: 1000,
  dotsClass: "slick-dots-large",
};

export default function Home() {
  const [setActive, setLoading] = useOutletContext();
  const [bloodPressureInputs, setBloodPressureInputs] = useState(initState);
  const imgRef = useRef();
  const heroHeight = useGetImageHeight(imgRef);

  const bloodPressureCheckDisabled =
    bloodPressureInputs.systolic === "" ||
    bloodPressureInputs.diastolic === "" ||
    bloodPressureInputs.date === "" ||
    bloodPressureInputs.time === "";

  useEffect(() => {
    setActive(0);
    setLoading(false);
  }, [setLoading, setActive]);

  const handleChange = (e) => {
    setBloodPressureInputs({
      ...bloodPressureInputs,
      [e.target.name]: e.target.value,
    });
  };
  const handleBloodPresureCheck = (e) => {
    e.preventDefault();
  };

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
          <div className="w-[380px] flex-wrap border-2 rounded-md">
            <div className="flex flex-col items-center py-5 gap-2 cursor-pointer hover:bg-accent">
              <Checkup /> Free Checkup
            </div>
            <div className="flex flex-col items-center py-5 gap-2 cursor-pointer hover:bg-accent">
              <Cardiogram /> Cardiogram
            </div>
            <div className="flex flex-col items-center py-5 gap-2 cursor-pointer hover:bg-accent">
              <Dna /> DNA Testing
            </div>
            <div className="flex flex-col items-center py-5 gap-2 cursor-pointer hover:bg-accent">
              <Blood /> Blood Bank
            </div>
            <div className="bg-primary text-accent text-center rounded-b-md py-3 cursor-pointer">
              View All
            </div>
          </div>
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
        <Heading className="text-center">Check Blood Pressure</Heading>
        <div className="flex justify-between">
          <div className="text-center font-semibold">
            <img src="/check-blood-pressure.svg" alt="check-blood-pressure" />
            Add your first
            <br />
            measurement
          </div>
          <form className="basis-72">
            <Input
              label="Systolic"
              name="systolic"
              className="bg-[#E2E6EE]"
              value={bloodPressureInputs.systolic}
              onChange={handleChange}
            />
            <Input
              label="Diastolic"
              name="diastolic"
              className="bg-[#E2E6EE]"
              value={bloodPressureInputs.diastolic}
              onChange={handleChange}
            />
            <Input
              label="Date"
              name="date"
              className="bg-[#E2E6EE]"
              value={bloodPressureInputs.date}
              onChange={handleChange}
            />
            <Input
              label="Time"
              name="time"
              className="bg-[#E2E6EE]"
              value={bloodPressureInputs.time}
              onChange={handleChange}
            />
            <button
              disabled={bloodPressureCheckDisabled}
              style={{
                backgroundColor: bloodPressureCheckDisabled
                  ? "#EFB4C5"
                  : "#eb6088",
              }}
              onClick={handleBloodPresureCheck}
              className="w-full font-sans p-2 rounded-xl text-white"
            >
              CHECK
            </button>
          </form>
          <div className="basis-96">
            <h1 className="font-bold">RESULTS</h1>
            <div>
              Comment about heart comment about heart comment about heart
              Comment about heart comment about heart comment about heart
              Comment about heart comment about heart comment about heart
            </div>
          </div>
        </div>
      </div>
      <div className="my-16">
        <div className="text-secondary text-center text-lg font-bold font-work tracking-[0.2rem]">
          BETTER INFORMATION, BETTER HEALTH
        </div>
        <Heading className="text-center">News</Heading>
        <Slider {...sliderSettings}>
          {chunkArray(sampleData, 4).map((array, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-5 mt-10 p-4">
                {array.map((news, i) => (
                  <NewsCard data={news} index={index * 4 + i} key={i} />
                ))}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
