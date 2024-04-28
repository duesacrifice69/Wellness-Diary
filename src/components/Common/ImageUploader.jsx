import { Bin, Edit } from "../Icon";

export default function ImageUploader({
  children,
  value,
  onChange,
  onDelete,
  className,
}) {
  return (
    <div className={"relative w-64 h-64 mb-4 overflow-hidden " + className}>
      <label
        htmlFor="picture"
        className="block text-sm font-medium text-gray-700"
      >
        {children}
      </label>
      {value ? (
        <div className="relative w-full h-full">
          <img
            src={typeof value === "string" ? value : URL.createObjectURL(value)}
            alt="Uploaded"
            className="absolute top-0 left-0 object-cover w-full h-full"
          />
          <button
            type="button"
            className="absolute flex items-center justify-center w-8 h-8 text-white transform -translate-x-1/2 -translate-y-1/2 bg-accent rounded-full top-1/2 left-1/2"
            onClick={onDelete}
          >
            <Bin />
          </button>
        </div>
      ) : (
        <label
          htmlFor="picture"
          className={`bg-gray-200 h-full relative w-full flex justify-center items-center border-2 border-gray-300 rounded-md cursor-pointer`}
        >
          <div className="w-8 h-8 rounded-full flex justify-center items-center p-[5px] bg-accent">
            <Edit />
          </div>
          <input
            type="file"
            name="picture"
            id="picture"
            value={value ?? ""}
            onChange={onChange}
            className="opacity-0 absolute -z-10"
            required
          />
        </label>
      )}
    </div>
  );
}
