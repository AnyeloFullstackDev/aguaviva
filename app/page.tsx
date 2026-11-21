import Link from 'next/link';
import { getPremios } from './actions';
import PrizeTable from './components/PrizeTable';
import RegistroForm from './components/RegistroForm';
import PlantCarousel from './components/PlantCarousel';

export const dynamic = 'force-dynamic';

function getRangoSemanaActual() {
  const caracasStr = new Date().toLocaleString("en-US", { timeZone: "America/Caracas" });
  const now = new Date(caracasStr);
  now.setHours(0, 0, 0, 0);
  const diaSemana = now.getDay();
  const diffLunes = now.getDate() - diaSemana + (diaSemana === 0 ? -6 : 1);
  const lunes = new Date(new Date(now).setDate(diffLunes));
  const domingo = new Date(new Date(lunes).setDate(lunes.getDate() + 6));

  const formatter = new Intl.DateTimeFormat('es-VE', { weekday: 'long', day: 'numeric', month: 'long' });
  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return `Semana validada: ${cap(formatter.format(lunes))} al ${formatter.format(domingo)}`;
}

export default async function HomePage() {
  const premios = await getPremios();
  const rango = getRangoSemanaActual();

  return (
    <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10 sm:gap-12 pb-20 animate-in fade-in duration-500 text-slate-800">

      {/* ── 1. HERO SECTION ENMARCADO Y SUAVE ── */}
      <section id="inicio" className="w-full bg-white border border-sky-100 rounded-3xl p-6 sm:p-12 shadow-sm text-center flex flex-col items-center mt-2">

        {/* Badge superior */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs sm:text-sm font-bold mb-5">
          <span>💧</span> Planta Potabilizadora Aguaviva
        </div>

        {/* Título Principal Sin Gradientes */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15] max-w-4xl">
          Agua pura y fresca que <span className="text-sky-600">recompensa tu fidelidad</span>
        </h1>

        {/* Subtítulo suave y legible */}
        <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium max-w-2xl leading-relaxed">
          Por cada botellón que recargues en nuestra planta, acumulas puntos semanales con tu cédula. ¡Alcanza la meta y canjea <strong>tapas de repuesto</strong>, <strong>recargas gratis</strong> o <strong>asas de transporte</strong>!
        </p>

        {/* Botones Suaves (Colores Sólidos Sin Gradientes) */}
        <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
          <a
            href="#registro"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm sm:text-base px-8 py-3.5 rounded-full transition-colors cursor-pointer shadow-xs"
          >
            <span>✨</span> ¡Regístrate Ahora! <span>👇</span>
          </a>

          <a
            href="#premios"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 font-bold text-sm sm:text-base px-6 py-3.5 rounded-full transition-colors"
          >
            <span>🎁</span> Ver Premios de la Semana
          </a>
        </div>

        {/* 3 Métricas en tarjetas suaves */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-3xl mt-8">
          <div className="bg-sky-50/60 border border-sky-100 rounded-2xl p-3.5">
            <div className="text-sky-800 font-extrabold text-base sm:text-lg">1 Botellón = 1 Gota 💧</div>
            <div className="text-xs text-slate-600 font-medium mt-0.5">Acumula con cada compra</div>
          </div>
          <div className="bg-sky-50/60 border border-sky-100 rounded-2xl p-3.5">
            <div className="text-sky-800 font-extrabold text-base sm:text-lg">Sin Tickets de Papel 🆔</div>
            <div className="text-xs text-slate-600 font-medium mt-0.5">Todo registrado a tu Cédula</div>
          </div>
          <div className="bg-sky-50/60 border border-sky-100 rounded-2xl p-3.5">
            <div className="text-sky-800 font-extrabold text-base sm:text-lg">Retiro Inmediato 🏢</div>
            <div className="text-xs text-slate-600 font-medium mt-0.5">Canje físico en nuestra planta</div>
          </div>
        </div>
      </section>

      {/* ── 2. CARROUSEL DE LA PLANTA POTABILIZADORA ── */}
      <section id="planta" className="w-full scroll-mt-24 bg-white border border-sky-100 rounded-3xl p-5 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-5 gap-3">
          <div>
            <span className="text-xs font-bold text-sky-800 uppercase tracking-wider bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
              Instalaciones y Calidad
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Nuestra Planta de Potabilización
            </h2>
          </div>
        </div>

        <PlantCarousel />
      </section>

      {/* ── 3. CÓMO FUNCIONA EL SISTEMA DE FIDELIZACIÓN (3 COLUMNAS) ── */}
      <section id="como-funciona" className="w-full scroll-mt-24 bg-white border border-sky-100 rounded-3xl p-6 sm:p-9 shadow-sm">
        <div className="text-center mb-7">
          <span className="text-xs font-bold text-sky-800 uppercase tracking-wider bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            Mecánica Sencilla
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            ¿Cómo ganas tus recompensas?
          </h2>
          <p className="text-sm text-slate-600 font-medium mt-1">
            Solo 3 pasos para recibir tus premios semanales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-sky-50/50 border border-sky-100 rounded-2xl p-5 flex flex-col items-center text-center">
            <div className="w-10 h-10 bg-sky-100 text-sky-800 rounded-xl flex items-center justify-center text-lg font-bold mb-2.5">
              1
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Regístrate al Final</h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              Completa el formulario al pie de esta página con tu Cédula y WhatsApp una única vez.
            </p>
          </div>

          <div className="bg-sky-50/50 border border-sky-100 rounded-2xl p-5 flex flex-col items-center text-center">
            <div className="w-10 h-10 bg-sky-100 text-sky-800 rounded-xl flex items-center justify-center text-lg font-bold mb-2.5">
              2
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Recarga y Suma 💧</h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              Al comprar tu agua en taquilla, da tu cédula. Cada botellón suma automáticamente a tu cuenta semanal.
            </p>
          </div>

          <div className="bg-sky-50/50 border border-sky-100 rounded-2xl p-5 flex flex-col items-center text-center">
            <div className="w-10 h-10 bg-sky-100 text-sky-800 rounded-xl flex items-center justify-center text-lg font-bold mb-2.5">
              3
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">¡Canjea en Mostrador! 🎁</h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              Llega a 3, 5 o 10 botellones antes del domingo y llévate tu premio físico de inmediato en planta.
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. PREMIOS Y METAS DE LA SEMANA (2 COLUMNAS) ── */}
      <section id="premios" className="w-full scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* Columna Principal: Catálogo de Premios (8 Columnas) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-sky-100 rounded-2xl p-4 shadow-sm">
              <div>
                <span className="text-xs font-bold text-sky-800 uppercase tracking-wider bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                  Beneficios Activos
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                  Premios y Metas de la Semana
                </h2>
              </div>
              <div className="self-start sm:self-auto bg-sky-50 border border-sky-200 text-sky-800 font-bold px-3.5 py-1.5 rounded-full text-xs">
                🗓️ {rango}
              </div>
            </div>

            {/* Tabla de Premios Suave */}
            <div className="bg-white border border-sky-100 rounded-3xl shadow-sm overflow-hidden">
              <PrizeTable premios={premios} rango={rango} />
            </div>
          </div>

          {/* Columna Lateral: Dinámica y Preguntas Frecuentes (4 Columnas) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="bg-white border border-sky-100 rounded-3xl p-6 shadow-sm flex flex-col gap-3.5">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>📌</span> Reglas Importantes
              </h3>

              <div className="space-y-3.5 text-xs sm:text-sm text-slate-600 font-medium">
                <div className="flex gap-2.5 items-start">
                  <span className="text-base leading-none">💧</span>
                  <div>
                    <strong className="text-slate-900 font-bold block mb-0.5">Suma de botellones:</strong>
                    Recuerda dictar tu cédula al operador al cancelar tu recarga en planta.
                  </div>
                </div>

                <div className="flex gap-2.5 items-start">
                  <span className="text-base leading-none">⏳</span>
                  <div>
                    <strong className="text-slate-900 font-bold block mb-0.5">Reinicio Semanal:</strong>
                    Todos los lunes a las 12:00 AM el contador semanal vuelve a cero para un nuevo ciclo de premios.
                  </div>
                </div>

                <div className="flex gap-2.5 items-start">
                  <span className="text-base leading-none">🏢</span>
                  <div>
                    <strong className="text-slate-900 font-bold block mb-0.5">Retiro Físico:</strong>
                    Los premios se entregan personalmente en planta y están sujetos a inventario disponible.
                  </div>
                </div>
              </div>

              <div className="bg-sky-50/70 p-3.5 rounded-2xl border border-sky-100 mt-1">
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  ¿Quieres revisar los detalles de auditoría y protección de datos?
                </p>
                <Link
                  href="/terminos"
                  className="inline-block mt-1.5 font-bold text-xs text-sky-700 hover:text-sky-900 underline"
                >
                  Leer Términos y Condiciones completos →
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 5. FORMULARIO DE REGISTRO AL FINAL (CONVERSIÓN DESTACADA) ── */}
      <section id="registro" className="w-full scroll-mt-24 pt-2">
        <RegistroForm />
      </section>

      {/* ── 6. FOOTER SUAVE ── */}
      <footer className="w-full bg-white border border-sky-100 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-medium gap-4 shadow-xs">
        <div>
          © {new Date().getFullYear()} Aguaviva Planta Potabilizadora. Agua pura y certificada.
        </div>
        <div className="flex items-center gap-4">
          <Link href="/terminos" className="text-slate-600 hover:text-sky-700 underline transition">
            Términos y Condiciones
          </Link>
          <span className="text-slate-300">•</span>
          <Link href="/find" className="text-slate-400 hover:text-sky-700 transition">
            Área Administrativa
          </Link>
        </div>
      </footer>

    </div>
  );
}
