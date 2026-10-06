import { GoogleGenAI } from '@google/genai';
import { COLLEGE_INFO } from '../data/mockDatabase';

// Campus Knowledge Base for immediate deterministic answers
const KNOWLEDGE_BASE: { keywords: string[]; answer: string }[] = [
  {
    keywords: ['admission', 'apply', 'eligibility', 'process', 'entrance', 'cet', 'jee', 'cutoff'],
    answer: `Admissions to First Year B.Tech at SCSCO are conducted via Centralized Admission Process (CAP) by State CET Cell Maharashtra (DTE Code: EN-6278).
    
• Eligibility: Minimum 45% aggregate in 10+2 (PCM) for General (40% for Reserved categories) + valid MHT-CET or JEE Main score.
• Direct Second Year (Lateral Entry): Diploma / B.Sc with min 45% aggregate.
• Documents required: 10th & 12th Marksheets, CET/JEE Scorecard, Leaving Certificate, Domicile & Caste/Non-Creamy Layer (if applicable).
• You can submit a direct provisional application right now using our online Admission Form on the website!`,
  },
  {
    keywords: ['fee', 'fees', 'tuition', 'cost', 'hostel fee', 'scholarship', 'payment'],
    answer: `Fee Structure for Academic Year 2025-2026:
    
• B.Tech (Computer / AI&DS): ₹1,25,000 - ₹1,30,000 / year (Interim Approved by FRA).
• B.Tech (ENTC / Mech / Civil): ₹1,10,000 - ₹1,15,000 / year.
• MBA (Dual Specialization): ₹1,40,000 / year.
• Hostel & Mess Fees: ₹75,000 / year (Wi-Fi, solar hot water, 24x7 security, hygienic dining).
• Scholarships: 100% tuition waiver for SC/ST via MahaDBT, 50% waiver for OBC/EWS, and SCSCO Merit Scholarships for top 5% CET scorers.
• Payment can be made online via UPI, Net Banking, or Demand Draft through the student portal.`,
  },
  {
    keywords: ['placement', 'salary', 'package', 'companies', 'recruiters', 'highest package', 'average'],
    answer: `Placement Highlights for SCSCO:
    
• Highest Package Offered: ₹42.0 LPA (Atlassian) and ₹34.0 LPA (Microsoft).
• Average Package: ₹8.6 LPA across all engineering streams.
• Overall Placement Rate: 94.2% eligible students placed.
• Major Recruiters: NVIDIA, Microsoft, Tata Motors, Barclays, Infosys, Cognizant, Dassault Systèmes, L&T, and Persistent Systems.
• The campus features a dedicated Training & Placement Cell with 200+ hours of pre-placement training in Data Structures, System Design, and Soft Skills.`,
  },
  {
    keywords: ['courses', 'branches', 'departments', 'engineering', 'programs', 'degrees'],
    answer: `Programs Offered at SCSCO:
    
1. B.Tech in Computer Engineering (Intake: 180 seats)
2. B.Tech in Artificial Intelligence & Data Science (Intake: 120 seats)
3. B.Tech in Electronics & Telecommunication (Intake: 120 seats)
4. B.Tech in Mechanical Engineering (Intake: 120 seats)
5. B.Tech in Civil Engineering (Intake: 60 seats)
6. Master of Business Administration - MBA (Intake: 120 seats)
All programs are AICTE approved and affiliated with Savitribai Phule Pune University (SPPU).`,
  },
  {
    keywords: ['exam', 'examination', 'hall ticket', 'results', 'sgpa', 'cgpa', 'backlog'],
    answer: `Examination Guidelines:
    
• Semester examinations follow SPPU credit and grading pattern (In-Sem 30 marks + End-Sem 70 marks).
• Hall tickets are generated dynamically in the Student Portal once term-work is certified and dues are cleared.
• Minimum 75% attendance in theory and practical is mandatory to appear for university examinations.
• Results are published in the Student and Parent portals with full SGPA and subject-wise grade point breakdowns.`,
  },
  {
    keywords: ['hostel', 'facility', 'campus', 'library', 'sports', 'wifi', 'canteen'],
    answer: `Campus Infrastructure & Facilities:
    
• 35-acre Wi-Fi enabled green campus with High-Performance Computing labs.
• Central Knowledge Resource Center: 65,000+ print volumes, IEEE digital access, and 24x7 reading room.
• Hostels: Dedicated On-Campus Boys (450 capacity) & Girls (350 capacity) hostels with gymnasium, medical clinic, and laundry.
• Sports: Floodlit cricket ground, football turf, basketball court, badminton hall, and indoor games room.
• Hygienic cafeteria and Food Court serving fresh vegetarian breakfast and meals.`,
  },
  {
    keywords: ['contact', 'address', 'phone', 'email', 'location', 'principal'],
    answer: `SCSCO Contact Information:
    
• Campus Address: Shivaji Knowledge City, Pune-Solapur Highway, Hadapsar, Pune, Maharashtra - 411028
• Phone: +91 (020) 2699-4400 / 4401 | Toll-Free: 1800-233-7272
• Email: info@scsco.edu.in | Admissions: admissions@scsco.edu.in
• Principal: Dr. Arvind Deshmukh (Ph.D, IIT Bombay)`,
  },
];

export async function askCampusAssistant(query: string): Promise<string> {
  const normalized = query.toLowerCase();

  // Try knowledge base matching first for instant responsive answers
  for (const item of KNOWLEDGE_BASE) {
    if (item.keywords.some((k) => normalized.includes(k))) {
      return item.answer;
    }
  }

  // Check if GEMINI_API_KEY is available in environment
  const apiKey = typeof process !== 'undefined' ? process.env?.GEMINI_API_KEY : undefined;

  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
    try {
      const ai = new GoogleGenAI();
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are the official Campus Information AI Assistant for ${COLLEGE_INFO.name}.
        Answer the following student or prospective applicant query professionally, concisely, and factually:
        User Question: "${query}"`,
      });

      if (response.text) {
        return response.text;
      }
    } catch (err) {
      console.warn('Gemini API call failed, falling back to knowledge base', err);
    }
  }

  // Helpful fallback response
  return `Thank you for reaching out to the SCSCO Campus Desk regarding "${query}". 

Our academic advisors and administrative officers are available Monday through Saturday (9:00 AM - 5:00 PM) to assist you. 
You can browse our official admissions catalog, departments, fee structures, and placement reports directly on this portal, or reach our direct desk at admissions@scsco.edu.in or toll-free at 1800-233-7272.`;
}
