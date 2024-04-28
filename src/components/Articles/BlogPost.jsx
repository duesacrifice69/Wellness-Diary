import dayjs from "dayjs";
import { Button, Heading, MoreOptionsMenu } from "../Common";
import { ArrowRight, Author, Date, Eye, Heart } from "../Icon";
import { adminRoles } from "../../constants";
import { useAuth } from "../../context/AuthContext";

export default function BlogPost({
  post: { imagePath, title, publishedDate, author, views, likes, content },
  onClick,
  onEdit,
  onDelete,
}) {
  const {
    user: { role },
  } = useAuth();

  return (
    <div className="font-work">
      <div className="h-[400px] overflow-hidden">
        <img src={imagePath} className="w-full" alt="post img" />
      </div>
      <div className="flex mt-4 justify-between">
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <Date /> {dayjs(publishedDate).format("dddd DD, MMMM YYYY")}
          </div>
          <div className="flex items-center gap-1">
            <Author /> By {author}
          </div>
          <div className="flex items-center gap-1">
            <Eye /> {views}
          </div>
          <div className="flex items-center gap-1">
            <Heart /> {likes}
          </div>
        </div>
        {adminRoles.includes(role) && (
          <MoreOptionsMenu>
            <div
              className="py-2 block px-4 cursor-pointer text-primary hover:bg-accent"
              onClick={onEdit}
            >
              Edit
            </div>
            <div
              onClick={onDelete}
              className="py-2 px-4 text-red-600 hover:bg-accent cursor-pointer"
            >
              Delete
            </div>
          </MoreOptionsMenu>
        )}
      </div>
      <Heading>{title}</Heading>
      <div>
        {content.length > 265 ? content.slice(0, 264) + "..." : content}
      </div>
      <Button className="mt-8 mb-16" onClick={onClick}>
        Read More &nbsp; <ArrowRight />
      </Button>
    </div>
  );
}
