import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, Sparkles, MessageSquare, ArrowRight, User, Compass, HelpCircle, Flame } from 'lucide-react';
import { Message } from '../types';

export default function AgronomistChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: '¡Un saludo muy especial, productor! Soy el Asesor Técnico Agropecuario de ASOGANCPAZ. Estoy aquí para guiarle en las mejores prácticas de ganadería campesina sostenible (sistemas silvopastoriles, manejo de pasturas, ensilaje y bienestar animal), así como en la producción, secado y fermentación de su café para lograr tazas excepcionales de alta calidad. ¿En qué puedo asesorarle el día de hoy?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggested technical prompts
  const suggestedQuestions = [
    '¿Cómo implemento ganadería sostenible y silvopastoril?',
    '¿Qué pastos o ensilajes son ideales para Icononzo?',
    '¿Cómo controlo la Roya del café ecológicamente?',
    '¿Cuál es la humedad óptima del pergamino seco?',
    '¿Cómo se calcula el factor de rendimiento?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMessage: Message = { role: 'user', text: textToSend };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: messages, // pass history for context
        }),
      });

      if (!response.ok) {
        throw new Error('No se pudo establecer contacto con el asesor.');
      }

      const result = await response.json();
      const modelMessage: Message = { role: 'model', text: result.text };
      setMessages(prev => [...prev, modelMessage]);
    } catch (err: any) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          role: 'model',
          text: 'Disculpe, estimable asociado, en este momento el módulo de telemetría o de conexión satelital está presentando intermitencia en el campo. Por favor intente formular su pregunta nuevamente o verifique que el servicio de IA esté activo en los secretos del proyecto (GEMINI_API_KEY).'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch" id="agronomist-chat-wrapper">
      {/* Left panel: Quick instructions & Suggested topics (4 cols) */}
      <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b border-stone-200 pb-3 mb-4">
              <Compass className="w-5 h-5 text-sky-600" />
              <h3 className="font-serif text-base font-bold text-stone-850">Asesoría Agropecuaria</h3>
            </div>
            
            <p className="text-stone-600 text-xs leading-relaxed mb-4">
              Consulte con nuestro asesor técnico experto de ASOGANCPAZ para brindar recomendaciones agrícolas, cafeteras y ganaderas detalladas de la zona de Icononzo y el Tolima.
            </p>

            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                Temas sugeridos de consulta:
              </span>
              {suggestedQuestions.map((q, idx) => (
                <button
                   key={idx}
                   onClick={() => handleSendMessage(q)}
                   disabled={loading}
                   className="w-full text-left p-2.5 bg-white hover:bg-stone-100 border border-stone-200 rounded-xl text-xs text-stone-700 font-medium transition flex items-center justify-between gap-2 disabled:opacity-50 cursor-pointer shadow-3xs"
                >
                  <span className="line-clamp-1">{q}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-stone-200 bg-stone-100/50 p-3 rounded-xl flex items-start gap-2 text-[10px] text-stone-500">
            <HelpCircle className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
            <span>
              La asesoría técnica se alimenta en tiempo real con Inteligencia Artificial utilizando Gemini. Recuerde siempre complementar la consulta con visitas técnicas presenciales de los asesores de ASOGANCPAZ.
            </span>
          </div>
        </div>
      </div>

      {/* Right panel: Active Chat UI (8 cols) */}
      <div className="lg:col-span-8 flex flex-col h-[520px] bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs">
        {/* Chat Header */}
        <div className="bg-[#1e293b] text-sky-100 px-5 py-4 border-b border-stone-200 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-700/80 border border-emerald-600 flex items-center justify-center text-white text-xs font-bold shadow-2xs relative">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#1e293b]"></span>
            </div>
            <div>
              <span className="text-[10px] tracking-wider uppercase opacity-75 font-medium block text-sky-200/80">Servicio al Asociado</span>
              <h4 className="font-serif text-sm font-bold text-white flex items-center gap-1.5">
                Asesor Técnico ASOGANCPAZ <span className="text-[9px] bg-emerald-800 text-emerald-200 border border-emerald-700/50 px-1.5 py-0.5 rounded-full font-mono font-bold">IA ACTIVA</span>
              </h4>
            </div>
          </div>
          <MessageSquare className="w-5 h-5 text-amber-100/50" />
        </div>

        {/* Chat Message Box */}
        <div className="flex-1 overflow-y-auto p-5 bg-stone-50/50 space-y-4">
          {messages.map((msg, index) => {
            const isModel = msg.role === 'model';
            return (
              <div
                key={index}
                className={`flex gap-3 max-w-[85%] ${isModel ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
              >
                {/* Avatar */}
                <div className={`w-7.5 h-7.5 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${
                  isModel 
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                    : 'bg-olive-100 text-olive-800 border border-olive-200'
                }`}>
                  {isModel ? <Sparkles className="w-3.5 h-3.5 text-emerald-700" /> : <User className="w-3.5 h-3.5" />}
                </div>

                {/* Bubble */}
                <div className={`rounded-2xl p-4 text-xs leading-relaxed shadow-3xs ${
                  isModel 
                    ? 'bg-white border border-stone-200 text-stone-750' 
                    : 'bg-olive-700 text-white rounded-tr-none'
                }`}>
                  {isModel ? (
                    <div className="whitespace-pre-line font-sans prose prose-sm text-stone-700">
                      {msg.text}
                    </div>
                  ) : (
                    <p className="font-sans font-medium">{msg.text}</p>
                  )}
                </div>
              </div>
            );
          })}

          {/* Loading Indicator Bubble */}
          {loading && (
            <div className="flex gap-3 max-w-[85%] mr-auto">
              <div className="w-7.5 h-7.5 rounded-full bg-emerald-50 border border-emerald-200 shrink-0 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700 animate-spin" />
              </div>
              <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-3xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-stone-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-1.5 h-1.5 bg-stone-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-1.5 h-1.5 bg-stone-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-stone-200 bg-white shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(input);
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              placeholder="Pregunte sobre roya, abonos, mermas de humedad o procesos de taza..."
              className="flex-1 px-4 py-2 border border-stone-300 rounded-xl text-xs bg-white focus:outline-hidden focus:border-olive-600 focus:ring-1 focus:ring-olive-600/30 transition"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2.5 bg-olive-700 hover:bg-olive-800 text-white rounded-xl shadow-2xs hover:shadow-xs transition disabled:bg-stone-200 disabled:text-stone-400 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
