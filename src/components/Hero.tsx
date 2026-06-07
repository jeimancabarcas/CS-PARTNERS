import React from 'react';
import { ShieldCheck, ArrowRight, Sparkles, Building2, TrendingUp, Users } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
  const handleScrollTo = (id: string) => {
    const target = document.querySelector(id);
    if (target) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="inicio"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-brand-cream bg-grid-pattern"
    >
      {/* Soft gradient blur circles for a premium airy vibe (avoiding gold/black, keeping it clean & light) */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-brand-teal/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/10 w-80 h-80 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Text/Copy Area */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-teal/8 border border-brand-teal/15 text-brand-teal"
            >
              <Sparkles className="w-4 h-4 fill-brand-teal/10" />
              <span className="text-[11px] font-bold font-mono tracking-wider uppercase">
                Asesoría Integral Patrimonial
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[54px] text-brand-blue tracking-tight leading-[1.05]"
            >
              Estructuramos, protegemos y <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-cyan">optimizamos</span> tu patrimonio.
            </motion.h1>

            {/* Subparagraph */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-sans text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed font-light"
            >
              Acompañamos a personas y empresas en el diseño de estrategias personalizadas,
              mitigando riesgos, optimizando impuestos de manera legal y construyendo un legado
              financiero firmemente protegido.
            </motion.p>

            {/* Call to Actions */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mt-2"
            >
              <button
                onClick={() => handleScrollTo('#diagnostico')}
                className="group flex items-center justify-center gap-2 font-display text-base font-bold text-white bg-brand-teal hover:bg-brand-teal/95 px-7 py-3.5 rounded-full shadow-md shadow-brand-teal/15 transition-all duration-200 hover:-translate-y-0.5"
                id="btn-hero-diagnostic"
              >
                Hacer Diagnóstico Financiero
                <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleScrollTo('#simulador')}
                className="flex items-center justify-center gap-2 font-sans text-base font-semibold text-brand-blue border border-brand-blue/15 hover:border-brand-blue/40 bg-white/40 hover:bg-white/80 px-7 py-3.5 rounded-full transition-all duration-200"
                id="btn-hero-simulator"
              >
                Simular Ahorro Hipotecario
              </button>
            </motion.div>

            {/* Micro proof / partners summary card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-4 mt-6 p-4 rounded-2xl bg-white/50 border border-slate-100 shadow-xs max-w-lg"
            >
              <div className="flex -space-x-2">
                <span className="w-8 h-8 rounded-full bg-slate-100 border-2 border-brand-cream flex items-center justify-center font-mono text-[9px] font-bold text-brand-blue shadow-xs">FIN</span>
                <span className="w-8 h-8 rounded-full bg-slate-50 border-2 border-brand-cream flex items-center justify-center font-mono text-[9px] font-bold text-brand-teal shadow-xs">ASEG</span>
                <span className="w-8 h-8 rounded-full bg-slate-100 border-2 border-brand-cream flex items-center justify-center font-mono text-[9px] font-bold text-slate-500 shadow-xs">JUR</span>
                <span className="w-8 h-8 rounded-full bg-slate-50 border-2 border-brand-cream flex items-center justify-center font-mono text-[9px] font-bold text-brand-cyan shadow-xs">EMP</span>
              </div>
              <div className="text-xs text-slate-500 font-sans">
                <span className="font-semibold text-slate-800">Alianzas verificadas</span> con más de{' '}
                <span className="font-extrabold text-brand-teal">56 corporaciones</span> de primer nivel para brindarte múltiples alternativas independientes.
              </div>
            </motion.div>
          </div>

          {/* Visual Presentation Area - Premium Minimalist Bento Info Widget */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative bg-white rounded-3xl border border-slate-150/80 p-8 shadow-xl shadow-brand-blue/5 overflow-hidden"
              id="hero-bento-visual"
            >
              {/* Backgrid accent */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-brand-cyan/5 rounded-bl-full pointer-events-none" />

              {/* Title of summary */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-brand-teal" />
                  <span className="font-display font-semibold text-sm text-slate-800 tracking-tight">
                    Modelo de Soluciones Integradas
                  </span>
                </div>
                <span className="text-[10px] font-mono font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded">
                  Soberano & Sostenible
                </span>
              </div>

              {/* Dynamic Pillars Quick Representation */}
              <div className="space-y-5 pt-6">
                
                <div className="flex gap-4 items-start p-3 rounded-xl hover:bg-slate-50 transition-colors duration-200">
                  <div className="p-2.5 bg-brand-blue/5 text-brand-blue rounded-lg">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm text-slate-900 leading-none">Estructuración</h3>
                    <p className="text-xs text-slate-500 mt-1 font-light leading-relaxed">
                      Planificación a la medida de ahorros, inversiones y portafolios.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-3 rounded-xl hover:bg-slate-50 transition-colors duration-200">
                  <div className="p-2.5 bg-brand-teal/5 text-brand-teal rounded-lg">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm text-slate-900 leading-none">Protección</h3>
                    <p className="text-xs text-slate-500 mt-1 font-light leading-relaxed">
                      Mitigación integral de riesgos mediante seguros y planeación hereditaria.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-3 rounded-xl hover:bg-slate-50 transition-colors duration-200">
                  <div className="p-2.5 bg-brand-cyan/5 text-brand-cyan rounded-lg">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm text-slate-900 leading-none">Optimización</h3>
                    <p className="text-xs text-slate-500 mt-1 font-light leading-relaxed">
                      Reducción legal de cargas hipotecarias, tributarias y pasivos financieros.
                    </p>
                  </div>
                </div>

              </div>

              {/* Small interactive teaser */}
              <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-150 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-wider font-bold text-slate-400 font-mono">
                    Aliados Estratégicos
                  </div>
                  <div className="text-base font-display font-extrabold text-slate-800">
                    56 Compañías
                  </div>
                </div>
                <div className="text-right text-[11px] text-slate-500 leading-tight">
                  Tasa de Cobertura <br/>
                  <span className="font-bold text-brand-teal">Multisectorial</span>
                </div>
              </div>

            </motion.div>

            {/* Small absolute graphic card: Client Sat */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-white border border-slate-100 p-4 rounded-2xl shadow-lg hidden sm:flex items-center gap-3.5 max-w-[200px]"
            >
              <div className="p-2 rounded-full bg-brand-teal/10 text-brand-teal">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg font-display font-bold text-brand-blue leading-none">100%</div>
                <p className="text-[10px] text-slate-500 leading-tight mt-0.5">Asesorías Personalizadas</p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
