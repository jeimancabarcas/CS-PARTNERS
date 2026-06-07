/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Pillars from './components/Pillars';
import Services from './components/Services';
import CreditOptimizer from './components/CreditOptimizer';
import InteractiveDiagnostic from './components/InteractiveDiagnostic';
import AllianceSection from './components/AllianceSection';
import AboutUs from './components/AboutUs';
import ContactSection from './components/ContactSection';
import AdminCRM from './components/AdminCRM';
import { Lead } from './types';
import { ShieldCheck, Phone, Mail, FileText, ArrowUp } from 'lucide-react';

export default function App() {
  const [prefilledMessage, setPrefilledMessage] = useState<string>('');
  const [isCrmOpen, setIsCrmOpen] = useState<boolean>(false);
  const [adminLeadCount, setAdminLeadCount] = useState<number>(0);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // Sync current leads statistics
  const updateLeadsStats = () => {
    try {
      const stored = localStorage.getItem('csp_leads');
      if (stored) {
        const parsed: Lead[] = JSON.parse(stored);
        const uncontacted = parsed.filter(l => l.status === 'new').length;
        setAdminLeadCount(uncontacted);
      } else {
        setAdminLeadCount(0);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    updateLeadsStats();

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleApplyPrefill = (summary: string) => {
    setPrefilledMessage(summary);
    // Smooth scroll directly to contact form section
    const target = document.querySelector('#contacto');
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

  const handleDiagnosticSubmit = (diagData: {
    profileType: string;
    metrics: string;
    answersSummary: Record<string, string>;
  }) => {
    // Generate new Lead automatically and store in localStorage
    const newLead: Lead = {
      id: 'lead-' + Date.now(),
      name: diagData.answersSummary.clientName || 'Cliente Diagnosticado',
      email: diagData.answersSummary.clientEmail || '',
      phone: diagData.answersSummary.clientPhone || '',
      serviceInterest: 'Evaluación del Estado Financiero',
      comments: `--- INFORME DE DIAGNÓSTICO ESTRATÉGICO INSTANTÁNEO ---\nPerfil Arrojado: ${diagData.profileType}\nRecomendación Asignada: ${diagData.metrics}\nRespuestas de Selección:\n- Objetivo Principal: ${diagData.answersSummary.primary_goal || 'N/A'}\n- Crédito Hipotecario: ${diagData.answersSummary.has_mortgage || 'N/A'}\n- Nivel Tributario: ${diagData.answersSummary.tax_optimization || 'N/A'}\n- Blindaje de Ingreso: ${diagData.answersSummary.protection_level || 'N/A'}`,
      createdAt: new Date().toISOString(),
      status: 'new'
    };

    try {
      const existing = localStorage.getItem('csp_leads');
      const leads: Lead[] = existing ? JSON.parse(existing) : [];
      leads.unshift(newLead);
      localStorage.setItem('csp_leads', JSON.stringify(leads));
      updateLeadsStats();
    } catch (err) {
      console.error("Error saving strategic diagnostic lead:", err);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-brand-cream relative">
      
      {/* 1. Translucent Responsive Navigation Header */}
      <Header
        onOpenAdmin={() => setIsCrmOpen(true)}
        showAdminBadge={adminLeadCount > 0}
        adminLeadCount={adminLeadCount}
      />

      {/* Main Pages content */}
      <main>
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. Purpose & Pillars Section */}
        <Pillars />

        {/* 4. Complete Services Section (Ahorro, Seguros, Credito, Insolvencia) */}
        <Services />

        {/* 5. Credit Optimizer Simulated Section */}
        <CreditOptimizer onSelectOption={handleApplyPrefill} />

        {/* 6. Step-by-step Interactive Financial Diagnostic Quiz */}
        <InteractiveDiagnostic onSubmitDiagnostic={handleDiagnosticSubmit} />

        {/* 7. Alliance Network Section */}
        <AllianceSection />

        {/* 8. Trayectoria (Bio de Cristian Casas + clickable Business Card widget) */}
        <AboutUs />

        {/* 9. Contact Section Form */}
        <ContactSection
          prefilledMessage={prefilledMessage}
          onClearPrefill={() => setPrefilledMessage('')}
          onLeadSubmitted={updateLeadsStats}
        />
      </main>

      {/* 10. Minimalist Clean Footer */}
      <footer className="bg-brand-blue text-slate-300 py-12 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid md:grid-cols-4 gap-8 pb-10 border-b border-white/5">
            {/* Brand column */}
            <div className="space-y-4 col-span-2">
              <span className="font-display font-black text-white text-lg tracking-tight block">
                CASAS STRATEGIC PARTNERS S.A.S.
              </span>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed font-sans font-light">
                Acompañamiento especializado en la estructuración, protección y optimización de patrimonios familiares y empresariales en Colombia. Una mirada independiente que compara alternativas de 56 aliados claves.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xs font-mono font-bold text-brand-cyan tracking-wider uppercase mb-4">Menú Rápido</h4>
              <ul className="space-y-2 text-xs font-sans font-medium text-slate-400">
                <li><a href="#inicio" className="hover:text-white transition-colors">Inicio</a></li>
                <li><a href="#pilares" className="hover:text-white transition-colors">Propósito</a></li>
                <li><a href="#servicios" className="hover:text-white transition-colors">Portafolio</a></li>
                <li><a href="#simulador" className="hover:text-white transition-colors">Calculadora Hipotecas</a></li>
                <li><a href="#diagnostico" className="hover:text-white transition-colors">Análisis Financiero</a></li>
              </ul>
            </div>

            {/* Contact Coordinates Footer column */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold text-brand-cyan tracking-wider uppercase">Coordenadas Directas</h4>
              <p className="text-xs font-mono text-slate-400">
                <a href="mailto:ccasas@cspartners.com" className="hover:text-white block transition-colors">ccasas@cspartners.com</a>
                <a href="tel:+573204567890" className="hover:text-white block mt-1 transition-colors">+57 320 456 7890</a>
              </p>
              <div className="flex gap-2 text-[10px] text-slate-450 items-center font-sans font-semibold">
                <ShieldCheck className="w-4 h-4 text-brand-teal" />
                <span>Habeas Data Cumplido • Colombia</span>
              </div>
            </div>
          </div>

          {/* Sub signature column */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-slate-500 font-light">
            <span className="text-center sm:text-left">
              © {new Date().getFullYear()} CASAS STRATEGIC PARTNERS S.A.S. (C&S Partners) — Todos los derechos reservados.
            </span>
            <span className="flex items-center gap-1">
              Desarrollo de Estrategia Sostenible • Diseñado con Excelencia Profesional
            </span>
          </div>

        </div>
      </footer>

      {/* Floating Scroll to Top tool */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-brand-blue hover:bg-brand-teal text-white rounded-full shadow-lg z-30 transition-all duration-300 transform hover:scale-115 cursor-pointer outline-none active:scale-95"
          title="Subir al inicio"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* 11. Modal Window for Back-office Lead Tracker (Simulador CRM) */}
      {isCrmOpen && (
        <AdminCRM
          onClose={() => setIsCrmOpen(false)}
          onRefreshBadgeCount={updateLeadsStats}
        />
      )}

    </div>
  );
}
