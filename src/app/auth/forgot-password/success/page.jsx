import Link from 'next/link'

export default async function SuccessPage() {
  return (
    <main className="px-4 mx-auto flex flex-col justify-center h-screen md:bg-[#D9D9D9]">
      <div className="gap-4 flex flex-col">
        <div className='flex flex-col gap-4'>
          <h1 className="text-2xl font-light">Se envió el email para reestablecer la contraseña.</h1>
          <p>Si no lo encuentras, chequea el spam.</p>
          <button type="submit">
            <Link href={"/"} className="text-[#01803C]">
              Volver al login
            </Link>
          </button>
        </div>
      </div>
    </main>
  )
}