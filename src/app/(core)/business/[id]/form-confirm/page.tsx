type BusinessFormConfirmPageProps = {
  params: {
    id: string;
  };
};

export default function BusinessFormConfirmPage({
  params: { id },
}: BusinessFormConfirmPageProps) {
  return (
    <div>
      <h1>Business Form Confirmation</h1>
      <p>Confirmation for business ID: {id}</p>
    </div>
  );
}
