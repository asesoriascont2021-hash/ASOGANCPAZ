export interface AcopioRecord {
  id: string;
  fecha: string;
  productor: string;
  cedulaCafetera: string;
  vereda: string;
  tipoCafe: 'pergamino' | 'cereza' | 'pasilla';
  pesoNeto: number; // en kilos
  humedad: number; // porcentaje (ej. 11.5)
  factorRendimiento: number; // ej. 94 (kilos de pergamino necesarios para un saco de 70kg de excelso)
  precioTotal: number; // COP
  estado: 'Pendiente' | 'Liquidado';
}

export interface SupplyItem {
  id: string;
  nombre: string;
  categoria: 'fertilizantes' | 'herramientas' | 'empaques' | 'control_plagas';
  precio: number;
  unidad: string;
  stock: number;
  descripcion: string;
}

export interface SpecialtyLot {
  id: string;
  nombre: string;
  finca: string;
  productor: string;
  variedad: string;
  proceso: 'Lavado' | 'Honey' | 'Natural' | 'Fermentación Extendida';
  altura: number; // m.s.n.m.
  puntajeSCA: number;
  perfilSensorial: string;
  kilosDisponibles: number;
  precioKilo: number; // COP
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface MarketReport {
  precioBaseCargo: number; // COP por carga de 125kg de pergamino seco
  precioBolsaNY: number; // USD por libra
  tasaCambioTRM: number; // COP por USD
  analisisIA: string;
  fechaActualizacion: string;
}
