interface Props {
  resultsCount: number;
}

export default function ResultsSnapshot({ resultsCount }: Props) {
  return (
    <div className="text-primary font-semibold">
      {resultsCount} résultat{resultsCount == 1 ? `` : `s`} de recherche.
    </div>
  );
}
