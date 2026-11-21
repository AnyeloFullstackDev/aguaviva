'use client';

import { useState, useEffect, useRef } from 'react';

const slides = [
  {
    url: 'https://plus.unsplash.com/premium_photo-1682144463486-a09f5801a60c?auto=format&fit=crop&w=1400&q=80',
    badge: 'Higiene y Bioseguridad',
    titulo: 'Lavado y Envasado Automatizado',
    descripcion: 'Esterilización interna de botellones a presión antes de cada llenado y sellado hermético.',
  },
  {
    url: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&w=1400&q=80',
    badge: 'Pureza y Minerales',
    titulo: 'Agua Fresca para tu Familia',
    descripcion: 'Equilibrio de minerales esenciales que aseguran suavidad, hidratación y sabor natural.',
  },
  {
    url: 'https://images.unsplash.com/photo-1584727638096-042c45049ebe?auto=format&fit=crop&w=1400&q=80',
    badge: 'Calidad Certificada',
    titulo: 'Control Riguroso en Laboratorio',
    descripcion: 'Monitoreo diario de pH y pureza microbiológica para mantener estándares de excelencia.',
  },
];

export default function PlantCarousel() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (!isHovered) {
      timerRef.current = setInterval(nextSlide, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, current]);

  return (
    <div
      className="relative w-full rounded-3xl overflow-hidden shadow-sm border border-sky-100 bg-sky-50 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-[320px] sm:h-[400px] lg:h-[450px] w-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === current ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
              }`}
          >
            <img
              src={slide.url}
              alt={slide.titulo}
              className="w-full h-full object-cover"
            />

            {/* Sombreado inferior suave para legibilidad */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent"></div>

            <div className="absolute bottom-0 inset-x-0 p-6 sm:p-9 z-20 max-w-2xl">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-white/90 text-sky-800 shadow-xs mb-2.5">
                {slide.badge}
              </span>
              <h3 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-xs">
                {slide.titulo}
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-100 font-medium leading-relaxed drop-shadow-xs">
                {slide.descripcion}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Flechas suaves */}
      <button
        onClick={prevSlide}
        aria-label="Anterior"
        className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-slate-700 flex items-center justify-center shadow-sm transition-all cursor-pointer font-bold text-lg"
      >
        ‹
      </button>

      <button
        onClick={nextSlide}
        aria-label="Siguiente"
        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-slate-700 flex items-center justify-center shadow-sm transition-all cursor-pointer font-bold text-lg"
      >
        ›
      </button>

      {/* Puntos de paginación */}
      <div className="absolute bottom-4 right-6 z-30 flex items-center gap-1.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            aria-label={`Ir a foto ${index + 1}`}
            className={`h-2 rounded-full transition-all cursor-pointer ${index === current
                ? 'w-6 bg-sky-400'
                : 'w-2 bg-white/60 hover:bg-white'
              }`}
          />
        ))}
      </div>
    </div>
  );
}
