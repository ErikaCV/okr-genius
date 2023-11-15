"use client"
import DarkButton from "@/components/DarkButton";
import BurgerSvg from "@/components/BurgerSvg";
import Image from "next/image";
import SignoutModal from "@/components/SignoutModal";
import logo from "@/assets/images/icon.webp";
import { useState } from "react";

export default function Layout({ children }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSignoutModalOpen, setIsSignoutModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    const toggleSignoutModal = () => {
        setIsSignoutModalOpen(!isSignoutModalOpen);
    };
    
    return (
        <div className="flex flex-col w-screen sm:flex-row sm:justify-end">
            <nav className="navbar bg-gray-100 justify-center items-center border-b border-black sm:hidden">
                <div>
                    <Image src={logo} alt="logo" width={39} height={39} />
                </div>

                <div className="flex-1">
                    <a className="btn btn-ghost normal-case text-xl text-black font-abel">
                        OKRs
                    </a>
                </div>

                <div className="flex-none">
                    <button
                        className="btn btn-square btn-ghost text-black"
                        onClick={() => setIsModalOpen(!isModalOpen)}
                    >
                        <BurgerSvg />
                    </button>
                </div>
            </nav>
            <nav className="hidden sm:flex sm:flex-col w-1/3 bg-gray-300 h-screen items-center pt-5 sm:fixed sm:w-1/3 sm:left-0">
                <Image src={logo} alt="logo" width={50} height={50} />
                <a className="btn btn-ghost normal-case text-xl text-black font-abel">
                    OKRs
                </a>

                <ul className="space-y-4 py-5">
                    <li>
                        <DarkButton text={'Crear OKR'} link={'create-okr'} />
                    </li>
                    <li>
                        <DarkButton text={'Historial de OKRs'} link={'objective-okr'} />
                    </li>
                    <li>
                        <DarkButton text={'Cerrar sesión'} onClick={toggleSignoutModal} />
                    </li>
                </ul>
            </nav>
            {children}

            {isModalOpen && (
                <div className="fixed inset-0 flex justify-end items-start">
                    <div className="bg-gray-300 p-4 rounded-lg shadow-md w-80">
                        <div className="flex justify-end">
                            <button
                                className="p-1 hover:bg-gray-200 rounded"
                                onClick={toggleModal}
                            >
                                ×
                            </button>
                        </div>
                        <ul className="space-y-4">
                            <li>
                                <DarkButton text='Crear OKR' link={'create-okr'} />
                            </li>
                            <li>
                                <DarkButton text='Historial de OKRs' link={'objective-okr'} />
                            </li>
                            <li>
                                <DarkButton text={'Cerrar sesión'} onClick={toggleSignoutModal} />
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {isSignoutModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <SignoutModal isOpen={isSignoutModalOpen} onClose={toggleSignoutModal} />
                </div>
            )}
        </div>
    );
}