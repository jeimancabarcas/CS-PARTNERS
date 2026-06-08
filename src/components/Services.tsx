import React, { useState } from 'react';
import {
  TrendingUp,
  ShieldCheck,
  Percent,
  TrendingDown,
  ChevronRight,
  Sparkles,
  Award,
  BookOpenCheck,
  Layers,
  HeartHandshake
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Services() {
  const [activeTab, setActiveTab] = useState<'wealth' | 'insurance' | 'pension' | 'credit' | 'insolvency'>('wealth');

  const tabs = [
    {
      id: 'wealth' as const,
      label: 'Patrimonio y Tributaria',
      shortLabel: 'Patrimonio',
      icon: TrendingUp,
    },
    {
      id: 'insurance' as const,
      label: 'Seguros Especializados',
      shortLabel: 'Seguros',
      icon: ShieldCheck,
    },
    {
      id: 'pension' as const,
      label: 'Planeación Pensional',
      shortLabel: 'Pensión',
      icon: HeartHandshake,
    },
    {
      id: 'credit' as const,
      label: 'Optimización de Crédito',
      shortLabel: 'Crédito y Vivienda',
      icon: Percent,
    },
    {
      id: 'insolvency' as const,
      label: 'Reorganización e Insolvencia',
      shortLabel: 'Insolvencia',
      icon: TrendingDown,
    }
  ];

  const getServiceContent = () => {
    switch (activeTab) {
      case 'wealth':
        return {
          title: 'Estructuración Patrimonial e Inversiones Inteligentes',
          subtitle: 'Acompañamiento especializado para optimizar recursos y preparar el legado familiar.',
          desc: 'Diseñamos estrategias fiscales y financieras a la medida, facilitando la toma de decisiones informadas sobre liquidez, ahorro programado y planeación sucesoral. A través de nuestras alianzas independientes, analizamos alternativas óptimas sin sesgos corporativos.',
          subservices: [
            'Gestión Patrimonial integral para personas naturales y familias.',
            'Planeación Tributaria Avanzada orientada a mitigar la carga de manera legal.',
            'Planes de Ahorro Programado e Inversión diversificada.',
            'Estructuración Sucesoria para garantizar un traspaso armónico y seguro del legado.'
          ],
          benefits: [
            'Independencia absoluta: Evaluamos opciones en múltiples portafolios.',
            'Optimización impositiva: Estructuras legales eficaces.',
            'Acompañamiento permanente y reportes de desempeño personalizados.'
          ],
          alliancesCount: '25+ compañías aliadas especializadas en gestión de fondos e inversiones.'
        };
      case 'insurance':
        return {
          title: 'Seguros Especializados de Vida, Salud y Empresarial',
          subtitle: 'Blindaje patrimonial ante cualquier imprevisto de salud, vida o continuidad de negocio.',
          desc: 'El patrimonio construido con años de esfuerzo merece un escudo impenetrable. Evaluamos los riesgos personales, familiares y empresariales de manera objetiva para estructurar coberturas que se ajusten estrictamente a tus metas, garantizando el mayor respaldo del sector.',
          subservices: [
            'Seguros de Vida local e internacional con componentes de ahorro programado.',
            'Seguros de Salud prepagada, pólizas colectivas y cobertura de enfermedades graves.',
            'Blindaje Societario estructurado para salvaguardar la participación de socios comerciales.',
            'Pólizas "Hombre Clave" enfocadas en mitigar riesgos de continuidad operacional en empresas.'
          ],
          benefits: [
            'Tranquilidad y respaldo frente a sucesos imprevistos o fortuitos.',
            'Alternativas diversificadas en coberturas tanto nacionales como en el exterior.',
            'Optimización técnica de primas para garantizar costo-beneficio óptimo.'
          ],
          alliancesCount: '15+ aseguradoras de primer nivel aliadas nacionales e internacionales.'
        };
      case 'pension':
        return {
          title: 'Planeación Pensional y Optimización del Retiro',
          subtitle: 'Consolida tu estabilidad para el futuro mediante asesoría técnica y legal sin intermediarios.',
          desc: 'Diseñamos esquemas eficientes para maximizar tus ingresos en la etapa de retiro. Evaluamos detenidamente tu historial laboral bajo el marco normativo colombiano, facilitando la toma de decisiones estratégicas entre regímenes u opciones privadas.',
          subservices: [
            'Planes de Jubilación privada complementarios con excelentes beneficios de deducción impositiva.',
            'Estudios de brecha pensional para conocer tus ingresos futuros y planificar correcciones.',
            'Estrategias de Retiro y Ahorro Voluntario programado bajo portafolios conservadores.',
            'Asesoría en traslado de fondos y cálculo técnico de indemnizaciones sustitutivas.'
          ],
          benefits: [
            'Mitigación del impacto del retiro sobre tu estilo de vida familiar.',
            'Aprovechamiento de las ventajas de disminución de retención en la fuente por aportes voluntarios.',
            'Soporte técnico objetivo e independiente sin preferencia por ningún fondo específico.'
          ],
          alliancesCount: '10+ fondos de pensiones y administradoras independientes asociadas.'
        };
      case 'credit':
        return {
          title: 'Crédito, Compra de Cartera y Optimización Hipotecaria',
          subtitle: 'Reducción legal de cargas de deuda y refinanciación de cartera de vivienda.',
          desc: 'Ofrecemos soluciones avanzadas para la optimización de obligaciones crediticias. Analizamos tus hipotecas y deudas actuales para diseñar reclamaciones jurídicas o negociaciones de tasas que reducen sustancialmente los años de pago y los intereses totales del crédito.',
          subservices: [
            'Reducción de Cargas Hipotecarias aplicando el marco de la Ley de Vivienda.',
            'Créditos para Adquisición de Vivienda con acompañamiento en la estructuración de la cuota inicial.',
            'Compra de Cartera de consumo y empresarial para mejorar tasas de interés.',
            'Asesoría técnica para disminuir el plazo de tu hipoteca sin incrementar significativamente la cuota.'
          ],
          benefits: [
            'Ahorro promedio del 30% al 45% en intereses totales de vivienda.',
            'Análisis financiero preliminar sin costo alguno.',
            'Trámite 100% legal respaldado por expertos jurídicos del sector bancario.'
          ],
          alliancesCount: '12+ bancos y fondos de crédito aliados para colocación y refinanciamiento.'
        };
      case 'insolvency':
        return {
          title: 'Reorganización de Pasivos y Procesos de Insolvencia',
          subtitle: 'Estrategias jurídicas para restablecer el equilibrio financiero de personas y empresas.',
          desc: 'Cuando las deudas superan la capacidad de pago actual, el marco legal ofrece opciones constructivas. Desarrollamos esquemas de reorganización de deudas, renegociación de condiciones críticas con acreedores y procesos de insolvencia con el fin de proteger tus bienes y recuperar la salud financiera del negocio o la persona.',
          subservices: [
            'Reorganización Empresarial bajo estatutos de emergencia e insolvencia institucional.',
            'Proceso de Insolvencia de Persona Natural No Comerciante para sanear obligaciones.',
            'Defensa ante cobros coactivos, demandas de acreedores y prevención de embargos.',
            'Mediaciones y diseño de acuerdos de pago a mediano plazo altamente viables.'
          ],
          benefits: [
            'Freno inmediato a embargos y remates judiciales desde la admisión del proceso.',
            'Alivio al flujo mensual para garantizar la subsistencia mínima o la operación de la empresa.',
            'Tratamiento humano, confidencial y sumamente profesional.'
          ],
          alliancesCount: '6+ bufetes de abogados y expertos en renegociación jurídica con cobertura nacional.'
        };
    }
  };

  const content = getServiceContent();

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
    <section id="servicios" className="py-20 bg-slate-50 relative">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-dot-pattern opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="font-mono text-xs font-bold tracking-widest text-brand-teal uppercase px-3 py-1 bg-brand-teal/8 rounded-full">
            PORTAFOLIO DE SOLUCIONES
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-brand-blue tracking-tight mt-4">
            Especialistas en cada etapa de tu vida patrimonial.
          </h2>
          <p className="font-sans text-slate-500 mt-3 text-sm sm:text-base font-light">
            Elegimos el camino de la independencia colaborativa: alianzas robustas con unas 56 firmas de primer nivel que nos permiten encontrar siempre el mejor producto para ti.
          </p>
        </div>

        {/* Navigation Tabs (Horizontal Scrollable on Mobile) */}
        <div className="flex border-b border-slate-200 justify-start md:justify-center overflow-x-auto pb-px-hidden scrollbar-none gap-2 md:gap-4 mb-12">
          {tabs.map((tab) => {
            const TabIcon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-4 font-sans text-sm font-semibold transition-all duration-300 relative whitespace-nowrap outline-none ${
                  isSelected
                    ? 'text-brand-teal border-b-2 border-brand-teal'
                    : 'text-slate-500 hover:text-slate-800 border-b-2 border-transparent'
                }`}
                id={`tab-btn-${tab.id}`}
              >
                <TabIcon className={`w-4 h-4 ${isSelected ? 'text-brand-teal' : 'text-slate-400'}`} />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="inline sm:hidden">{tab.shortLabel}</span>
                {isSelected && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-teal"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Canvas */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-12 gap-10 items-stretch"
            id={`service-content-${activeTab}`}
          >
            {/* Lead Block with description and subservices */}
            <div className="lg:col-span-7 flex flex-col justify-between bg-white border border-slate-150 p-8 rounded-3xl shadow-sm">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-teal uppercase tracking-widest mb-4">
                  <Sparkles className="w-4 h-4 fill-brand-teal/5" />
                  Solución Especializada
                </div>
                
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-blue tracking-tight leading-snug">
                  {content.title}
                </h3>
                
                <p className="font-sans text-sm font-semibold text-slate-500 mt-2 mb-6">
                  {content.subtitle}
                </p>

                <p className="font-sans text-slate-650 text-sm leading-relaxed mb-8 font-light">
                  {content.desc}
                </p>

                {/* Subservice checklist */}
                <h4 className="font-display font-bold text-base text-brand-blue mb-4">
                  Líneas de Intervención:
                </h4>
                <div className="grid sm:grid-cols-1 gap-3.5">
                  {content.subservices.map((sub, index) => (
                    <div key={index} className="flex gap-3 items-start">
                      <div className="p-1 rounded-full bg-brand-teal/10 text-brand-teal mt-0.5 shrink-0">
                        <ChevronRight className="w-3 h-3 stroke-[3px]" />
                      </div>
                      <span className="font-sans text-xs sm:text-sm text-slate-700 font-light">
                        {sub}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action buttons integrated */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500 flex items-center gap-2">
                  <Award className="w-4.5 h-4.5 text-brand-teal" />
                  <span className="font-medium">{content.alliancesCount}</span>
                </div>
                
                <button
                  onClick={() => handleScrollTo('#contact')}
                  className="w-full sm:w-auto font-sans font-bold text-xs uppercase tracking-wider text-white bg-brand-blue hover:bg-brand-blue/95 px-6 py-3 rounded-full transition-all duration-200 text-center"
                >
                  Asesoría Personalizada
                </button>
              </div>
            </div>

            {/* Sidebar info card: Benefits & Quick Diagnostic Link */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              
              {/* Benefits checklist */}
              <div className="bg-brand-blue p-8 rounded-3xl text-white shadow-md flex-1">
                <h4 className="font-display font-extrabold text-lg text-brand-cyan mb-5 flex items-center gap-2">
                  <BookOpenCheck className="w-5 h-5" />
                  ¿Por qué asesorarte aquí?
                </h4>
                
                <div className="space-y-5">
                  {content.benefits.map((benefit, i) => (
                    <div key={i} className="flex gap-3.5 items-start">
                      <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-brand-cyan shrink-0 font-bold text-xs mt-0.5">
                        {i + 1}
                      </div>
                      <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>

                {activeTab === 'credit' && (
                  <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-xs text-slate-300">
                      <span className="font-semibold text-brand-cyan">¡Optimización Hipotecaria Activa!</span> Utiliza nuestro simulador para calcular tus ahorros potenciales de manera inmediata.
                    </div>
                    <button
                      onClick={() => handleScrollTo('#simulador')}
                      className="mt-3 w-full font-sans text-xs bg-brand-cyan text-brand-blue font-bold py-2 rounded-lg hover:bg-white transition-colors duration-200"
                    >
                      Ir al Simulador de Deuda
                    </button>
                  </div>
                )}
              </div>

              {/* Core concept banner */}
              <div className="bg-teal-50 border border-brand-teal/15 p-6 rounded-3xl flex items-start gap-4">
                <div className="p-2.5 bg-brand-teal/8 text-brand-teal rounded-2xl shrink-0">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-display font-bold text-sm text-brand-blue">Estilo de Asesoría Independiente</h5>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed font-light">
                    Al no depender estrictamente de una aseguradora o banco en específico, nuestra firma compara y negocia de forma objetiva con los 56 aliados del sector.
                  </p>
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
