import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, RefreshCw, DollarSign, Calendar, Flame, AlertCircle } from 'lucide-react';
import { MarketReport } from '../types';

interface MarketCardProps {
  onOpenCalculator: () => void;
}

export default function MarketCard({ onOpenCalculator }: MarketCardProps) {
  const [data, setData] = useState<MarketReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMarketData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/market-analysis');
      if (!response.ok) {
        throw new Error('No se pudieron obtener los datos de mercado.');
      }
      const result = await response.json();
      setData(result);
    } catch (err: any) {
      console.error(err);
      setError('Error al conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
  }, []);

  // Format COP Currency
  const formatCOP = (val: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <motion.div
      id="market-card-container"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-stone-50 border border-stone-200 rounded-2xl overflow-hidden shadow-sm"
    >
      {/* Header */}
      <div className="bg-olive-850 px-6 py-5 text-stone-100 flex justify-between items-center">
        <div>
          <span className="text-xs tracking-wider uppercase opacity-75 font-medium">Indicadores del Día</span>
          <h2 className="font-serif text-2xl font-semibold text-olive-50">Mercado Cafetero Colombiano</h2>
        </div>
        <button
          onClick={fetchMarketData}
          disabled={loading}
          className="p-2 rounded-full bg-olive-700 hover:bg-olive-600 text-olive-100 hover:text-white transition-colors duration-200"
          title="Actualizar datos"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {loading ? (
        <div className="p-12 flex flex-col justify-center items-center text-stone-500">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-stone-600 mb-3"></div>
          <p className="text-sm font-medium">Consultando Bolsa de NY y tasa de cambio...</p>
        </div>
      ) : error || !data ? (
        <div className="p-8 text-center text-stone-600">
          <AlertCircle className="w-10 h-10 mx-auto text-olive-700 mb-3" />
          <p className="text-sm mb-4">{error || 'No hay datos disponibles.'}</p>
          <button
            onClick={fetchMarketData}
            className="px-4 py-2 bg-olive-800 hover:bg-olive-700 text-olive-100 hover:text-white rounded-lg text-xs font-semibold transition"
          >
            Reintentar
          </button>
        </div>
      ) : (
        <div className="p-6">
          {/* Market Indicators Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* National Base Price */}
            <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs text-stone-500 uppercase tracking-wide block">Precio Base Nacional</span>
                <span className="text-xs text-stone-400 block mb-1">Carga 125kg CPS (Estándar FNC)</span>
              </div>
              <div className="mt-2">
                <span className="font-mono text-xl sm:text-2xl font-bold text-emerald-800">
                  {formatCOP(data.precioBaseCargo)}
                </span>
                <div className="flex items-center text-xs text-emerald-600 font-medium mt-1">
                  <TrendingUp className="w-3.5 h-3.5 mr-1" />
                  <span>Sustentación estable</span>
                </div>
              </div>
            </div>

            {/* NY Bolsa C-Market */}
            <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs text-stone-500 uppercase tracking-wide block">Bolsa de Nueva York</span>
                <span className="text-xs text-stone-400 block mb-1">Contrato C (Arábica Premium)</span>
              </div>
              <div className="mt-2">
                <span className="font-mono text-xl sm:text-2xl font-bold text-stone-800">
                  ${data.precioBolsaNY.toFixed(2)} <span className="text-sm font-sans font-medium text-stone-500">USD/lb</span>
                </span>
                <span className="text-xs text-stone-500 block mt-1">
                  Último cierre operativo
                </span>
              </div>
            </div>

            {/* TRM Exchange Rate */}
            <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs text-stone-500 uppercase tracking-wide block">Tasa de Cambio (TRM)</span>
                <span className="text-xs text-stone-400 block mb-1">Dólar de EE.UU. a COP</span>
              </div>
              <div className="mt-2">
                <span className="font-mono text-xl sm:text-2xl font-bold text-stone-800">
                  ${data.tasaCambioTRM.toLocaleString('es-CO')} <span className="text-xs font-sans font-medium text-stone-500">COP</span>
                </span>
                <div className="flex items-center text-xs text-stone-500 mt-1">
                  <Calendar className="w-3.5 h-3.5 mr-1" />
                  <span>{data.fechaActualizacion}</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Advisor Insight */}
          <div className="bg-olive-50 border border-olive-200/60 rounded-xl p-5 mb-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-olive-200/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="flex items-center gap-2 mb-2 text-olive-900">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-olive-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-olive-500"></span>
              </span>
              <span className="text-xs font-bold tracking-wider uppercase text-olive-700 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-olive-600 fill-olive-500" />
                Análisis de Tendencia IA
              </span>
            </div>
            <p className="text-stone-750 text-sm leading-relaxed font-sans italic">
              "{data.analisisIA}"
            </p>
          </div>

          {/* Quick Payout Call to Action */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 bg-stone-100/60 p-4 rounded-xl border border-stone-200/50">
            <div className="text-xs text-stone-500 leading-relaxed">
              ¿Quieres calcular cuánto vale tu lote actual basado en su <strong className="text-stone-700">Factor de Rendimiento</strong> y porcentaje de humedad?
            </div>
            <button
              onClick={onOpenCalculator}
              className="px-5 py-2.5 bg-olive-700 hover:bg-olive-800 text-olive-50 text-sm font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-200 whitespace-nowrap"
            >
              Calcular Liquidación
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
