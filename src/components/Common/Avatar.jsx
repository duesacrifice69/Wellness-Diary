import { useAuth } from "../../context/AuthContext";

const Avatar = ({ className }) => {
  const { user } = useAuth();
  const name = user?.name;
  const profilePic = user?.picture;
  const avatarLetters = `${
    name.split(" ").length > 1
      ? name.split(" ")[0][0]?.toUpperCase() +
        name.split(" ")[1][0]?.toUpperCase()
      : name.split(" ")[0][0]?.toUpperCase()
  }`;

  return (
    <div
      className={
        "w-[50px] overflow-hidden h-[50px] font-medium text-[27px] flex justify-center items-center rounded-full text-black bg-slate-400 border border-black " +
        className
      }
    >
      {profilePic ? <img src={profilePic} alt="profile-pic" /> : avatarLetters}
    </div>
  );
};

export default Avatar;
