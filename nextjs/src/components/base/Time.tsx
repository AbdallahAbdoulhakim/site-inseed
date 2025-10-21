import React, { useState, useEffect } from "react";

export default function Time({
  dateString,
  long,
}: {
  dateString: string;
  long?: boolean;
}) {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    if (dateString) {
      setFormattedDate(
        new Date(dateString).toLocaleDateString("fr-FR", {
          year: "numeric",
          month: long ? "long" : "numeric",
          day: "numeric",
        })
      );
    }
  }, [dateString]);

  return <span>{formattedDate}</span>;
}
