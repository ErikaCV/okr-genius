import Image from "next/image";
import Link from "next/link";
import mobileBgImage from "@/assets/images/transformed.png";
import desktopBgImage from "@/assets/images/i-6-transformed.jpeg";

export default function HomePage() {
  return (
    <div className="hero min-h-screen relative">
      <div className="absolute top-4 right-9">
      <button className="btn btn-primary text-white text-xs sm:text-sm px-4 py-2">
  <Link href="/sign-in">
    Iniciar Sesión
  </Link>
</button>
      </div>

      <div className="absolute inset-0 z-[-10] overlay-effect">
      <Image src={mobileBgImage} alt="Fondo Móvil" fill={true} style={{ objectFit: "cover" }} />
      </div>
      <div className="hidden sm:block absolute inset-0 z-[-10] overlay-effect">
        <Image src={desktopBgImage} alt="Fondo Escritorio" fill={true} style={{ objectFit: "cover" }} />
      </div>
      <div className="hero-overlay bg-opacity-40"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5 zoom-fade-in">OKR Genius</h1>
          <p className="text-base sm:text-lg">Transforma tus metas en logros. ¡Tu éxito comienza aquí!</p>
          <button className="btn btn-primary text-sm sm:text-base my-4">
            <Link href={"/auth/sign-up"} className="text-[#e9ebf1]">
              Regístrate
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}


