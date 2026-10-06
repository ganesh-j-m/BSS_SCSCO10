import React, { useState } from 'react';
import {
  GraduationCap,
  Menu,
  X,
  Phone,
  Mail,
  LogIn,
  Bot,
  ExternalLink,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { useCollege } from '../../context/CollegeContext';
import { Button } from '../common/Button';
import { COLLEGE_INFO } from '../../data/mockDatabase';

interface PublicNavbarProps {
  onOpenAuth: () => void;
  onOpenAI: () => void;
  onNavigateSection: (sectionId: string) => void;
  activeSection: string;
}

export const PublicNavbar: React.FC<PublicNavbarProps> = ({
  onOpenAuth,
  onOpenAI,
  onNavigateSection,
  activeSection,
}) => {
  const { currentUser, setActiveView } = useCollege();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'academics', label: 'Departments & Programs' },
    { id: 'admissions', label: 'Admissions 2026' },
    { id: 'placements', label: 'Placements' },
    { id: 'notices', label: 'Notices' },
    { id: 'events', label: 'Events' },
    { id: 'gallery', label: 'Campus Tour' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigateSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-2xs">
      {/* Top Utility Bar */}
      <div className="bg-slate-900 text-slate-300 text-[11px] px-4 py-1.5 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="font-medium text-amber-400">NAAC A+ Accredited (3.48 CGPA)</span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-slate-300">DTE Code: {COLLEGE_INFO.dteCode}</span>
            <span className="hidden lg:inline text-slate-500">|</span>
            <span className="hidden lg:inline text-slate-300">SPPU Affiliated</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3">
              <a href="tel:18002337272" className="flex items-center gap-1 hover:text-white transition-colors">
                <Phone className="w-3 h-3 text-blue-400" />
                <span>Toll-Free: {COLLEGE_INFO.tollFree}</span>
              </a>
              <span className="text-slate-700">|</span>
              <a href="mailto:info@scsco.edu.in" className="flex items-center gap-1 hover:text-white transition-colors">
                <Mail className="w-3 h-3 text-blue-400" />
                <span>info@scsco.edu.in</span>
              </a>
            </div>

            <button
              onClick={onOpenAI}
              className="flex items-center gap-1.5 bg-blue-600/30 hover:bg-blue-600 text-blue-200 hover:text-white px-2.5 py-0.5 rounded text-[11px] transition-all cursor-pointer border border-blue-500/30"
            >
              <Bot className="w-3 h-3" />
              <span>Campus AI Desk</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-11 h-11 rounded-lg bg-blue-800 text-white flex items-center justify-center font-bold text-xl shadow-xs group-hover:bg-blue-700 transition-colors shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="text-base sm:text-lg font-bold tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors leading-tight">
              SCSCO College of Engineering
            </div>
            <div className="text-[11px] text-slate-500 leading-tight hidden sm:block">
              Shri Chhatrapati Shivaji College of Engineering & Technology, Pune
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-medium text-slate-700">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeSection === item.id
                  ? 'bg-blue-50 text-blue-800 font-semibold'
                  : 'hover:text-blue-700 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2">
          {currentUser ? (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setActiveView('portal')}
              icon={<GraduationCap className="w-4 h-4" />}
            >
              My Portal ({currentUser.role})
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={onOpenAuth}
              icon={<LogIn className="w-3.5 h-3.5" />}
            >
              Portal Login
            </Button>
          )}

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 py-3 space-y-1 shadow-lg animate-in slide-in-from-top duration-150">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3 py-2 text-xs rounded-md font-medium transition-colors ${
                activeSection === item.id
                  ? 'bg-blue-50 text-blue-800 font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenAI}
              className="w-full justify-start"
              icon={<Bot className="w-4 h-4 text-blue-600" />}
            >
              Ask Campus AI Assistant
            </Button>
            {currentUser ? (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setActiveView('portal');
                  setMobileMenuOpen(false);
                }}
                className="w-full"
              >
                Go to Portal ({currentUser.name})
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  onOpenAuth();
                  setMobileMenuOpen(false);
                }}
                className="w-full"
              >
                Sign In to Campus ERP
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
