import { useNavigate } from "react-router-dom";
import { Eye, Heart } from "../Icon";
import dayjs from "dayjs";

export default function NewsCard({
  data: { articleId, publishedDate, imagePath, author, title, views, likes },
}) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/Articles/" + articleId);
  };

  return (
    <div
      className="flex h-36 rounded-md shadow-md overflow-hidden cursor-pointer hover:opacity-90"
      onClick={handleClick}
    >
      <img src={imagePath} alt="article img" className="aspect-[4/3]" />
      <div className="p-4">
        <div className="text-secondary text-sm">
          {dayjs(publishedDate).format("dddd DD, MMMM YYYY")} | By {author}
        </div>
        <div className="text-lg font-work mb-2">
          {title.length > 50 ? title.slice(0, 47) + "..." : title}
        </div>
        <div className="flex items-center gap-1">
          <Eye /> {views} &nbsp;
          <Heart />
          {likes}
        </div>
      </div>
    </div>
  );
}
