import { useAuth } from "../context/AuthContext";

const Avatar = ({ className, ...props }) => {
  const { user } = useAuth();
  const name = user?.Username;
  const googleProfilePic = user?.picture;
  const avatarProps = googleProfilePic
    ? {
        src: googleProfilePic,
      }
    : {
        children: `${
          name.split(" ").length > 1
            ? name.split(" ")[0][0] + name.split(" ")[1][0]
            : name.split(" ")[0][0]
        }`,
      };

  return (
    <img
      className={
        "w-[50px] rounded-full text-black bg-slate-400 border border-black " +
        className
      }
      alt=""
      {...avatarProps}
      {...props}
    />
  );
};

export default Avatar;
