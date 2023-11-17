import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export default withAuth(
    async function middleware(req) {
        const token = await getToken({ req });
        const isAuth = !!token;
        const isApiEndpoint = req.nextUrl.pathname.startsWith('/api');
        const onProtectedPage = ["/create-okr", "/objective-okr"].includes(req.nextUrl.pathname);
        console.log("isAuth: ", isAuth);

        if (!isAuth && onProtectedPage) {
            console.log("Redireccionando a /sign-in")
//            
            return NextResponse.redirect(new URL("/sign-in", req.url)); // Asegúrate de que esta URL sea correcta
        }
        // Si el usuario está autenticado y no se encuentra en una página protegida, redirigir a '/create-okr'
        if (isAuth && !onProtectedPage) {
            console.log("Redireccionando a /create-okr")
            return NextResponse.redirect(new URL('/create-okr', req.url));
        }

        // Si la solicitud es para un endpoint de la API, permitir el acceso
        if (isApiEndpoint) return NextResponse.next();

        // Si el usuario no está autenticado y trata de acceder a una página protegida, redirigir al login
        

        return NextResponse.next();
    },
    {
        callbacks: {
            async authorized() {
                return true;
            },
        },
    }
);

export const config = { matcher: ["/create-okr", "/objective-okr", "/sign-up", "/sign-in"] };
