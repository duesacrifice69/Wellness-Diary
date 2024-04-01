import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import usePageLoaded from "../../hooks/usePageLoaded";
import { Button, Heading, Input } from "../../components";
import ImageUploader from "../../components/ImageUploader";

const initState = {
  username: "",
  title: "",
  description: "",
  picture: null,
};

export default function AddNews() {
  const [formData, setFormData] = useState(initState);
  const { user } = useAuth();
  const name = user?.username;

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

    const addNews = new FormData();
    addNews.append("Username", name);
    addNews.append("Title", formData.title);
    addNews.append("Description", formData.description);
    addNews.append("Picture", formData.picture);

    try {
      // await API.addNews(addNews);
      console.log("News Added", addNews);
      //navigate(/adminpanel)
    } catch (error) {
      console.log(error);
    }
  };

  usePageLoaded(6);
  return (
    <div className="container px-4 py-8 mx-auto">
      <Heading>Add News</Heading>
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
        </div>
        <div className="my-8">
          <Input
            name="description"
            label="Description"
            type="textarea"
            value={formData.description}
            onChange={handleChange}
            rows={8}
            required
          />
        </div>
        <Button type="submit">Add News</Button>
      </form>
    </div>
  );
}
