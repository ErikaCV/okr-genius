import { signOut } from 'next-auth/react';

export default function SignoutModal({ isOpen, onClose }) {
    const handleLogout = (confirmLogout) => {
        if (confirmLogout) {
            console.log('Cerrando sesión...');
            signOut()
        }
        onClose();
    };
    return (
        <div className={`fixed inset-0 ${isOpen ? '' : 'hidden'}`}>
            <div className="flex items-center justify-center h-full">
                <div className="bg-white rounded-lg p-8" onClick={(e) => e.stopPropagation()}>
                    <p>¿Estás seguro de que deseas cerrar sesión?</p>
                    <div className="mt-4">
                        <button onClick={() => handleLogout(true)} className="mr-4 px-4 py-2 bg-red-500 text-white rounded">
                            Sí
                        </button>
                        <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
                            No
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
