import NavigationBreadCrumb from "@/components/ui/NavigationBreadCrumb";
import CustomerForm from "./components/CustomerForm";

type BusinessFormConfirmPageProps = {
  params: {
    id: string;
  };
};

export default function BusinessFormConfirmPage({
  params: { id },
}: BusinessFormConfirmPageProps) {
  return (
    <div className="w-full flex flex-col my-10 px-4">
      <NavigationBreadCrumb
        url={`/business/${id}/schedule`}
        label="Agendar"
        id={id}
      />
      <CustomerForm />
      {/* <CardSummaryServices /> */}
    </div>
  );
}
