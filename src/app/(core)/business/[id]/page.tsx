// Components
import HeaderBusiness from "./components/HeaderBusiness";
import InformationBusiness from "./components/InformationBusiness";
import LayoutImages from "./components/LayoutImages";
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
      <div className="my-10 px-2">
        <LayoutImages />
      </div>
      <LayoutServices />
      <InformationBusiness />
    </div>
  );
}
