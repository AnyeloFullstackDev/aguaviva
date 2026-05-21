import { getPremios } from '../actions';
import PrizeTable from '../components/PrizeTable';

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

export default async function PremiosPage() {
  const premios = await getPremios();
  const rango = getRangoSemanaActual();

  return (
    <div className="w-full max-w-4xl relative animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-sky-300/40 via-blue-200/30 to-teal-300/40 blur-[100px] rounded-full" />

      <div className="text-center mb-8 mt-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-700 drop-shadow-sm pb-2">Sistema de Recompensas</h1>
        <p className="text-sky-800 font-bold mt-2 bg-white/70 inline-block px-5 py-2 rounded-full border border-sky-300 shadow-sm text-sm">🗓️ {rango}</p>
      </div>

      <div className="bg-white/85 backdrop-blur-3xl border border-sky-100 rounded-3xl shadow-xl overflow-hidden relative">
        <div className="absolute top-0 inset-x-0 h-[4px] bg-gradient-to-r from-sky-300 via-blue-500 to-sky-300"></div>
        <PrizeTable premios={premios} rango={rango} />
      </div>
    </div>
  );
}
