export default function RecentPost({ image, title, date }) {
  return (
    <div className="flex font-work items-center gap-2 my-2 cursor-pointer hover:bg-[#00000009]">
      <img src={image} alt="" className="rounded-md w-[60px] h-[60px]" />
      <div>
        <div className="text-secondary text-xs">{date}</div>
        <div className="text-sm font-medium">
          {title.length > 50 ? title.slice(0, 47) + "..." : title}
        </div>
      </div>
    </div>
  );
}
