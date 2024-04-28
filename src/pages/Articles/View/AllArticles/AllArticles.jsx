import { useState } from "react";
import ReactPaginate from "react-paginate";
import BlogPost from "../../../../components/Articles/BlogPost";
import { ArrowLeft, ArrowRight } from "../../../../components/Icon";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Heading } from "../../../../components/Common";

export default function Articles() {
  const { articles, onDelete, onEdit } = useOutletContext();
  const navigate = useNavigate();
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 4;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = articles?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(articles?.length / itemsPerPage) ?? 0;

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % articles.length;
    setItemOffset(newOffset);
  };
  const handleReadMore = (articleId) => {
    navigate("/Articles/" + articleId);
  };

  return (
    <div className="w-full flex flex-col justify-between">
      {articles ? (
        <>
          <div>
            {currentItems &&
              currentItems.map((article, i) => (
                <BlogPost
                  post={article}
                  key={i}
                  onClick={() => handleReadMore(article.articleId)}
                  onDelete={() => onDelete(article.articleId)}
                  onEdit={() => onEdit(article.articleId)}
                />
              ))}
          </div>
          <ReactPaginate
            className="flex justify-center p-4 m-4 font-work text-secondary"
            activeLinkClassName="text-primary"
            disabledLinkClassName="cursor-default opacity-30"
            pageClassName=" [&:not(:nth-child(2))]:before:content-['-'] [&:not(:nth-child(2))]:before:mx-1 before:text-primary"
            breakLabel="..."
            nextLabel={
              <>
                Next Page <ArrowRight />
              </>
            }
            nextClassName="ml-auto"
            nextLinkClassName="flex text-secondary articles-center gap-2"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel={
              <>
                <ArrowLeft /> Previous Page
              </>
            }
            previousClassName="mr-auto"
            previousLinkClassName="flex text-secondary articles-center gap-2"
            renderOnZeroPageCount={null}
          />
        </>
      ) : (
        <div className="text-center">
          <Heading>No Articles Found ...</Heading>
        </div>
      )}
    </div>
  );
}
