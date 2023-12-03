import Image from "next/image";
import mobileBgImage from "@/assets/images/transformed.webp";
import desktopBgImage from "@/assets/images/i-6-transformed.webp";
import SignInButton from "@/components/SignInButton";
import imgWomen from "@/assets/images/women-1.webp";
import imgTeam from "@/assets/images/team.webp";
import "animate.css";
import AnimatedSection from "@/components/AnimatedSection";
import FaqAccordion from "@/components/FaqAccordion";
import Footer from "@/components/Footer2";
import SignUpButton from "@/components/SignUpButton";

export default function HomePage() {
  return (
    <div>
      <div className="hero min-h-screen relative ">
        <div className="absolute top-4 right-9">
          <SignInButton />
        </div>
        <div className="absolute inset-0 z-[-10] overlay-effect">
          <Image
            src={mobileBgImage}
            alt="Fondo Móvil"
            fill={true}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="hidden sm:block absolute inset-0 z-[-10] overlay-effect">
          <Image
            src={desktopBgImage}
            alt="Fondo Escritorio"
            fill={true}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="hero-overlay bg-opacity-40"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5 zoom-fade-in">
              OKR Genius
            </h1>
            <p className="text-base font-medium sm:text-lg animate__animated animate__backInUp">
              Transforma tus metas en logros.¡Tu éxito comienza aquí!
            </p>
            <SignUpButton />
          </div>
        </div>
      </div>
      <section className="bg-[#9fb7ff] pt-16">
        <div className="text-center">
          <h2 className="text-3xl  font-bold pb-6">
            ¡Un paso adelante hacia el futuro!
          </h2>
        </div>
        <div className="bg-custom-sky-blue flex flex-col sm:flex-row rounded-asymmetric justify-center items-center mx-4 md:mx-16 mb-20">
          <div className="flex-1 px-4 mb-4 pt-9 sm:mb-0">
            <AnimatedSection description="Con cada OKR alcanzado, estás no solo cumpliendo objetivos, sino también construyendo el futuro de tu organización." />
          </div>
          <div className="flex-1 p-4 ">
            <Image
              className="rounded-asymmetric p-6"
              src={imgWomen}
              alt="logo"
              layout="responsive"
              width={800}
              height={400}
              priority
            />
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-bold pb-6">
            Maximiza el potencial de tu organización.
          </h2>
        </div>
        <div className="bg-custom-sky-blue flex flex-col sm:flex-row rounded-asymmetric justify-center items-center mx-4 md:mx-16 mb-20">
          <div className="flex-1 p-4 mb-4 sm:mb-0">
            <Image
              className="rounded-asymmetric p-6"
              src={imgTeam}
              alt="logo"
              layout="responsive"
              width={500}
              height={400}
              priority
            />
          </div>
          <div className="flex-1 px-4 pb-8">
            <AnimatedSection description="Haz que cada miembro del equipo brille con OKR Genius, donde las metas comunes se convierten en logros compartidos, fortaleciendo la unidad y el propósito colectivo." />
          </div>
        </div>
        <FaqAccordion />
        <div className="text-center">
          <h2 className="text-2xl font-bold pb-6">
            ¿Qué esperas para registrarte?.
          </h2>
        </div>
        <SignUpButton />
      </section>
      <Footer />
    </div>
  );
}
