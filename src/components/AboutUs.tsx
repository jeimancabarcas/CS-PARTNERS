import React, { useState } from 'react';
import { UserCheck, Phone, Mail, MapPin, Globe, Check, Copy, Award, ShieldAlert } from 'lucide-react';
import Logo from './Logo';
import { motion } from 'motion/react';

export default function AboutUs() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const contactData = {
    phone: '+57 302 378 2878',
    email: 'contact@cspartners.com.co',
    addr: 'Calle 53A Bis # 22 - 28, Bogotá D.C., Colombia',
    web: 'www.cspartners.com.co'
  };

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  return (
    <section id="nosotros" className="py-20 bg-slate-50 relative">
      <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 mb-3">
            <UserCheck className="w-5 h-5 text-brand-teal" />
            <span className="font-mono text-xs font-bold tracking-widest text-brand-teal uppercase">EXCELENCIA PROFESIONAL</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-brand-blue tracking-tight leading-none">
            Dirección estratégica y valores independientes.
          </h2>
          <p className="font-sans text-slate-500 mt-4 leading-relaxed font-light">
            C&S Partners nace como una firma especializada en estructurar planes de protección patrimonial y de optimización de pasivos con un firme rigor técnico, legal y ético.
          </p>
        </div>

        {/* Executive Presentation Split Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Card Presentation Left Column */}
          <div className="lg:col-span-5 relative flex flex-col justify-center">
            
            {/* Business card recreation in HTML/Tailwind: Elegant, Light and Modern */}
            <motion.div
              initial={{ opacity: 0, rotateY: -10 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative bg-brand-blue rounded-3xl p-8 text-white shadow-2xl shadow-brand-blue/20 overflow-hidden group border border-brand-teal/20"
              style={{ perspective: 1000 }}
              id="card-recreation-interactive"
            >
              {/* Backgrid highlight glow */}
              <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-brand-teal/20 rounded-full blur-2xl" />

              {/* Logo row */}
              <div className="flex items-center justify-between pb-8 border-b border-white/10">
                <Logo className="h-10 w-10 animate-pulse" showText={true} textColor="text-white" />
                <span className="text-[9px] font-mono border border-brand-cyan/40 bg-brand-cyan/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider text-brand-cyan font-bold">
                  Cobertura Nacional
                </span>
              </div>

              {/* General Manager Name */}
              <div className="my-8">
                <h3 className="font-display font-black text-2.5xl tracking-normal text-white">
                  C&S Partners
                </h3>
                <p className="text-xs font-mono uppercase tracking-widest text-brand-cyan font-bold mt-1">
                  Consultoría Estratégica
                </p>
                
                <p className="text-[11px] font-sans font-light mt-3 text-slate-350 max-w-xs leading-relaxed">
                  "Generamos valor a largo plazo protegiendo la estructura patrimonial de personas y empresas con transparencia, confianza y excelencia profesional."
                </p>
              </div>

              {/* Contacts section */}
              <div className="space-y-3 pt-6 border-t border-white/10 text-xs text-slate-300 font-sans">
                
                {/* Phone */}
                <div
                  onClick={() => handleCopy(contactData.phone, 'phone')}
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors group/row"
                  title="Click para copiar celular"
                >
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-brand-cyan shrink-0" />
                    <span className="font-mono">{contactData.phone}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 group-hover/row:text-white transition-colors">
                    {copiedField === 'phone' ? <Check className="w-3.5 h-3.5 text-brand-cyan" /> : <Copy className="w-3.5 h-3.5 opacity-50 opacity-100" />}
                  </div>
                </div>

                {/* Email */}
                <div
                  onClick={() => handleCopy(contactData.email, 'email')}
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors group/row"
                  title="Click para copiar correo"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-brand-cyan shrink-0" />
                    <span className="font-mono lowercase">{contactData.email}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 group-hover/row:text-white transition-colors">
                    {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-brand-cyan" /> : <Copy className="w-3.5 h-3.5 opacity-50 opacity-100" />}
                  </div>
                </div>

                {/* Address */}
                <div
                  onClick={() => handleCopy(contactData.addr, 'addr')}
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors group/row"
                  title="Click para copiar dirección"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-brand-cyan shrink-0" />
                    <span className="font-sans font-light text-[11px] truncate max-w-[220px]">{contactData.addr}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 group-hover/row:text-white transition-colors">
                    {copiedField === 'addr' ? <Check className="w-3.5 h-3.5 text-brand-cyan" /> : <Copy className="w-3.5 h-3.5 opacity-50 opacity-100" />}
                  </div>
                </div>

                {/* Web */}
                <div
                  onClick={() => handleCopy(contactData.web, 'web')}
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors group/row"
                >
                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-brand-cyan shrink-0" />
                    <span className="font-mono">{contactData.web}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 group-hover/row:text-white transition-colors">
                    {copiedField === 'web' ? <Check className="w-3.5 h-3.5 text-brand-cyan" /> : <Copy className="w-3.5 h-3.5 opacity-50 opacity-100" />}
                  </div>
                </div>

              </div>
            </motion.div>
          </div>

          {/* Description biography Right Column */}
          <div className="lg:col-span-7 flex flex-col justify-between py-4">
            
            <div className="space-y-6">
              <h3 className="font-display font-extrabold text-2xl text-brand-blue tracking-tight">
                Nuestro Propósito
              </h3>
              
              <blockquote className="font-serif italic text-base text-slate-600 leading-relaxed relative pl-4 border-l-2 border-brand-teal/50">
                "Acompañamos a personas y empresas mediante soluciones estructuradas para generar valor a largo plazo. Identificamos sus oportunidades y diseñamos salidas a la medida basadas exclusivamente en la transparencia y la excelencia profesional."
              </blockquote>

              <p className="font-sans text-slate-650 text-sm leading-relaxed font-light">
                Entendemos que detrás de cada patrimonio familiar o corporativo hay décadas de esfuerzo. Por eso, integramos de manera articulada análisis financieros, defensas jurídicas (frente a hipotecas desmedidas o procesos de deudas complejas) y planeación impositiva.
              </p>

              {/* Qualities Grid */}
              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                <div className="flex gap-3.5 items-start">
                  <div className="p-1.5 rounded-lg bg-teal-50 text-brand-teal mt-0.5">
                    <Award className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-slate-900">Estricto Rigor Legal</h4>
                    <p className="text-xs text-slate-550 mt-1 font-light leading-relaxed">Cada beneficio tributario u optimización hipotecaria se acoge rígidamente a las leyes colombianas vigentes.</p>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start">
                  <div className="p-1.5 rounded-lg bg-teal-50 text-brand-teal mt-0.5">
                    <UserCheck className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-slate-900">Enfoque sin Conflicto</h4>
                    <p className="text-xs text-slate-550 mt-1 font-light leading-relaxed">Nuestra meta u honorario se vincula a tu real ahorro y satisfacción del portafolio.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom mini CTA section */}
            <div className="mt-8 pt-6 border-t border-slate-200/60 flex items-center gap-4">
              <a
                href="#contact"
                className="font-display text-sm font-bold text-white bg-brand-teal hover:bg-brand-teal/95 px-6 py-3 rounded-full transition-all duration-200"
              >
                Solicitar Asesoría Empresarial
              </a>
              <span className="text-xs text-slate-400 font-sans">
                O copia los datos de contacto desde la tarjeta corporativa.
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
