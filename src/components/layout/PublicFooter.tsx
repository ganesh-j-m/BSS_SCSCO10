import React from 'react';
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  FileText,
  ExternalLink,
  Award,
} from 'lucide-react';
import { COLLEGE_INFO } from '../../data/mockDatabase';

export const PublicFooter: React.FC<{
  onNavigateSection: (sectionId: string) => void;
  onOpenAuth: () => void;
}> = ({ onNavigateSection, onOpenAuth }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-xs">
      {/* Upper Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Col 1: Institute Overview */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-white tracking-tight">SCSCO Engineering</span>
              <span className="block text-[10px] text-slate-400">Estd. 1998 · Autonomous Campus</span>
            </div>
          </div>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            {COLLEGE_INFO.tagline}. Approved by AICTE New Delhi, Recognized by Govt. of Maharashtra (DTE Code: {COLLEGE_INFO.dteCode}), and Affiliated with Savitribai Phule Pune University.
          </p>
          <div className="pt-1 flex items-center gap-2 text-[11px] text-amber-400 font-medium">
            <Award className="w-4 h-4 shrink-0" />
            <span>NAAC A+ Accredited · CGPA 3.48</span>
          </div>
        </div>

        {/* Col 2: Academics & Admissions */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Academics & Admissions</h4>
          <ul className="space-y-1.5 text-slate-400 text-[11px]">
            <li>
              <button onClick={() => onNavigateSection('academics')} className="hover:text-white transition-colors">
                Computer Engineering (B.Tech)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateSection('academics')} className="hover:text-white transition-colors">
                Artificial Intelligence & Data Science
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateSection('academics')} className="hover:text-white transition-colors">
                Electronics & Telecommunication
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateSection('academics')} className="hover:text-white transition-colors">
                Mechanical Engineering & Robotics
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateSection('academics')} className="hover:text-white transition-colors">
                Master of Business Administration (MBA)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateSection('admissions')} className="text-blue-400 hover:underline">
                First Year Admissions CAP Process 2026
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Student & Mandatory Cells */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Statutory Bodies & Cells</h4>
          <ul className="space-y-1.5 text-slate-400 text-[11px]">
            <li>
              <button onClick={() => onNavigateSection('notices')} className="hover:text-white transition-colors">
                Internal Quality Assurance Cell (IQAC)
              </button>
            </li>
            <li>
              <button onClick={onOpenAuth} className="hover:text-white transition-colors">
                Anti-Ragging Squad & Committee
              </button>
            </li>
            <li>
              <button onClick={onOpenAuth} className="hover:text-white transition-colors">
                Internal Complaints Committee (ICC)
              </button>
            </li>
            <li>
              <button onClick={onOpenAuth} className="hover:text-white transition-colors">
                SC / ST / OBC Grievance Cell
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateSection('placements')} className="hover:text-white transition-colors">
                Training & Placement Cell (T&P)
              </button>
            </li>
            <li>
              <button onClick={onOpenAuth} className="hover:text-white transition-colors">
                Digital Examination & Hall Tickets
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Campus Contact & Helpdesk */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Campus Desk</h4>
          <div className="space-y-2 text-slate-400 text-[11px]">
            <div className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
              <span>{COLLEGE_INFO.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>{COLLEGE_INFO.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>{COLLEGE_INFO.email}</span>
            </div>
            <div className="pt-2">
              <button
                onClick={onOpenAuth}
                className="w-full text-center bg-slate-800 hover:bg-slate-700 text-white py-1.5 px-3 rounded text-[11px] font-medium transition-colors border border-slate-700"
              >
                Access ERP Portal (Staff & Students)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal / Accreditation Bar */}
      <div className="bg-slate-950 py-4 px-4 border-t border-slate-800/80 text-[11px] text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} Shri Chhatrapati Shivaji College of Engineering & Technology. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>AICTE Mandatory Disclosure</span>
            <span>·</span>
            <span>NIRF Ranking Data</span>
            <span>·</span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
