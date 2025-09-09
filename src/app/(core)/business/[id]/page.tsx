interface BusinessDetailPageProps {
  params: {
    id: string;
  };
}

export default function BusinessDetailPage({
  params: { id },
}: BusinessDetailPageProps) {
  return (
    <div>
      <h1>Business Detail</h1>
      <p>Details for business ID: {id}</p>
    </div>
  );
}
