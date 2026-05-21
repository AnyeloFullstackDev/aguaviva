export default function TerminosPage() {
  return (
    <div className="w-full max-w-4xl relative animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-sky-400/20 to-blue-300/20 blur-[100px] rounded-full" />

      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-800 pb-2">Términos y Condiciones</h1>
        <p className="text-sky-800 font-bold mt-2">Protección de Datos y Reglas de Recompensas</p>
      </div>

      <div className="bg-white/90 backdrop-blur-3xl border border-sky-100 rounded-3xl shadow-xl overflow-hidden p-8 md:p-12 text-sky-900">
        <h2 className="text-2xl font-black mb-4 border-b-2 border-sky-200 pb-2 text-sky-700">1. Privacidad y Seguridad de sus Datos</h2>
        <p className="mb-8 font-medium text-sky-800 leading-relaxed">
          La información recopilada en este sistema (Nombre y Apellido, Cédula de Identidad, y Número de WhatsApp) es estrictamente confidencial. Será utilizada de forma exclusiva para fines de identificación y para garantizar que los beneficios de nuestro programa de fidelización lleguen a la persona correcta de forma transparente. Bajo ninguna circunstancia sus datos serán vendidos, compartidos o utilizados para otros fines fuera de las dinámicas comerciales de <strong>Aguaviva</strong>. Su privacidad y confianza son nuestra mayor prioridad.
        </p>

        <h2 className="text-2xl font-black mb-4 border-b-2 border-sky-200 pb-2 text-sky-700">2. Sistema Justo de Recompensas</h2>
        <p className="mb-8 font-medium text-sky-800 leading-relaxed">
          Los beneficios (como tapas, recargas gratuitas, asas cargadoras y otros incentivos) están destinados únicamente al titular del documento de identidad registrado. Las recompensas se liberan progresivamente al cumplir los diferentes hitos de compra (ej. 3 compras, 5 compras, 10 compras).
          <br /><br />
          Para mantener la equidad y prevenir el fraude con nuestro producto gancho, la administración se reserva el derecho absoluto de auditar, verificar mediante nombre y cédula, y constatar la validez de los puntos acumulados. Aquel usuario que incurra en la falsificación de identidad o intente vulnerar repetidamente la plataforma sufrirá la anulación de sus puntos acumulados.
        </p>

        <h2 className="text-2xl font-black mb-4 border-b-2 border-sky-200 pb-2 text-sky-700">3. Disponibilidad y Aceptación</h2>
        <p className="font-medium text-sky-800 leading-relaxed">
          La entrega de toda recompensa física está directamente sujeta a la disponibilidad del inventario en nuestro establecimiento comercial. En caso excepcional de no contar con el recurso físico de la recompensa para el momento del reclamo, la misma será entregada en días hábiles subsiguientes o sustituida por un ítem de valor similar, siempre procurando la satisfacción del cliente. Completando el formulario de ingreso, el usuario brinda consentimiento expreso para la aplicación integral de estos Términos y Condiciones.
        </p>
      </div>
    </div>
  );
}
