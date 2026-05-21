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
            className="p-5 hover:bg-sky-50/80 cursor-pointer active:bg-sky-100 transition-colors"
            onClick={() => setModalPremio(premio)}
          >
            <div className="font-bold text-sky-900 text-base mb-3">{premio.nombre}</div>
            <div className="flex gap-2 flex-wrap">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 border border-sky-300">
                🎯 {premio.puntosRequeridos} compras
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                📦 {premio.stock} unid.
              </span>
            </div>
            <p className="text-xs text-sky-500 font-semibold mt-2">👉 Toca para ver cómo ganarlo</p>
          </div>
        ))}
      </div>

      {/* ── Vista ESCRITORIO: tabla full ── */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-sm text-sky-900">
          <thead className="bg-sky-50/80 border-b border-sky-200 uppercase font-bold text-xs text-sky-700">
            <tr>
              <th scope="col" className="px-6 py-4">Beneficio</th>
              <th scope="col" className="px-6 py-4 text-center">Requisito (Botellones)</th>
              <th scope="col" className="px-6 py-4 text-center">Disponibilidad en Local</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sky-100">
            {premios.map((premio: any, index: number) => (
              <tr
                key={index}
                className="hover:bg-sky-100/90 transition-colors cursor-pointer group"
                onClick={() => setModalPremio(premio)}
              >
                <td className="px-6 py-6 align-middle font-bold text-sky-900 text-base">
                  <div>{premio.nombre}</div>
                  <span className="text-xs text-sky-500 font-bold group-hover:text-blue-500 transition-colors">👉 Clic para más info</span>
                </td>
                <td className="px-6 py-6 align-middle text-center">
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-sky-100 text-sky-800 shadow-sm border border-sky-300">
                    🎯 {premio.puntosRequeridos} compras
                  </span>
                </td>
                <td className="px-6 py-6 align-middle text-center">
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm">
                    📦 {premio.stock} unid.
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
            className="absolute inset-0 bg-sky-950/60 backdrop-blur-sm"
            onClick={() => setModalPremio(null)}
          ></div>
          <div className="bg-white/95 backdrop-blur-3xl border border-sky-200 shadow-[0_20px_60px_rgba(0,0,0,0.5)] rounded-[2rem] p-6 sm:p-8 w-full max-w-md relative z-[10000] animate-in zoom-in-95 slide-in-from-bottom-5 duration-300">
            <button
              onClick={() => setModalPremio(null)}
              className="absolute top-4 right-4 text-sky-400 hover:text-sky-700 font-bold text-xl hover:bg-sky-50 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
            >
              ✕
            </button>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 border border-blue-200 shadow-sm">
                🎁
              </div>
              <h2 className="text-2xl font-black text-sky-800">{modalPremio.nombre}</h2>
            </div>

            <div className="space-y-4 text-sky-900 font-medium">
              <div className="bg-sky-50 p-5 rounded-2xl border border-sky-200">
                <h3 className="text-sky-800 font-black mb-2 text-lg">📌 ¿Cómo ganarlo?</h3>
                <p className="leading-relaxed">Al llegar a <strong className="text-blue-800 bg-blue-100 px-2 py-0.5 rounded-lg">{modalPremio.puntosRequeridos} botellones comprados</strong> puedes reclamarlo directamente en nuestra planta.</p>
              </div>
              <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-200">
                <h3 className="text-emerald-800 font-black mb-2 text-lg">⏳ Cierre de la Semana</h3>
                <p className="leading-relaxed text-emerald-900">
                  Solo acumulable esta semana:
                  <strong className="bg-emerald-200/50 block p-2 rounded-lg text-center mt-2 font-bold">{rango}</strong>
                  <br />Cada lunes los acumulados vuelven a cero.
                </p>
              </div>
            </div>

            <button
              onClick={() => setModalPremio(null)}
              className="w-full mt-6 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-black text-lg py-4 rounded-xl shadow-lg hover:-translate-y-0.5 transition-transform"
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
