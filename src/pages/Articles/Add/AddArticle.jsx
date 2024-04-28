import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Button, Heading, Input } from "../../../components/Common";
import ImageUploader from "../../../components/Common/ImageUploader";
import { articlesCategories } from "../../../constants";
import { useCreateArticleMutation } from "../../../api";
import { useNavigate, useOutletContext } from "react-router-dom";
import dayjs from "dayjs";

const initState = {
  username: "",
  title: "",
  description: "",
  picture: null,
  category: 0,
};

export default function AddArticle() {
  const [formData, setFormData] = useState(initState);
  const [createArticle, { isLoading, error }] = useCreateArticleMutation();
  const { user } = useAuth();
  const { setNotification } = useOutletContext();
  const name = user?.name;
  const navigate = useNavigate();
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const addArticle = new FormData();
    addArticle.append("title", formData.title);
    addArticle.append("content", formData.description);
    addArticle.append("categoryId", formData.category);
    addArticle.append("author", name);
    addArticle.append("publishedDate", dayjs().format("YYYY-MM-DDTHH:mm:ss"));
    addArticle.append("formFile", formData.picture);
    createArticle(addArticle).then(({ error }) => {
      if (error) {
        setNotification({
          type: "error",
          message: "Something went wrong",
          timestamp: new Date(),
        });
      } else {
        navigate("/Articles");
      }
    });
  };
  return (
    <div className="container px-4 py-8 mx-auto">
      <Heading>Add Article</Heading>
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
            name="description"
            label="Description"
            type="textarea"
            value={formData.description}
            onChange={handleChange}
            rows={8}
            required
          />
          <Input
            label="Category"
            name="category"
            type="select"
            options={articlesCategories}
            value={formData.category}
            onChange={handleChange}
            small
            required
          />
        </div>
        {error && (
          <div className="text-red-500 -mt-5 mb-5">{error?.data?.title}</div>
        )}
        <Button disabled={isLoading} type="submit">
          Add Article
        </Button>
      </form>
    </div>
  );
}
