import { useRef } from "react";
import useGetImageHeight from "../../hooks/useGetImageHeight";
import { BottomLine, Heading } from "../../components/Common";

export default function AboutUs() {
  const imgRef = useRef();
  const imgH = useGetImageHeight(imgRef);

  return (
    <div className="pb-10">
      <div className="absolute top-[160px] left-0 z-[-1]">
        <img
          ref={imgRef}
          src="/services-bg.jpg"
          alt="about us background"
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
        <div className="">Home / About Us</div>
      </div>

      <Heading className="mt-20">About Wellness Diary</Heading>
      <div className="font-work mb-10">
        Welcome to Wellness Diary, your personalized health companion designed
        to empower you on your journey to optimal well-being.
      </div>

      <Heading className="mt-16">Our Mission</Heading>
      <div className="font-work mb-10">
        At Wellness Diary, our mission is simple: to revolutionize the way
        individuals engage with their health by providing a comprehensive and
        user-friendly platform that promotes proactive health management and
        education.
      </div>

      <Heading className="mt-16">Why Wellness Diary ?</Heading>
      <div className="font-work mb-10">
        We understand that navigating the complexities of personal health can be
        daunting. That's why we've created Wellness Diary - to make health
        monitoring simple, engaging, and informative.
      </div>

      <Heading className="mt-16">Our Features</Heading>
      <div className="font-work mb-10">
        <ul className="list-disc px-20">
          <li>
            <span className="font-semibold">Manual Health Data Entry:</span>{" "}
            Easily track your vital health metrics, such as blood pressure,
            heart rate, weight, and daily activities.
          </li>
          <li>
            <span className="font-semibold">Real-time Monitoring</span> Receive
            instant visual feedback on your health metrics, empowering you to
            stay informed and take control of your well-being.
          </li>
          <li>
            <span className="font-semibold">
              Alert System for Unusual Readings:
            </span>
            Our notification system ensures you're promptly alerted to any
            abnormal health readings, providing peace of mind and proactive
            intervention.
          </li>
          <li>
            <span className="font-semibold">Educational Content:</span> Access a
            wealth of curated articles and resources on various health topics,
            empowering you with the knowledge to make informed decisions about
            your health.
          </li>
          <li>
            <span className="font-semibold">Medical Test Details:</span> Gain
            insights into common medical tests, including their purpose,
            preparation, and interpretation, helping you better understand your
            health assessments.
          </li>
        </ul>
      </div>

      <Heading className="mt-16">Our Commitment to You</Heading>
      <div className="font-work mb-10">
        At Wellness Diary, your privacy and security are paramount. We employ
        robust data protection measures to safeguard your personal information,
        ensuring confidentiality and peace of mind.
      </div>

      <Heading className="mt-16">Join the Wellness Diary Community</Heading>
      <div className="font-work mb-10">
        Join us on this journey to better health and well-being. Together, let's
        embrace a healthier, happier future with Wellness Diary.
      </div>
    </div>
  );
}
