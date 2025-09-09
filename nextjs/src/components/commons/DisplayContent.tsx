export default function DisplayContent({
  htmlContent,
  className,
}: {
  htmlContent: string;
  className?: string;
}) {
  return (
    <div
      className={`prose ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
