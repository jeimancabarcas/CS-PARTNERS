import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { Menu, X, Phone, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Pilares', href: '#pilares' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Simulador', href: '#simulador' },
    { name: 'Diagnóstico', href: '#diagnostico' },
    { name: 'Alianzas', href: '#alianzas' },
    { name: 'Trayectoria', href: '#nosotros' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
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
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-xs py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#inicio" onClick={(e) => handleNavClick(e, '#inicio')} className="focus:outline-none">
              <Logo className="h-10 w-10" />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-7">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="font-sans text-sm font-medium text-slate-600 hover:text-brand-teal transition-colors duration-200"
                >
                  {item.name}
                </a>
              ))}
            </nav>
            {/* Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="flex items-center gap-2 font-sans text-sm font-semibold text-brand-teal border border-brand-teal/30 hover:border-brand-teal/80 bg-brand-teal/5 hover:bg-brand-teal/10 px-4 py-2 rounded-full transition-all duration-200"
                id="nav-contact-call"
              >
                <Phone className="w-4 h-4" />
                Consúltanos
              </a>

              <a
                href="#diagnostico"
                onClick={(e) => handleNavClick(e, '#diagnostico')}
                className="font-display text-sm font-bold text-white bg-brand-blue hover:bg-brand-blue/90 px-5 py-2.5 rounded-full shadow-sm shadow-brand-blue/15 transition-all duration-200 hover:-translate-y-0.5"
                id="nav-diagnostic-cta"
              >
                Diagnóstico Express
              </a>
            </div>

            {/* Mobile Menu Action Row */}
            <div className="flex lg:hidden items-center gap-3">
              {/* Mobile Hamburger menu */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg focus:outline-none"
                id="btn-hamburger"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Backdrop & Sheet - Rendered outside of the blurred header constraint */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[1000] lg:hidden">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-brand-cream border-l border-slate-100 p-6 shadow-2xl flex flex-col justify-between"
              id="mobile-drawer"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200/50">
                  <Logo className="h-9 w-9" showText={true} />
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Links */}
                <div className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="font-sans text-base font-semibold text-slate-700 hover:text-brand-teal py-2 border-b border-slate-100/40"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* Mobile CTA footer */}
              <div className="space-y-3 pt-6 border-t border-slate-200/50">
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="w-full flex items-center justify-center gap-2 font-sans py-3 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl"
                >
                  <Phone className="w-4 h-4" />
                  Escríbenos Directo
                </a>
                <a
                  href="#diagnostico"
                  onClick={(e) => handleNavClick(e, '#diagnostico')}
                  className="w-full text-center block font-display py-3 text-sm font-bold text-white bg-brand-blue hover:bg-brand-blue/90 rounded-xl shadow-md shadow-brand-blue/15"
                >
                  Iniciar Diagnóstico Express
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
