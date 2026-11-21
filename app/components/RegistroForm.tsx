'use client';

import { useActionState } from 'react';
import { registrarUsuario } from '../actions';

export default function RegistroForm() {
  const [state, formAction, isPending] = useActionState(registrarUsuario, null);

  return (
    <div className="w-full max-w-3xl mx-auto bg-white border border-sky-100 rounded-3xl shadow-sm p-6 sm:p-9">
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-800 border border-sky-200 mb-2">
          💧 Registro Rápido
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Activa tu Cuenta de Cliente
        </h2>
        <p className="text-sm text-slate-600 font-medium mt-1 max-w-lg mx-auto">
          Ingresa tus datos una sola vez para que cada botellón que compres en planta sume a tus premios semanales.
        </p>
      </div>

      <form action={formAction} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="nombre" className="text-xs font-bold text-slate-700">
              Nombre y Apellido
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              required
              className="w-full bg-sky-50/40 border border-sky-200/80 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition"
              placeholder="Ej. María López"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="cedula" className="text-xs font-bold text-slate-700">
              Cédula de Identidad
            </label>
            <input
              id="cedula"
              name="cedula"
              type="text"
              required
              className="w-full bg-sky-50/40 border border-sky-200/80 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition"
              placeholder="Ej. V-12345678"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="telefono" className="text-xs font-bold text-slate-700">
              Número de WhatsApp
            </label>
            <input
              id="telefono"
              name="telefono"
              type="tel"
              required
              className="w-full bg-sky-50/40 border border-sky-200/80 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition"
              placeholder="Ej. 0412-1234567"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="palabra" className="text-xs font-bold text-slate-700">
              Palabra de Identificación
            </label>
            <input
              id="palabra"
              name="palabra"
              type="text"
              required
              className="w-full bg-sky-50/40 border border-sky-200/80 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition"
              placeholder="Ej. Lealtad, Alegría..."
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full mt-2 bg-sky-600 hover:bg-sky-700 text-white font-bold py-3.5 px-6 rounded-xl transition-colors disabled:opacity-50 cursor-pointer text-sm tracking-wide"
        >
          {isPending ? 'Guardando tu registro...' : '¡Registrarme y Comenzar a Ganar! 🎉'}
        </button>

        {state && (
          <div
            className={`text-center font-semibold text-xs p-3 rounded-xl animate-in fade-in duration-200 mt-2 ${
              state.success
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {state.message}
          </div>
        )}
      </form>
    </div>
  );
}
