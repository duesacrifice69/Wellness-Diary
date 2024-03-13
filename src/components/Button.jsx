export default function Button({ style, className, ...props }) {
  return (
    <button
      style={{ ...style }}
      className={
        "bg-accent rounded-[50px] py-[13px] px-[26px] flex justify-center items-center text-primary font-work font-medium leading-[19px] disabled:opacity-50 hover:opacity-90 " +
        className
      }
      {...props}
    />
  );
}
