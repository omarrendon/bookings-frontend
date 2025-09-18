// Components
import Footer from "@/components/ui/Footer";
import ContactBusiness from "./components/ContactBusiness";
import HeaderBusiness from "./components/HeaderBusiness";
import LayoutImages from "./components/LayoutImages";
import LayoutServices from "./components/LayoutServices";
import NavigationBar from "../../../../components/ui/NavigationBar";
import ProductsSummary from "@/components/ui/ProductsSummary";

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
      <ProductsSummary />
      <ContactBusiness />
      <Footer />
    </div>
  );
}
