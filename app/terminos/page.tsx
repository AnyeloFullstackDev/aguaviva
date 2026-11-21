import Link from 'next/link';

export default function TerminosPage() {
  return (
    <div className="w-full max-w-4xl relative animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20 text-slate-800">
      <div className="text-center mb-8 pt-4">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-sky-700 font-bold hover:text-sky-900 mb-3 bg-white px-3.5 py-1.5 rounded-full border border-sky-200 shadow-xs">
          ← Volver al Inicio
        </Link>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 pb-2">
          Términos y Condiciones
        </h1>
        <p className="text-slate-600 font-medium mt-1 text-sm sm:text-base">
          Protección de Datos y Reglas del Programa de Recompensas
        </p>
      </div>

      <div className="bg-white border border-sky-100 rounded-3xl shadow-sm p-6 sm:p-10 text-slate-600 space-y-7">
        
        <div className="space-y-2.5">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            1. Privacidad y Seguridad de sus Datos
          </h2>
          <p className="font-medium text-slate-600 leading-relaxed text-sm sm:text-base">
            La información recopilada en este sistema (Nombre y Apellido, Cédula de Identidad, y Número de WhatsApp) es estrictamente confidencial. Será utilizada de forma exclusiva para fines de identificación y para garantizar que los beneficios de nuestro programa de fidelización lleguen a la persona correcta de forma transparente. Bajo ninguna circunstancia sus datos serán vendidos, compartidos o utilizados para otros fines fuera de las dinámicas comerciales de <strong>Aguaviva</strong>. Su privacidad y confianza son nuestra mayor prioridad.
          </p>
        </div>

        <div className="pt-6 space-y-2.5">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            2. Sistema Justo de Recompensas y Cierre Semanal
          </h2>
          <p className="font-medium text-slate-600 leading-relaxed text-sm sm:text-base">
            Los beneficios (tapas, recargas gratuitas, asas cargadoras y otros incentivos) están destinados únicamente al titular del documento de identidad registrado. Las recompensas se liberan progresivamente al cumplir los diferentes hitos de compra (ej. 3 compras, 5 compras, 10 compras) durante la semana en curso.
            <br /><br />
            Para mantener la equidad y prevenir el fraude, la administración se reserva el derecho de auditar y constatar la validez de los puntos acumulados. Aquel usuario que incurra en falsificación de identidad o intente vulnerar la plataforma sufrirá la anulación de sus puntos.
          </p>
        </div>

        <div className="pt-6 space-y-2.5">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            3. Disponibilidad y Aceptación
          </h2>
          <p className="font-medium text-slate-600 leading-relaxed text-sm sm:text-base">
            La entrega de toda recompensa física está directamente sujeta a la disponibilidad del inventario en nuestro establecimiento comercial. En caso excepcional de no contar con el recurso físico de la recompensa para el momento del reclamo, la misma será entregada en días hábiles subsiguientes o sustituida por un ítem de valor similar, siempre procurando la satisfacción del cliente. Completando el formulario de ingreso, el usuario brinda consentimiento expreso para la aplicación integral de estos Términos y Condiciones.
          </p>
        </div>

      </div>
    </div>
  );
}
