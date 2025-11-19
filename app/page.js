import NavbarLand from "@/component/navbarland";
import HeaderLand from "@/component/headerlan";
import PeriodePendaftaran from "@/component/periodeland";
import Fasilitas from "@/component/fasilitaslan";
import Jurusan from "@/component/jurusanlan";
import Footer from "@/component/footer";

export default function Home() {
  return (
    <main className="relative">
      <NavbarLand />
      <HeaderLand />
      <PeriodePendaftaran />
      <Fasilitas />
      <Jurusan />
      <Footer />
    </main>
  );
}
