"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setIsLoading(true);

    await router.push("/sign-in");
    setIsLoading(false);
  };

  return (
    <>
      <button
        className="btn btn-primary text-white text-xs sm:text-sm px-4 py-2"
        onClick={handleClick}
      >
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
