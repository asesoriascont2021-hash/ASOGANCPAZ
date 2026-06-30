import React, { useState } from 'react';
import { FileText, Download, CheckCircle, Shield, Calendar, Award, Building, DollarSign, Mail, Send, ExternalLink, RefreshCw } from 'lucide-react';
import coffeeFarmImg from '../assets/images/coffee_farm_1782839016532.jpg';

interface DocItem {
  id: string;
  name: string;
  description: string;
  size: string;
  category: string;
  code: string;
}

export default function TransparenciaRteModule() {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadedDocs, setDownloadedDocs] = useState<Record<string, boolean>>({});
  const [mailboxForm, setMailboxForm] = useState({ name: '', email: '', message: '' });
  const [submittingMail, setSubmittingMail] = useState(false);
  const [mailSent, setMailSent] = useState(false);

  const rteDocuments: DocItem[] = [
    {
      id: 'doc-1',
      name: 'Acta de Asamblea General Constitución y Aprobación de Estatutos',
      description: 'Documento constitutivo y aprobación formal de reglamentos y estatutos internos.',
      size: '2.4 MB',
      category: 'Legal',
      code: 'ACT-2026-001',
    },
    {
      id: 'doc-2',
      name: 'Certificación de Requisitos Representante Legal y Revisor Fiscal',
      description: 'Acreditación de antecedentes penales, fiscales e idoneidad de directivos.',
      size: '1.1 MB',
      category: 'Certificaciones',
      code: 'CERT-REQUIS-04',
    },
    {
      id: 'doc-3',
      name: 'Estados Financieros y Balance General de Apertura y Cierre',
      description: 'Balance consolidado, estado de resultados y notas aclaratorias firmadas.',
      size: '3.8 MB',
      category: 'Financiero',
      code: 'EST-FINAN-2025',
    },
    {
      id: 'doc-4',
      name: 'Memoria Explicativa de Actividades de Impacto Social',
      description: 'Informe detallado de proyectos ganaderos sostenibles y acopio de café en Icononzo, Tolima.',
      size: '5.2 MB',
      category: 'Impacto Social',
      code: 'MEM-EXP-012',
    },
    {
      id: 'doc-5',
      name: 'Certificado de Existencia y Representación Legal (Cámara de Comercio)',
      description: 'Trazabilidad jurídica y personería legal activa de la asociación.',
      size: '850 KB',
      category: 'Legal',
      code: 'CAM-COM-ASO',
    },
    {
      id: 'doc-6',
      name: 'Proyecto de Distribución de Excedentes de la Cooperativa',
      description: 'Reinversión social obligatoria de saldos cooperativos en el sector rural.',
      size: '1.5 MB',
      category: 'Financiero',
      code: 'PROY-EXC-2025',
    }
  ];

  const handleDownload = (doc: DocItem) => {
    setDownloadingId(doc.id);
    setTimeout(() => {
      setDownloadingId(null);
      setDownloadedDocs(prev => ({ ...prev, [doc.id]: true }));
      
      // Trigger a real-looking download action
      const element = document.createElement('a');
      const file = new Blob([`ASOGANCPAZ COMPLIANCE ARCHIVE\nDocumento: ${doc.name}\nCódigo: ${doc.code}\nEstado: Verificado por DIAN\nRepresentante Legal: Johan David Machado Benavides\nIcononzo, Tolima\n\nEste documento es de acceso público en cumplimiento con el Régimen Tributario Especial (RTE).`], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${doc.code}_asogancpaz_transparencia.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 1500);
  };

  const handleMailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mailboxForm.name || !mailboxForm.email || !mailboxForm.message) return;
    setSubmittingMail(true);
    setTimeout(() => {
      setSubmittingMail(false);
      setMailSent(true);
      setMailboxForm({ name: '', email: '', message: '' });
      setTimeout(() => setMailSent(false), 5000);
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-fadeIn" id="transparencia-rte-container">
      {/* Banner de Cabecera de Transparencia */}
      <div className="bg-stone-950 text-white rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <img
          src={coffeeFarmImg}
          alt="Caficultura de Tolima"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/85 to-transparent pointer-events-none"></div>

        <div className="absolute top-0 right-0 w-80 h-80 bg-olive-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-olive-700/25 border border-olive-500/25 text-olive-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5 text-olive-400" />
              Régimen Tributario Especial (RTE)
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-50 leading-tight">
              Gobierno Corporativo y Transparencia Pública
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-sans">
              Cumpliendo rigurosamente con los requisitos de la Dirección de Impuestos y Aduanas Nacionales (DIAN) de Colombia, publicamos nuestro registro web y archivo de documentación. Ponemos a disposición de la sociedad civil y los asociados los informes y estados de cumplimiento de la vigencia 2025-2026.
            </p>
          </div>
          <div className="bg-stone-800/80 border border-stone-700 p-4 rounded-2xl shrink-0 w-full md:w-64 space-y-2">
            <span className="text-[9px] uppercase tracking-widest text-olive-400 font-bold block">Estatus de Solicitud</span>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="text-xs font-bold text-white">Permanencia Solicitada</span>
            </div>
            <div className="border-t border-stone-700 pt-2 mt-1">
              <p className="text-[10px] text-stone-400">
                Año Gravable: <span className="font-mono text-white font-semibold">2026</span><br />
                Ente Control: <span className="text-white">DIAN - Seccional Tolima</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of details & financials */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Document list (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-6 shadow-2xs">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-5">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-olive-600" />
                <h3 className="font-serif text-base font-bold text-stone-800">
                  Archivos de Registro para Consulta Pública
                </h3>
              </div>
              <span className="text-[10px] font-mono text-stone-500 font-bold uppercase bg-stone-100 px-2 py-1 rounded-md">
                Actualizado Junio 2026
              </span>
            </div>

            <p className="text-xs text-stone-500 mb-6">
              De acuerdo con el Artículo 356-2 del Estatuto Tributario, los siguientes archivos contienen los informes oficiales, estados contables y certificaciones requeridas por la normatividad colombiana. Puede descargarlos en formato electrónico:
            </p>

            <div className="space-y-4">
              {rteDocuments.map((doc) => (
                <div 
                  key={doc.id}
                  className="p-4 border border-stone-200 rounded-xl hover:border-stone-300 hover:bg-stone-50/50 transition duration-150 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                  <div className="space-y-1.5 max-w-xl">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[9px] font-bold font-mono tracking-widest text-olive-700 bg-olive-50 px-2 py-0.5 rounded-md uppercase">
                        {doc.category}
                      </span>
                      <span className="text-[10px] font-mono text-stone-400 font-bold">
                        Cod: {doc.code}
                      </span>
                    </div>
                    <h4 className="font-serif text-sm font-bold text-stone-900 leading-snug">
                      {doc.name}
                    </h4>
                    <p className="text-xs text-stone-500 leading-normal">
                      {doc.description}
                    </p>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-1.5 shrink-0 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                    <span className="text-[10px] font-mono text-stone-400 font-bold">{doc.size}</span>
                    <button
                      onClick={() => handleDownload(doc)}
                      disabled={downloadingId !== null}
                      className={`w-full sm:w-auto px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                        downloadedDocs[doc.id]
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-stone-100 hover:bg-olive-50 hover:text-olive-700 text-stone-600 cursor-pointer'
                      }`}
                    >
                      {downloadingId === doc.id ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Descargando...</span>
                        </>
                      ) : downloadedDocs[doc.id] ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Descargado</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5" />
                          <span>Bajar Documento</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Compliance info cards & mailbox (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Mailbox Form */}
          <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
              <Mail className="w-4 h-4 text-olive-600" />
              <h3 className="font-serif text-sm font-bold text-stone-800">Buzón de Comentarios RTE</h3>
            </div>

            <p className="text-[11px] text-stone-500 leading-normal">
              La normatividad DIAN faculta a los ciudadanos para remitir comentarios, sugerencias o solicitudes de información sobre la asociación. Escríbanos directamente:
            </p>

            {mailSent ? (
              <div className="p-4 bg-emerald-50 border border-emerald-150 rounded-xl text-center space-y-1">
                <CheckCircle className="w-7 h-7 text-emerald-600 mx-auto" />
                <h4 className="text-xs font-bold text-emerald-900">Mensaje Enviado</h4>
                <p className="text-[10px] text-emerald-700">Agradecemos su interés en nuestra transparencia institucional.</p>
              </div>
            ) : (
              <form onSubmit={handleMailSubmit} className="space-y-3">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Su nombre"
                    value={mailboxForm.name}
                    onChange={(e) => setMailboxForm({ ...mailboxForm, name: e.target.value })}
                    className="w-full px-3 py-1.5 border border-stone-300 rounded-lg text-xs bg-white focus:outline-hidden focus:border-olive-600 focus:ring-1 focus:ring-olive-600/30 font-sans"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Su correo"
                    value={mailboxForm.email}
                    onChange={(e) => setMailboxForm({ ...mailboxForm, email: e.target.value })}
                    className="w-full px-3 py-1.5 border border-stone-300 rounded-lg text-xs bg-white focus:outline-hidden focus:border-olive-600 focus:ring-1 focus:ring-olive-600/30 font-sans"
                  />
                </div>
                <div>
                  <textarea
                    required
                    rows={3}
                    placeholder="Su comentario o petición de información"
                    value={mailboxForm.message}
                    onChange={(e) => setMailboxForm({ ...mailboxForm, message: e.target.value })}
                    className="w-full px-3 py-1.5 border border-stone-300 rounded-lg text-xs bg-white focus:outline-hidden focus:border-olive-600 focus:ring-1 focus:ring-olive-600/30 font-sans"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={submittingMail}
                  className="w-full py-2 bg-olive-700 hover:bg-olive-800 disabled:bg-stone-300 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {submittingMail ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Enviar Comentario</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
