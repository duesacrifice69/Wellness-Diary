import { useEffect, useState } from "react";
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from "../../api";
import { Button, Heading } from "../../components/Common";
import { useAuth } from "../../context/AuthContext";
import Input from "../../components/Profile/Input";
import { Link, useOutletContext } from "react-router-dom";
import { medicalTests } from "../../constants";

const initState = {
  username: "",
  email: "",
  name: "",
  age: "",
  gender: "",
  address: "",
  contactNumber: "",
};

export default function Profile() {
  const {
    user: { userId },
  } = useAuth();
  const { setNotification } = useOutletContext();
  const { data: userProfile, isSuccess } = useGetUserProfileQuery(userId);
  const [userProfileData, setUserProfileData] = useState(initState);
  const [updateUserProfile, { isFetching }] = useUpdateUserProfileMutation();
  const { username, email, name, age, gender, address, contactNumber } =
    userProfileData;
  const valuesHaveChanged =
    (username !== userProfile?.username && username !== "") ||
    email !== userProfile?.email ||
    (name === "" ? null : name) !== userProfile.name ||
    (age === "" ? null : age) !== userProfile.age ||
    (gender === "" ? null : gender) !== userProfile.gender ||
    (contactNumber === "" ? null : contactNumber) !==
      userProfile.contactNumber ||
    (address === "" ? null : address) !== userProfile.address;

  useEffect(() => {
    if (isSuccess) {
      setUserProfileData(userProfile);
    }
  }, [userProfile, isSuccess]);

  const handleChange = (e) => {
    setUserProfileData({
      ...userProfileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    updateUserProfile(userProfileData).then(({ data, error }) => {
      if (data) {
        setNotification({
          type: "success",
          message: "Profile updated successfully",
          timestamp: new Date(),
        });
      } else if (error) {
        setNotification({
          type: "error",
          message: "There was an error while updating the profile",
          timestamp: new Date(),
        });
      }
    });
  };

  return (
    <div className="py-10">
      <Heading>My Profile</Heading>
      {userProfileData.email.length > 0 && (
        <Button
          disabled={isFetching}
          className={
            "ml-auto w-max " + (valuesHaveChanged ? "visible" : "invisible")
          }
          onClick={handleSave}
        >
          Save
        </Button>
      )}
      <div className="mb-32 mx-auto max-w-screen-md">
        <Input
          label="Username :"
          name="username"
          id="username"
          value={userProfileData.username}
          required
          onChange={handleChange}
        />
        <Input
          label="Email Address :"
          name="email"
          disabled
          id="email"
          value={userProfileData.email}
          onChange={handleChange}
        />
        <Input
          label="Display Name :"
          name="name"
          id="name"
          value={userProfileData.name ?? ""}
          onChange={handleChange}
        />
        <Input
          label="Age :"
          name="age"
          type="number"
          id="age"
          value={userProfileData.age ?? ""}
          onChange={handleChange}
        />
        <Input
          label="Gender :"
          name="gender"
          id="gender"
          type="select"
          options={[
            { text: "Male", value: "Male" },
            { text: "Female", value: "Female" },
          ]}
          value={userProfileData.gender ?? ""}
          onChange={handleChange}
        />
        <Input
          label="Contact Number :"
          name="contactNumber"
          id="contactNumber"
          value={userProfileData.contactNumber ?? ""}
          onChange={handleChange}
        />
        <Input
          label="Address :"
          rows={2}
          name="address"
          id="address"
          type="textarea"
          className="mt-[16px]"
          value={userProfileData.address ?? ""}
          onChange={handleChange}
        />
      </div>
      <Heading>Activity History</Heading>
      <div className="flex flex-wrap gap-10 justify-evenly my-16">
        {medicalTests.map((test, i) => (
          <Link
            className="w-48 h-28 text-primary shadow-2xl rounded-tl-[40px] rounded-br-[40px] hover:scale-105 transition-all flex justify-center items-center text-xl font-work duration-300"
            key={i}
            to={test.path + "/History"}
          >
            {test.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
