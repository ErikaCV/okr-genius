import Link from "next/link"

export default function DarkButton({ text, onClick, link }) {
    const handleClick = () => {
        onClick()
    }
    return (
        <>
            {
                link ? <Link href={link}
                    className="block w-full text-center py-2 px-4 rounded-md bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring border border-black"
                >
                    {text}
                </Link> : <button
                    className="block w-full text-center py-2 px-4 rounded-md bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring border border-black"
                    onClick={handleClick}
                >
                    {text}
                </button>
            }
        </>
    )
}