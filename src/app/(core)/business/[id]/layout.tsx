import Footer from "@/components/ui/Footer";

export default function BusinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
