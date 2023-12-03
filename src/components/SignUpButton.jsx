import Link from "next/link";

export default function SignUpButton() {
  return (
    <div className="flex justify-center items-center">
      <button className="  bg-[#3b82f6] border-custom-blue border-2 rounded-md px-12 py-3 my-4 hover:bg-[#1d4ed8] transition duration-300 ease-in-out">
        <Link href={"/auth/sign-up"} className="text-[#e9ebf1]">
          Regístrate
        </Link>
      </button>
    </div>
  );
}
