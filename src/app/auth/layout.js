import Image from "next/image";
import logo from "@/assets/images/icon.webp";
import image2 from "@/assets/images/f-4.jpg";
export default function Layout({ children }) {
  return (
    <div className="bg-custom-light-sky-blue flex items-center justify-center md:max-h-screen">
      <div class=" flex items-center rounded-3xl shadow-lg max-w-3xl px-5  md:bg-custom-sky-blue ">
        <div className="md:block hidden w-1/2">
          <Image className="rounded-2xl" src={image2} alt="logo" width={400} />
        </div>
        <div className="bg-custom-sky-blue rounded-[30px] px-4 md:p-0 md:w-1/2">
          {children}
        </div>
      </div>
    </div>
  );
}
