import { notFound } from "next/navigation";
// API
import { businessApi } from "@/lib/api/business.api";
import { productsApi } from "@/lib/api/products.api";
import { ApiError } from "@/lib/api/client";
// Components
import NavigationBar from "@/components/ui/NavigationBar";
import ContactBusiness from "./components/ContactBusiness";
import HeaderBusiness from "./components/HeaderBusiness";
import LayoutImages from "./components/LayoutImages";
import LayoutServices from "./components/LayoutServices";
import { formatAdress } from "@/utils/utils";

interface BusinessDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function BusinessDetailPage({
  params,
}: BusinessDetailPageProps) {
  const { id } = await params;

  let business;
  let products;

  try {
    [business, products] = await Promise.all([
      businessApi.getById(id),
      productsApi.getByBusiness(id),
    ]);
    business = business.data;
    products = products.data;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar id={id} />
      <main className="flex-1">
        <HeaderBusiness
          id={id}
          businessName={business.name}
          description={business.description}
          imageUrl={business.main_image_url}
        />
        {business.gallery_images && business.gallery_images.length > 0 && (
          <LayoutImages images={business.gallery_images} />
        )}
        <LayoutServices products={products ?? null} businessId={id} />
        <ContactBusiness
          phone={business.phone_number}
          address={formatAdress(business)}
          socialLinks={business.social_links}
        />
      </main>

    </div>
  );
}
