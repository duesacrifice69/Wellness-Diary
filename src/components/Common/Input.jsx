export default function Input({ label, small, className, ...props }) {
  const h = props?.rows ? props.rows * 20 + 20 : 40;
  const w = small ? "w-[200px] " : "w-full ";
  return (
    <div>
      <div
        style={{ height: h + "px" }}
        className={"relative min-w-[200px] my-4 h-40 " + w}
      >
        {props?.type === "textarea" ? (
          <textarea
            className={
              "peer resize-none bg-transparent text-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-300 placeholder-shown:border-t-gray-300 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-md border-gray-300 focus:border-gray-900 " +
              w +
              className
            }
            {...props}
            placeholder=" "
          />
        ) : props?.type === "select" ? (
          <select
            className={
              "peer resize-none bg-transparent text-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-300 placeholder-shown:border-t-gray-300 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-md border-gray-300 focus:border-gray-900 " +
              w +
              className
            }
            {...props}
          >
            {props?.options.map(({ text, value }) => (
              <option key={value} value={value}>
                {text}
              </option>
            ))}
          </select>
        ) : (
          <input
            className={
              "peer h-full bg-transparent text-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-gray-300 placeholder-shown:border-t-gray-300 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-md border-gray-300 focus:border-gray-900 " +
              w +
              className
            }
            {...props}
            placeholder=" "
          />
        )}
        <label
          className={
            "flex h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-gray-300 peer-focus:before:!border-gray-900 after:border-gray-300 peer-focus:after:!border-gray-900 " +
            w
          }
        >
          {label}
        </label>
      </div>
    </div>
  );
}
