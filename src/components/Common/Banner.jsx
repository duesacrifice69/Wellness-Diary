import { Logo } from "./";

export default function Banner() {
  return (
    <div className="w-full select-none bg-white">
      <div className="py-5 px-2 max-w-screen-lg mx-auto">
        <Logo />
      </div>
    </div>
  );
}
