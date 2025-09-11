// Components
import HeaderBusiness from "./components/HeaderBusiness";
import InformationBusiness from "./components/InformationBusiness";
import LayoutServices from "./components/LayoutServices";
import NavigationBar from "./components/NavigationBar";

interface BusinessDetailPageProps {
  params: {
    id: string;
  };
}

export default async function BusinessDetailPage({
  params,
}: BusinessDetailPageProps) {
  const { id } = await params;
  console.log("Business ID:", id);

  return (
    <div>
      <NavigationBar />
      <HeaderBusiness />
      <InformationBusiness />
      <LayoutServices />
    </div>
  );
}
