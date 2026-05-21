'use client';

import { useEffect, useState, useMemo } from 'react';
import { getRegistros, sumarCompra, resetearCompra, resetearTodos, verificarClave } from '../actions';

export default function FindPage() {
  const [auth, setAuth] = useState(false);
  const [registros, setRegistros] = useState<any[]>([]);
  const [cargando, setCargando] = useState(false);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      const clave = window.prompt('🔒 Área Privada: Ingresa la clave administrativa');
      if (!clave) { window.location.href = '/'; return; }
      const esValida = await verificarClave(clave);
      if (esValida) { setAuth(true); cargarDatos(); }
      else { window.alert('Clave incorrecta. Acceso DENEGADO.'); window.location.href = '/'; }
    }, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  async function cargarDatos() {
    setCargando(true);
    const data = await getRegistros();
    setRegistros(data);
    setCargando(false);
  }

  async function handleSumar(id: string, nombre: string) {
    const confirmar = window.confirm(`⚠️ ¿Agregar 1 botellón a ${nombre}?`);
    if (confirmar) { const ok = await sumarCompra(id); if (ok) cargarDatos(); }
  }

  async function handleReset(id: string, nombre: string) {
    const confirmar = window.confirm(`✅ ¿Canjear premio y resetear a 0 los botellones de ${nombre}?`);
    if (confirmar) { const ok = await resetearCompra(id); if (ok) cargarDatos(); }
  }

  async function handleResetTodos() {
    const confirmar = window.prompt(`⚠️ Para reiniciar TODOS los contadores, escribe "CONFIRMAR":`);
    if (confirmar === 'CONFIRMAR') {
      const ok = await resetearTodos();
      if (ok) { cargarDatos(); window.alert('✔️ Todos los contadores han vuelto a cero.'); }
    } else if (confirmar !== null) {
      window.alert('Operación cancelada.');
    }
  }

  function getPremioLabel(compras: number) {
    if (compras >= 10) return '🎁 ¡Ganó Asa! (10 bot)';
    if (compras >= 5)  return '🎁 ¡Ganó Recarga! (5 bot)';
    if (compras >= 3)  return '🎁 ¡Ganó Tapa! (3 bot)';
    return null;
  }

  const registrosFiltrados = useMemo(() => {
    if (!busqueda) return registros;
    const b = busqueda.toLowerCase().trim();
    return registros.filter(r =>
      (r.nombre || '').toLowerCase().includes(b) ||
      (r.cedula || '').toLowerCase().includes(b) ||
      (r.palabra || '').toLowerCase().includes(b)
    );
  }, [registros, busqueda]);

  if (!auth) {
    return <div className="h-screen w-full flex items-center justify-center text-sky-900 font-bold">Verificando seguridad...</div>;
  }

  return (
    <div className="w-full max-w-5xl relative animate-in fade-in duration-500 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-sky-800">Panel Privado</h1>
          <p className="text-sm font-semibold text-sky-600 mt-0.5">Gestión de fidelización y premiación</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button onClick={handleResetTodos} className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg font-bold shadow-sm hover:bg-red-100 transition text-sm">
            🧨 Resetear Semana
          </button>
          <input
            type="text"
            placeholder="Buscar..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="flex-1 min-w-0 sm:w-[220px] px-4 py-2 rounded-lg border border-sky-300 shadow-sm focus:ring-2 focus:ring-sky-500 focus:outline-none text-sky-900 placeholder-sky-400 font-bold transition-all text-sm"
          />
          <button onClick={cargarDatos} className="bg-white/80 border border-sky-300 text-sky-800 px-3 py-2 rounded-lg font-bold shadow-sm hover:bg-sky-50 transition">
            🔄
          </button>
        </div>
      </div>

      {/* ── Vista MÓVIL: tarjetas ── */}
      <div className="block md:hidden bg-white/85 backdrop-blur-xl border border-sky-200 rounded-2xl shadow-xl divide-y divide-sky-100 overflow-hidden">
        {registrosFiltrados.map((user) => {
          const premio = getPremioLabel(user.compras);
          return (
            <div key={user.id} className="p-4">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <div className="font-black text-sky-900 text-base">{user.nombre}</div>
                  <div className="text-xs text-sky-500 font-semibold mt-0.5">C.I: {user.cedula || 'N/A'}</div>
                  <div className="text-xs text-sky-500 font-semibold">Palabra: "{user.palabra}"</div>
                  <div className="text-xs text-sky-600 font-semibold mt-0.5">📱 {user.telefono}</div>
                </div>
                <span className="inline-flex rounded-full bg-blue-100 text-blue-800 px-3 py-1 font-black border border-blue-200 shadow-sm text-lg shrink-0">
                  {user.compras} 💧
                </span>
              </div>
              {premio && (
                <div className="mb-3">
                  <span className="inline-flex bg-green-100 text-green-800 px-3 py-1.5 rounded-xl font-bold text-xs shadow-sm border border-green-200">{premio}</span>
                </div>
              )}
              <div className="flex gap-2">
                <button onClick={() => handleReset(user.id, user.nombre)} className="flex-1 bg-white border border-sky-200 text-sky-600 font-bold py-2 rounded-lg text-sm hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition">
                  Reset a 0
                </button>
                <button onClick={() => handleSumar(user.id, user.nombre)} className="flex-1 bg-gradient-to-r from-sky-500 to-blue-500 text-white font-bold py-2 rounded-lg text-sm shadow hover:opacity-80 transition">
                  +1 💧
                </button>
              </div>
            </div>
          );
        })}
        {registrosFiltrados.length === 0 && !cargando && (
          <div className="py-10 text-center text-sky-500 font-semibold">No se encontraron resultados.</div>
        )}
      </div>

      {/* ── Vista ESCRITORIO: tabla ── */}
      <div className="hidden md:block bg-white/85 backdrop-blur-xl border border-sky-200 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-sky-900">
            <thead className="bg-sky-100 border-b border-sky-200 uppercase font-bold text-xs text-sky-800">
              <tr>
                <th className="px-6 py-4">Cliente / Datos</th>
                <th className="px-4 py-4 text-center">WhatsApp</th>
                <th className="px-4 py-4 text-center">Botellones</th>
                <th className="px-6 py-4 text-center">Premio</th>
                <th className="px-6 py-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-100">
              {registrosFiltrados.map((user) => {
                const premio = getPremioLabel(user.compras);
                return (
                  <tr key={user.id} className="hover:bg-sky-50/50 transition">
                    <td className="px-6 py-5">
                      <div className="font-bold text-base">{user.nombre}</div>
                      <div className="text-xs text-sky-500 font-semibold mt-0.5">C.I: {user.cedula || 'N/A'} | Palabra: "{user.palabra}"</div>
                    </td>
                    <td className="px-4 py-5 text-center font-medium">{user.telefono}</td>
                    <td className="px-4 py-5 text-center">
                      <span className="inline-flex rounded-full bg-blue-100 text-blue-800 px-3 py-1 font-bold border border-blue-200 shadow-sm text-sm">{user.compras} 💧</span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      {premio
                        ? <span className="inline-flex bg-green-100 text-green-800 px-3 py-1.5 rounded-xl font-bold text-xs shadow-sm border border-green-200">{premio}</span>
                        : <span className="text-sky-400 font-semibold text-xs border border-dashed border-sky-300 px-3 py-1 rounded-xl">Buscando meta...</span>
                      }
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleReset(user.id, user.nombre)} className="bg-white border border-sky-300 text-sky-600 font-bold px-3 py-2 rounded-lg shadow-sm hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition">Reset a 0</button>
                        <button onClick={() => handleSumar(user.id, user.nombre)} className="bg-gradient-to-r from-sky-500 to-blue-500 text-white font-bold px-4 py-2 rounded-lg shadow hover:opacity-80 transition">+1 💧</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {registrosFiltrados.length === 0 && !cargando && (
                <tr><td colSpan={5} className="py-8 text-center text-sky-600 font-semibold">No se encontraron resultados.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
