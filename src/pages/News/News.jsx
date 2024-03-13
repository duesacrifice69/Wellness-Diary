import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { BottomLine, Button, Heading } from "../../components";
import {
  ArrowLeft,
  ArrowRight,
  Author,
  Date,
  Eye,
  Heart,
  Search,
} from "../../icons";
import useGetImageHeight from "../../hooks/useGetImageHeight";
import { sampleData } from "../../common";
import RecentPost from "./RecentPostComp";
import BlogPosts from "./BlogPostsComp";

export default function News() {
  const [setActive, setLoading] = useOutletContext();
  const [activePost, setActivePost] = useState();
  const [filteredPosts, setFilteredPosts] = useState(sampleData);
  const [selectedCategory, setSelectedCategory] = useState();
  const imgRef = useRef();
  const imgH = useGetImageHeight(imgRef);

  useEffect(() => {
    setActive(4);
    setLoading(false);
  }, [setLoading, setActive]);

  const handleReadMore = (i) => {
    setActivePost({ index: i, ...filteredPosts[i] });
  };
  const handlePrevious = () => {
    const i = activePost.index - 1;
    setActivePost({ index: i, ...filteredPosts[i] });
  };
  const handleNext = () => {
    const i = activePost.index + 1;
    setActivePost({ index: i, ...filteredPosts[i] });
  };
  const handleBack = () => {
    setActivePost(null);
    setSelectedCategory(null);
    setFilteredPosts(sampleData);
  };
  const hanldeCategory = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
      setFilteredPosts(sampleData);
    } else {
      setSelectedCategory(category);
      setFilteredPosts(sampleData.filter((post) => post.category === category));
    }
    setActivePost({ index: 0, ...filteredPosts[0] });
  };

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
        <div>
          <span className="hover:underline cursor-pointer" onClick={handleBack}>
            Home / News
          </span>
          {selectedCategory && " / " + selectedCategory}
        </div>
        <div className="text-5xl font-yeseva">
          {activePost ? activePost.title : "Blog Posts"}
        </div>
        {activePost ? (
          <div className="flex gap-5 text-black text-base">
            <div className="flex items-center gap-2">
              <Date />
              {activePost.date}
            </div>
            <div className="flex items-center gap-2">
              <Author />
              {activePost.author}
            </div>
            <div className="flex items-center gap-2">
              <Eye />
              {activePost.views}
            </div>
            <div className="flex items-center gap-2">
              <Heart />
              {activePost.likes}
            </div>
          </div>
        ) : (
          <div className="h-7" />
        )}
      </div>
      <div className="flex gap-6 mt-16">
        {activePost ? (
          <div>
            <img src={activePost.image} alt="active news" className="w-full" />
            <div className="my-10">{activePost.description}</div>
            <div className="flex justify-between mb-10">
              <Button
                onClick={handlePrevious}
                disabled={activePost.index === 0}
              >
                <ArrowLeft /> &nbsp; Previous Article
              </Button>
              <Button
                onClick={handleNext}
                disabled={activePost.index === filteredPosts.length - 1}
              >
                Next Article &nbsp; <ArrowRight />
              </Button>
            </div>
          </div>
        ) : (
          <BlogPosts items={filteredPosts} handleReadMore={handleReadMore} />
        )}
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
            <ul className="font-work mx-2 my-6">
              {["Surgery", "Health Care", "Medical", "Professional"].map(
                (category, i) => (
                  <li
                    key={i}
                    style={
                      selectedCategory === category
                        ? {}
                        : { border: "1px solid white" }
                    }
                    className="flex justify-between p-2 my-1 rounded-md border cursor-pointer hover:bg-slate-50"
                    onClick={() => hanldeCategory(category)}
                  >
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
