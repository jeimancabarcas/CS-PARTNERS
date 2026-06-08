import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Compass, Send, CheckCircle2, Trash2, Edit3, X, Database, Clock, RefreshCw } from 'lucide-react';
import { Lead } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ContactSectionProps {
  prefilledMessage: string;
  onClearPrefill: () => void;
  onLeadSubmitted: () => void;
}

export default function ContactSection({ prefilledMessage, onClearPrefill, onLeadSubmitted }: ContactSectionProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Patrimonio');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Sync Prefilled calculations
  useEffect(() => {
    if (prefilledMessage) {
      setMessage((prev) => {
        // Appending or setting
        if (prev.includes(prefilledMessage)) return prev;
        return prefilledMessage + (prev ? '\n\n' + prev : '');
      });
      setService('Crédito e Hipotecas');
    }
  }, [prefilledMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !phone) {
      alert('Favor completar los campos obligatorios.');
      return;
    }

    setIsSending(true);

    const newLead: Lead = {
      id: 'lead-' + Date.now(),
      name,
      email,
      phone,
      comments: message,
      serviceInterest: service,
      createdAt: new Date().toISOString(),
      status: 'new' as const
    };

    // Storing Lead to LocalStorage
    try {
      const existing = localStorage.getItem('csp_leads');
      const leads: Lead[] = existing ? JSON.parse(existing) : [];
      leads.unshift(newLead);
      localStorage.setItem('csp_leads', JSON.stringify(leads));
    } catch (err) {
      console.error("Failed saving lead:", err);
    }

    // Send email using backend API
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          serviceInterest: service,
          comments: message,
        }),
      });

      if (!response.ok) {
        throw new Error('API response failed');
      }

      // Success actions
      setIsSuccess(true);
      onLeadSubmitted(); // notify App to refresh badges/CRM state

      // Reset fields
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      onClearPrefill();

      setTimeout(() => {
        setIsSuccess(false);
      }, 6000);
    } catch (err) {
      console.error("Error submitting lead to email:", err);
      alert("Hubo un problema temporal con el servidor de correos. No te preocupes, tus datos ya quedaron registrados en nuestro sistema offline y nos contactaremos contigo lo antes posible.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white relative">
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Contact Split layout */}
        <div className="grid lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Contact Details Column Left */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs font-bold tracking-widest text-brand-teal uppercase px-3 py-1 bg-brand-teal/8 rounded-full">
                CONEXIÓN DIRECTA
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-brand-blue tracking-tight mt-4">
                Inicia una conversación sin compromiso hoy.
              </h2>
              <p className="font-sans text-slate-500 mt-3 text-sm sm:text-base font-light leading-relaxed">
                ¿Listo para recortar años de tu hipoteca, mitigar riesgos patrimoniales u optimizar tu declaración fiscal? Escríbenos o agenda una consultoría con nuestro equipo experto.
              </p>

              {/* Direct coordinates box */}
              <div className="mt-8 space-y-5 font-sans">
                
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-brand-teal/10 text-brand-teal rounded-2xl shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-slate-900 text-sm">WhatsApp y Teléfono</h4>
                    <p className="text-sm font-mono mt-0.5 text-slate-600 hover:text-brand-teal transition-colors">
                      <a href="tel:+573204567890">+57 320 456 7890</a>
                    </p>
                    <span className="text-[10px] text-slate-400 font-light mt-0.5 block">Atención: Lunes a Viernes (8:00 AM - 6:00 PM)</span>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-brand-teal/10 text-brand-teal rounded-2xl shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-slate-900 text-sm">Correo Institucional</h4>
                    <p className="text-sm font-mono lowercase mt-0.5 text-slate-600 hover:text-brand-teal transition-colors">
                      <a href="mailto:contact@cspartners.com.co">contact@cspartners.com.co</a>
                    </p>
                    <span className="text-[10px] text-slate-400 font-light mt-0.5 block">Respuestas en menos de 24 horas hábiles</span>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-brand-teal/10 text-brand-teal rounded-2xl shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-slate-900 text-sm">Sede de Operaciones</h4>
                    <p className="text-sm font-light mt-0.5 text-slate-600">
                      Av. Principal #123, Oficina 456, Bogotá D.C., Colombia
                    </p>
                    <span className="text-[10px] text-slate-400 font-light mt-0.5 block">Atención presencial previa cita agendada</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Confidence indicator seal */}
            <div className="mt-10 p-5 rounded-2xl bg-brand-cream border border-slate-150 flex items-center gap-3.5 max-w-sm">
              <div className="p-2.5 bg-brand-teal/8 text-brand-teal rounded-full shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="text-xs text-slate-600 leading-snug">
                <span className="font-bold text-brand-blue block">Soberanía de Datos</span>
                Cumplimos estrictamente la Ley de Habeas Data (Ley 1581). Tus datos financieros nunca se venderán ni compartirán.
              </div>
            </div>
          </div>

          {/* Lead Input Form Form Column Right */}
          <div className="lg:col-span-7">
            <div className="bg-brand-cream/65 border border-slate-150/80 rounded-3xl p-6 sm:p-8 shadow-xs">
              
              <h3 className="font-display font-extrabold text-brand-blue text-xl mb-6">
                Envíanos tu Requerimiento
              </h3>

              <AnimatePresence>
                {/* Prefilled alert with clear btn */}
                {prefilledMessage && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-5 bg-brand-teal/8 border border-brand-teal/20 rounded-xl p-3.5 flex items-start justify-between gap-3 text-xs text-brand-teal font-medium"
                  >
                    <span>
                      📊 <strong>¡Simulación Hipotecaria Cargada!</strong> Hemos autocompletado tu mensaje con los cálculos de ahorro del simulador para que sea evaluado directamente por la firma.
                    </span>
                    <button
                      onClick={onClearPrefill}
                      className="p-1 hover:bg-brand-teal/15 rounded-lg text-brand-teal/80 hover:text-brand-teal"
                      title="Quitar datos simulados"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {isSuccess && (
                <div className="mb-6 p-4 rounded-xl bg-teal-50 border border-brand-teal/25 text-brand-teal font-sans text-xs sm:text-sm flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <div>
                    <strong>¡Mensaje Enviado Exitosamente!</strong> Tus datos han sido recibidos de forma confidencial. Uno de nuestros asesores especializados te contactará a la brevedad.
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">Nombre Completo *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Carlos Pérez"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-teal bg-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">Celular / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="Ej. +57 320 456 7890"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-teal bg-white text-sm"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">Correo Electrónico *</label>
                    <input
                      type="email"
                      required
                      placeholder="ejemplo@correo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-teal bg-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">Servicio de Interés</label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-teal bg-white text-sm font-semibold text-slate-700"
                    >
                      <option value="Patrimonio">Estructuración Patrimonial</option>
                      <option value="Planeación Tributaria">Planeación Tributaria</option>
                      <option value="Seguros y Pensión">Seguros y Pensión</option>
                      <option value="Crédito e Hipotecas">Crédito y Adquisición Vivienda</option>
                      <option value="Insolvencia">Insolvencia y Reorganización</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">Comentarios / Mensaje Adicional</label>
                  <textarea
                    rows={4}
                    placeholder="Describe brevemente tus requerimientos o dudas estratégicas..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-teal bg-white text-sm font-sans leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full font-display font-bold text-sm text-white bg-brand-blue hover:bg-brand-blue/95 py-4 rounded-xl cursor-pointer shadow-md shadow-brand-blue/15 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
                  id="btn-submit-lead-form"
                >
                  {isSending ? 'Enviando Requerimiento...' : 'Enviar Mensaje Estratégico'}
                  {isSending ? (
                    <RefreshCw className="w-4.5 h-4.5 mx-1 animate-spin text-white" />
                  ) : (
                    <Send className="w-4 h-4 ml-1" />
                  )}
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
