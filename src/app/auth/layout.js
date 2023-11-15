import Image from 'next/image'
import logo from "@/assets/images/icon.webp";
export default function Layout({ children }) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#F5F5F5] md:flex-row">
            <div className="hidden md:flex md:w-1/2 md:items-center md:justify-center">
                <Image src={logo} alt="logo" width={350} />
            </div>
            <div className="px-4 md:p-0 md:w-1/2">
                {children}
            </div>
        </div>
    )
}