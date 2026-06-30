import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Award, Globe, Ship, Check, DollarSign, ArrowRight, Tag, HelpCircle, Star } from 'lucide-react';
import { SpecialtyLot } from '../types';
import greenCoffeeBeansImg from '../assets/images/green_coffee_beans_1782839069663.jpg';

interface SpecialtyLotsModuleProps {
  tasaCambioTRM: number;
}

export default function SpecialtyLotsModule({ tasaCambioTRM }: SpecialtyLotsModuleProps) {
  const [lots, setLots] = useState<SpecialtyLot[]>([]);
  const [selectedLotId, setSelectedLotId] = useState<string>('');
  const [purchaseKilos, setPurchaseKilos] = useState<number>(70); // Standard 70kg export sack size
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  // Initialize Specialty Lots list
  useEffect(() => {
    const savedLots = localStorage.getItem('asogancpaz_specialty_lots');
    let useDefault = true;
    if (savedLots) {
      try {
        const parsed = JSON.parse(savedLots);
        // Force refresh if the saved lots don't have our new reference metadata
        if (parsed.length > 0 && parsed[0].tastingNotes) {
          setLots(parsed);
          useDefault = false;
        }
      } catch (e) {
        console.error(e);
      }
    }

    if (useDefault) {
      const defaultLots: SpecialtyLot[] = [
        {
          id: 'lot-01',
          nombre: 'Café Pergamino Excelso - Planadas',
          finca: 'Finca Las Nubes',
          productor: 'Don Orlando Castro',
          variedad: 'CASTILLO / COLOMBIA',
          proceso: 'Lavado',
          altura: 1850,
          puntajeSCA: 89.5,
          perfilSensorial: 'Fragancia floral intensa a jazmín, notas de durazno, té de limón, acidez fosfórica brillante, cuerpo sedoso.',
          kilosDisponibles: 280,
          precioKilo: 45000,
          tagBadge: 'MÁS SOLICITADO',
          locationPin: 'Tolima, Planadas (1,850 m.s.n.m)',
          rating: 4.9,
          tastingNotes: ['PANELA', 'LIMÓN', 'CUERPO MEDIO']
        },
        {
          id: 'lot-02',
          nombre: 'Café Pergamino Supremo - Pitalito',
          finca: 'Finca Villa Clara',
          productor: 'Clara Inés Ortega',
          variedad: 'CATURRA',
          proceso: 'Fermentación Extendida',
          altura: 1750,
          puntajeSCA: 88.0,
          perfilSensorial: 'Notas complejas de frutos rojos maduros, cereza, cacao nibs, acidez de manzana roja, cuerpo redondo.',
          kilosDisponibles: 420,
          precioKilo: 38000,
          tagBadge: 'CALIDAD DE EXPORTACIÓN',
          locationPin: 'Huila, Pitalito (1,750 m.s.n.m)',
          rating: 4.8,
          tastingNotes: ['CHOCOLATE DULCE', 'FRUTA AMARILLA', 'ACIDEZ BRILLANTE']
        },
        {
          id: 'lot-03',
          nombre: 'Café Pergamino - Sierra Nevada Orgánico',
          finca: 'Finca El Diamante',
          productor: 'Carlos Mario Giraldo',
          variedad: 'BORBÓN',
          proceso: 'Honey',
          altura: 1600,
          puntajeSCA: 87.5,
          perfilSensorial: 'Aroma a manzanilla y caña de azúcar, sabores a mandarina, panela, cuerpo cremoso y acidez jugosa.',
          kilosDisponibles: 140,
          precioKilo: 34000,
          tagBadge: '100% ORGÁNICO',
          locationPin: 'Sierra Nevada de Santa Marta',
          rating: 4.9,
          tastingNotes: ['MIEL DE ABEJAS', 'JAZMÍN', 'DULCE RESIDUAL']
        },
        {
          id: 'lot-04',
          nombre: 'Café Pergamino - Proceso Natural Anaeróbico',
          finca: 'Finca Buena Vista',
          productor: 'Herederos de Don Tobías',
          variedad: 'BORBÓN ROSADO',
          proceso: 'Natural',
          altura: 1900,
          puntajeSCA: 91.0,
          perfilSensorial: 'Notas extraordinarias y exóticas de maracuyá, arándanos silvestres, vino tinto y dulzor mascabado.',
          kilosDisponibles: 210,
          precioKilo: 62000,
          tagBadge: 'MICRO-LOTE ESPECIAL',
          locationPin: 'Tolima, Planadas (1,900 m.s.n.m)',
          rating: 5.0,
          tastingNotes: ['FRUTOS ROJOS', 'VINO TINTO', 'CHOCOLATE OSCURO']
        }
      ];
      setLots(defaultLots);
      localStorage.setItem('asogancpaz_specialty_lots', JSON.stringify(defaultLots));
    }
  }, []);

  // Pre-select first lot on mount/load
  useEffect(() => {
    if (lots.length > 0 && !selectedLotId) {
      setSelectedLotId(lots[0].id);
    }
  }, [lots, selectedLotId]);

  const selectedLot = lots.find(l => l.id === selectedLotId);

  // Math for purchase & export logistics
  // In Colombia, processing parchment to excelso (green coffee), packing in GrainPro,
  // securing FNC export stamps, customs agents, and logistics costs about $3,500 COP per Kilo.
  const LOGISTICS_COST_PER_KG = 3500; 

  const lotBasePrice = selectedLot ? selectedLot.precioKilo * purchaseKilos : 0;
  const logisticsTotal = selectedLot ? LOGISTICS_COST_PER_KG * purchaseKilos : 0;
  const totalInCOP = lotBasePrice + logisticsTotal;
  const totalInUSD = totalInCOP / tasaCambioTRM;

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryEmail || !selectedLot) {
      alert('Por favor complete su nombre y correo electrónico.');
      return;
    }

    setInquirySubmitted(true);
    setTimeout(() => {
      setInquirySubmitted(false);
      setInquiryName('');
      setInquiryEmail('');
    }, 6000);
  };

  // List of all specialty lots directly without filters
  const filteredLots = lots;

  const formatCOP = (val: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(val);
  };

  const formatUSD = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(val);
  };

  return (
    <div className="space-y-6" id="specialty-lots-container">
      {/* Banner de Cafés Especiales */}
      <div className="bg-stone-950 text-[#ebdcd0] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm relative overflow-hidden min-h-[220px]">
        {/* Background Image with Gradient Overlay */}
        <img
          src={greenCoffeeBeansImg}
          alt="Green Specialty Coffee Beans"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/85 to-transparent pointer-events-none"></div>

        <div className="space-y-2 max-w-xl relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-olive-950/60 backdrop-blur-xs border border-olive-800 text-olive-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 fill-amber-500/10" />
            Microlotes Premium Seleccionados
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-amber-50 leading-tight">ASOGANCPAZ Specialty Coffee</h2>
          <p className="text-stone-300 text-sm leading-relaxed font-sans">
            Acopiamos, trillamos y exportamos café verde premium de alta montaña, cultivado entre los 1,700 y 2,100 m.s.n.m. 
            por caficultores asociados en las laderas andinas de Icononzo, Tolima. Calidad excepcional con total trazabilidad.
          </p>
        </div>
        <div className="bg-stone-900/85 backdrop-blur-xs border border-stone-800 p-5 rounded-xl shrink-0 text-center w-full md:w-auto relative z-10">
          <span className="text-xs uppercase tracking-widest text-olive-400 font-bold block">Tasa de Cambio Oficial TRM</span>
          <span className="font-mono text-xl sm:text-2xl font-bold text-white block mt-1">
            ${tasaCambioTRM.toLocaleString('es-CO')} <span className="text-sm">COP</span>
          </span>
          <span className="text-[10px] text-stone-400 block mt-0.5">Liquidación directa para exportadores</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Lots Catalog list */}
        <div className="space-y-6">
          {/* Header with Coffee Beans Background */}
          <div className="bg-stone-950 text-white border border-stone-800 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden min-h-[100px]">
            <img
              src={greenCoffeeBeansImg}
              alt="Granos de café verde excelso"
              className="absolute inset-0 w-full h-full object-cover opacity-25"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-transparent pointer-events-none"></div>
            <div className="relative z-10">
              <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold block mb-1">Cafés Especiales de Origen</span>
              <h3 className="font-serif text-lg sm:text-xl font-extrabold text-white">Catálogo de Pergamino y Excelso</h3>
            </div>
            <div className="relative z-10 text-xs font-semibold text-emerald-300 bg-emerald-950/80 border border-emerald-900/60 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 self-start sm:self-center">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Lotes de Alta Taza Disponibles</span>
            </div>
          </div>

          {/* Lots Grid Matching reference image */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="pergamino-catalog-grid">
            {filteredLots.map(lot => {
              const isSelected = selectedLotId === lot.id;
              
              // Helper to map processes to their user-friendly display name in Spanish (from image)
              const getProcessDisplayName = (proceso: string) => {
                switch (proceso) {
                  case 'Lavado': return 'LAVADO TRADICIONAL';
                  case 'Fermentación Extendida': return 'DOBLE FERMENTACIÓN';
                  case 'Honey': return 'HONEY ECOLÓGICO';
                  case 'Natural': return 'NATURAL ANAERÓBICO';
                  default: return proceso.toUpperCase();
                }
              };

              return (
                <div
                  key={lot.id}
                  onClick={() => setSelectedLotId(lot.id)}
                  className={`bg-white border rounded-xl overflow-hidden shadow-xs cursor-pointer transition-all duration-300 flex flex-col relative h-full ${
                    isSelected
                      ? 'border-emerald-800 ring-4 ring-emerald-800/10 shadow-md transform -translate-y-1'
                      : 'border-stone-200 hover:border-stone-350 hover:shadow-sm hover:-translate-y-0.5'
                  }`}
                >
                  {/* Top Image Section with overlay details */}
                  <div className="h-64 w-full relative overflow-hidden bg-stone-100 shrink-0">
                    <img
                      src={greenCoffeeBeansImg}
                      alt={lot.nombre}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Dark gradient shadow on the bottom of image for readability */}
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-stone-900/50 to-transparent pointer-events-none"></div>

                    {/* Top-left dark green Badge exactly as shown in the image */}
                    <div className="absolute top-3 left-3 bg-[#1e3d24] text-[9px] font-extrabold text-[#f3f9f4] px-2.5 py-1 uppercase tracking-wider rounded-xs shadow-xs">
                      {lot.tagBadge || 'MÁS SOLICITADO'}
                    </div>

                    {/* Overlay white details bar exactly as shown in the image */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-white/95 backdrop-blur-xs px-2.5 py-1.5 rounded-sm border border-stone-200 flex items-center justify-between text-[9px] font-sans shadow-xs">
                      <div className="flex items-center gap-1 truncate max-w-[55%]">
                        <span className="text-stone-400 font-extrabold text-[8px] uppercase shrink-0">VARIEDAD:</span>
                        <span className="font-extrabold text-stone-800 truncate">{lot.variedad}</span>
                      </div>
                      <div className="text-stone-500 font-semibold text-[8.5px] shrink-0">
                        {lot.altura.toLocaleString()}m
                      </div>
                      <div className="text-[#1a4224] font-extrabold text-[8.5px] shrink-0 text-right uppercase tracking-tight">
                        {getProcessDisplayName(lot.proceso)}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Content Section */}
                  <div className="p-4 flex flex-col justify-between flex-grow space-y-4">
                    <div className="space-y-2">
                      {/* Location & Rating row exactly like the image */}
                      <div className="flex items-center justify-between gap-1">
                        <div className="flex items-center gap-1 text-[11px] text-stone-600 font-medium truncate">
                          <span className="text-[#ca503a] shrink-0">📍</span>
                          <span className="truncate" title={lot.locationPin}>
                            {lot.locationPin || lot.finca}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 bg-[#f0f4f1] border border-[#d5ded8] text-[#1a4224] text-[11px] font-extrabold px-2 py-0.5 rounded-xs shrink-0 shadow-3xs">
                          <Star className="w-3 h-3 fill-[#1a4224] text-[#1a4224]" />
                          <span>{(lot.rating || 4.9).toFixed(1)}</span>
                        </div>
                      </div>

                      {/* Title styled beautifully in serif bold italic like the image */}
                      <h3 className="font-serif text-[15px] sm:text-[16px] font-extrabold text-stone-900 italic leading-snug">
                        {lot.nombre}
                      </h3>

                      {/* Tasting Notes Tags exactly like the image */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {(lot.tastingNotes || ['PANELA', 'LIMÓN', 'CUERPO MEDIO']).map((note, index) => (
                          <span
                            key={index}
                            className="bg-[#fcfaf6] border border-[#ece6db] text-[#554d3e] font-extrabold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-xs shadow-3xs"
                          >
                            {note}
                          </span>
                        ))}
                      </div>

                      {/* Perfil Sensorial / Cup Score */}
                      <div className="pt-2 border-t border-dashed border-stone-100">
                        <div className="flex justify-between items-center text-[9px] uppercase font-extrabold text-stone-400 mb-0.5">
                          <span>Perfil de Taza</span>
                          <span className="text-emerald-700 font-mono">SCA {lot.puntajeSCA.toFixed(1)}</span>
                        </div>
                        <p className="text-[11px] text-stone-500 leading-normal italic font-serif line-clamp-2">
                          "{lot.perfilSensorial}"
                        </p>
                      </div>
                    </div>

                    {/* Pricing, stock, and selection button */}
                    <div className="space-y-3 pt-3 border-t border-stone-100 mt-auto">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <span className="text-[8px] text-stone-400 uppercase tracking-widest font-bold block">Precio Verde / Kg</span>
                          <span className="font-mono text-sm font-extrabold text-stone-800 block leading-tight">
                            {formatCOP(lot.precioKilo)}
                          </span>
                          <span className="text-[9px] text-stone-500 block">
                            ~{formatUSD(lot.precioKilo / tasaCambioTRM)} USD
                          </span>
                        </div>

                        <div className="text-right">
                          <span className="text-[8px] text-stone-400 uppercase tracking-widest font-bold block">Disponibilidad</span>
                          <span className="text-xs font-mono font-bold text-stone-800 block">
                            {lot.kilosDisponibles} kg
                          </span>
                          <span className="text-[9px] text-stone-500 block">
                            ({lot.kilosDisponibles / 70} sacos)
                          </span>
                        </div>
                      </div>

                      {/* Button to Select/Activate details below */}
                      <div className={`w-full text-center text-[10px] font-extrabold py-1.5 rounded-md transition-all ${
                        isSelected
                          ? 'bg-emerald-800 text-white shadow-xs'
                          : 'bg-stone-50 hover:bg-stone-100 text-stone-600 border border-stone-200'
                      }`}>
                        {isSelected ? '✓ SELECCIONADO PARA COTIZACIÓN' : 'SELECCIONAR LOTE'}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Calculator and Contact form for the selected lot */}
          {selectedLot && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-stone-900 border border-stone-800 text-stone-100 rounded-2xl p-6 sm:p-8 mt-8 shadow-md relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
                {/* Details and Calculator Column (7/12) */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <h4 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
                      {selectedLot.nombre}
                    </h4>
                    <p className="text-stone-400 text-xs sm:text-sm mt-1">
                      Productor: <strong className="text-stone-200 font-semibold">{selectedLot.productor}</strong> — Finca: <strong className="text-stone-200 font-semibold">{selectedLot.finca}</strong>
                    </p>
                  </div>

                  <div className="bg-stone-950/80 border border-stone-800 rounded-xl p-5 space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-stone-800/80">
                      <div>
                        <span className="text-xs font-bold text-stone-300 block">Cantidad a Cotizar (Kilos):</span>
                        <span className="text-[10px] text-stone-550 block">Sacos estándar de exportación: {purchaseKilos / 70} sacos</span>
                      </div>
                      
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button
                          onClick={() => setPurchaseKilos(prev => Math.max(70, prev - 70))}
                          className="bg-stone-800 hover:bg-stone-750 text-white font-bold px-3 py-1.5 rounded-lg text-xs"
                          title="Restar 1 saco (70kg)"
                        >
                          -70kg
                        </button>
                        <input
                          type="number"
                          value={purchaseKilos}
                          min={70}
                          max={selectedLot.kilosDisponibles}
                          step={70}
                          onChange={(e) => setPurchaseKilos(Math.max(70, parseInt(e.target.value) || 70))}
                          className="bg-stone-900 border border-stone-700 text-white font-mono text-center text-xs font-extrabold px-3 py-1.5 rounded-lg w-20 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                        />
                        <button
                          onClick={() => setPurchaseKilos(prev => Math.min(selectedLot.kilosDisponibles, prev + 70))}
                          className="bg-stone-800 hover:bg-stone-750 text-white font-bold px-3 py-1.5 rounded-lg text-xs"
                          title="Sumar 1 saco (70kg)"
                        >
                          +70kg
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      <div className="flex justify-between items-center text-stone-300">
                        <span>Valor Base Café Verde ({purchaseKilos} kg)</span>
                        <span className="font-mono">{formatCOP(selectedLot.precioKilo * purchaseKilos)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center text-stone-300">
                        <div>
                          <span>Costos de Trilla, GrainPro y Puerto</span>
                          <span className="text-[10px] text-stone-550 block">Estampilla FNC, agenciamiento y flete interno</span>
                        </div>
                        <span className="font-mono">{formatCOP(LOGISTICS_COST_PER_KG * purchaseKilos)}</span>
                      </div>

                      <div className="border-t border-dashed border-stone-800 pt-3 flex justify-between items-end">
                        <div>
                          <span className="text-stone-400 uppercase tracking-wider text-[10px] font-bold block">Total FOB Estimado</span>
                          <span className="text-white text-base font-bold font-mono">
                            {formatCOP(totalInCOP)} COP
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-emerald-400 font-extrabold text-lg font-mono">
                            {formatUSD(totalInUSD)} USD
                          </span>
                          <span className="text-[10px] text-stone-500 block">Liquidado a la TRM oficial</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-stone-950/40 p-4 rounded-xl border border-stone-800/50">
                    <div className="p-2.5 bg-emerald-950/80 rounded-lg text-emerald-400 shrink-0 border border-emerald-900">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-xs font-extrabold text-stone-200">Garantía de Origen & Trazabilidad</h5>
                      <p className="text-[11px] text-stone-450 leading-relaxed mt-0.5">
                        Cada lote de pergamino o excelso incluye certificados fitosanitarios de la FNC, análisis físico de rendimiento y humedad, y trazabilidad total con geolocalización de la finca productora.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact Inquiry Form Column (5/12) */}
                <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-stone-800 pt-6 lg:pt-0 lg:pl-8 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-white mb-1">
                      Cotizar este Microlote
                    </h4>
                    <p className="text-stone-400 text-xs leading-relaxed">
                      Complete sus datos de contacto para que el comité comercial de la cooperativa le envíe muestras físicas y la propuesta comercial definitiva.
                    </p>
                  </div>

                  {inquirySubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-emerald-950/80 border border-emerald-900 text-emerald-200 p-6 rounded-xl text-center space-y-3 my-6"
                    >
                      <div className="w-12 h-12 bg-emerald-900 rounded-full flex items-center justify-center mx-auto border border-emerald-700">
                        <Check className="w-6 h-6 text-emerald-400" />
                      </div>
                      <h5 className="font-bold text-sm text-white">Solicitud Recibida Correctamente</h5>
                      <p className="text-xs text-emerald-300 leading-relaxed">
                        Hemos registrado su interés por el lote <strong>{selectedLot.nombre}</strong> ({purchaseKilos} kg). Nuestro equipo comercial se comunicará con usted en menos de 24 horas hábiles. ¡Gracias por confiar en ASOGANCPAZ!
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSendInquiry} className="space-y-4 mt-6">
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block">
                          Nombre o Razón Social
                        </label>
                        <input
                          type="text"
                          required
                          value={inquiryName}
                          onChange={(e) => setInquiryName(e.target.value)}
                          placeholder="Ej: Cafés Especiales de Europa S.L."
                          className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3.5 py-2 text-xs text-white placeholder-stone-600 focus:outline-hidden focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block">
                          Correo Electrónico de Contacto
                        </label>
                        <input
                          type="email"
                          required
                          value={inquiryEmail}
                          onChange={(e) => setInquiryEmail(e.target.value)}
                          placeholder="compras@cafespecialty.com"
                          className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3.5 py-2 text-xs text-white placeholder-stone-600 focus:outline-hidden focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block">
                          Mensaje o Requerimiento Especial
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Deseo solicitar muestra de 250g verde, perfil de humedad y detalles logísticos adicionales..."
                          className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3.5 py-2 text-xs text-white placeholder-stone-600 focus:outline-hidden focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 resize-none"
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 text-white font-bold py-2.5 rounded-lg text-xs transition duration-200 shadow-md flex items-center justify-center gap-2"
                      >
                        <span>Enviar Solicitud de Cotización</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
