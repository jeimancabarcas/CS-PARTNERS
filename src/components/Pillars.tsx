import React from 'react';
import { Compass, ShieldAlert, Zap, ArrowUpRight, Scale, Milestone } from 'lucide-react';
import { motion } from 'motion/react';

export default function Pillars() {
  const pillarsList = [
    {
      id: 'pillar-estructuracion',
      title: 'Estructuración',
      subtitle: 'Administración de Recursos',
      icon: Compass,
      color: 'teal',
      bgIcon: 'bg-brand-teal/8 text-brand-teal',
      borderColor: 'group-hover:border-brand-teal/30',
      shadowColor: 'hover:shadow-brand-teal/5',
      desc: 'Acompañamiento en el diseño inteligente de portafolios de ahorro e inversión a corto, mediano y largo plazo. Modelamos estrategias financieras que se alinean perfectamente a tus objetivos personales o a las metas de expansión de tu corporación.',
      features: [
        'Estrategias de Ahorro e Inversión',
        'Gestión Integral de Recursos',
        'Modelación de Metas Financieras',
        'Acceso Independiente Multisectorial'
      ]
    },
    {
      id: 'pillar-proteccion',
      title: 'Protección',
      subtitle: 'Garantía y Legado',
      icon: Scale,
      color: 'blue',
      bgIcon: 'bg-brand-blue/8 text-brand-blue',
      borderColor: 'group-hover:border-brand-blue/30',
      shadowColor: 'hover:shadow-brand-blue/5',
      desc: 'Mitigación exhaustiva de riesgos que puedan amenazar tu capital o la continuidad de tu negocio. Estructuramos blindajes jurídicos, fiscales y de cobertura aseguradora mediante alianzas de primer nivel para resguardar a tu familia y tu empresa.',
      features: [
        'Seguros de Vida y Salud Integral',
        'Protección de Socios y Clave',
        'Sucesión y Traspaso de Patrimonio',
        'Cumplimiento Jurídico-Tributario'
      ]
    },
    {
      id: 'pillar-optimizacion',
      title: 'Optimización',
      subtitle: 'Eficiencia de Activos',
      icon: Zap,
      color: 'cyan',
      bgIcon: 'bg-brand-cyan/8 text-brand-cyan',
      borderColor: 'group-hover:border-brand-cyan/30',
      shadowColor: 'hover:shadow-brand-cyan/5',
      desc: 'Especialistas en la reducción jurídica de cargas y deudas. Desarrollamos metodologías personalizadas para optimizar créditos de vivienda, reestructuraciones de pasivos y planeación tributaria que liberan flujos de caja valiosos.',
      features: [
        'Reducción de Cargas Hipotecarias',
        'Planeación Tributaria Legal Avanzada',
        'Reorganización Efectiva de Pasivos',
        'Ley de Insolvencia Sostenible'
      ]
    }
  ];

  return (
    <section id="pilares" className="py-20 bg-white relative">
      {/* Background Graphic Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 pointer-events-none border-l border-slate-100" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <Milestone className="w-5 h-5 text-brand-teal" />
            <span className="font-mono text-xs font-bold tracking-widest text-brand-teal uppercase">NUESTRO PROPÓSITO</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-brand-blue tracking-tight leading-tight">
            Tres pilares estratégicos para liderar tu futuro financiero.
          </h2>
          <p className="font-sans text-slate-500 mt-4 leading-relaxed font-light">
            En C&S Partners, no creemos en soluciones genéricas. Nuestro enfoque integral, transparente y basado en la excelencia profesional nos permite brindar una asesoría transversal en tres etapas decisivas:
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {pillarsList.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`group flex flex-col justify-between p-8 rounded-3xl bg-brand-cream/40 border border-slate-100/80 hover:bg-white hover:border-slate-350 transition-all duration-300 ${pillar.shadowColor} hover:shadow-xl hover:-translate-y-1`}
              >
                <div>
                  {/* Icon & Subtitle header row */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-4 rounded-2xl ${pillar.bgIcon} transition-transform group-hover:scale-110 duration-300`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-slate-400">
                      0{idx + 1} / Pillar
                    </span>
                  </div>

                  {/* Pillar Category & Title */}
                  <div className="mb-4">
                    <span className="text-xs font-semibold text-brand-teal tracking-wide block mb-1">
                      {pillar.subtitle}
                    </span>
                    <h3 className="font-display font-extrabold text-2xl text-brand-blue tracking-tight">
                      {pillar.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="font-sans text-slate-600 text-sm leading-relaxed mb-6 font-light">
                    {pillar.desc}
                  </p>
                </div>

                {/* Features & Bottom Arrow */}
                <div>
                  <div className="pt-5 border-t border-slate-100 space-y-2.5 mb-6">
                    {pillar.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2.5 text-xs text-slate-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-teal/80" />
                        <span className="font-sans font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href="#servicios"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:text-brand-teal tracking-wide uppercase transition-colors"
                  >
                    Ver Soluciones
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
