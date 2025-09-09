interface BusinessSchedulePageProps {
  params: {
    id: string;
  };
}

export default function BusinessSchedulePage({
  params: { id },
}: BusinessSchedulePageProps) {
  return (
    <div>
      <h1>Business Schedule</h1>
      <p>Schedule for business ID: {id}</p>
    </div>
  );
}
