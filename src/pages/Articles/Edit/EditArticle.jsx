import React, { useEffect, useState } from "react";
import { Button, Heading, Input } from "../../../components/Common";
import ImageUploader from "../../../components/Common/ImageUploader";
import { articlesCategories } from "../../../constants";
import { useEditArticleMutation, useGetArticleByIdQuery } from "../../../api";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

const initState = {
  username: "",
  title: "",
  description: "",
  picture: null,
  categoryId: 0,
};

export default function EditArticle() {
  const [formData, setFormData] = useState(initState);
  const { id } = useParams();
  const [editArticle, { isLoading, error }] = useEditArticleMutation();
  const { setNotification } = useOutletContext();
  const navigate = useNavigate();

  const {
    data: requestedArticle,
    isError,
    isSuccess,
  } = useGetArticleByIdQuery(id);

  useEffect(() => {
    if (isSuccess) {
      setFormData({
        ...requestedArticle,
        picture: requestedArticle?.imagePath,
      });
    }
  }, [requestedArticle, isSuccess]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, picture: file });
  };

  const handleRemovePicture = () => {
    setFormData({ ...formData, picture: null });
  };

  const handleCancel = () => {
    navigate("/Articles");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fData = new FormData();
    fData.append("articleId", formData.articleId);
    fData.append("title", formData.title);
    fData.append("content", formData.content);
    fData.append("categoryId", formData.categoryId);
    fData.append("author", formData.author);
    fData.append("publishedDate", formData.publishedDate);
    if (typeof formData?.picture === "object") {
      fData.append("formFile", formData.picture);
    }
    editArticle({ articleId: formData.articleId, body: fData }).then(
      ({ error }) => {
        if (error) {
          setNotification({
            type: "error",
            message: "Something went wrong",
            timestamp: new Date(),
          });
        } else {
          navigate("/Articles");
        }
      }
    );
  };
  return (
    <>
      {requestedArticle && !isError ? (
        <div className="container px-4 py-8 mx-auto">
          <Heading>Edit Article</Heading>
          <div className="text-gray-500 -mt-5 mb-6">
            Posted by {requestedArticle.author}
          </div>
          <form onSubmit={handleSubmit} className="max-w-lg">
            <ImageUploader
              className="w-full h-[288px]"
              value={formData.picture}
              onChange={handlePictureChange}
              onDelete={handleRemovePicture}
            />

            <div className="my-8">
              <Input
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
              <Input
                name="content"
                label="Description"
                type="textarea"
                value={formData.content}
                onChange={handleChange}
                rows={8}
                required
              />
              <Input
                label="Category"
                name="category"
                type="select"
                options={articlesCategories}
                value={formData.categoryId}
                onChange={handleChange}
                small
                required
              />
            </div>
            {error && (
              <div className="text-red-500 -mt-5 mb-5">
                {error?.data?.title}
              </div>
            )}
            <div className="flex gap-5 my-6 items-center">
              <span
                className="underline text-primary cursor-pointer"
                onClick={handleCancel}
              >
                Cancel
              </span>
              <Button disabled={isLoading} type="submit">
                Save Article
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="text-center py-48">
          <Heading>Article Not Found ...</Heading>
        </div>
      )}
    </>
  );
}
