export default function Logo({ className }) {
  return (
    <div className={"text-4xl flex font-yeseva " + className}>
      <div className="text-primary">WELLNESS</div>
      <div className="text-secondary">DIARY</div>
    </div>
  );
}
