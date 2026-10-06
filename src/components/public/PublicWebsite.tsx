import React, { useState } from 'react';
import {
  GraduationCap,
  ArrowRight,
  Calendar,
  FileText,
  Briefcase,
  Users,
  Award,
  BookOpen,
  MapPin,
  Clock,
  Download,
  Search,
  Phone,
  CheckCircle2,
  ChevronRight,
  Building2,
  Cpu,
  Sparkles,
  Shield,
  Layers,
  Send,
  ExternalLink,
  ChevronLeft,
  Filter,
} from 'lucide-react';
import { useCollege } from '../../context/CollegeContext';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Card, CardContent } from '../common/Card';
import { COLLEGE_INFO } from '../../data/mockDatabase';
import { Modal } from '../common/Modal';

interface PublicWebsiteProps {
  onOpenAuth: () => void;
  onOpenAI: () => void;
}

export const PublicWebsite: React.FC<PublicWebsiteProps> = ({ onOpenAuth, onOpenAI }) => {
  const {
    departments,
    courses,
    notices,
    events,
    news,
    gallery,
    placements,
    registerForEvent,
    submitAdmissionApplication,
    setActiveView,
  } = useCollege();

  // Hero Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroSlides = [
    {
      title: 'Engineering Leaders for a Global Knowledge Economy',
      subtitle: 'NAAC A+ Accredited · Affiliated with SPPU · 35-Acre Smart Green Tech Campus',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1600&auto=format&fit=crop&q=80',
      badge: 'Admissions Open 2026-27',
    },
    {
      title: 'World-Class AI, Robotics & Cloud Computing Laboratories',
      subtitle: 'NVIDIA RTX Workstations · Center of Excellence · Dassault 3DEXPERIENCE Center',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&auto=format&fit=crop&q=80',
      badge: 'State-of-the-Art R&D',
    },
    {
      title: '94.2% Campus Placements with Highest Package of ₹42 LPA',
      subtitle: 'Top Recruiters: NVIDIA, Microsoft, Barclays, Tata Motors, Infosys, Cognizant',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&auto=format&fit=crop&q=80',
      badge: 'Premier Corporate Tie-ups',
    },
  ];

  // Notices filter
  const [noticeCategory, setNoticeCategory] = useState<string>('All');
  const [noticeSearch, setNoticeSearch] = useState<string>('');

  // Gallery category filter
  const [galleryCategory, setGalleryCategory] = useState<string>('All');

  // Selected Department for Details Modal
  const [selectedDept, setSelectedDept] = useState<any>(null);

  // Event Registration Modal
  const [selectedEventForReg, setSelectedEventForReg] = useState<any>(null);
  const [regSuccessMessage, setRegSuccessMessage] = useState<string | null>(null);

  // Admission Application Form State
  const [admFullName, setAdmFullName] = useState('');
  const [admEmail, setAdmEmail] = useState('');
  const [admPhone, setAdmPhone] = useState('');
  const [admCourse, setAdmCourse] = useState('B.Tech in Computer Engineering');
  const [admSchool, setAdmSchool] = useState('');
  const [admScore, setAdmScore] = useState('');
  const [admCategory, setAdmCategory] = useState<'General' | 'OBC' | 'SC' | 'ST' | 'EWS'>('General');
  const [admSubmittedAppNo, setAdmSubmittedAppNo] = useState<string | null>(null);

  // Filtered Notices
  const filteredNotices = notices
    .filter((n) => n.isPublished)
    .filter((n) => (noticeCategory === 'All' ? true : n.category === noticeCategory))
    .filter((n) =>
      noticeSearch.trim() === ''
        ? true
        : n.title.toLowerCase().includes(noticeSearch.toLowerCase()) ||
          n.content.toLowerCase().includes(noticeSearch.toLowerCase())
    );

  // Filtered Gallery
  const filteredGallery = gallery.filter((item) =>
    galleryCategory === 'All' ? true : item.category === galleryCategory
  );

  const handleAdmissionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!admFullName || !admEmail || !admPhone || !admScore) return;

    const assignedDeptCode =
      admCourse.includes('Computer') ? 'COMP' : admCourse.includes('AI') ? 'AIDS' : 'MECH';

    const generatedAppNo = submitAdmissionApplication({
      fullName: admFullName,
      email: admEmail,
      phone: admPhone,
      courseApplied: admCourse,
      departmentCode: assignedDeptCode,
      previousSchool: admSchool || 'HSC / Equivalent Board',
      qualifyingScore: parseFloat(admScore) || 90.0,
      category: admCategory,
    });

    setAdmSubmittedAppNo(generatedAppNo);
    // Reset form fields
    setAdmFullName('');
    setAdmEmail('');
    setAdmPhone('');
    setAdmSchool('');
    setAdmScore('');
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. HERO SLIDER */}
      <section id="hero" className="relative bg-slate-950 text-white overflow-hidden min-h-[540px] flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroSlides[currentSlide].image}
            alt="SCSCO Campus"
            className="w-full h-full object-cover opacity-35 transform scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 w-full">
          <div className="max-w-2xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600/30 border border-blue-400/30 rounded-md text-blue-300 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>{heroSlides[currentSlide].badge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {heroSlides[currentSlide].title}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              {heroSlides[currentSlide].subtitle}
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <a
                href="#admissions"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md text-xs sm:text-sm font-semibold transition-colors shadow-sm"
              >
                <span>Apply for Admission 2026</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#academics"
                className="inline-flex items-center gap-2 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-white px-4 py-2.5 rounded-md text-xs sm:text-sm font-medium transition-colors"
              >
                <BookOpen className="w-4 h-4 text-blue-400" />
                <span>Explore Academic Programs</span>
              </a>

              <button
                onClick={onOpenAI}
                className="inline-flex items-center gap-2 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-amber-300 px-4 py-2.5 rounded-md text-xs sm:text-sm font-medium transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                <span>Campus AI Assistant</span>
              </button>
            </div>
          </div>
        </div>

        {/* Carousel controls */}
        <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all ${
                currentSlide === idx ? 'w-8 bg-blue-500' : 'w-2 bg-slate-600 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
          <div className="ml-3 flex items-center gap-1">
            <button
              onClick={() => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
              className="p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))}
              className="p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. QUICK ACCESS ACTION TILES */}
      <section className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {[
              { label: 'Student ERP', icon: GraduationCap, action: onOpenAuth, color: 'text-blue-600 bg-blue-50' },
              { label: 'Admissions', icon: FileText, href: '#admissions', color: 'text-emerald-600 bg-emerald-50' },
              { label: 'Notices', icon: Clock, href: '#notices', color: 'text-amber-600 bg-amber-50' },
              { label: 'Placements', icon: Briefcase, href: '#placements', color: 'text-indigo-600 bg-indigo-50' },
              { label: 'Departments', icon: Building2, href: '#academics', color: 'text-sky-600 bg-sky-50' },
              { label: 'Campus Events', icon: Calendar, href: '#events', color: 'text-rose-600 bg-rose-50' },
              { label: 'Campus Tour', icon: MapPin, href: '#gallery', color: 'text-purple-600 bg-purple-50' },
              { label: 'AI Helpdesk', icon: Sparkles, action: onOpenAI, color: 'text-teal-600 bg-teal-50' },
            ].map((item, idx) => {
              const Icon = item.icon;
              return item.href ? (
                <a
                  key={idx}
                  href={item.href}
                  className="flex flex-col items-center justify-center p-3 rounded-lg border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all text-center group bg-white"
                >
                  <div className={`w-9 h-9 rounded-md flex items-center justify-center mb-2 ${item.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-slate-700 group-hover:text-blue-600">
                    {item.label}
                  </span>
                </a>
              ) : (
                <button
                  key={idx}
                  onClick={item.action}
                  className="flex flex-col items-center justify-center p-3 rounded-lg border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all text-center group bg-white cursor-pointer"
                >
                  <div className={`w-9 h-9 rounded-md flex items-center justify-center mb-2 ${item.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-slate-700 group-hover:text-blue-600">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. INSTITUTIONAL ACCREDITATIONS & HIGHLIGHTS STATS */}
      <section className="bg-slate-900 text-white py-10 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 text-center">
            <div className="border-r border-slate-800 last:border-0 pr-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-400">NAAC A+</div>
              <div className="text-xs text-slate-400 mt-1">3.48 CGPA Score</div>
            </div>
            <div className="border-r border-slate-800 last:border-0 pr-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">₹42.0 LPA</div>
              <div className="text-xs text-slate-400 mt-1">Highest Package</div>
            </div>
            <div className="border-r border-slate-800 last:border-0 pr-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">94.2%</div>
              <div className="text-xs text-slate-400 mt-1">Placement Rate</div>
            </div>
            <div className="border-r border-slate-800 last:border-0 pr-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-white">2,650+</div>
              <div className="text-xs text-slate-400 mt-1">Active Students</div>
            </div>
            <div className="border-r border-slate-800 last:border-0 pr-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-purple-400">45+</div>
              <div className="text-xs text-slate-400 mt-1">Patents & Research</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400">14,000+</div>
              <div className="text-xs text-slate-400 mt-1">Global Alumni</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ABOUT COLLEGE & LEADERSHIP MESSAGE */}
      <section id="about" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 uppercase tracking-wider">
                <Shield className="w-4 h-4" />
                <span>Legacy of Academic Excellence Since 1998</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Shri Chhatrapati Shivaji College of Engineering & Technology
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Founded under the noble vision of empowering youth through scientific inquiry and technical competence, SCSCO has evolved into one of Western India's premier autonomous institutions. Our 35-acre sprawling campus bridges core fundamental engineering disciplines with modern artificial intelligence, high-performance computing, and sustainable technologies.
              </p>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Affiliated with Savitribai Phule Pune University (SPPU) and approved by AICTE, our curriculum integrates hands-on experiential lab work, industry internships, corporate hackathons, and social innovation projects.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <h4 className="text-xs font-bold text-slate-900">NBA Accredited Programs</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Tier-1 outcome-based education pedagogy.</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <h4 className="text-xs font-bold text-slate-900">DTE Govt. Code: EN-6278</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Official CAP centralized admission code.</p>
                </div>
              </div>
            </div>

            {/* Principal Quote & Leadership Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900 text-white rounded-xl p-6 border border-slate-800 shadow-lg relative overflow-hidden">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80"
                    alt="Dr. Arvind Deshmukh"
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-500 shadow-md shrink-0"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white">Dr. Arvind Deshmukh</h4>
                    <p className="text-xs text-blue-400">Principal & Director</p>
                    <p className="text-[10px] text-slate-400">Ph.D (IIT Bombay) · Senior Member IEEE</p>
                  </div>
                </div>

                <blockquote className="text-xs text-slate-300 italic leading-relaxed border-l-2 border-blue-500 pl-3 my-3">
                  "At SCSCO, our mission transcends traditional textbook instruction. We engineer critical thinkers, ethical technologists, and global leaders equipped to resolve humanity's most pressing challenges."
                </blockquote>

                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800">
                  <span>Office of the Principal</span>
                  <button onClick={onOpenAuth} className="text-blue-400 hover:underline">
                    Principal's Dashboard →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DEPARTMENTS & ACADEMIC PROGRAMS */}
      <section id="academics" className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
              Undergraduate & Postgraduate Degrees
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
              Departments & Centers of Excellence
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Industry-aligned curricula affiliated with Savitribai Phule Pune University, designed for high employability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept) => (
              <div
                key={dept.id}
                className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col"
              >
                <div className="h-44 relative overflow-hidden bg-slate-100">
                  <img
                    src={dept.image}
                    alt={dept.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded">
                    Code: {dept.code}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-blue-600 text-white text-[11px] font-medium px-2 py-0.5 rounded shadow-xs">
                    Intake: {dept.intake} Seats
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 tracking-tight">{dept.name}</h3>
                    <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                      {dept.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Head of Department:</span>
                      <span className="font-semibold text-slate-800">{dept.hodName}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>Labs: {dept.labCount} Specialized</span>
                      <span>Faculty: {dept.facultyCount} Scholars</span>
                    </div>

                    <div className="pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-xs justify-between"
                        onClick={() => setSelectedDept(dept)}
                      >
                        <span>View Department Curriculum</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. LATEST NOTICES & CIRCULARS (CMS DRIVEN) */}
      <section id="notices" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                Official Institutional Notices
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
                Announcements & Circulars
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Real-time official updates from the Examination Cell, Academics, and T&P Cell.
              </p>
            </div>

            {/* Filter Tabs & Search */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center bg-slate-100 p-1 rounded-md text-xs font-medium">
                {['All', 'Academic', 'Examination', 'Placement', 'General'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setNoticeCategory(cat)}
                    className={`px-3 py-1 rounded transition-colors ${
                      noticeCategory === cat
                        ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search notices..."
                  value={noticeSearch}
                  onChange={(e) => setNoticeSearch(e.target.value)}
                  className="pl-8 pr-3 py-1 text-xs border border-slate-200 rounded-md bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredNotices.map((notice) => (
              <div
                key={notice.id}
                className="bg-white border border-slate-200 rounded-lg p-5 hover:border-slate-300 hover:shadow-xs transition-all space-y-2.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-semibold text-blue-700">{notice.category}</span>
                    <span className="text-slate-300">·</span>
                    <span className="text-slate-500">{notice.publishedDate}</span>
                    <span className="text-slate-300">·</span>
                    <span className="text-slate-500">{notice.department}</span>
                  </div>
                  {notice.isUrgent && (
                    <Badge variant="danger" size="sm" dot>
                      URGENT
                    </Badge>
                  )}
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug">{notice.title}</h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {notice.content}
                </p>

                {notice.attachmentName && (
                  <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-blue-600" />
                      <span>{notice.attachmentName}</span>
                    </span>
                    <button
                      onClick={() => alert(`Downloading official document: ${notice.attachmentName}`)}
                      className="text-blue-600 hover:underline font-medium flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CAMPUS EVENTS & REGISTRATION MODAL */}
      <section id="events" className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                Symposiums, Hackathons & Cultural Life
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
                Upcoming Campus Events
              </h2>
            </div>
            <a
              href="#admissions"
              className="text-xs text-blue-600 hover:underline font-semibold flex items-center gap-1"
            >
              <span>Download Academic Calendar 2026</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((ev) => (
              <div
                key={ev.id}
                className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 relative bg-slate-100">
                    <img src={ev.bannerUrl} alt={ev.title} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 bg-blue-700 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded">
                      {ev.category}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      <span>{ev.eventDate}</span>
                      <span className="text-slate-300">·</span>
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      <span>{ev.time}</span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 leading-snug">{ev.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {ev.description}
                    </p>

                    <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{ev.venue}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500">
                      {ev.registeredCount} / {ev.capacity} Registered
                    </span>
                    <Button
                      variant={ev.isRegistered ? 'success' : 'secondary'}
                      size="sm"
                      onClick={() => {
                        setSelectedEventForReg(ev);
                        registerForEvent(ev.id);
                      }}
                    >
                      {ev.isRegistered ? 'Registered ✓' : 'Register Now'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. PLACEMENT HIGHLIGHTS & CORPORATE RECRUITERS */}
      <section id="placements" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
            <div className="lg:col-span-8">
              <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                Training & Placement Cell (T&P)
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
                Exceptional Career Opportunities & Industry Connect
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Our active alumni network and proactive recruitment partnerships deliver high placement packages across premier Fortune 500 tech firms, R&D centers, and unicorns.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <Button variant="secondary" size="md" onClick={onOpenAuth}>
                Access Student Placement Portal
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {placements.map((plc) => (
              <div
                key={plc.id}
                className="bg-white border border-slate-200 rounded-lg p-5 hover:border-blue-300 hover:shadow-xs transition-all space-y-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <h4 className="text-sm font-bold text-slate-900">{plc.companyName}</h4>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                    {plc.packageOffered}
                  </span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2">{plc.rolesOffered}</p>

                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
                  <div>Min CGPA: {plc.minCgpa}</div>
                  <div>Drive Date: {plc.driveDate}</div>
                  <div className="text-slate-400 truncate">
                    Eligible: {plc.eligibleBranches.join(', ')}
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                    onClick={onOpenAuth}
                  >
                    View Drive Details & Apply
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. ONLINE ADMISSIONS 2026 INTERACTIVE APPLICATION */}
      <section id="admissions" className="py-16 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Info */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-400/30 rounded text-xs font-semibold">
                <span>Admissions 2026-27 Now Open</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                Secure Your Seat at SCSCO College of Engineering
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Submit an online provisional application to verify seat availability, counseling schedules, scholarship eligibility, and hostel accommodation.
              </p>

              <div className="space-y-3 pt-2 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Centralized CAP Code: <strong>EN-6278</strong> (DTE Maharashtra)</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Approved for 100% Scholarship under MahaDBT & AICTE Pragati / Saksham</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Direct Second Year (DSE) Lateral Entry seats available for Diploma graduates</span>
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={onOpenAI}
                  className="inline-flex items-center gap-2 text-xs text-amber-300 hover:text-amber-200 border border-amber-400/30 px-3 py-2 rounded-md bg-amber-500/10"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Ask AI Assistant for MHT-CET Cutoffs & Fee Waivers</span>
                </button>
              </div>
            </div>

            {/* Right Interactive Application Form */}
            <div className="lg:col-span-6">
              <div className="bg-white text-slate-900 rounded-xl p-6 sm:p-8 shadow-2xl border border-slate-200">
                <h3 className="text-lg font-bold tracking-tight text-slate-900">
                  Online Admission Application Form
                </h3>
                <p className="text-xs text-slate-500 mt-1 mb-5">
                  Fill in your academic profile. Our admissions committee will review your submission.
                </p>

                {admSubmittedAppNo ? (
                  <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-lg text-center space-y-3">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                    <h4 className="text-base font-bold text-emerald-900">Application Submitted!</h4>
                    <p className="text-xs text-emerald-700 leading-relaxed">
                      Your provisional application has been securely recorded in the institute ERP admissions queue.
                    </p>
                    <div className="p-3 bg-white rounded border border-emerald-300 font-mono text-sm font-bold text-emerald-800">
                      Application No: {admSubmittedAppNo}
                    </div>
                    <p className="text-[11px] text-emerald-600">
                      Our admissions cell will reach you via SMS and Email with counseling timings.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setAdmSubmittedAppNo(null)}
                      className="mt-2"
                    >
                      Submit Another Application
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleAdmissionSubmit} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">
                        Candidate Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={admFullName}
                        onChange={(e) => setAdmFullName(e.target.value)}
                        placeholder="e.g. Ananya Deshmukh"
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-medium text-slate-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={admEmail}
                          onChange={(e) => setAdmEmail(e.target.value)}
                          placeholder="candidate@gmail.com"
                          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-slate-700 mb-1">
                          Mobile Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={admPhone}
                          onChange={(e) => setAdmPhone(e.target.value)}
                          placeholder="+91 98220 XXXXX"
                          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-medium text-slate-700 mb-1">
                          Course Applied For *
                        </label>
                        <select
                          value={admCourse}
                          onChange={(e) => setAdmCourse(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                        >
                          <option>B.Tech in Computer Engineering</option>
                          <option>B.Tech in AI & Data Science</option>
                          <option>B.Tech in Electronics & Telecom</option>
                          <option>B.Tech in Mechanical Engineering</option>
                          <option>B.Tech in Civil Engineering</option>
                          <option>MBA (Dual Specialization)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-medium text-slate-700 mb-1">
                          CET / JEE Percentile or 12th % *
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          value={admScore}
                          onChange={(e) => setAdmScore(e.target.value)}
                          placeholder="e.g. 94.50"
                          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-medium text-slate-700 mb-1">
                          Previous Junior College / Polytechnic
                        </label>
                        <input
                          type="text"
                          value={admSchool}
                          onChange={(e) => setAdmSchool(e.target.value)}
                          placeholder="e.g. Modern College Pune"
                          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-slate-700 mb-1">
                          Admission Category
                        </label>
                        <select
                          value={admCategory}
                          onChange={(e) => setAdmCategory(e.target.value as any)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                        >
                          <option value="General">General / Open</option>
                          <option value="OBC">OBC</option>
                          <option value="SC">SC</option>
                          <option value="ST">ST</option>
                          <option value="EWS">EWS</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button
                        type="submit"
                        variant="secondary"
                        size="md"
                        className="w-full py-2.5 font-bold"
                      >
                        Submit Application & Generate Token
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. CAMPUS PHOTO GALLERY */}
      <section id="gallery" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                Virtual Visual Tour
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
                Life & Infrastructure at SCSCO
              </h2>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-slate-100 rounded-lg text-xs font-medium">
              {['All', 'Campus', 'Labs', 'Sports', 'Cultural'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setGalleryCategory(cat)}
                  className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
                    galleryCategory === cat
                      ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs hover:shadow-md transition-all group"
              >
                <div className="h-52 overflow-hidden bg-slate-100 relative">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/80 text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                    {item.category}
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. STUDENT & ALUMNI TESTIMONIALS */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
              Student Voices & Alumni Success
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
              What Our Community Says
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Pooja Kulkarni',
                role: 'Software Engineer @ Microsoft',
                batch: 'Batch of 2024 · Computer Engineering',
                avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
                quote: 'The rigorous algorithms lab and competitive programming culture at SCSCO directly helped me clear Microsoft Azure technical interviews. Faculty mentorship was invaluable.',
              },
              {
                name: 'Rahul Sharma',
                role: 'Third Year B.Tech Student',
                batch: 'Dept of Computer Engineering · SGPA 9.41',
                avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
                quote: 'Having the SCSCO digital platform for attendance, instant results, and lecture materials saves hours. The high-performance labs with NVIDIA GPUs enabled our autonomous drone project.',
              },
              {
                name: 'Rohan Deshpande',
                role: 'Hardware Validation Engineer @ NVIDIA',
                batch: 'Batch of 2023 · ENTC',
                avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
                quote: 'The Center of Excellence and VLSI simulation infrastructure give students hands-on familiarity with tools used in top Silicon Valley semiconductor firms.',
              },
            ].map((t, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs flex flex-col justify-between"
              >
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{t.quote}"
                </p>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{t.name}</h4>
                    <p className="text-[11px] text-blue-700 font-medium">{t.role}</p>
                    <p className="text-[10px] text-slate-400">{t.batch}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. DOWNLOADS & RESOURCES */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Academic Downloads & Documents</h3>
              <p className="text-xs text-slate-500">Official syllabi, calendars, and circulars for students & parents.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: 'Academic Calendar 2026-27', size: '1.4 MB PDF', category: 'Dean Academics' },
              { title: 'B.Tech Course Syllabus Book (All Depts)', size: '4.8 MB PDF', category: 'Affiliation SPPU' },
              { title: 'Information Brochure & Prospectus', size: '8.2 MB PDF', category: 'Admissions' },
              { title: 'Scholarship Schemes & MahaDBT Manual', size: '2.1 MB PDF', category: 'Accounts Cell' },
            ].map((doc, idx) => (
              <div
                key={idx}
                className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between hover:bg-slate-100 transition-colors"
              >
                <div>
                  <div className="text-xs font-semibold text-slate-900">{doc.title}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {doc.category} · {doc.size}
                  </div>
                </div>
                <button
                  onClick={() => alert(`Starting download for ${doc.title}`)}
                  className="p-2 rounded bg-white border border-slate-200 text-blue-600 hover:text-blue-800 shadow-2xs cursor-pointer"
                  title="Download Document"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. CONTACT & DIRECTIONS */}
      <section id="contact" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                Visit Campus
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Connect with SCSCO Administration
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Our main administrative headquarters is located inside Shivaji Knowledge City, Hadapsar, Pune. Campus visits are open Monday to Saturday from 9:00 AM to 5:00 PM.
              </p>

              <div className="space-y-3 pt-2 text-xs text-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Campus Address:</strong>
                    <div className="text-slate-500 mt-0.5">{COLLEGE_INFO.address}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                  <div>
                    <strong>Central Office:</strong> {COLLEGE_INFO.phone} | <strong>Toll Free:</strong> {COLLEGE_INFO.tollFree}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                  <div>
                    <strong>Working Hours:</strong> Mon - Sat: 09:00 AM - 05:30 PM (Closed 2nd & 4th Saturday)
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
                <h4 className="text-sm font-bold text-slate-900 mb-1">Quick Contact Inquiry</h4>
                <p className="text-xs text-slate-500 mb-4">Send a direct message to the registrar's desk.</p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert('Thank you for reaching out. Your inquiry has been routed to the registrar.');
                  }}
                  className="space-y-3 text-xs"
                >
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Your Email"
                      className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Subject (e.g. Admission Inquiry, Document Verification)"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                  <textarea
                    rows={3}
                    required
                    placeholder="Your Message..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                  <Button type="submit" variant="primary" size="sm" className="w-full">
                    Dispatch Inquiry
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Department Detail Modal */}
      {selectedDept && (
        <Modal
          isOpen={!!selectedDept}
          onClose={() => setSelectedDept(null)}
          title={selectedDept.name}
          subtitle={`Department Code: ${selectedDept.code} · Established ${selectedDept.establishedYear}`}
          maxWidth="2xl"
        >
          <div className="space-y-4 text-xs">
            <p className="text-slate-600 leading-relaxed">{selectedDept.description}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2">
              <div className="p-2.5 bg-slate-50 rounded border border-slate-200 text-center">
                <span className="block text-slate-400 text-[10px]">Annual Intake</span>
                <span className="font-bold text-slate-900 text-sm">{selectedDept.intake} Seats</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border border-slate-200 text-center">
                <span className="block text-slate-400 text-[10px]">Specialized Labs</span>
                <span className="font-bold text-slate-900 text-sm">{selectedDept.labCount} Labs</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border border-slate-200 text-center">
                <span className="block text-slate-400 text-[10px]">Faculty Strength</span>
                <span className="font-bold text-slate-900 text-sm">{selectedDept.facultyCount} Professors</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border border-slate-200 text-center">
                <span className="block text-slate-400 text-[10px]">Active Students</span>
                <span className="font-bold text-slate-900 text-sm">{selectedDept.studentCount}</span>
              </div>
            </div>

            <div className="pt-2">
              <h4 className="font-bold text-slate-900 mb-2">Key Laboratory Infrastructure:</h4>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>High Performance Distributed Systems & Cloud Lab</li>
                <li>Machine Learning & Neural Architecture Simulation Center</li>
                <li>Cyber Security, Cryptography & Network Pen-testing Lab</li>
                <li>Project Prototyping & Incubation Cell</li>
              </ul>
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setSelectedDept(null)}>
                Close
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setSelectedDept(null);
                  window.location.hash = '#admissions';
                }}
              >
                Apply for {selectedDept.code}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
