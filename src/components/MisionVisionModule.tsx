import React from 'react';
import { Sprout, ShieldCheck, Heart, Users, Compass, Eye, Milestone, Leaf } from 'lucide-react';
import coffeeFarmImg from '../assets/images/coffee_farm_1782839016532.jpg';

export default function MisionVisionModule() {
  return (
    <div className="space-y-8 animate-fadeIn" id="mision-vision-container">
      {/* Hero Banner Section */}
      <div className="bg-stone-950 text-olive-100 rounded-3xl p-8 sm:p-12 shadow-md relative overflow-hidden min-h-[300px] flex items-center">
        {/* Background Image with Gradient Overlay */}
        <img
          src={coffeeFarmImg}
          alt="Coffee Farm Tolima"
          className="absolute inset-0 w-full h-full object-cover opacity-35"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/80 to-transparent pointer-events-none"></div>
        
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-olive-950/60 backdrop-blur-xs border border-olive-800 text-olive-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-olive-400" />
            Nuestra Identidad Colectiva
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Sembrando Reconciliación y Cosechando Futuro en Tolima
          </h2>
          <p className="text-olive-200 text-sm sm:text-base leading-relaxed font-sans">
            La Asociación Ganadera Campesina por la Paz (ASOGANCPAZ) es el reflejo de la tenacidad de las familias rurales de Icononzo. Transformamos la ganadería tradicional en silvopastoril y cultivamos café de alta montaña con el firme compromiso de ser artesanos de la paz y custodios del medio ambiente.
          </p>
        </div>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Misión */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-2xs hover:shadow-xs transition duration-200 relative">
          <div className="absolute top-6 right-6 w-12 h-12 rounded-xl bg-olive-50 border border-olive-150 flex items-center justify-center text-olive-600">
            <Milestone className="w-6 h-6" />
          </div>
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-olive-600 font-mono">Orientación de Propósito</span>
            <h3 className="font-serif text-2xl font-bold text-stone-900">Nuestra Misión</h3>
            <p className="text-stone-600 text-sm leading-relaxed font-sans">
              Promover el desarrollo agropecuario integral, la ganadería sostenible y la producción artesanal de café pergamino de alta montaña, fomentando el arraigo campesino, la reconciliación social y la restauración ecológica del territorio en el municipio de Icononzo, Tolima.
            </p>
            <div className="border-t border-stone-100 pt-4 mt-2">
              <p className="text-xs text-stone-500 font-medium">
                Guiamos a nuestros asociados con asistencia técnica de vanguardia para asegurar rentabilidad y preservación de cuencas hídricas.
              </p>
            </div>
          </div>
        </div>

        {/* Visión */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-2xs hover:shadow-xs transition duration-200 relative">
          <div className="absolute top-6 right-6 w-12 h-12 rounded-xl bg-olive-50 border border-olive-150 flex items-center justify-center text-olive-600">
            <Eye className="w-6 h-6" />
          </div>
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-olive-600 font-mono">Futuro Deseado</span>
            <h3 className="font-serif text-2xl font-bold text-stone-900">Nuestra Visión (2030)</h3>
            <p className="text-stone-600 text-sm leading-relaxed font-sans">
              Para el año 2030, seremos reconocidos a nivel nacional e internacional como un modelo líder de asociatividad, reconciliación y sostenibilidad agropecuaria. Lograremos la exportación directa de cafés de especialidad con excelentes perfiles de taza y consolidaremos sistemas ganaderos silvopastoriles con certificación carbono-neutro.
            </p>
            <div className="border-t border-stone-100 pt-4 mt-2">
              <p className="text-xs text-stone-500 font-medium">
                Consolidar canales de comercialización directos con tostadores de especialidad e industrias cárnicas comprometidas con la deforestación cero.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Core values bento style */}
      <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-3xs space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h3 className="font-serif text-2xl font-bold text-stone-900">Principios que Nos Guían</h3>
          <p className="text-xs text-stone-500">
            Nuestros valores representan las bases de confianza y el pacto de convivencia entre nuestros asociados y el territorio.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-stone-150 flex flex-col gap-3">
            <div className="w-9 h-9 bg-olive-50 text-olive-700 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-stone-850 text-sm">Construcción de Paz</h4>
            <p className="text-stone-500 text-xs leading-relaxed">
              Creemos firmemente en la reconciliación y la transformación del campo a través del empleo digno, la cooperación y el perdón constructivo.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-stone-150 flex flex-col gap-3">
            <div className="w-9 h-9 bg-olive-50 text-olive-700 rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-stone-850 text-sm">Sostenibilidad Silvopastoril</h4>
            <p className="text-stone-500 text-xs leading-relaxed">
              Establecemos cercas vivas, bancos de forraje y reforestación de nacederos para asegurar una ganadería amigable con el ecosistema.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-stone-150 flex flex-col gap-3">
            <div className="w-9 h-9 bg-olive-50 text-olive-700 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-stone-850 text-sm">Trabajo Asociativo</h4>
            <p className="text-stone-500 text-xs leading-relaxed">
              La unión de pequeños productores multiplica nuestra fuerza en el mercado, optimiza los suministros y permite el progreso mutuo.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-stone-150 flex flex-col gap-3">
            <div className="w-9 h-9 bg-olive-50 text-olive-700 rounded-lg flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-stone-850 text-sm">Transparencia Total</h4>
            <p className="text-stone-500 text-xs leading-relaxed">
              Operamos con claridad financiera y transparencia institucional en cada peso liquidado de café y en el manejo de fondos cooperativos.
            </p>
          </div>
        </div>
      </div>

      {/* Sustainable Development Commitments */}
      <div className="bg-emerald-50/50 border border-emerald-150 rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
            <Sprout className="w-3 h-3" />
            Compromiso Tolima Sostenible
          </div>
          <h4 className="font-serif text-lg sm:text-xl font-bold text-emerald-950">Nuestros Esfuerzos de Conservación y Ganadería Amiga</h4>
          <p className="text-emerald-900/80 text-xs sm:text-sm max-w-2xl font-sans">
            Bajo el liderazgo de Johan David Machado Benavides, impulsamos talleres constantes para el control racional del suelo, evitando la sobreexplotación. Los caficultores de ASOGANCPAZ aplican agricultura orgánica y reducen las descargas de pulpa de café a las quebradas de Icononzo, garantizando una taza limpia y un agua libre de contaminación.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 shrink-0 w-full sm:w-auto">
          <div className="bg-white border border-emerald-100 p-4 rounded-xl text-center shadow-3xs">
            <span className="font-mono text-xl sm:text-2xl font-extrabold text-emerald-800">45+</span>
            <span className="text-[10px] text-stone-500 block uppercase font-bold mt-1">Familias Unidas</span>
          </div>
          <div className="bg-white border border-emerald-100 p-4 rounded-xl text-center shadow-3xs">
            <span className="font-mono text-xl sm:text-2xl font-extrabold text-emerald-800">120+</span>
            <span className="text-[10px] text-stone-500 block uppercase font-bold mt-1">Hectáreas Protegidas</span>
          </div>
        </div>
      </div>
    </div>
  );
}
