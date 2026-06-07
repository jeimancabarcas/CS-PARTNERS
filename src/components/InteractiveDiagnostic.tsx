import React, { useState } from 'react';
import { Sparkles, ArrowRight, UserCheck, CheckCircle2, ShieldCheck, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InteractiveDiagnosticProps {
  onSubmitDiagnostic: (diagnosticData: {
    profileType: string;
    metrics: string;
    answersSummary: Record<string, string>;
  }) => void;
}

export default function InteractiveDiagnostic({ onSubmitDiagnostic }: InteractiveDiagnosticProps) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // User contact details for submissions
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  const questions = [
    {
      id: 'primary_goal',
      question: '1. ¿Cuál es tu objetivo patrimonial más importante en este momento?',
      options: [
        { label: 'Estructurar un plan sólido de ahorro e inversión independiente.', category: 'wealth' },
        { label: 'Proteger mi vida, salud o la continuidad de mi empresa/socios.', category: 'protection' },
        { label: 'Reducir el plazo o intereses de mis hipotecas o créditos.', category: 'credit' },
        { label: 'Reorganizar deudas graves, pasivos o iniciar insolvencia.', category: 'insolvency' }
      ]
    },
    {
      id: 'has_mortgage',
      question: '2. ¿Tienes algún crédito hipotecario o leasing habitacional vigente?',
      options: [
        { label: 'Sí, tengo una hipoteca activa a más de 10 años.', category: 'credit' },
        { label: 'Sí, pero me faltan menos de 8 años para liquidarlo.', category: 'credit' },
        { label: 'Sí, tengo otros créditos comerciales o consumo elevados.', category: 'insolvency' },
        { label: 'No tengo créditos hipotecarios o deudas significativas actualmente.', category: 'wealth' }
      ]
    },
    {
      id: 'tax_optimization',
      question: '3. Respecto a tu declaración de renta o impuestos:',
      options: [
        { label: 'Siento que pago demasiados impuestos, requiero planeación legal.', category: 'wealth' },
        { label: 'Tengo contador, pero nunca hemos realizado planeación patrimonial.', category: 'wealth' },
        { label: 'No soy responsable de declarar o mis deudas compensan mi valor.', category: 'insolvency' },
        { label: 'Mi flujo fiscal está óptimo y utilizo deducciones legales vigentes.', category: 'protection' }
      ]
    },
    {
      id: 'protection_level',
      question: '4. Si hoy cesaran tus ingresos temporales o permanentes, ¿qué blindaje tienes?',
      options: [
        { label: 'Mis dependientes o mi negocio quedarían altamente expuestos.', category: 'protection' },
        { label: 'Tengo pólizas básicas corporativas, pero ningún plan integral.', category: 'protection' },
        { label: 'Cuento con ahorros líquidos pero ningún seguro técnico estructurado.', category: 'wealth' },
        { label: 'Tengo seguros de vida, salud robustos y un fondo autónomo.', category: 'wealth' }
      ]
    }
  ];

  const handleSelectOption = (questionId: string, optionText: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionText }));
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Advance to final demographic contact step
      setCurrentStep(questions.length);
    }
  };

  const getStrategicResult = () => {
    // Audit answers categories
    let categoryCounts = { wealth: 0, protection: 0, credit: 0, insolvency: 0 };
    
    // Quick evaluate map
    questions.forEach((q) => {
      const selectedText = answers[q.id];
      const matchingOpt = q.options.find((opt) => opt.label === selectedText);
      if (matchingOpt) {
        const cat = matchingOpt.category as keyof typeof categoryCounts;
        categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
      }
    });

    // Find max category
    let primaryCat: keyof typeof categoryCounts = 'wealth';
    let maxVal = -1;
    (Object.keys(categoryCounts) as Array<keyof typeof categoryCounts>).forEach((cat) => {
      if (categoryCounts[cat] > maxVal) {
        maxVal = categoryCounts[cat];
        primaryCat = cat;
      }
    });

    const profiles = {
      wealth: {
        title: 'Perfil de Estructuración y Acumulación Dinámica',
        recommendation: 'Tu enfoque idóneo se encuentra en la Gestión Patrimonial Integral y Planeación Tributaria. Requieres diversificar tus flujos de ahorro en alternativas independientes de alto nivel y programar amortiguadores de renta legal.',
        focusCode: 'GESTION_PATRIMONIAL_TRIBUTARIA'
      },
      protection: {
        title: 'Perfil de Blindaje Financiero Familiar-Socio',
        recommendation: 'Tu prioridad estratégica actual debe ser la Mitigación de Riesgos Vitales. Es altamente recomendable estructurar un seguro de socios (blindaje corporativo) o pólizas de vida con fondos complementarios antes de expandir pasivos.',
        focusCode: 'SEGUROS_BLINDAJE_PENSION'
      },
      credit: {
        title: 'Perfil de Alivio Hipoteca y Optimización Financiera',
        recommendation: 'Cuentas con una excelente oportunidad de aplicar la Ley de Vivienda (Ley 546) para reducir tu hipoteca en tiempo, ahorrando un estimado del 35% en intereses ordinarios y mejorando tu tasa de flujo mediante compra de cartera.',
        focusCode: 'REDUCCION_HIPOTECA_CARTERA'
      },
      insolvency: {
        title: 'Perfil de Reorganización Patrimonial y Pasivos',
        recommendation: 'De acuerdo a tus respuestas, necesitas una estrategia jurídico-financiera de reorganización de deudas o análisis de Insolvencia Sostenible para estabilizar de inmediato las exigencias de acreedores y salvaguardar tu patrimonio.',
        focusCode: 'INSOLVENCIA_REORGANIZACION'
      }
    };

    return profiles[primaryCat];
  };

  const currentResult = currentStep >= questions.length ? getStrategicResult() : null;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone) {
      alert('Por favor completa todos los campos del contacto.');
      return;
    }

    if (currentResult) {
      onSubmitDiagnostic({
        profileType: currentResult.title,
        metrics: currentResult.recommendation,
        answersSummary: {
          ...answers,
          clientName,
          clientEmail,
          clientPhone
        }
      });
      setIsSubmitted(true);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentStep(0);
    setIsSubmitted(false);
    setClientName('');
    setClientEmail('');
    setClientPhone('');
  };

  return (
    <section id="diagnostico" className="py-20 bg-brand-cream relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Container Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Pitch Left Column */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-teal/10 border border-brand-teal/20 text-brand-teal rounded-full self-start">
              <Sparkles className="w-4 h-4 fill-brand-teal/5" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider">TECNOLOGÍA DE ANÁLISIS</span>
            </div>
            
            <h2 className="font-display font-black text-3xl sm:text-4xl text-brand-blue tracking-tight leading-none">
              Diagnóstico de tu Estado Financiero y de Cargas.
            </h2>
            
            <p className="font-sans text-slate-600 text-sm sm:text-base leading-relaxed font-light">
              ¿Sabías que un 83% de los hogares y firmas en Colombia pagan excesos innecesarios en hipotecas o seguros mal estructurados? 
            </p>

            <p className="font-sans text-slate-500 text-xs sm:text-sm leading-relaxed font-light">
              Tómate 60 segundos para contestar estas 4 preguntas clave. Al finalizar, recibirás un análisis estratégico instantáneo desarrollado bajo las metodologías de optimización de Cristian Casas.
            </p>

            {/* Badges footer */}
            <div className="pt-6 border-t border-slate-200/50 space-y-3">
              <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                <CheckCircle2 className="w-4.5 h-4.5 text-brand-teal shrink-0" />
                <span>100% Confidencial bajo reserva</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                <ShieldCheck className="w-4.5 h-4.5 text-brand-teal shrink-0" />
                <span>Alternativas de 56 aliados contrastadas</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                <Award className="w-4.5 h-4.5 text-brand-teal shrink-0" />
                <span>Asesoría transparente e independiente</span>
              </div>
            </div>
          </div>

          {/* Quiz Frame Right Column */}
          <div className="lg:col-span-7" id="diagnostic-quiz-frame">
            <div className="bg-white rounded-3xl border border-slate-150 shadow-xl shadow-slate-100 p-6 sm:p-8 min-h-[460px] flex flex-col justify-between">
              
              <AnimatePresence mode="wait">
                {/* 1. QUIZ QUESTIONS IN PROGRESS */}
                {currentStep < questions.length && (
                  <motion.div
                    key={`step-${currentStep}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col justify-between h-full flex-1"
                  >
                    <div>
                      {/* Step index */}
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-xs font-mono font-bold text-brand-teal uppercase">Pregunta de Evaluación</span>
                        <span className="text-xs font-mono text-slate-400 font-medium">
                          Paso {currentStep + 1} de {questions.length}
                        </span>
                      </div>

                      {/* Question label */}
                      <h3 className="font-display font-extrabold text-lg sm:text-xl text-brand-blue tracking-tight leading-snug mb-8">
                        {questions[currentStep].question}
                      </h3>

                      {/* Options Grid */}
                      <div className="space-y-3">
                        {questions[currentStep].options.map((opt, i) => (
                          <button
                            key={i}
                            onClick={() => handleSelectOption(questions[currentStep].id, opt.label)}
                            className="w-full text-left p-4 rounded-xl border border-slate-150 hover:bg-slate-50 hover:border-brand-teal/40 transition-all duration-200 outline-none hover:shadow-xs group flex items-center justify-between text-xs sm:text-sm text-slate-700 font-sans font-medium"
                          >
                            <span>{opt.label}</span>
                            <ArrowRight className="w-4 h-4 text-slate-350 group-hover:text-brand-teal group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Progress Bar Footer in Card */}
                    <div className="mt-8 pt-6 border-t border-slate-100">
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-brand-teal h-full transition-all duration-300"
                          style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 2. DEMOGRAPHIC CONTACT / FINAL FORM */}
                {currentStep === questions.length && !isSubmitted && currentResult && (
                  <motion.div
                    key="step-demographics"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col h-full flex-1"
                  >
                    <div className="pb-4 border-b border-slate-100 mb-6">
                      <div className="text-xs font-mono font-bold text-brand-teal uppercase mb-1">¡Diagnóstico Completado!</div>
                      <h3 className="font-display font-extrabold text-xl text-brand-blue leading-tight">
                        Analizando tu informe... Registra tus datos para ver el Perfil Estratégico.
                      </h3>
                    </div>

                    <form onSubmit={handleContactSubmit} className="space-y-4 flex-1">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Nombre Completo</label>
                        <input
                          type="text"
                          required
                          placeholder="Ej. Cristian Casas"
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-teal bg-slate-50/50 text-sm"
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Celular / WhatsApp</label>
                          <input
                            type="tel"
                            required
                            placeholder="Ej. 320 456 7890"
                            value={clientPhone}
                            onChange={(e) => setClientPhone(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-teal bg-slate-50/50 text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Correo Electrónico</label>
                          <input
                            type="email"
                            required
                            placeholder="ejemplo@correo.com"
                            value={clientEmail}
                            onChange={(e) => setClientEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-teal bg-slate-50/50 text-sm"
                          />
                        </div>
                      </div>

                      <div className="text-[10px] text-slate-400 leading-normal pt-2">
                        Al enviar, aceptas que procesemos tus respuestas de diagnóstico para brindarle la propuesta de viabilidad óptima.
                      </div>

                      <button
                        type="submit"
                        className="w-full font-display font-bold text-sm text-white bg-brand-blue hover:bg-brand-blue/90 py-4 rounded-xl mt-4 cursor-pointer shadow-md shadow-brand-blue/15 flex items-center justify-center gap-2"
                        id="btn-diagnostic-submit"
                      >
                        Revelar Mi Perfil Estratégico
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* 3. REPORT EXCLUSIVITY VIEW */}
                {isSubmitted && currentResult && (
                  <motion.div
                    key="step-report-view"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col justify-between h-full flex-1"
                  >
                    <div>
                      {/* Badge Header Row */}
                      <div className="flex items-center gap-2 text-brand-teal mb-4">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="text-xs font-mono font-bold uppercase tracking-wider">Diagnóstico Enviado con Éxito</span>
                      </div>

                      {/* Main Category */}
                      <h4 className="text-[10px] uppercase font-mono font-extrabold tracking-widest text-slate-400 block mb-1">RECOMENDACIÓN DERIVADA</h4>
                      <h3 className="font-display font-black text-2xl text-brand-blue tracking-tight leading-none mb-3">
                        {currentResult.title}
                      </h3>

                      {/* Result Box */}
                      <div className="p-5 rounded-2xl bg-brand-teal/5 border border-brand-teal/15 mb-6 text-xs sm:text-sm leading-relaxed text-slate-700 font-light">
                        {currentResult.recommendation}
                      </div>

                      {/* Notice */}
                      <div className="space-y-2 mt-4 p-4 rounded-xl bg-slate-50 border border-slate-150">
                        <div className="flex items-start gap-2 text-xs">
                          <div className="p-1 rounded bg-slate-100 text-brand-blue mt-0.5 shrink-0">
                            <UserCheck className="w-4 h-4" />
                          </div>
                          <span className="text-slate-600">
                            <span className="font-bold text-slate-800">Cristian Casas</span> revisará personalmente los datos ingresados de tu situación y te contactará en las próximas 24 horas hábiles al número <span className="font-semibold text-slate-700">{clientPhone}</span>.
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Restart Button footer */}
                    <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between gap-4">
                      <span className="text-[11px] text-slate-400 font-light">Código de Estrategia: CS-{currentStep + 15}</span>
                      <button
                        onClick={handleRestart}
                        className="font-sans text-xs font-bold text-brand-teal hover:text-brand-blue hover:underline transition-all"
                      >
                        Repetir Formulario de Diagnóstico
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
