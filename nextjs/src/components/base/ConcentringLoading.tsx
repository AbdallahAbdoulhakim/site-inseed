interface Props {
  className?: string;
}

export default function ConcentrincLoading({ className }: Props) {
  return (
    <div
      className={`flex flex-col items-center justify-center w-full h-full mt-5 ${className}`}
    >
      <div className="loader" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
