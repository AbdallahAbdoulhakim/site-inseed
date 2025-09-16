interface Props {
  className?: string;
}
export default function DotLoading({ className }: Props) {
  return (
    <div
      className={`flex flex-col items-center justify-center w-full h-full ${className}`}
    >
      <div className="dot-loader" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
