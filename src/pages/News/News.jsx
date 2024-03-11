import { useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import { BottomLine, Heading } from "../../components";
import { Search } from "../../icons";
import useGetImageHeight from "../../hooks/useGetImageHeight";
import { sampleData } from "../../common";
import RecentPost from "./RecentPostComp";
import BlogPosts from "./BlogPostsComp";

export default function News() {
  const [setActive, setLoading] = useOutletContext();
  const imgRef = useRef();
  const imgH = useGetImageHeight(imgRef);

  useEffect(() => {
    setActive(4);
    setLoading(false);
  }, [setLoading, setActive]);

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
        <div className="">Home / News</div>
        <div className="text-5xl font-yeseva">Blog Posts</div>
        <div className="h-7" />
      </div>
      <div className="flex gap-6 mt-16">
        <BlogPosts />
        <div>
          <div className="bg-primary w-[315px] flex h-[50px] p-4 rounded-md">
            <input
              className="bg-primary outline-none w-full text-white pr-3"
              placeholder="Search"
            />
            <Search />
          </div>
          <div className="border-2 rounded-md px-4 pb-3 my-8">
            <Heading>Recent Posts</Heading>
            {sampleData.slice(0, 6).map(({ title, image, date }, i) => (
              <RecentPost key={i} title={title} image={image} date={date} />
            ))}
          </div>
          <div className="border-2 rounded-md px-4 my-8">
            <Heading>Categories</Heading>
            <ul className="font-work mx-4 my-6">
              {["Surgery", "Health Care", "Medical", "Professional"].map(
                (category, i) => (
                  <li key={i} className="flex justify-between my-4">
                    {category}
                    <div className="rounded-full w-max px-2 text-center text-textPrimary bg-secondary">
                      {
                        sampleData.filter((data) => data.category === category)
                          .length
                      }
                    </div>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
