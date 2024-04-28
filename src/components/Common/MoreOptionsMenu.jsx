export default function MoreOptionsMenu({ children }) {
  return (
    <div className="group relative" tabIndex="0">
      <div className="rounded-full cursor-pointer w-8 py-1 bg-slate-100 hover:bg-slate-200">
        <div className="mx-auto w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.5)] my-[2px]"></div>
        <div className="mx-auto w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.5)] my-[2px]"></div>
        <div className="mx-auto w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.5)] my-[2px]"></div>
      </div>
      <div className="absolute transition-[visibility,opacity] invisible opacity-0 duration-300 group-focus:visible group-focus:opacity-100 right-0 mt-2 rounded-md w-48 bg-white py-1 shadow-lg">
        {children}
      </div>
    </div>
  );
}
