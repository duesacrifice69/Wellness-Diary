import { useOutletContext } from "react-router-dom";
import { Heading, MoreOptionsMenu } from "../../../../components/Common";
import { useEffect } from "react";
import { useAuth } from "../../../../context/AuthContext";

export default function Article() {
  const { activeArticle, onDelete, onEdit } = useOutletContext();
  const { isAdmin } = useAuth();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeArticle]);

  return (
    <div className="w-full">
      {activeArticle ? (
        <div className="relative">
          <img
            src={activeArticle.imagePath}
            alt="active news"
            className="w-full"
          />
          <div className="my-10">{activeArticle.content}</div>
          {isAdmin && (
            <div className="absolute top-3 right-3">
              <MoreOptionsMenu>
                <div
                  className="py-2 block px-4 cursor-pointer text-primary hover:bg-accent"
                  onClick={() => onEdit(activeArticle.articleId)}
                >
                  Edit
                </div>
                <div
                  onClick={() => onDelete(activeArticle.articleId)}
                  className="py-2 px-4 text-red-600 hover:bg-accent cursor-pointer"
                >
                  Delete
                </div>
              </MoreOptionsMenu>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center">
          <Heading>Article Not Found ...</Heading>
        </div>
      )}
    </div>
  );
}
