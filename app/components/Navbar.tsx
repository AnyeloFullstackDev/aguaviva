import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-fit px-3">
      <nav className="flex items-center justify-center gap-3 sm:gap-6 px-4 sm:px-7 py-2.5 rounded-full bg-white/95 backdrop-blur-md border border-sky-100 shadow-sm text-slate-700 font-bold text-xs sm:text-sm whitespace-nowrap">
        <Link href="/#inicio" className="text-sky-900 hover:text-sky-600 transition-colors flex items-center gap-1.5 font-extrabold">
          <span className="text-sky-500">💧</span>
          <span>Aguaviva</span>
        </Link>
        <span className="w-1 h-1 rounded-full bg-sky-200 hidden sm:inline-block"></span>
        <Link href="/#planta" className="hover:text-sky-600 transition-colors hidden md:inline-block">
          Nuestra Planta
        </Link>
        <Link href="/#premios" className="hover:text-sky-600 transition-colors">
          Premios y Metas
        </Link>
        <Link href="/terminos" className="hover:text-sky-600 transition-colors text-slate-500 hidden sm:inline-block">
          Términos
        </Link>
        <Link
          href="/#registro"
          className="ml-1 bg-sky-600 hover:bg-sky-700 text-white font-bold px-4 py-1.5 rounded-full text-xs transition-colors cursor-pointer shadow-xs"
        >
          ¡Regístrate! ✨
        </Link>
      </nav>
    </header>
  );
}
