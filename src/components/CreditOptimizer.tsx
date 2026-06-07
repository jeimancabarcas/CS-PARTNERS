import React, { useState } from 'react';
import { Calculator, Sparkles, TrendingDown, Clock, HelpCircle, Forward } from 'lucide-react';
import { motion } from 'motion/react';

interface CreditOptimizerProps {
  onSelectOption: (detailSummary: string) => void;
}

export default function CreditOptimizer({ onSelectOption }: CreditOptimizerProps) {
  const [loanBalance, setLoanBalance] = useState<number>(150000000); // 150 Million default COP
  const [remainingYears, setRemainingYears] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(14); // 14% E.A. typical COP
  const [intendedReduction, setIntendedReduction] = useState<number>(35); // 35% default time reduction

  // Simple amortization calculations
  const calculateOptimizedResult = () => {
    // Current interest rate monthly
    const rCurrent = (interestRate / 100) / 12;
    const nCurrent = remainingYears * 12;
    
    // Monthly payment formula: PMT = L * [r(1+r)^n] / [(1+r)^n - 1]
    const currentPaymentUnrounded = (loanBalance * (rCurrent * Math.pow(1 + rCurrent, nCurrent))) / (Math.pow(1 + rCurrent, nCurrent) - 1);
    const currentPayment = isNaN(currentPaymentUnrounded) || !isFinite(currentPaymentUnrounded) ? 0 : currentPaymentUnrounded;
    
    const totalCurrentInterests = (currentPayment * nCurrent) - loanBalance;

    // Optimized Term (intention reduction, e.g. reduce term by selected percentage)
    const optimizedYears = Math.max(5, Math.round(remainingYears * (1 - (intendedReduction / 100))));
    const nOptimized = optimizedYears * 12;

    // Optimized interest rates generally improve with portfolio purchasing (compra de cartera) or restructuring
    // Typically rate can reduce from 14% to 11.5% with portfolio purchase (compra de cartera)
    const optimizedInterestRate = Math.max(9, interestRate - 2.5);
    const rOptimized = (optimizedInterestRate / 100) / 12;

    const optimizedPaymentUnrounded = (loanBalance * (rOptimized * Math.pow(1 + rOptimized, nOptimized))) / (Math.pow(1 + rOptimized, nOptimized) - 1);
    const optimizedPayment = isNaN(optimizedPaymentUnrounded) || !isFinite(optimizedPaymentUnrounded) ? 0 : optimizedPaymentUnrounded;
    
    const totalOptimizedInterests = (optimizedPayment * nOptimized) - loanBalance;
    
    // Savable amount
    const savedInterests = Math.max(0, totalCurrentInterests - totalOptimizedInterests);
    const yearsReduced = Math.max(0, remainingYears - optimizedYears);

    return {
      currentPayment: Math.round(currentPayment),
      optimizedPayment: Math.round(optimizedPayment),
      totalCurrentInterests: Math.round(totalCurrentInterests),
      totalOptimizedInterests: Math.round(totalOptimizedInterests),
      savedInterests: Math.round(savedInterests),
      optimizedYears,
      yearsReduced,
      optimizedRate: optimizedInterestRate
    };
  };

  const results = calculateOptimizedResult();

  // Format currency helper
  const formatCOP = (val: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleCtaClick = () => {
    const summary = `Simulación de Crédito: Saldo de ${formatCOP(loanBalance)}, plazo actual de ${remainingYears} años al ${interestRate}%. Desea optimizar a ${results.optimizedYears} años (reducción de ${results.yearsReduced} años) con un ahorro proyectado de ${formatCOP(results.savedInterests)} en intereses totales.`;
    onSelectOption(summary);
  };

  return (
    <section id="simulador" className="py-20 bg-white relative">
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-teal/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <Calculator className="w-5 h-5 text-brand-teal" />
            <span className="font-mono text-xs font-bold tracking-widest text-brand-teal uppercase">SIMULADOR JURÍDICO-FINANCIERO</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-brand-blue tracking-tight">
            Optimiza tu hipoteca: Reduce plazos e intereses legalmente.
          </h2>
          <p className="font-sans text-slate-500 mt-3 text-sm sm:text-base leading-relaxed font-light">
            Basados en la Ley de Vivienda y estrategias de refinanciación independiente, estructuramos planes para recortar los años de tu crédito hipotecario o leasing de vivienda sin ahogar tu flujo de caja mensual.
          </p>
        </div>

        {/* Calculator Amortization Container */}
        <div className="grid lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Controls Form Column */}
          <div className="lg:col-span-6 bg-brand-cream/60 border border-slate-150 p-6 sm:p-8 rounded-3xl flex flex-col justify-between">
            <div className="space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/50">
                <span className="font-display font-extrabold text-slate-800 text-lg">Parámetros de tu Hipoteca</span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 bg-brand-teal/10 text-brand-teal rounded">PESOS / UVR</span>
              </div>

              {/* Slider 1: Loan Balance */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold font-sans">
                  <span className="text-slate-600">Saldo Pendiente del Crédito</span>
                  <span className="text-brand-blue text-sm font-extrabold">{formatCOP(loanBalance)}</span>
                </div>
                <input
                  type="range"
                  min="20000000"
                  max="1000000000"
                  step="1000000"
                  value={loanBalance}
                  onChange={(e) => setLoanBalance(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-teal"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>$20M COP</span>
                  <span>$1,000M COP (1 Billón)</span>
                </div>
              </div>

              {/* Slider 2: Remaining Years */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold font-sans">
                  <span className="text-slate-600">Plazo Restante Actual</span>
                  <span className="text-brand-blue text-sm font-extrabold">{remainingYears} años</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="1"
                  value={remainingYears}
                  onChange={(e) => setRemainingYears(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-teal"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>5 años</span>
                  <span>30 años</span>
                </div>
              </div>

              {/* Slider 3: Interest Rate */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold font-sans">
                  <span className="text-slate-600">Tasa de Interés Nominal (E.A.)</span>
                  <span className="text-brand-blue text-sm font-extrabold">{interestRate}% E.A.</span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="22"
                  step="0.5"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-teal"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>8% E.A. (Baja)</span>
                  <span>22% E.A. (Alta)</span>
                </div>
              </div>

              {/* Slider 4: Intended Reduction */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold font-sans">
                  <span className="text-slate-600">Porcentaje de Reducción Deseado</span>
                  <span className="text-brand-teal text-sm font-extrabold">-{intendedReduction}% en tiempo</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="60"
                  step="5"
                  value={intendedReduction}
                  onChange={(e) => setIntendedReduction(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-teal"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>Mínimo (-15% plazo)</span>
                  <span>Objetivo Alto (-60% de los años)</span>
                </div>
              </div>

            </div>

            {/* Explanatory Legal Notice */}
            <div className="mt-8 p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-500 leading-relaxed font-light">
              <span className="font-semibold text-brand-blue block mb-1">💡 Sustento Legal Colombiano</span>
              Al amparo de la <span className="font-normal text-brand-teal">Ley 546 de 1999 (Ley de Vivienda)</span>, las personas tienen el derecho de solicitar abonos a capital enfocados en reducir plazos, modificar el tipo de tasa, o negociar la compra de cartera con entidades aliadas más competitivas de forma jurídicamente resguardada.
            </div>
          </div>

          {/* Results Summary Box Column */}
          <div className="lg:col-span-6 bg-brand-blue text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl shadow-brand-blue/15 border border-brand-blue relative">
            <div className="absolute top-0 right-0 w-36 h-36 bg-brand-teal/15 rounded-bl-full pointer-events-none" />
            
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-cyan tracking-wider uppercase mb-5 font-mono">
                <Sparkles className="w-4 h-4 fill-brand-cyan/10" />
                Impacto Proyectado
              </div>

              {/* Big Savings Metric */}
              <div className="mb-8">
                <span className="text-xs text-slate-300 font-semibold uppercase block mb-1 tracking-wider">Ahorro Estimado en Intereses</span>
                <span className="text-4xl sm:text-5xl font-display font-black text-brand-cyan active:scale-105 transition-transform duration-300 block">
                  {formatCOP(results.savedInterests)}
                </span>
                <span className="text-[11px] text-slate-400 font-mono mt-1 font-light block">
                  *Dinero que dejas de pagar al banco y conservas en tu patrimonio familiar.
                </span>
              </div>

              {/* Metrics split row */}
              <div className="grid grid-cols-2 gap-4 pb-6 border-b border-white/10 mb-6">
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-300 uppercase tracking-widest font-mono font-medium">
                    <Clock className="w-3.5 h-3.5 text-brand-teal" />
                    Años Liberados
                  </div>
                  <div className="text-xl sm:text-2xl font-display font-black text-white mt-1">
                    -{results.yearsReduced} años <span className="text-sm font-sans font-light text-slate-350">menos</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 font-light">
                    Terminas en <span className="font-bold text-slate-300">{results.optimizedYears} años</span> en vez de {remainingYears}.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-300 uppercase tracking-widest font-mono font-medium">
                    <TrendingDown className="w-3.5 h-3.5 text-brand-teal" />
                    Tasa Proyectada
                  </div>
                  <div className="text-xl sm:text-2xl font-display font-black text-white mt-1">
                    {results.optimizedRate.toFixed(1)}% E.A.
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 font-light">
                    Mediante <span className="font-bold text-slate-300">compra de cartera</span> de deudas.
                  </p>
                </div>
              </div>

              {/* Monthly payment comparison */}
              <div className="space-y-3.5 bg-white/5 p-4 rounded-xl border border-white/5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-light">Cuota mensual estimada original:</span>
                  <span className="font-bold font-mono text-slate-200 line-through">{formatCOP(results.currentPayment)}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white font-semibold flex items-center gap-1">
                    Cuota optimizada con menor plazo:
                  </span>
                  <span className="font-extrabold font-mono text-brand-cyan text-sm">{formatCOP(results.optimizedPayment)}</span>
                </div>
                <div className="text-[10px] text-slate-400 leading-tight border-t border-white/5 pt-2 text-center font-light">
                  *Un leve cambio en la cuota te ahorra décadas de intereses y te entrega la escritura de tu casa mucho antes.
                </div>
              </div>
            </div>

            {/* Direct lead CTA */}
            <div className="mt-8 space-y-3">
              <button
                onClick={handleCtaClick}
                className="w-full flex items-center justify-center gap-2 font-display text-sm font-bold text-brand-blue bg-brand-cyan hover:bg-white px-6 py-4 rounded-full transition-all duration-200 shadow-md shadow-brand-cyan/15 group"
                id="btn-apply-mortgage-opt"
              >
                Solicitar Viabilidad sin Costo
                <Forward className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="text-center text-[10px] text-slate-400 font-light">
                *Analizamos tu caso con nuestro equipo técnico de manera gratuita y 100% confidencial.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
