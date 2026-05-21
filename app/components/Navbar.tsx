import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center gap-6 px-8 py-3.5 rounded-full bg-white/70 backdrop-blur-xl border border-sky-200 shadow-[0_8px_32px_rgba(14,165,233,0.15)] text-sky-900 font-bold">
      <Link href="/" className="hover:text-blue-600 transition tracking-wide text-sm">Registro</Link>
      <Link href="/premios" className="hover:text-blue-600 transition tracking-wide text-sm">Premios y Metas</Link>
      <Link href="/terminos" className="hover:text-blue-600 transition tracking-wide text-sm">Términos</Link>
    </nav>
  );
}
