import Link from "next/link"

export default function DarkButton({ text, onClick, link }) {
    const handleClick = () => {
        onClick()
    }
    return (
        <>
            {
                link ? <Link href={link}
                    className="block w-full text-center py-2 px-4 rounded-md bg-custom-light-sky-blue border-custom-blue border-2 text-black   hover:bg-custom-dark-blue transition duration-300 ease-in-out focus:outline-none focus:ring "
                >
                    {text}
                </Link> : <button
                    className="block w-full text-center py-2 px-4 rounded-md bg-custom-light-sky-blue border-custom-blue border-2 text-black   hover:bg-custom-dark-blue transition duration-300 ease-in-out focus:outline-none focus:ring"
                    onClick={handleClick}
                >
                    {text}
                </button>
            }
        </>
    )
}