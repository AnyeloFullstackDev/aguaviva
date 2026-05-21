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
      if (!clave) {
        window.location.href = '/';
        return;
      }
      
      const esValida = await verificarClave(clave);
      if (esValida) {
        setAuth(true);
        cargarDatos();
      } else {
        window.alert('Clave incorrecta. Acceso DENEGADO.');
        window.location.href = '/';
      }
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
    const confirmar = window.confirm(`⚠️ ESTÁS A PUNTO DE SUMAR 1 BOTELLÓN ⚠️\n\n¿Estás realmente seguro de agregar un botellón a ${nombre}?`);
    if (confirmar) {
      const success = await sumarCompra(id);
      if (success) {
        cargarDatos();
      }
    }
  }

  async function handleReset(id: string, nombre: string) {
    const confirmar = window.confirm(`✅ ¿CANJEAR PREMIO Y RESETEAR? ✅\n\n¿Estás seguro que deseas resetear a CERO (0) los botellones de ${nombre}?\n\nRealiza esto únicamente cuando le estés entregando de forma física uno de los premios alcanzados.`);
    if (confirmar) {
      const success = await resetearCompra(id);
      if (success) {
        cargarDatos();
      }
    }
  }

  async function handleResetTodos() {
    const confirmar = window.prompt(`⚠️ ATENCIÓN: ESTO BORRARÁ EL PROGRESO DE TODOS LOS CLIENTES ⚠️\n\nSi estás seguro de reiniciar a CERO (0) los botellones de TODOS los usuarios por el inicio de semana, escribe la palabra "CONFIRMAR" abajo en mayúsculas:`);
    if (confirmar === 'CONFIRMAR') {
      const success = await resetearTodos();
      if (success) {
        cargarDatos();
        window.alert('✔️ Todos los contadores de botellones han vuelto a cero exitosamente.');
      }
    } else if (confirmar !== null) {
      window.alert('Operación cancelada. El texto ingresado no era "CONFIRMAR".');
    }
  }

  function getPremiosGanados(compras: number) {
    const premios = [];
    if (compras >= 3 && compras < 5) premios.push('¡Ganó Tapa! (3 bot)');
    if (compras >= 5 && compras < 10) premios.push('¡Ganó Recarga! (5 bot)');
    if (compras >= 10) premios.push('¡Ganó Asa! (10 bot)');
    return premios.length > 0 ? premios[premios.length - 1] : 'Ninguno';
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
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-sky-400/20 to-blue-300/20 blur-[100px] rounded-full" />
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-black text-sky-800">Panel Privado de Clientes</h1>
          <p className="text-sm font-semibold text-sky-600 mt-1">Gestión de fidelización y premiación</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button 
            onClick={handleResetTodos} 
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg font-bold shadow-sm hover:bg-red-100 focus:outline-none transition"
            title="Borrar progreso de todos"
          >
            🧨 Resetear Semana
          </button>
          
          <input 
            type="text" 
            placeholder="Buscar por cédula, nombre..." 
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full md:w-[220px] px-4 py-2 rounded-lg border border-sky-300 shadow-sm focus:ring-2 focus:ring-sky-500 focus:outline-none text-sky-900 placeholder-sky-500 font-bold transition-all"
          />
          <button onClick={cargarDatos} className="bg-white/80 border border-sky-300 text-sky-800 px-4 py-2 rounded-lg font-bold shadow-sm hover:bg-sky-50 transition">
            🔄
          </button>
        </div>
      </div>

      <div className="bg-white/85 backdrop-blur-xl border border-sky-200 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-sky-900">
            <thead className="bg-sky-100 border-b border-sky-200 uppercase font-bold text-xs text-sky-800">
              <tr>
                <th className="px-6 py-4">Cliente / Datos</th>
                <th className="px-4 py-4 text-center">WhatsApp</th>
                <th className="px-4 py-4 text-center">Botellones Acum.</th>
                <th className="px-6 py-4 text-center">Premio Actual</th>
                <th className="px-6 py-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-100">
              {registrosFiltrados.map((user) => (
                <tr key={user.id} className="hover:bg-sky-50/50 transition">
                  <td className="px-6 py-5">
                    <div className="font-bold text-base">{user.nombre}</div>
                    <div className="text-xs text-sky-600 font-semibold mt-0.5">C.I: {user.cedula || 'N/A'} | Palabra: "{user.palabra}"</div>
                  </td>
                  <td className="px-4 py-5 text-center font-medium">
                    {user.telefono}
                  </td>
                  <td className="px-4 py-5 text-center">
                    <span className="inline-flex rounded-full bg-blue-100 text-blue-800 px-3 py-1 font-bold border border-blue-200 shadow-sm text-sm">
                      {user.compras} 💧
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    {user.compras >= 3 ? (
                      <span className="inline-flex bg-green-100 text-green-800 px-3 py-1.5 rounded-xl font-bold text-xs shadow-sm border border-green-200">
                        🎁 {getPremiosGanados(user.compras)}
                      </span>
                    ) : (
                      <span className="text-sky-400 font-semibold text-xs border border-dashed border-sky-300 px-3 py-1 rounded-xl">Buscando meta...</span>
                    )}
                  </td>
                  <td className="px-6 py-5 text-right w-64">
                    <div className="flex justify-end gap-2">
                       <button 
                        onClick={() => handleReset(user.id, user.nombre)}
                        className="bg-white border border-sky-300 text-sky-600 font-bold px-3 py-2 rounded-lg shadow-sm hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition transform hover:-translate-y-0.5"
                        title="Canjear premio y reiniciar su cuenta a 0"
                      >
                        Reset a 0
                      </button>
                      <button 
                        onClick={() => handleSumar(user.id, user.nombre)}
                        className="bg-gradient-to-r from-sky-500 to-blue-500 text-white font-bold px-4 py-2 rounded-lg shadow hover:opacity-80 transition transform hover:-translate-y-0.5"
                      >
                        +1 💧
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {registrosFiltrados.length === 0 && !cargando && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-sky-600 font-semibold">No se encontraron resultados para "{busqueda}".</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
