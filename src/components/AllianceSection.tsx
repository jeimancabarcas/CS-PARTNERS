import React, { useState } from 'react';
import { Layers, Building, ShieldCheck, Landmark, Scale, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

export default function AllianceSection() {
  const [activeCategory, setActiveCategory] = useState<'todos' | 'financiero' | 'asegurador' | 'juridico' | 'empresarial'>('todos');

  const categories = [
    { id: 'todos' as const, label: 'Todas (56+)', icon: Layers },
    { id: 'financiero' as const, label: 'Sector Financiero', icon: Landmark },
    { id: 'asegurador' as const, label: 'Sector Asegurador', icon: ShieldCheck },
    { id: 'juridico' as const, label: 'Sector Jurídico', icon: Scale },
    { id: 'empresarial' as const, label: 'Empresarial & Vivienda', icon: Building },
  ];

  const alliancesList = [
    // Financiero
    { name: 'Bancolombia S.A.', category: 'financiero', desc: 'Crédito hipotecario y colocación de fondos.' },
    { name: 'Banco Davivienda', category: 'financiero', desc: 'Leasing habitacional y compra de cartera.' },
    { name: 'Banco de Bogotá', category: 'financiero', desc: 'Estructuración y optimización crediticia.' },
    { name: 'BTG Pactual', category: 'financiero', desc: 'Fondos colectivos y gestión de patrimonio.' },
    { name: 'Skandia Colombia', category: 'financiero', desc: 'Ahorro programado y fondos de pensiones voluntarias.' },
    { name: 'Credicorp Capital', category: 'financiero', desc: 'Vehículos de inversión internacional.' },
    // Asegurador
    { name: 'Seguros Sura', category: 'asegurador', desc: 'Pólizas de vida, salud integral y empresarial.' },
    { name: 'Allianz Colombia', category: 'asegurador', desc: 'Seguro patrimonial y responsabilidad civil.' },
    { name: 'Mapfre Seguros', category: 'asegurador', desc: 'Garantías, cumplimiento y blindaje de activos.' },
    { name: 'AXA Colpatria', category: 'asegurador', desc: 'Salud prepagada y seguros colectivos hombre clave.' },
    { name: 'BMI Compañía de Seguros', category: 'asegurador', desc: 'Pólizas de vida de alta denominación en dólares.' },
    { name: 'MetLife Colombia', category: 'asegurador', desc: 'Seguros de renta educativa y pensión privada.' },
    // Jurídico
    { name: 'Asociados de Vivienda Law', category: 'juridico', desc: 'Especialistas en procesos de Ley 546 (Ley de Vivienda).' },
    { name: 'Tributaria & Consultores', category: 'juridico', desc: 'Planeación de impuestos y reorganización de pasivos.' },
    { name: 'Insolvencia Sostenible S.A.S.', category: 'juridico', desc: 'Trámite garantizado de Ley de Insolvencia de Persona Natural.' },
    { name: 'Defensa Bancaria Abogados', category: 'juridico', desc: 'Freno a embargos y negociaciones de deudas complejas.' },
    // Empresarial & Vivienda
    { name: 'Desarrollos Inmobiliarios S.A.', category: 'empresarial', desc: 'Adquisición de vivienda y estructuración de cuotas.' },
    { name: 'Fiducoop Colombia', category: 'empresarial', desc: 'Encargos fiduciarios y administración de preventas.' },
    { name: 'Inmobiliaria Metropolitana', category: 'empresarial', desc: 'Valoración pericial de activos inmobiliarios.' },
    { name: 'Sinergia Consultores Co.', category: 'empresarial', desc: 'Reorganización institucional y valoración corporativa.' },
  ];

  const filteredAlliances = activeCategory === 'todos' 
    ? alliancesList 
    : alliancesList.filter(item => item.category === activeCategory);

  return (
    <section id="alianzas" className="py-20 bg-white relative">
      <div className="absolute top-0 left-0 w-full h-px bg-slate-100" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-mono text-xs font-bold tracking-widest text-brand-teal uppercase">RESPALDO CORPORATIVO</span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-brand-blue tracking-tight mt-4">
            Alianzas estratégicas con 56+ compañías líderes.
          </h2>
          <p className="font-sans text-slate-500 mt-3 text-sm sm:text-base font-light">
            No estamos casados con ninguna marca. Nuestra arquitectura abierta te da acceso objetivo a soluciones en ahorro, seguros, pensiones, créditos e insolvencia al comparar el mercado real en un solo lugar.
          </p>
        </div>

        {/* Categories Pills */}
        <div className="flex flex-wrap gap-2 justify-center mb-10 pb-2">
          {categories.map((cat) => {
            const CatIcon = cat.icon;
            const isSelected = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4.5 py-2.5 rounded-full font-sans text-xs sm:text-sm font-semibold transition-all duration-300 pointer-events-auto cursor-pointer border ${
                  isSelected
                    ? 'bg-brand-blue border-brand-blue text-white shadow-md shadow-brand-blue/10'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
                id={`cat-btn-${cat.id}`}
              >
                <CatIcon className="w-4 h-4 shrink-0" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Alliances grid list */}
        <motion.div
          layout
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-6"
          id="alliance-grid"
        >
          {filteredAlliances.map((alliance) => (
            <motion.div
              layout
              key={alliance.name}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="p-5.5 rounded-2xl bg-brand-cream/30 border border-slate-150/60 hover:bg-white hover:border-brand-teal/20 hover:shadow-md hover:shadow-slate-100 transition-all duration-300 flex items-start gap-4 group"
            >
              {/* Modern elegant category avatar icon instead of complex heavy graphic logos */}
              <div className="p-3 rounded-xl bg-slate-100 group-hover:bg-brand-teal/8 text-slate-500 group-hover:text-brand-teal transition-colors duration-300 shrink-0">
                {alliance.category === 'financiero' && <Landmark className="w-4.5 h-4.5" />}
                {alliance.category === 'asegurador' && <ShieldCheck className="w-4.5 h-4.5" />}
                {alliance.category === 'juridico' && <Scale className="w-4.5 h-4.5" />}
                {alliance.category === 'empresarial' && <Building className="w-4.5 h-4.5" />}
              </div>

              <div>
                <h4 className="font-display font-extrabold text-sm sm:text-base text-brand-blue tracking-tight leading-snug">
                  {alliance.name}
                </h4>
                <p className="font-sans text-xs text-slate-500 mt-1 leading-relaxed font-light">
                  {alliance.desc}
                </p>
                <span className="inline-block text-[9px] font-mono uppercase tracking-widest font-extrabold text-brand-teal mt-2">
                  {alliance.category === 'financiero' && 'Finanzas & Inversión'}
                  {alliance.category === 'asegurador' && 'Seguros & Protección'}
                  {alliance.category === 'juridico' && 'Sustento Jurídico'}
                  {alliance.category === 'empresarial' && 'Vivienda & Empresa'}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom micro note */}
        <div className="mt-10 p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="text-xs text-slate-500 font-light">
            ¿Posees deudas o pólizas en alguna de estas corporaciones? Nuestro análisis es{' '}
            <span className="font-semibold text-brand-teal">transversal e independiente</span>. Buscamos mejores opciones sin alterar tu historial.
          </div>
          <span className="text-[10px] font-mono font-bold px-3 py-1 bg-brand-blue/5 text-brand-blue rounded-md whitespace-nowrap">
            56 CONEXIONES DE PRIMER NIVEL
          </span>
        </div>

      </div>
    </section>
  );
}
