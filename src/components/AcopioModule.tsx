import React from 'react';
import { motion } from 'motion/react';
import { Scale, Heart, Shield, Award, Sprout, TrendingUp, Droplets, Landmark } from 'lucide-react';
import coffeeCherriesImg from '../assets/images/coffee_cherries_1782839052589.jpg';

interface AcopioModuleProps {
  precioBaseCargo: number; // COP per 125kg carga
}

export default function AcopioModule({ precioBaseCargo }: AcopioModuleProps) {
  // Cooperative stats of ASOGANCPAZ (Icononzo, Tolima)
  const totalKilos = 1820; // 1.82 Tons of coffee acopiado
  const totalInyectado = 29350000; // ~29.3 Million COP paid to families
  const averageFactor = 92.5; // High performance standard factor
  const averageMoisture = 11.4; // Perfect standard dry parchment moisture (10% - 12%)

  // COP Currency formatter
  const formatCOP = (val: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="space-y-8" id="acopio-module-wrapper">
      
      {/* Welcome Banner with Ripe Coffee Cherries Background & Gradients */}
      <div className="bg-stone-950 text-stone-100 rounded-3xl p-8 sm:p-12 shadow-md relative overflow-hidden min-h-[260px] flex items-center">
        {/* Background Image with Gradient Overlay */}
        <img
          src={coffeeCherriesImg}
          alt="Coffee Cherries harvest"
          className="absolute inset-0 w-full h-full object-cover opacity-35"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-transparent pointer-events-none"></div>

        <div className="max-w-2xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-olive-950/60 backdrop-blur-xs border border-olive-800 text-olive-300 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
            <Sprout className="w-3.5 h-3.5 text-olive-400" />
            Asociación de Caficultores y Ganaderos
          </div>
          <h2 className="font-serif text-2xl sm:text-3.5xl font-extrabold text-white leading-tight">
            Asociatividad y Calidad en Cada Cosecha
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-sans">
            Unimos fuerzas para dignificar la vida en el campo de Icononzo, Tolima. Comercializamos de forma transparente y colectiva café pergamino seco con excelentes atributos de taza y ganado criado con esquemas silvopastoriles sostenibles.
          </p>
        </div>
      </div>

      {/* Presentation banner of services */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Compromiso de Calidad */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-2xs space-y-3 hover:border-stone-300 transition duration-150">
          <div className="w-10 h-10 rounded-xl bg-olive-50 text-olive-700 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-base font-bold text-stone-850">Garantía de Origen Tolima</h3>
          <p className="text-xs text-stone-550 leading-relaxed font-sans">
            Comercializamos de forma asociativa café pergamino seco y ganado vacuno criado bajo esquemas sostenibles en la cordillera andina de Icononzo, garantizando una compensación justa al productor.
          </p>
        </div>

        {/* Card 2: Ganadería Sostenible */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-2xs space-y-3 hover:border-stone-300 transition duration-150">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Sprout className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-base font-bold text-stone-850">Prácticas Agroecológicas</h3>
          <p className="text-xs text-stone-550 leading-relaxed font-sans">
            Apoyamos la transición a una ganadería y caficultura amigables con el medio ambiente, promoviendo el uso de fertilizantes orgánicos y el control biológico para preservar la fertilidad del suelo local.
          </p>
        </div>

        {/* Card 3: Impacto de Paz */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-2xs space-y-3 hover:border-stone-300 transition duration-150">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-base font-bold text-stone-850">Construcción de Paz Social</h3>
          <p className="text-xs text-stone-550 leading-relaxed font-sans">
            Como asociación campesina, unimos fuerzas para dignificar la vida en el campo de Icononzo. Canalizamos recursos técnicos y comerciales colectivos para impulsar la paz territorial y el progreso rural.
          </p>
        </div>
      </div>

    </div>
  );
}
