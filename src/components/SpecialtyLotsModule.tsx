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
  const [processFilter, setProcessFilter] = useState<string>('todos');
  const [minSca, setMinSca] = useState<number>(80);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  // Initialize Specialty Lots list
  useEffect(() => {
    const savedLots = localStorage.getItem('asogancpaz_specialty_lots');
    if (savedLots) {
      try {
        setLots(JSON.parse(savedLots));
      } catch (e) {
        console.error(e);
      }
    } else {
      const defaultLots: SpecialtyLot[] = [
        {
          id: 'lot-01',
          nombre: 'Lote Geisha Ancestral',
          finca: 'Finca Las Nubes',
          productor: 'Don Orlando Castro',
          variedad: 'Geisha',
          proceso: 'Honey',
          altura: 1950,
          puntajeSCA: 89.5,
          perfilSensorial: 'Fragancia floral intensa a jazmín, notas de durazno, té de limón, acidez fosfórica brillante, cuerpo sedoso y retrogusto prolongado y dulce.',
          kilosDisponibles: 280, // 4 sacks of 70kg
          precioKilo: 45000, // COP per kg (~$10.7 USD/kg, high-end)
        },
        {
          id: 'lot-02',
          nombre: 'Borbón Rosado Doble Fermentación',
          finca: 'Finca Villa Clara',
          productor: 'Clara Inés Ortega',
          variedad: 'Borbón Rosado (Pink Bourbon)',
          proceso: 'Fermentación Extendida',
          altura: 1800,
          puntajeSCA: 88.0,
          perfilSensorial: 'Notas complejas de frutos rojos maduros, cereza, cacao nibs, acidez de manzana roja, cuerpo redondo y licoroso con un dulzor meloso.',
          kilosDisponibles: 420, // 6 sacks of 70kg
          precioKilo: 38000,
        },
        {
          id: 'lot-03',
          nombre: 'Caturra Chiroso Honey Silvestre',
          finca: 'Finca El Diamante',
          productor: 'Carlos Mario Giraldo',
          variedad: 'Chiroso',
          proceso: 'Honey',
          altura: 1850,
          puntajeSCA: 87.5,
          perfilSensorial: 'Aroma a manzanilla y caña de azúcar, sabores a mandarina, panela, cuerpo medio-alto cremoso, acidez limpia y jugosa.',
          kilosDisponibles: 140, // 2 sacks of 70kg
          precioKilo: 34000,
        },
        {
          id: 'lot-04',
          nombre: 'Castillo Selección Especial del Fundador',
          finca: 'Finca Buena Vista',
          productor: 'Herederos de Don Tobías',
          variedad: 'Castillo (Selección FNC)',
          proceso: 'Lavado',
          altura: 1720,
          puntajeSCA: 85.5,
          perfilSensorial: 'Notas clásicas colombianas de chocolate amargo, caramelo tostado, avellanas, cuerpo estructurado, acidez málica equilibrada.',
          kilosDisponibles: 700, // 10 sacks of 70kg
          precioKilo: 26000,
        },
        {
          id: 'lot-05',
          nombre: 'Geisha Natural Volcánico',
          finca: 'Finca Alto del Fuego',
          productor: 'Guillermo Aristizábal',
          variedad: 'Geisha',
          proceso: 'Natural',
          altura: 2050,
          puntajeSCA: 91.0,
          perfilSensorial: 'Notas extraordinarias y exóticas de maracuyá, mango, arándanos silvestres, vino tinto de guarda, dulzor mascabado extremo, acidez tartárica vibrante.',
          kilosDisponibles: 210, // 3 sacks of 70kg
          precioKilo: 62000,
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

  // Filter lots
  const filteredLots = lots.filter(lot => {
    const matchesProcess = processFilter === 'todos' ? true : lot.proceso === processFilter;
    const matchesSca = lot.puntajeSCA >= minSca;
    return matchesProcess && matchesSca;
  });

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

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Lots Catalog list */}
        <div className="space-y-6">
          {/* Header & Mini Filters */}
          <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex gap-2">
              <span className="text-xs font-bold text-stone-600 self-center">Proceso:</span>
              <select
                value={processFilter}
                onChange={(e) => setProcessFilter(e.target.value)}
                className="border border-stone-350 rounded-lg px-2.5 py-1 text-xs bg-white text-stone-750 focus:outline-hidden"
              >
                <option value="todos">Todos los procesos</option>
                <option value="Lavado">Lavado Tradicional</option>
                <option value="Honey">Honey</option>
                <option value="Natural">Natural</option>
                <option value="Fermentación Extendida">Fermentación Extendida</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-stone-600">Puntaje Mínimo SCA:</span>
              <div className="flex gap-1.5">
                {[80, 85, 88].map(score => (
                  <button
                    key={score}
                    onClick={() => setMinSca(score)}
                    className={`px-2.5 py-1 rounded-md text-xs font-bold font-mono transition ${
                      minSca === score
                        ? 'bg-olive-700 text-white'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
                    }`}
                  >
                    {score === 80 ? '80+' : `${score}+`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Lots Grid */}
          <div className="space-y-4">
            {filteredLots.map(lot => (
              <div
                key={lot.id}
                onClick={() => setSelectedLotId(lot.id)}
                className={`bg-white border rounded-2xl p-5 shadow-2xs cursor-pointer transition-all duration-300 flex flex-col sm:flex-row gap-5 relative overflow-hidden ${
                  selectedLotId === lot.id
                    ? 'border-olive-600 ring-2 ring-olive-600/10 shadow-xs'
                    : 'border-stone-200 hover:border-stone-350 hover:shadow-2xs'
                }`}
              >
                {/* SCA Cup Badge overlay */}
                <div className="absolute top-0 right-0 bg-olive-100 text-olive-700 font-mono font-bold text-xs px-4 py-1.5 rounded-bl-xl border-l border-b border-stone-200 flex items-center gap-1 shadow-2xs">
                  <Star className="w-3.5 h-3.5 fill-olive-700" />
                  <span>SCA {lot.puntajeSCA.toFixed(1)}</span>
                </div>

                {/* Left col: Coffee stats */}
                <div className="sm:w-1/3 flex flex-col justify-between border-b sm:border-b-0 sm:border-r border-stone-100 pb-4 sm:pb-0 sm:pr-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-800">
                      Microlote Exclusivo
                    </span>
                    <h3 className="font-serif text-lg font-bold text-stone-800 mt-0.5">{lot.nombre}</h3>
                    <p className="text-xs text-stone-500 font-medium mt-1">Finca: {lot.finca}</p>
                    <p className="text-[11px] text-stone-400 mt-0.5">Por {lot.productor}</p>
                  </div>

                  <div className="space-y-1 mt-4">
                    <div className="text-[10px] text-stone-400 font-medium">Variedad: <strong className="text-stone-700 font-semibold">{lot.variedad}</strong></div>
                    <div className="text-[10px] text-stone-400 font-medium">Proceso: <strong className="text-stone-700 font-semibold">{lot.proceso}</strong></div>
                    <div className="text-[10px] text-stone-400 font-medium">Altura: <strong className="text-stone-700 font-semibold">{lot.altura} m.s.n.m.</strong></div>
                  </div>
                </div>

                {/* Right col: Profile, pricing, stock */}
                <div className="sm:w-2/3 flex flex-col justify-between pt-1 sm:pt-0">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block mb-1">Perfil de Taza</span>
                    <p className="text-stone-650 text-xs leading-relaxed italic font-serif">
                      "{lot.perfilSensorial}"
                    </p>
                  </div>

                  <div className="flex justify-between items-end border-t border-stone-100 pt-4 mt-4">
                    <div>
                      <span className="text-[9px] text-stone-400 uppercase tracking-wider block">Precio Verde / Kg</span>
                      <span className="font-mono text-base font-extrabold text-stone-800">{formatCOP(lot.precioKilo)}</span>
                      <span className="text-[9px] text-stone-500 block">~{formatUSD(lot.precioKilo / tasaCambioTRM)} USD</span>
                    </div>

                    <div className="text-right">
                      <span className="text-[9px] text-stone-400 uppercase tracking-wider block">Stock Disponible</span>
                      <span className="text-xs font-mono font-bold text-stone-800 block">
                        {lot.kilosDisponibles} kg <span className="text-[10px] font-sans font-medium text-stone-500">({lot.kilosDisponibles / 70} sacos)</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
