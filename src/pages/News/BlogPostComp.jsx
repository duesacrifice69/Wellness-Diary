import { Button, Heading } from "../../components";
import { ArrowRight, Author, Date, Eye, Heart } from "../../icons";

export default function BlogPost({
  post: { image, title, date, author, views, likes, description },
}) {
  return (
    <div className="font-work">
      <div className="h-[400px] overflow-hidden">
        <img src={image} className="w-full" alt="post img" />
      </div>
      <div className="flex gap-4 mt-4">
        <div className="flex items-center gap-1">
          <Date /> {date}
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
      <Heading>{title}</Heading>
      <div>
        {description.length > 265
          ? description.slice(0, 264) + "..."
          : description}
      </div>
      <Button className="mt-8 mb-16">
        Read More &nbsp; <ArrowRight />
      </Button>
    </div>
  );
}
