import React, { useState, useEffect } from 'react';
import { FileText, Download, CheckCircle, Shield, Calendar, Award, Building, DollarSign, Mail, Send, ExternalLink, RefreshCw, Upload, AlertTriangle } from 'lucide-react';
import coffeeFarmImg from '../assets/images/coffee_farm_1782839016532.jpg';

interface DocItem {
  id: string;
  name: string;
  description: string;
  size: string;
  category: string;
  code: string;
  fileName: string;
}

export default function TransparenciaRteModule() {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadedDocs, setDownloadedDocs] = useState<Record<string, boolean>>({});
  const [mailboxForm, setMailboxForm] = useState({ name: '', email: '', message: '' });
  const [submittingMail, setSubmittingMail] = useState(false);
  const [mailSent, setMailSent] = useState(false);

  // Admin and Dynamic File Upload State
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminZone, setShowAdminZone] = useState(false);
  const [existingFiles, setExistingFiles] = useState<string[]>([
    '1_certificado_camara_comercio.pdf',
    '2_estados_financieros_firmados_2025.pdf',
    '3_estatutos_asogancpaz_2022.pdf',
    '4_acta_asamblea_general_2026.pdf',
    '5_acta_constitucion_reunion_01.pdf',
    '6_certificacion_antecedentes_judiciales.pdf',
    '7_certificacion_cargos_directivos_no_remuneracion.pdf',
    '8_certificacion_requisitos_especiales_rte.pdf',
    '9_politicas_contables_revelaciones_2025.pdf'
  ]);
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  const rteDocuments: DocItem[] = [
    {
      id: 'doc-1',
      name: 'Certificado de Existencia y Representación Legal (Cámara de Comercio)',
      description: 'Certificado oficial expedido el 27/03/2026 por la Cámara de Comercio del Sur y Oriente del Tolima, acreditando la vigencia legal, NIT 901660410-6 y directiva de la asociación.',
      size: '1.2 MB',
      category: 'Legal',
      code: 'CC-9016604106-2026',
      fileName: '1_certificado_camara_comercio.txt'
    },
    {
      id: 'doc-2',
      name: 'Estados Financieros y Balance General de Cierre 2025',
      description: 'Estado de Situación Financiera y Estado de Resultados al 31 de diciembre de 2025 firmados, reportando activos por $443.660.000 (Terrenos y Activos Biológicos).',
      size: '890 KB',
      category: 'Financiero',
      code: 'EEFF-ASOGANCPAZ-2025',
      fileName: '2_estados_financieros_firmados_2025.txt'
    },
    {
      id: 'doc-3',
      name: 'Estatutos de la Asociación (ASOGANCPAZ)',
      description: 'Reglamentos y estatutos internos aprobados por acta de constitución, definiendo el objeto de producción social de ganado y café, y duración legal hasta 2042.',
      size: '2.1 MB',
      category: 'Estatutos',
      code: 'EST-ASOGANCPAZ-2022',
      fileName: '3_estatutos_asogancpaz_2022.txt'
    },
    {
      id: 'doc-4',
      name: 'Acta de Asamblea General Ordinaria N° 10/03/2026',
      description: 'Acta de asamblea ordinaria de marzo de 2026, donde los 17 asociados aprueban unánimemente los informes de gestión, estados financieros y la solicitud de permanencia RTE.',
      size: '1.5 MB',
      category: 'Actas',
      code: 'ACTA-ASAMBLEA-2026',
      fileName: '4_acta_asamblea_general_2026.txt'
    },
    {
      id: 'doc-5',
      name: 'Acta de Constitución No. 01 (Fundación de la ESAL)',
      description: 'Acta constitutiva oficial firmada en Icononzo el 21 de noviembre de 2022, estableciendo la voluntad fundacional de los 17 integrantes de la asociación campesina.',
      size: '1.8 MB',
      category: 'Actas',
      code: 'ACTA-CONSTITUCION-2022',
      fileName: '5_acta_constitucion_reunion_01.txt'
    },
    {
      id: 'doc-6',
      name: 'Certificación de Antecedentes Judiciales de Miembros Directivos',
      description: 'Acreditación suscrita por el Representante Legal sobre la ausencia absoluta de antecedentes penales, fiscales o disciplinarios en los órganos de administración.',
      size: '750 KB',
      category: 'Certificaciones',
      code: 'CERT-ANTECEDENTES-2026',
      fileName: '6_certificacion_antecedentes_judiciales.txt'
    },
    {
      id: 'doc-7',
      name: 'Certificación de Cargos Directivos y de Control (No Remuneración)',
      description: 'Constancia oficial de que los cargos directivos y ejecutivos (Presidente, Secretaria, Tesorero, Fiscal) se ejercen de forma ad-honorem sin percibir remuneración.',
      size: '600 KB',
      category: 'Certificaciones',
      code: 'CERT-CARGOS-RTE-2026',
      fileName: '7_certificacion_cargos_directivos_no_remuneracion.txt'
    },
    {
      id: 'doc-8',
      name: 'Certificación de Requisitos Especiales (DIAN)',
      description: 'Declaración juramentada que certifica que la entidad ha cumplido cabalmente con los requisitos del numeral 6 del art. 364-5 del E.T. para pertenecer al Régimen Especial.',
      size: '720 KB',
      category: 'Certificaciones',
      code: 'CERT-REQUISITOS-RTE-2026',
      fileName: '8_certificacion_requisitos_especiales_rte.txt'
    },
    {
      id: 'doc-9',
      name: 'Políticas Contables y Notas Revelatorias Contables 2025',
      description: 'Marco técnico contable (NIIF Grupo 3 Microempresas) y explicaciones contables detalladas sobre los terrenos y semovientes ganaderos aportados a la asociación.',
      size: '1.1 MB',
      category: 'Financiero',
      code: 'POL-REVELACIONES-2025',
      fileName: '9_politicas_contables_revelaciones_2025.txt'
    }
  ];

  const fetchDocumentsList = async () => {
    try {
      const response = await fetch(`/api/list-documents?t=${Date.now()}`);
      if (response.ok) {
        const data = await response.json();
        setExistingFiles(data);
      }
    } catch (error) {
      console.error('Error fetching documents list:', error);
    }
  };

  useEffect(() => {
    fetchDocumentsList();
    // Check if the URL has ?admin=true or similar to unlock the administrator upload tools
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true' || params.get('admin') === '1') {
      setIsAdmin(true);
      setShowAdminZone(true); // Auto-open the upload zone for admin comfort
    }
  }, []);

  const handleRequestAccess = (docName: string) => {
    setMailboxForm({
      name: '',
      email: '',
      message: `Estimada junta directiva de ASOGANCPAZ,\n\nSolicito formalmente el acceso o envío del siguiente documento oficial del Régimen Tributario Especial (RTE):\n- "${docName}"\n\nAgradezco de antemano su gestión.`
    });
    const element = document.getElementById('mailbox-container');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownload = (doc: DocItem) => {
    setDownloadingId(doc.id);
    setTimeout(() => {
      setDownloadingId(null);
      setDownloadedDocs(prev => ({ ...prev, [doc.id]: true }));
      
      // Determine if a PDF is available, otherwise use the TXT transcription fallback
      const pdfName = doc.fileName.replace('.txt', '.pdf');
      const isPdfAvailable = existingFiles.includes(pdfName);
      const finalFileName = isPdfAvailable ? pdfName : doc.fileName;

      // Perform a real download (use static path for PDFs to ensure compatibility with static hosting like GitHub Pages/Vercel)
      const element = document.createElement('a');
      element.href = isPdfAvailable ? `/documentos/${finalFileName}` : `/api/download/${finalFileName}`;
      element.download = finalFileName;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 1200);
  };

  const handleUploadFile = async (docId: string, baseName: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf" && !file.name.endsWith(".pdf")) {
      alert("Por favor, selecciona un archivo PDF original firmado.");
      return;
    }

    setUploadingId(docId);
    
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64String = reader.result?.toString().split(",")[1];
        if (!base64String) {
          alert("Error al procesar el archivo.");
          setUploadingId(null);
          return;
        }

        const destinationName = baseName.replace(".txt", ".pdf");

        const response = await fetch("/api/upload-document", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileName: destinationName,
            fileBase64: base64String
          })
        });

        if (response.ok) {
          await fetchDocumentsList();
          alert(`¡El PDF original "${file.name}" se cargó correctamente! Los usuarios ahora descargarán este archivo original de manera directa.`);
        } else {
          const errData = await response.json();
          alert(`Error al subir el archivo: ${errData.error || "Error desconocido"}`);
        }
        setUploadingId(null);
      };
    } catch (err: any) {
      console.error("Error upload:", err);
      alert("Ocurrió un error inesperado al subir el archivo.");
      setUploadingId(null);
    }
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
              
              {/* Toggle Admin Zone button - Only visible in Admin Mode (?admin=true) */}
              {isAdmin && (
                <button
                  onClick={() => setShowAdminZone(!showAdminZone)}
                  className={`text-[10px] font-sans font-extrabold uppercase border px-3 py-1 rounded-lg cursor-pointer flex items-center gap-1.5 transition ${
                    showAdminZone 
                      ? "bg-amber-500 border-amber-600 text-white hover:bg-amber-600"
                      : "bg-stone-50 border-stone-300 text-stone-600 hover:bg-stone-100"
                  }`}
                >
                  <Upload className="w-3 h-3" />
                  {showAdminZone ? "Cerrar Panel de Carga" : "Subir PDF Original (Admin)"}
                </button>
              )}
            </div>

            <p className="text-xs text-stone-500 mb-6">
              De acuerdo con el Artículo 356-2 del Estatuto Tributario, los siguientes archivos contienen los informes oficiales, estados contables y certificaciones requeridas por la normatividad colombiana. Puede descargarlos en formato electrónico:
            </p>

            <div className="space-y-4">
              {rteDocuments.map((doc) => {
                const pdfName = doc.fileName.replace('.txt', '.pdf');
                const isPdfAvailable = existingFiles.includes(pdfName);

                return (
                  <div 
                    key={doc.id}
                    className="p-4 border border-stone-200 rounded-xl hover:border-stone-300 hover:bg-stone-50/50 transition duration-150 flex flex-col justify-between gap-4"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
                      <div className="space-y-1.5 max-w-xl">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[9px] font-bold font-mono tracking-widest text-olive-700 bg-olive-50 px-2 py-0.5 rounded-md uppercase">
                            {doc.category}
                          </span>
                          <span className="text-[10px] font-mono text-stone-400 font-bold">
                            Cod: {doc.code}
                          </span>
                          
                          {/* Beautiful status badges */}
                          {isPdfAvailable ? (
                            <span className="inline-flex items-center gap-1 text-[9px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-150 px-2 py-0.5 rounded-full shadow-3xs">
                              <CheckCircle className="w-2.5 h-2.5 text-emerald-500" />
                              PDF Original Firmado
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[9px] font-bold text-amber-700 bg-amber-50 border border-amber-150 px-2 py-0.5 rounded-full">
                              Pendiente de Publicación (Firma/Escaneo)
                            </span>
                          )}
                        </div>
                        <h4 className="font-serif text-sm font-bold text-stone-900 leading-snug">
                          {doc.name}
                        </h4>
                        <p className="text-xs text-stone-500 leading-normal">
                          {doc.description}
                        </p>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-1.5 shrink-0 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                        <span className="text-[10px] font-mono text-stone-400 font-bold">
                          {isPdfAvailable ? "PDF Escaneado" : "Próximamente"}
                        </span>
                        
                        {isPdfAvailable ? (
                          <button
                            onClick={() => handleDownload(doc)}
                            disabled={downloadingId !== null}
                            className={`w-full sm:w-auto px-4 py-1.5 rounded-lg text-xs font-extrabold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                              downloadedDocs[doc.id]
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs'
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
                                <span>Descargar PDF Original</span>
                              </>
                            )}
                          </button>
                        ) : (
                          <button
                            onClick={() => handleRequestAccess(doc.name)}
                            className="w-full sm:w-auto px-4 py-1.5 rounded-lg text-xs font-extrabold flex items-center justify-center gap-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 cursor-pointer transition border border-stone-200"
                          >
                            <Mail className="w-3.5 h-3.5 text-stone-500" />
                            <span>Solicitar Acceso</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Dropzone area within the Admin toggle */}
                    {showAdminZone && (
                      <div className="bg-stone-50 border border-dashed border-stone-300 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fadeIn mt-2">
                        <div className="space-y-0.5">
                          <p className="text-[10px] font-extrabold text-stone-700 flex items-center gap-1">
                            <Upload className="w-3.5 h-3.5 text-olive-600" />
                            <span>Cargar archivo PDF original para este rubro</span>
                          </p>
                          <p className="text-[9px] text-stone-400">Reemplaza el borrador actual con el documento firmado digital o físicamente</p>
                        </div>
                        
                        <label className="shrink-0 w-full sm:w-auto">
                          <span className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-1.5 bg-olive-700 hover:bg-olive-800 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-lg cursor-pointer transition shadow-xs">
                            {uploadingId === doc.id ? (
                              <>
                                <RefreshCw className="w-3 h-3 animate-spin" />
                                <span>Subiendo PDF...</span>
                              </>
                            ) : (
                              <>
                                <Upload className="w-3 h-3" />
                                <span>Seleccionar PDF Escaneado</span>
                              </>
                            )}
                          </span>
                          <input
                            type="file"
                            accept=".pdf"
                            disabled={uploadingId !== null}
                            onChange={(e) => handleUploadFile(doc.id, doc.fileName, e)}
                            className="hidden"
                          />
                        </label>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Compliance info cards & mailbox (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Mailbox Form */}
          <div id="mailbox-container" className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-4">
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

          {/* Guía del Administrador - Oculta para el público general, solo visible en modo ?admin=true */}
          {isAdmin && (
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 shadow-3xs space-y-4 animate-fadeIn" id="admin-files-guide-card">
              <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
                <Award className="w-4 h-4 text-olive-700" />
                <h3 className="font-serif text-sm font-bold text-stone-800 font-sans">Guía para el Administrador</h3>
              </div>
              
              <div className="space-y-3 text-[11px] text-stone-600 leading-relaxed font-sans">
                <p>
                  <strong>¡Modo Administrador Activo!</strong> Puedes arrastrar o seleccionar los archivos PDF originales directamente usando el botón que aparece en cada rubro. Al hacerlo, se guardarán de manera inmediata y quedarán disponibles para descarga pública.
                </p>
                
                <div className="bg-white border border-stone-200 rounded-xl p-3 space-y-1.5 font-sans text-[10px] text-stone-700">
                  <span className="font-extrabold text-olive-800">Nombre esperado para cada archivo PDF:</span>
                  <ul className="list-disc list-inside space-y-1 text-stone-500 font-mono text-[9px]">
                    <li>1_certificado_camara_comercio.pdf</li>
                    <li>2_estados_financieros_firmados_2025.pdf</li>
                    <li>3_estatutos_asogancpaz_2022.pdf</li>
                    <li>4_acta_asamblea_general_2026.pdf</li>
                    <li>5_acta_constitucion_reunion_01.pdf</li>
                    <li>6_certificacion_antecedentes_judiciales.pdf</li>
                    <li>7_certificacion_cargos_directivos_no_remuneracion.pdf</li>
                    <li>8_certificacion_requisitos_especiales_rte.pdf</li>
                    <li>9_politicas_contables_revelaciones_2025.pdf</li>
                  </ul>
                </div>

                <p className="text-[10px] text-stone-400">
                  * Una vez que subas cada PDF, el estatus cambiará automáticamente a un botón verde de "Descargar PDF Original".
                </p>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
