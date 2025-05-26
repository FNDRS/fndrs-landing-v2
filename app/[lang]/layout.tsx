import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
      <Navbar />
      <div />
      <main className="bg-white w-screen min-h-screen">{children}</main>
      <Footer />
    </div>
  );
}
