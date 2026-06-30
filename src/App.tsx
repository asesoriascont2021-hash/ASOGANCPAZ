import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Scale, ShoppingBag, Award, Sparkles, Sprout, Heart, BookOpen, ChevronRight, Home, Compass, Coffee, ShieldCheck } from 'lucide-react';
import AcopioModule from './components/AcopioModule';
import SuppliesModule from './components/SuppliesModule';
import SpecialtyLotsModule from './components/SpecialtyLotsModule';
import AgronomistChat from './components/AgronomistChat';
import MisionVisionModule from './components/MisionVisionModule';
import TransparenciaRteModule from './components/TransparenciaRteModule';

export default function App() {
  const [activeTab, setActiveTab] = useState<'inicio' | 'mision_vision' | 'catalogo_pergamino' | 'plan_suministro' | 'transparencia_rte'>('inicio');
  const [precioBaseCargo, setPrecioBaseCargo] = useState(1960000); // Default: COP per cargo
  const [tasaCambioTRM, setTasaCambioTRM] = useState(4180); // Default: COP per USD
  const [loadingPrices, setLoadingPrices] = useState(true);

  // Fetch prices from server API on mount so we can coordinate calculator values globally
  useEffect(() => {
    const loadGlobalMarketPrices = async () => {
      try {
        const response = await fetch('/api/market-analysis');
        if (response.ok) {
          const data = await response.json();
          if (data.precioBaseCargo) setPrecioBaseCargo(data.precioBaseCargo);
          if (data.tasaCambioTRM) setTasaCambioTRM(data.tasaCambioTRM);
        }
      } catch (err) {
        console.warn('Using local fallback values for cooperative pricing engine:', err);
      } finally {
        setLoadingPrices(false);
      }
    };
    loadGlobalMarketPrices();
  }, []);

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col font-sans text-stone-850" id="agrocafe-root">
      
      {/* Top micro announcement bar */}
      <div className="bg-olive-900 text-olive-100 text-[11px] py-2 px-4 sm:px-6 flex justify-between items-center shrink-0 border-b border-olive-950 font-mono">
        <div className="flex items-center gap-1.5">
          <Sprout className="w-3.5 h-3.5 text-olive-350" />
          <span>ASOCIACIÓN GANADERA CAMPESINA POR LA PAZ (ASOGANCPAZ) • NIT: 901.660.410-6</span>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <span>Soporte Técnico Agropecuario & Ganadería Sostenible</span>
          <span className="text-olive-300">● Sistema Operativo</span>
        </div>
      </div>

      {/* Main Header / Hero Section */}
      <header className="bg-white border-b border-stone-200 px-4 sm:px-8 py-5 shrink-0 shadow-3xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5">
          
          {/* Logo / Title Area */}
          <div className="flex items-center gap-4">
            {/* ASOGANCPAZ Logo Badge in Olive Green */}
            <div className="w-12 h-12 bg-olive-600 text-white rounded-xl flex flex-col items-center justify-center font-serif font-extrabold shadow-sm relative shrink-0 border border-olive-700">
              <span className="text-sm tracking-tighter leading-none mt-1">A</span>
              <span className="text-[10px] tracking-widest leading-none text-olive-100">GCP</span>
              <div className="absolute -bottom-1 w-6 h-1 bg-olive-400 rounded-full"></div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl sm:text-2xl font-black text-stone-900 tracking-tight leading-none uppercase">
                  ASOGANCPAZ
                </h1>
                <span className="text-[10px] bg-olive-50 text-olive-700 border border-olive-200 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
                  Asociación Ganadera Campesina
                </span>
              </div>
              <p className="text-xs text-stone-500 font-medium mt-1 leading-tight max-w-xl">
                Asociación Ganadera Campesina por la Paz en Icononzo, Tolima. Comercialización mayorista de materias primas agropecuarias, ganado bovino y café pergamino de alta calidad.
              </p>
            </div>
          </div>

          {/* Quick Stats Panel */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:self-center">
            <div className="px-3.5 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs flex flex-col">
              <span className="text-[9px] text-stone-400 font-bold uppercase tracking-wider">Carga Base CPS (125kg)</span>
              <span className="font-mono font-bold text-emerald-800 text-sm">
                ${precioBaseCargo.toLocaleString('es-CO')}
              </span>
            </div>
            <div className="px-3.5 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs flex flex-col">
              <span className="text-[9px] text-stone-400 font-bold uppercase tracking-wider">TRM de Referencia</span>
              <span className="font-mono font-bold text-stone-800 text-sm">
                ${tasaCambioTRM.toLocaleString('es-CO')}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Tabbed Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        
        {/* Navigation Tabs bar */}
        <div className="flex flex-wrap border-b border-stone-250 gap-4 sm:gap-6">
          {[
            { id: 'inicio', label: 'Inicio', icon: Home },
            { id: 'mision_vision', label: 'Misión y Visión', icon: Compass },
            { id: 'catalogo_pergamino', label: 'Catálogo Pergamino', icon: Coffee },
            { id: 'plan_suministro', label: 'Plan de Suministro', icon: ShoppingBag },
            { id: 'transparencia_rte', label: 'Transparencia RTE', icon: ShieldCheck }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-button-${tab.id}`}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-1 py-3 text-xs sm:text-sm font-bold tracking-tight border-b-2 transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'border-olive-700 text-olive-800 font-extrabold'
                    : 'border-transparent text-stone-700 hover:text-olive-900 hover:border-stone-300'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-olive-700' : 'text-stone-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Workspace Container */}
        <div id="dynamic-workspace-container" className="min-h-[500px]">
          {activeTab === 'inicio' && (
            <div className="space-y-8 animate-fadeIn">
              <AcopioModule precioBaseCargo={precioBaseCargo} />
            </div>
          )}

          {activeTab === 'mision_vision' && (
            <div className="animate-fadeIn">
              <MisionVisionModule />
            </div>
          )}

          {activeTab === 'catalogo_pergamino' && (
            <div className="animate-fadeIn">
              <SpecialtyLotsModule tasaCambioTRM={tasaCambioTRM} />
            </div>
          )}

          {activeTab === 'plan_suministro' && (
            <div className="animate-fadeIn">
              <SuppliesModule />
            </div>
          )}

          {activeTab === 'transparencia_rte' && (
            <div className="animate-fadeIn">
              <TransparenciaRteModule />
            </div>
          )}
        </div>
      </main>

      {/* Elegant, humble Footer conforming to architecture guidelines (no simulated telemetry or port numbers) */}
      <footer className="bg-olive-950 text-olive-100 py-8 px-4 sm:px-8 border-t border-olive-900 text-xs shrink-0">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-olive-900 pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-white text-base">ASOGANCPAZ</span>
                <span className="text-olive-700">|</span>
                <p className="text-olive-200 font-medium text-xs">Asociación Ganadera Campesina por la Paz</p>
              </div>
              <p className="text-[11px] text-olive-300">
                Dirección: Vereda La Fila, Finca El Pencil • Icononzo, Tolima • NIT: 901.660.410-6
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-olive-100 text-xs font-mono">
              <div>
                <span className="text-olive-400 font-sans block text-[10px] uppercase">Representante Legal</span>
                <span>Johan David Machado Benavides</span>
              </div>
              <div>
                <span className="text-olive-400 font-sans block text-[10px] uppercase">Contacto Teléfono</span>
                <a href="tel:+573228970383" className="hover:text-olive-300 transition-colors">+57 322 8970383</a>
              </div>
              <div>
                <span className="text-olive-400 font-sans block text-[10px] uppercase">Correo Electrónico</span>
                <a href="mailto:machadocometa@gmail.com" className="hover:text-olive-300 transition-colors lowercase">machadocometa@gmail.com</a>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-olive-400">
            <p>© 2026 ASOGANCPAZ - Asociación Ganadera Campesina por la Paz. Todos los derechos reservados.</p>
            <div className="flex items-center gap-4 font-medium">
              <span className="flex items-center gap-1">
                Trabajando con <Heart className="w-3 h-3 text-red-500 fill-red-500" /> por la Paz y el Progreso del Campo
              </span>
              <span>•</span>
              <span>Tolima, Colombia</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
