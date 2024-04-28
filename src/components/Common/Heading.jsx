export default function Heading({ children, className, ...props }) {
  return (
    <div
      className={"text-primary text-[32px] font-yeseva my-4 " + className}
      {...props}
    >
      {children}
    </div>
  );
}
