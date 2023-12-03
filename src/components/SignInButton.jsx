'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignInButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setIsLoading(true);
    console.log("aqui se setea en true",isLoading)
    await router.push('/sign-in');
    setIsLoading(false);
    console.log("ya cargo",isLoading)
  };

  return (
    <>
      <button className=" text-white text-xs sm:text-sm px-4 py-2 border-2 bg-[#3b82f6] border-custom-blue rounded-md  hover:bg-[#1d4ed8] transition duration-300 ease-in-out" onClick={handleClick}>
        Iniciar Sesión
      </button>
      {isLoading && (
        <div className="fixed bottom-5 right-5">
          <div className="w-48 h-48 flex justify-center items-center">
            <span className="loading loading-spinner loading-lg text-info scale-200"></span>
          </div>
        </div>
      )}
    </>
  );
}
