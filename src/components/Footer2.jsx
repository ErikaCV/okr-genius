const Footer = () => {
  return (
    <footer className="bg-custom-sky-blue text-center lg:text-left">
      <div className="text-gray-700 text-center p-4">
        <div className="flex justify-center items-center lg:justify-between p-6 border-b border-gray-300">
          <div className="mr-12 hidden lg:block">
            <span>Mantente conectado con nosotros:</span>
          </div>
        </div>
        <div className="mx-6 py-10 text-center md:text-left">
          <div className="grid grid-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h6 className="uppercase font-semibold mb-4 flex justify-center md:justify-start">
                Redes Sociales
              </h6>
              <p className="mb-4">
                <a href="#!" className="text-gray-600">
                  Facebook
                </a>
              </p>
              <p className="mb-4">
                <a href="#!" className="text-gray-600">
                  Twitter
                </a>
              </p>
              <p className="mb-4">
                <a href="#!" className="text-gray-600">
                  Instagram
                </a>
              </p>
              <p className="mb-4">
                <a href="#!" className="text-gray-600">
                  LinkedIn
                </a>
              </p>
            </div>
            <div>
              <h6 className="uppercase font-semibold mb-4 flex justify-center md:justify-start">
                Enlaces útiles
              </h6>
              <p className="mb-4">
                <a href="#!" className="text-gray-600">
                  Precios
                </a>
              </p>
              <p className="mb-4">
                <a href="#!" className="text-gray-600">
                  Configuraciones
                </a>
              </p>
              <p className="mb-4">
                <a href="#!" className="text-gray-600">
                  Guías
                </a>
              </p>
              <p className="mb-4">
                <a href="#!" className="text-gray-600">
                  Comunidad
                </a>
              </p>
            </div>
            <div>
              <h6 className="uppercase font-semibold mb-4 flex justify-center md:justify-start">
                Compañía
              </h6>
              <p className="mb-4">
                <a href="#!" className="text-gray-600">
                  Quiénes somos
                </a>
              </p>
              <p className="mb-4">
                <a href="#!" className="text-gray-600">
                  Historia
                </a>
              </p>
              <p className="mb-4">
                <a href="#!" className="text-gray-600">
                  Equipo
                </a>
              </p>
            </div>
            <div>
              <h6 className="uppercase font-semibold mb-4 flex justify-center md:justify-start">
                Contacto
              </h6>
              <p className="mb-4">
                <a href="#!" className="text-gray-600">
                  Ayuda y Soporte
                </a>
              </p>
              <p className="mb-4">
                <a href="#!" className="text-gray-600">
                  Email
                </a>
              </p>
              <p className="mb-4">
                <a href="#!" className="text-gray-600">
                  Teléfono
                </a>
              </p>
            </div>
          </div>
        </div>
        <div
          className="text-gray-700 text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © 2023 OKR Genius.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
