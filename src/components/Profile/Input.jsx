import { useRef, useState } from "react";
import { Check, Pencil } from "../Icon";

export default function Input({ label, small, className, ...props }) {
  const inputRef = useRef();
  const [focused, setFocused] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const handleEdit = () => {
    if (!focused && !props?.disabled) {
      setDisabled(false);
      setTimeout(() => {
        setFocused(true);
      }, 10);
    } else {
      setDisabled(true);
      setFocused(false);
    }
  };

  const handleBlur = (e) => {
    setTimeout(() => {
      inputRef.current.focus();
    }, 1);
  };

  return (
    <div className="flex items-center">
      <div className="w-72">{label}</div>
      <div className="my-4 h-10 flex items-center gap-5">
        {props?.type === "textarea" ? (
          <textarea
            ref={inputRef}
            disabled={disabled}
            onBlur={handleBlur}
            className={
              "peer resize-none bg-transparent text-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-gray-50 disabled:border-0 transition-all border-t-gray-300 border focus:border-2 text-sm px-3 py-2.5 rounded-md border-gray-300 focus:border-gray-900 w-72 " +
              className
            }
            {...props}
          />
        ) : props?.type === "select" ? (
          <select
            ref={inputRef}
            disabled={disabled}
            onBlur={handleBlur}
            className={
              "peer resize-none bg-transparent text-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-gray-50 disabled:border-0 transition-all border-t-gray-300 border focus:border-2 text-sm px-3 py-2.5 rounded-md border-gray-300 focus:border-gray-900 w-72 " +
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
            ref={inputRef}
            className={
              "peer h-full bg-transparent text-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-gray-50 disabled:border-0 transition-all placeholder-shown:border-gray-300 border focus:border-2 text-sm px-3 py-2.5 rounded-md border-gray-300 focus:border-gray-900 w-72 " +
              className
            }
            disabled={disabled}
            onBlur={handleBlur}
            {...props}
          />
        )}
        <label
          htmlFor={focused ? "" : props?.id}
          className={props?.disabled ? "opacity-60" : "cursor-pointer"}
          onClick={handleEdit}
        >
          {focused ? <Check /> : <Pencil />}
        </label>
      </div>
    </div>
  );
}
