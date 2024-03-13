import { useState } from "react";
import ReactPaginate from "react-paginate";
import BlogPost from "./BlogPostComp";
import { ArrowLeft, ArrowRight } from "../../icons";

export default function BlogPosts({ items, handleReadMore }) {
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 4;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <div>
      <div>
        {currentItems &&
          currentItems.map((post, i) => (
            <BlogPost post={post} key={i} onClick={() => handleReadMore(i)} />
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
        nextLinkClassName="flex text-secondary items-center gap-2"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={
          <>
            <ArrowLeft /> Previous Page
          </>
        }
        previousClassName="mr-auto"
        previousLinkClassName="flex text-secondary items-center gap-2"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}
