import React, { useState, useEffect } from 'react';
import { X, Trash2, CheckCircle2, UserCheck, MessageSquare, Phone, Mail, Clock, Calendar, Database, RefreshCw } from 'lucide-react';
import { Lead } from '../types';
import { motion } from 'motion/react';

interface AdminCRMProps {
  onClose: () => void;
  onRefreshBadgeCount: () => void;
}

export default function AdminCRM({ onClose, onRefreshBadgeCount }: AdminCRMProps) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState<'all' | 'new' | 'contacted' | 'resolved'>('all');

  // Load leads from localStorage
  const loadLeads = () => {
    try {
      const stored = localStorage.getItem('csp_leads');
      if (stored) {
        setLeads(JSON.parse(stored));
      } else {
        setLeads([]);
      }
    } catch (err) {
      console.error("Error loading leads:", err);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const handleUpdateStatus = (id: string, newStatus: 'new' | 'contacted' | 'resolved') => {
    try {
      const stored = localStorage.getItem('csp_leads');
      if (stored) {
        const parsed: Lead[] = JSON.parse(stored);
        const updated = parsed.map(l => l.id === id ? { ...l, status: newStatus } : l);
        localStorage.setItem('csp_leads', JSON.stringify(updated));
        setLeads(updated);
        onRefreshBadgeCount();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteLead = (id: string) => {
    try {
      const stored = localStorage.getItem('csp_leads');
      if (stored) {
        const parsed: Lead[] = JSON.parse(stored);
        const filtered = parsed.filter(l => l.id !== id);
        localStorage.setItem('csp_leads', JSON.stringify(filtered));
        setLeads(filtered);
        onRefreshBadgeCount();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('¿Estás seguro de eliminar todos los leads del historial de simulación?')) {
      localStorage.removeItem('csp_leads');
      setLeads([]);
      onRefreshBadgeCount();
    }
  };

  // Seed realistic Spanish leads for demonstration
  const handleSeedLeads = () => {
    const demoLeads: Lead[] = [
      {
        id: 'seed-1',
        name: 'Alejandra Bermúdez',
        email: 'ale.bermudez@outlook.com',
        phone: '+57 312 876 5432',
        serviceInterest: 'Crédito e Hipotecas',
        comments: 'Simulación Hipotecaria: Saldo de $220.000.000 COP, plazo actual de 20 años al 14.5% E.A. Desea optimizar a 12 años con una reducción estimada del 40% en plazos e intereses hipotecarios.',
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
        status: 'new'
      },
      {
        id: 'seed-2',
        name: 'Rodrigo Gómez S.A.S.',
        email: 'rgomez@construccionesco.com',
        phone: '+57 315 443 2211',
        serviceInterest: 'Patrimonio',
        comments: 'Necesitamos estructurar la sucesión de los socios fundadores de nuestra constructora en Bogotá y revisar el plan de protección tributaria corporativo.',
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(), // 1 day ago
        status: 'contacted'
      },
      {
        id: 'seed-3',
        name: 'Camila Rojas Díaz',
        email: 'camilarojas.diaz@gmail.com',
        phone: '+57 300 555 9988',
        serviceInterest: 'Insolvencia',
        comments: 'Tengo un saldo pendiente de tarjetas y un crédito de vehículo que superan mis flujos mensuales. Deseo programar estudio de insolvencia de persona natural no comerciante.',
        createdAt: new Date(Date.now() - 3600000 * 48).toISOString(), // 2 days ago
        status: 'resolved'
      }
    ];

    localStorage.setItem('csp_leads', JSON.stringify(demoLeads));
    setLeads(demoLeads);
    onRefreshBadgeCount();
  };

  const filteredLeads = leads.filter(l => {
    if (filter === 'all') return true;
    return l.status === filter;
  });

  const getStatusBadge = (status: 'new' | 'contacted' | 'resolved') => {
    switch (status) {
      case 'new':
        return 'bg-amber-100 text-amber-800 border-amber-205';
      case 'contacted':
        return 'bg-blue-100 text-blue-800 border-blue-205';
      case 'resolved':
        return 'bg-emerald-100 text-emerald-800 border-emerald-205';
    }
  };

  const getStatusLabel = (status: 'new' | 'contacted' | 'resolved') => {
    switch (status) {
      case 'new': return 'Nuevo Lead';
      case 'contacted': return 'En Contacto';
      case 'resolved': return 'Completado';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      
      {/* Box Panel */}
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[85vh] flex flex-col justify-between overflow-hidden shadow-2xl border border-slate-150" id="crm-modal-container">
        
        {/* Header */}
        <div className="p-6 bg-brand-blue text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 h-10 w-10 flex items-center justify-center bg-brand-teal/20 text-brand-cyan rounded-xl">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg leading-none">Buzón de Control CRM (Simulador Interno)</h3>
              <p className="text-[11px] text-slate-350 mt-1 font-light">
                Historial de leads de la Landing Page de Casas Strategic Partners.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-white/15 hover:bg-white/25 text-white/80 rounded-full transition-all"
            id="btn-close-crm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Panel Statistics and Filters */}
        <div className="bg-slate-50 border-b border-slate-150 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Tabs Filter */}
          <div className="flex flex-wrap gap-1.5">
            {(['all', 'new', 'contacted', 'resolved'] as const).map((opt) => (
              <button
                key={opt}
                onClick={() => setFilter(opt)}
                className={`px-3.5 py-1.5 rounded-full font-sans text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  filter === opt
                    ? 'bg-brand-blue text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {opt === 'all' && 'Todos'}
                {opt === 'new' && 'Nuevos'}
                {opt === 'contacted' && 'Contactados'}
                {opt === 'resolved' && 'Completados'}
              </button>
            ))}
          </div>

          {/* Seed/Clear CRM control */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleSeedLeads}
              className="px-3 py-1.5 text-xs font-bold text-brand-teal bg-brand-teal/8 border border-brand-teal/15 hover:bg-brand-teal/15 rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
              title="Genera leads simulados para pruebas de diseño"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Cargar Demos
            </button>
            {leads.length > 0 && (
              <button
                onClick={handleClearAll}
                className="px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                Limpiar Todo
              </button>
            )}
          </div>

        </div>

        {/* Scrollable list items */}
        <div className="p-6 overflow-y-auto flex-1 min-h-[300px]">
          {filteredLeads.length === 0 ? (
            <div className="text-center py-12 flex flex-col items-center justify-center gap-4">
              <div className="p-4 bg-slate-100 rounded-full text-slate-400">
                <Database className="w-10 h-10 stroke-[1.5]" />
              </div>
              <div>
                <h4 className="font-display font-bold text-base text-slate-800">No hay leads para mostrar</h4>
                <p className="text-xs text-slate-400 mt-1 max-w-sm">
                  Envía el formulario de contacto o el diagnóstico de la web, o haz clic en "Cargar Demos" para probar de inmediato.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="p-5 rounded-2xl bg-slate-50 hover:bg-slate-100/70 border border-slate-200/80 transition-all duration-300"
                >
                  {/* Item Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/50">
                    <div>
                      <h4 className="font-display font-extrabold text-base text-slate-900 leading-none">{lead.name}</h4>
                      <span className="text-[10px] uppercase font-mono font-bold text-brand-teal mt-1 block">
                        Interés: {lead.serviceInterest}
                      </span>
                    </div>

                    {/* Status selection and trash */}
                    <div className="flex items-center gap-2">
                      <select
                        value={lead.status}
                        onChange={(e) => handleUpdateStatus(lead.id, e.target.value as any)}
                        className={`text-xs px-2.5 py-1 rounded-full border font-bold font-sans ${getStatusBadge(lead.status)}`}
                      >
                        <option value="new">Nuevo Lead</option>
                        <option value="contacted">En Contacto</option>
                        <option value="resolved">Resuelto</option>
                      </select>

                      <button
                        onClick={() => handleDeleteLead(lead.id)}
                        className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                        title="Eliminar este lead"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Body details */}
                  <div className="grid sm:grid-cols-2 gap-4 py-3 font-sans text-xs">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-slate-650">
                        <Phone className="w-4 h-4 text-slate-400" />
                        <span className="font-mono">{lead.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-650">
                        <Mail className="w-4 h-4 text-slate-400" />
                        <span className="font-mono">{lead.email}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-slate-450">
                        <Clock className="w-4 h-4" />
                        <span>Recibido el: {new Date(lead.createdAt).toLocaleDateString()} a las {new Date(lead.createdAt).toLocaleTimeString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Client Message */}
                  {lead.comments && (
                    <div className="mt-2 p-3 bg-white border border-slate-200/60 rounded-xl">
                      <div className="text-[10px] text-slate-400 font-bold uppercase mb-1 flex items-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5" />
                        Detalles del Requerimiento:
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed font-sans whitespace-pre-wrap">
                        {lead.comments}
                      </p>
                    </div>
                  )}

                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-150 text-center text-[10px] text-slate-400 font-mono font-semibold">
          © CASAS STRATEGIC PARTNERS • SISTEMA CRM INTERNO DE SEGUIMIENTO
        </div>

      </div>

    </div>
  );
}
