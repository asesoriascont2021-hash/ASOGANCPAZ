import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, ShoppingBag, Plus, Minus, RotateCcw, Check, Sparkles, Tag } from 'lucide-react';
import { SupplyItem } from '../types';

export default function SuppliesModule() {
  const [items, setItems] = useState<SupplyItem[]>([]);
  const [cart, setCart] = useState<{ [id: string]: number }>({});
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [asociadoActivo, setAsociadoActivo] = useState(true);
  const [checkedOut, setCheckedOut] = useState(false);

  // Initialize supplies
  useEffect(() => {
    const savedSupplies = localStorage.getItem('asogancpaz_supplies');
    if (savedSupplies) {
      try {
        setItems(JSON.parse(savedSupplies));
      } catch (e) {
        console.error(e);
      }
    } else {
      const defaultSupplies: SupplyItem[] = [
        {
          id: 'sup-05',
          nombre: 'Control Orgánico de Broca (Beauveria Bassiana)',
          categoria: 'control_plagas',
          precio: 62000,
          unidad: 'Litro líquido concentrado',
          stock: 30,
          descripcion: 'Hongo entomopatógeno natural de alta efectividad para el control integrado de la broca del café, amigable con polinizadores e inocuo para la taza.',
        },
        {
          id: 'sup-08',
          nombre: 'Extracto de Ajo y Ají Concentrado',
          categoria: 'control_plagas',
          precio: 24000,
          unidad: 'Litro',
          stock: 45,
          descripcion: 'Repelente 100% orgánico para el control preventivo de plagas chupadoras (trips, ácaros y pulgones). No altera la microbiología nativa del suelo.',
        }
      ];
      setItems(defaultSupplies);
      localStorage.setItem('asogancpaz_supplies', JSON.stringify(defaultSupplies));
    }
  }, []);

  const saveSupplies = (updated: SupplyItem[]) => {
    setItems(updated);
    localStorage.setItem('asogancpaz_supplies', JSON.stringify(updated));
  };

  const addToCart = (id: string) => {
    const item = items.find(i => i.id === id);
    if (!item) return;

    const currentQty = cart[id] || 0;
    if (currentQty >= item.stock) {
      alert(`Lo sentimos, solo quedan ${item.stock} unidades de este producto.`);
      return;
    }

    setCart({
      ...cart,
      [id]: currentQty + 1
    });
    setCheckedOut(false);
  };

  const removeFromCart = (id: string) => {
    const currentQty = cart[id] || 0;
    if (currentQty <= 0) return;

    const newCart = { ...cart };
    if (currentQty === 1) {
      delete newCart[id];
    } else {
      newCart[id] = currentQty - 1;
    }
    setCart(newCart);
  };

  const clearCart = () => {
    setCart({});
    setCheckedOut(false);
  };

  const handleCheckout = () => {
    // Subtract stock
    const updatedItems = items.map(item => {
      const qtyInCart = cart[item.id] || 0;
      if (qtyInCart > 0) {
        return {
          ...item,
          stock: Math.max(0, item.stock - qtyInCart)
        };
      }
      return item;
    });

    saveSupplies(updatedItems);
    setCart({});
    setCheckedOut(true);

    // Timeout check message reset
    setTimeout(() => setCheckedOut(false), 5000);
  };

  // Calculations
  const cartSubtotal = Object.entries(cart).reduce((acc, [id, qty]) => {
    const item = items.find(i => i.id === id);
    if (!item) return acc;
    return acc + (item.precio * Number(qty));
  }, 0);

  const discountRate = asociadoActivo ? 0.08 : 0; // 8% Cooperative discount
  const discountVal = cartSubtotal * discountRate;
  const cartTotal = cartSubtotal - discountVal;

  const filteredItems = items.filter(item => {
    const matchesSearch = item.nombre.toLowerCase().includes(search.toLowerCase()) || 
                          item.descripcion.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'todos' ? true : item.categoria === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const formatCOP = (val: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="space-y-6" id="supplies-module-container">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Supplies Catalog (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Filter Bar */}
          <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-2xs flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
              <input
                type="text"
                placeholder="Buscar insumos biológicos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 border border-stone-300 rounded-lg text-xs bg-white focus:outline-hidden focus:border-olive-600 focus:ring-1 focus:ring-olive-600/30 transition-colors"
              />
            </div>

            <div className="flex gap-1.5 overflow-x-auto w-full md:w-auto scrollbar-none pb-1 md:pb-0">
              {[
                { id: 'todos', label: 'Todos' },
                { id: 'control_plagas', label: 'Control Plagas' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-olive-800 text-olive-50'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Catalog grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredItems.map(item => {
              const qtyInCart = cart[item.id] || 0;
              const hasStock = item.stock > 0;
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border border-stone-200 rounded-2xl p-5 shadow-2xs flex flex-col justify-between hover:shadow-xs hover:border-stone-300 transition-all duration-200 relative"
                >
                  <div>
                    {/* Header: Category Badge & Stock */}
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-olive-700 bg-olive-50 px-2.5 py-0.5 rounded-full">
                        {item.categoria.replace('_', ' ')}
                      </span>
                      <span className={`text-[10px] font-mono font-bold ${
                        item.stock > 20
                          ? 'text-emerald-700'
                          : item.stock > 0
                          ? 'text-amber-700 animate-pulse'
                          : 'text-red-600'
                      }`}>
                        {item.stock > 0 ? `${item.stock} disponibles` : 'Sin Stock'}
                      </span>
                    </div>

                    <h4 className="font-serif text-base font-bold text-stone-800 line-clamp-1">{item.nombre}</h4>
                    <span className="text-xs text-stone-400 block mt-0.5 font-medium">Unidad: {item.unidad}</span>
                    <p className="text-stone-600 text-xs mt-2 leading-relaxed line-clamp-3 font-sans">
                      {item.descripcion}
                    </p>
                  </div>

                  {/* Pricing and Action */}
                  <div className="border-t border-stone-100 pt-4 mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-stone-400 uppercase tracking-wide block">Precio Asociado</span>
                      <span className="font-mono text-base font-extrabold text-stone-800">
                        {formatCOP(item.precio)}
                      </span>
                    </div>

                    {qtyInCart > 0 ? (
                      <div className="flex items-center gap-2 bg-stone-100 border border-stone-200 p-1 rounded-lg">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 rounded-md hover:bg-stone-200 text-stone-600 transition"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-mono font-bold text-stone-850 px-1">{qtyInCart}</span>
                        <button
                          onClick={() => addToCart(item.id)}
                          disabled={item.stock <= qtyInCart}
                          className="p-1 rounded-md hover:bg-stone-200 text-stone-600 transition disabled:opacity-30"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(item.id)}
                        disabled={!hasStock}
                        className="px-4 py-2 bg-olive-700 hover:bg-olive-800 text-olive-50 rounded-lg text-xs font-bold shadow-2xs hover:shadow-xs transition disabled:bg-stone-200 disabled:text-stone-400 disabled:shadow-none cursor-pointer"
                      >
                        Añadir
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Interactive Shopping Cart & Credit Calculator (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 shadow-xs sticky top-6">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-olive-600" />
                <h3 className="font-serif text-base font-bold text-stone-800">Caja de Suministros</h3>
              </div>
              {Object.keys(cart).length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-[10px] text-stone-400 hover:text-red-600 font-bold uppercase tracking-wider flex items-center gap-1 transition"
                >
                  <RotateCcw className="w-3 h-3" />
                  Vaciar
                </button>
              )}
            </div>

            {/* Simulated Checkout Success Message */}
            {checkedOut && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-emerald-800 mb-4 flex items-start gap-2.5"
              >
                <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="block font-bold">¡Despacho Registrado Exitosamente!</strong>
                  Se ha generado la boleta de cargo al cupo de crédito del caficultor asociado. Inventario actualizado.
                </div>
              </motion.div>
            )}

            {Object.keys(cart).length === 0 ? (
              <div className="p-8 text-center text-stone-400">
                <ShoppingBag className="w-10 h-10 mx-auto stroke-1 text-stone-300 mb-2" />
                <p className="text-xs">No hay insumos seleccionados en la calculadora.</p>
                <p className="text-[10px] mt-1 text-stone-400">Haz clic en "Añadir" en el catálogo para simular la cotización y descuento por asociado.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Cart Items list */}
                <div className="divide-y divide-stone-200 max-h-48 overflow-y-auto pr-1">
                  {Object.entries(cart).map(([id, qty]) => {
                    const item = items.find(i => i.id === id);
                    if (!item) return null;
                    return (
                      <div key={id} className="py-2.5 flex justify-between items-center text-xs">
                        <div className="pr-3">
                          <span className="font-semibold text-stone-850 block leading-tight">{item.nombre}</span>
                          <span className="text-[10px] text-stone-400 font-mono">
                            {qty} x {formatCOP(item.precio)}
                          </span>
                        </div>
                        <span className="font-mono font-bold text-stone-800 shrink-0">
                          {formatCOP(item.precio * Number(qty))}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Membership Credit Switch */}
                <div className="border-t border-b border-stone-200 py-3 bg-stone-100/50 px-3 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-4 h-4 text-olive-600" />
                    <div>
                      <span className="text-[11px] font-bold text-stone-750 block">¿Caficultor Asociado?</span>
                      <span className="text-[9px] text-emerald-700">Aplica 8% descuento cooperativo</span>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={asociadoActivo}
                      onChange={(e) => setAsociadoActivo(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-8 h-4.5 bg-stone-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-olive-600"></div>
                  </label>
                </div>

                {/* Calculation details */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-stone-500">
                    <span>Subtotal Insumos:</span>
                    <span className="font-mono">{formatCOP(cartSubtotal)}</span>
                  </div>
                  {asociadoActivo && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Dcto. Asociado (8%):</span>
                      <span className="font-mono">- {formatCOP(discountVal)}</span>
                    </div>
                  )}
                  <div className="border-t border-stone-200 pt-2 flex justify-between items-center">
                    <span className="text-sm font-bold text-stone-800">Total Despacho:</span>
                    <span className="font-mono text-base font-extrabold text-olive-700">
                      {formatCOP(cartTotal)}
                    </span>
                  </div>
                </div>

                {/* Simulated credit note purchase */}
                <button
                  onClick={handleCheckout}
                  className="w-full py-3 bg-olive-700 hover:bg-olive-800 text-white font-bold rounded-xl shadow-xs transition hover:shadow-md flex items-center justify-center gap-2 text-xs font-semibold cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-olive-100" />
                  Cargar a Cupo Rotativo / Cuenta
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
