'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function PrizeTable({ premios, rango }: { premios: any[], rango: string }) {
  const [modalPremio, setModalPremio] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* ── Vista MÓVIL: tarjetas apiladas ── */}
      <div className="block md:hidden divide-y divide-sky-100">
        {premios.map((premio: any, index: number) => (
          <div
            key={index}
            className="p-5 hover:bg-sky-50/60 cursor-pointer active:bg-sky-100/50 transition-colors"
            onClick={() => setModalPremio(premio)}
          >
            <div className="font-bold text-slate-800 text-base mb-2">{premio.nombre}</div>
            <div className="flex gap-2 flex-wrap items-center">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-800 border border-sky-200">
                🎯 {premio.puntosRequeridos} compras
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                📦 {premio.stock} en planta
              </span>
            </div>
            <p className="text-xs text-sky-600 font-semibold mt-2.5 flex items-center gap-1">
              <span>👉</span> Toca para ver cómo ganarlo
            </p>
          </div>
        ))}
      </div>

      {/* ── Vista ESCRITORIO: tabla full ── */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-700">
          <thead className="bg-sky-50/80 border-b border-sky-100 uppercase font-bold text-xs text-sky-800 tracking-wider">
            <tr>
              <th scope="col" className="px-6 py-4">Beneficio</th>
              <th scope="col" className="px-6 py-4 text-center">Meta Requerida</th>
              <th scope="col" className="px-6 py-4 text-center">Disponibilidad en Planta</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sky-100">
            {premios.map((premio: any, index: number) => (
              <tr
                key={index}
                className="hover:bg-sky-50/50 transition-colors cursor-pointer group"
                onClick={() => setModalPremio(premio)}
              >
                <td className="px-6 py-5 align-middle font-bold text-slate-900 text-base">
                  <div className="group-hover:text-sky-700 transition-colors">{premio.nombre}</div>
                  <span className="text-xs text-sky-500 font-semibold group-hover:underline">👉 Clic para ver detalles</span>
                </td>
                <td className="px-6 py-5 align-middle text-center">
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-sky-50 text-sky-800 border border-sky-200">
                    🎯 {premio.puntosRequeridos} botellones
                  </span>
                </td>
                <td className="px-6 py-5 align-middle text-center">
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    📦 {premio.stock} unidades
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Modal (Portal) ── */}
      {mounted && modalPremio && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
            onClick={() => setModalPremio(null)}
          ></div>
          <div className="bg-white border border-sky-100 shadow-xl rounded-3xl p-6 sm:p-8 w-full max-w-md relative z-[10000] animate-in zoom-in-95 duration-200 text-slate-800">
            <button
              onClick={() => setModalPremio(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold text-xl hover:bg-slate-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors cursor-pointer"
            >
              ✕
            </button>
            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3 border border-sky-100">
                🎁
              </div>
              <h2 className="text-2xl font-bold text-slate-900">{modalPremio.nombre}</h2>
            </div>

            <div className="space-y-3.5 text-slate-700 font-medium text-sm">
              <div className="bg-sky-50/70 p-4 rounded-2xl border border-sky-100">
                <h3 className="text-sky-900 font-bold mb-1 text-sm flex items-center gap-1.5">
                  <span>📌</span> ¿Cómo ganarlo?
                </h3>
                <p className="leading-relaxed text-slate-600">
                  Al completar <strong className="text-sky-900 font-bold">{modalPremio.puntosRequeridos} botellones comprados</strong> durante la semana, puedes reclamarlo directamente en el mostrador de nuestra planta.
                </p>
              </div>

              <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-100">
                <h3 className="text-emerald-900 font-bold mb-1 text-sm flex items-center gap-1.5">
                  <span>⏳</span> Periodo de Canje
                </h3>
                <p className="leading-relaxed text-emerald-900">
                  Válido para esta semana:
                  <strong className="bg-white block p-2 rounded-lg text-center mt-1.5 font-bold text-emerald-800 border border-emerald-100">
                    {rango}
                  </strong>
                  <span className="text-xs text-emerald-700 block text-center mt-1">
                    Cada lunes a las 12:00 AM los acumulados vuelven a cero para una nueva semana.
                  </span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setModalPremio(null)}
              className="w-full mt-6 bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm py-3.5 rounded-xl transition-colors cursor-pointer"
            >
              ¡Entendido!
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
