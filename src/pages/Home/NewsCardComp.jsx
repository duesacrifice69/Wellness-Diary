import { Eye, Heart } from "../../icons";

export default function NewsCard({
  data: { date, image, author, title, views, likes },
}) {
  return (
    <div className="flex h-36 rounded-md shadow-md cursor-pointer hover:opacity-90">
      <img src={image} alt="news img" />
      <div className="p-4">
        <div className="text-secondary text-sm">
          {date} | By {author}
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
