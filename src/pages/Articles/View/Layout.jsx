import { useEffect, useRef, useState } from "react";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import {
  AlertDialog,
  BottomLine,
  Button,
  Heading,
} from "../../../components/Common";
import { Author, Date, Eye, Heart, Search } from "../../../components/Icon";
import useGetImageHeight from "../../../hooks/useGetImageHeight";
import RecentPost from "../../../components/Articles/RecentPost";
import {
  useDeleteArticleMutation,
  useGetArticleByIdQuery,
  useGetArticlesByCategoryQuery,
  useGetArticlesQuery,
} from "../../../api";
import dayjs from "dayjs";
import { articlesCategories } from "../../../constants";
import { useAuth } from "../../../context/AuthContext";

export default function Layout() {
  const { id } = useParams();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryId = Number(queryParams.get("category"));
  const [selectedCategory, setSelectedCategory] = useState();
  const { setNotification } = useOutletContext();
  const { data: allArticles } = useGetArticlesQuery();
  const [dialogBoxOpen, setDialogBoxOpen] = useState(false);
  const [deleteingArticleId, setDeletingArticleId] = useState();
  const [deleteArticle] = useDeleteArticleMutation();

  const { data: requestedArticle, isError } = useGetArticleByIdQuery(id, {
    skip: id === undefined,
  });
  const { data: articlesByCategory, error } = useGetArticlesByCategoryQuery(
    selectedCategory?.value,
    { skip: selectedCategory?.value === undefined }
  );
  const imgRef = useRef();
  const imgH = useGetImageHeight(imgRef);
  const articles = categoryId
    ? error?.status === 404
      ? null
      : articlesByCategory
    : allArticles;

  const activeArticle = isError ? null : requestedArticle;

  useEffect(() => {
    const categoryIdIsValid = articlesCategories.find(
      (category) => category.value === categoryId
    );

    if (categoryIdIsValid) {
      setSelectedCategory(categoryIdIsValid);
    } else {
      setSelectedCategory(null);
      if (!categoryId) return;
      navigate("/Articles");
    }
  }, [categoryId, navigate]);

  const handleBack = () => {
    navigate("/Articles");
  };
  const hanldeCategoryClick = ({ text, value }) => {
    if (value === selectedCategory?.value) {
      navigate("/Articles");
      setSelectedCategory();
    } else {
      navigate("/Articles?category=" + value);
      setSelectedCategory({ text, value });
    }
    window.scrollTo(0, 0);
  };
  const handleRecentPostClick = (articleId) => {
    navigate("/Articles/" + articleId);
  };

  const handleEdit = (articleId) => {
    navigate("/Articles/" + articleId + "/Edit");
  };

  const handleDelete = (articleId) => {
    setDeletingArticleId(articleId);
    setDialogBoxOpen(true);
  };
  const handleDeleteCancel = () => {
    setDialogBoxOpen(false);
    setDeletingArticleId(null);
  };

  const handleDeleteContinue = () => {
    setDialogBoxOpen(false);
    deleteArticle(deleteingArticleId).then(({ error }) => {
      if (error) {
        setNotification({
          type: "error",
          message: "There was an error while deleting the article",
          timestamp: new Date(),
        });
      } else {
        setNotification({
          type: "success",
          message: "Article was deleted successfully",
          timestamp: new Date(),
        });
      }
    });
    setDeletingArticleId(null);
  };

  return (
    <div>
      <div className="absolute top-[160px] left-0 z-[-1]">
        <img
          ref={imgRef}
          src="/services-bg.jpg"
          alt="articles background"
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
            Home / Articles
          </span>
          {selectedCategory?.text && " / " + selectedCategory.text}
        </div>
        <div className="text-5xl font-yeseva">
          {id && activeArticle ? activeArticle.title : "Blog Posts"}
        </div>
        {id && activeArticle ? (
          <div className="flex gap-5 text-black text-base">
            <div className="flex items-center gap-2">
              <Date />
              {dayjs(activeArticle.publishedDate).format("dddd DD, MMMM YYYY")}
            </div>
            <div className="flex items-center gap-2">
              <Author />
              {activeArticle.author}
            </div>
            <div className="flex items-center gap-2">
              <Eye />
              {activeArticle.views}
            </div>
            <div className="flex items-center gap-2">
              <Heart />
              {activeArticle.likes}
            </div>
          </div>
        ) : (
          <div className="h-7" />
        )}
      </div>
      <div className="flex gap-6 mt-16">
        <Outlet
          context={{
            articles,
            activeArticle,
            onDelete: handleDelete,
            onEdit: handleEdit,
          }}
        />
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
            {allArticles
              ?.slice(-6)
              .reverse()
              .map(({ title, imagePath, publishedDate, articleId }) => (
                <RecentPost
                  key={articleId}
                  title={title}
                  image={imagePath}
                  date={publishedDate}
                  onClick={() => handleRecentPostClick(articleId)}
                />
              ))}
          </div>
          <div className="border-2 rounded-md px-4 my-8">
            <Heading>Categories</Heading>
            <ul className="font-work mx-2 my-6">
              {articlesCategories.map(({ value, text }) => (
                <li
                  key={value}
                  style={
                    selectedCategory?.value === value
                      ? {}
                      : { border: "1px solid white" }
                  }
                  className="flex justify-between p-2 my-1 rounded-md border cursor-pointer hover:bg-slate-50"
                  onClick={() => hanldeCategoryClick({ text, value })}
                >
                  {text}
                  <div className="rounded-full h-6 px-2 text-center text-textPrimary bg-secondary">
                    {
                      allArticles?.filter(
                        (article) => article.categoryId === value
                      ).length
                    }
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <AlertDialog
        open={dialogBoxOpen}
        onContinue={handleDeleteContinue}
        onCancel={handleDeleteCancel}
      />
      {isAdmin && (
        <Link to="/Articles/Add">
          <Button className="fixed pl-0 pr-1 w-[50px] bottom-8 right-8">
            <div className="w-1 translate-x-[14px] h-6 bg-primary"></div>
            <div className="w-6 h-1 bg-primary"></div>
          </Button>
        </Link>
      )}
    </div>
  );
}
