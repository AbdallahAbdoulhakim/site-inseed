interface DataForm {
  [key: string]: string | number;
}

interface Props {
  data: DataForm[];
  fileName: string;
  className?: string;
  message: string;
}

export default function ExportCSV({
  data,
  fileName,
  className,
  message,
}: Props) {
  const downloadCSV = () => {
    const csvString = [
      Object.keys(data[0]),
      ...data.map((item) => Object.values(item)),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName || "data.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button className={`${className}`} onClick={downloadCSV}>
      {message}
    </button>
  );
}
