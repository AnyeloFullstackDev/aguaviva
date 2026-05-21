'use client';

import { useActionState } from 'react';
import { registrarUsuario } from './actions';

export default function RegistroPage() {
  const [state, formAction, isPending] = useActionState(registrarUsuario, null);

  return (
    <div className="w-full max-w-md relative animate-in fade-in zoom-in duration-500">
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-sky-400/40 to-blue-200/40 blur-[80px] rounded-full" />
      <div className="bg-white/85 backdrop-blur-3xl border border-sky-100 p-8 rounded-[2rem] shadow-xl relative overflow-hidden">

        <div className="absolute top-0 inset-x-0 h-[4px] bg-gradient-to-r from-sky-300 via-blue-500 to-sky-300"></div>

        <div className="text-center mb-8 mt-2">
          <h1 className="text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-700 pt-2 pb-1">Aguaviva</h1>
          <p className="text-sm text-sky-800 font-semibold mt-1">Únete a nuestro sistema de recompensas y acumula botellones.</p>
        </div>

        <form action={formAction} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="nombre" className="text-xs font-bold text-sky-700 uppercase tracking-widest pl-1">Nombre y Apellido</label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              required
              className="bg-white/80 border border-sky-200 rounded-xl px-4 py-3.5 text-sky-900 placeholder-sky-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition shadow-sm"
              placeholder="Ej. Maria Lopez"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="cedula" className="text-xs font-bold text-sky-700 uppercase tracking-widest pl-1">Cédula de Identidad</label>
            <input
              id="cedula"
              name="cedula"
              type="text"
              required
              className="bg-white/80 border border-sky-200 rounded-xl px-4 py-3.5 text-sky-900 placeholder-sky-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition shadow-sm"
              placeholder="Ej. V-12345678"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="telefono" className="text-xs font-bold text-sky-700 uppercase tracking-widest pl-1">Número de WhatsApp</label>
            <input
              id="telefono"
              name="telefono"
              type="text"
              required
              className="bg-white/80 border border-sky-200 rounded-xl px-4 py-3.5 text-sky-900 placeholder-sky-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition shadow-sm"
              placeholder="Ej. 0412-1234567"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="palabra" className="text-xs font-bold text-sky-700 uppercase tracking-widest pl-1">Palabra con la que te identificas</label>
            <input
              id="palabra"
              name="palabra"
              type="text"
              required
              className="bg-white/80 border border-sky-200 rounded-xl px-4 py-3.5 text-sky-900 placeholder-sky-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition shadow-sm"
              placeholder="Ej. Lealtad, Alegría, Constancia..."
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="mt-6 relative group overflow-hidden bg-gradient-to-r from-sky-500 to-blue-600 shadow-md shadow-sky-500/40 hover:shadow-sky-500/60 transition-all transform hover:-translate-y-0.5 text-white font-bold py-3.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="relative z-10">{isPending ? 'Procesando...' : 'Comenzar a ganar'}</span>
          </button>

          {state && (
            <div className={`mt-2 text-center font-bold text-sm p-4 rounded-xl shadow-sm ${state.success ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-red-100 text-red-800 border border-red-200'}`}>
              {state.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
