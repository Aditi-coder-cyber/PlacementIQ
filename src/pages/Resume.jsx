import React, { useState } from 'react';
import {
  FileText,
  Layout,
  Code,
  Award,
  GraduationCap,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ClipboardList,
  Target,
  Zap,
  BarChart3,
  Search
} from 'lucide-react';

function Resume() {
  const [activeSection, setActiveSection] = useState('structure');

  const resumeSections = [
    {
      id: 'structure',
      title: 'Structure',
      icon: Layout,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      content: {
        tips: [
          'Keep it to 1-2 pages maximum',
          'Use a clean, professional font (Arial, Calibri)',
          'Maintain consistent formatting throughout',
          'Use bullet points for easy readability',
          'Include contact information at the top'
        ],
        order: [
          'Contact Information',
          'Professional Summary/Objective',
          'Education',
          'Technical Skills',
          'Projects',
          'Work Experience/Internships',
          'Achievements/Certifications',
          'Extra-curricular Activities'
        ]
      }
    },
    {
      id: 'projects',
      title: 'Projects',
      icon: Code,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      content: {
        tips: [
          'Include 3-4 relevant technical projects',
          'Use action verbs (Built, Developed, Implemented)',
          'Mention technologies used clearly',
          'Quantify results where possible (e.g., "improved speed by 20%")',
          'Include GitHub links for proof'
        ],
        examples: [
          'E-commerce Website - Built using React.js and Node.js with MongoDB database, implementing user auth and payment gateway.',
          'Task Management App - Developed a full-stack application using MERN stack, featuring real-time updates and responsive design.',
          'Data Analysis Project - Analyzed customer behavior using Python and pandas, resulting in 15% improvement in accuracy.'
        ]
      }
    },
    {
      id: 'skills',
      title: 'Skills',
      icon: ClipboardList,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
      content: {
        categories: [
          { name: 'Languages', skills: ['Java', 'Python', 'C++', 'JavaScript', 'SQL'] },
          { name: 'Web', skills: ['React.js', 'Node.js', 'Express.js', 'MongoDB'] },
          { name: 'Tools', skills: ['Git', 'Docker', 'AWS', 'Linux', 'Postman'] },
          { name: 'Soft Skills', skills: ['Problem Solving', 'Teamwork', 'Communication'] }
        ],
        tips: [
          'Only include skills you can actually demonstrate',
          'Organize skills into logical categories',
          'List most relevant skills first for the target role'
        ]
      }
    },
    {
      id: 'achievements',
      title: 'Achievements',
      icon: Award,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      content: {
        types: [
          'Academic achievements (CGPA, ranks)',
          'Technical certifications (AWS, Google, etc.)',
          'Coding competition ranks (LeetCode, CodeChef)',
          'Published research or technical blogs',
          'Leadership positions (Club head, Captain)'
        ],
        tips: [
          'Use specific numbers and metrics (Rank #100/50,000)',
          'Include relevant technical certifications',
          'Highlight impact and leadership qualities'
        ]
      }
    },
    {
      id: 'education',
      title: 'Education',
      icon: GraduationCap,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      content: {
        format: [
          'Degree Name | University | Location | Year',
          'CGPA: X.X/10 (highly recommended if > 8.0)',
          'Relevant Coursework (if applicable)',
          'Academic projects or thesis summaries'
        ]
      }
    }
  ];

  const currentSection = resumeSections.find(s => s.id === activeSection);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <header className="py-12 text-center">
        <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
          <Sparkles className="w-4 h-4" />
          <span>ATS-Friendly Guidelines</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Resume Guide</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">Create a winning resume that bypasses ATS filters and grabs recruiter attention.</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Navigation Sidebar */}
        <div className="lg:w-1/3 flex flex-col gap-3">
          {resumeSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-4 p-5 rounded-3xl border transition-all duration-300 text-left ${activeSection === section.id
                  ? 'bg-white border-blue-600 shadow-xl shadow-blue-500/10'
                  : 'bg-white border-gray-100 hover:border-gray-300'
                }`}
            >
              <div className={`p-3 rounded-2xl ${section.bg} ${section.color}`}>
                <section.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className={`font-bold ${activeSection === section.id ? 'text-gray-900' : 'text-gray-600'}`}>
                  {section.title}
                </h3>
                <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">Guide & Tips</p>
              </div>
              {activeSection === section.id && <ArrowRight className="w-5 h-5 text-blue-600" />}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-[40px] border border-gray-100 shadow-2xl shadow-gray-200/50 p-8 md:p-12 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex items-center gap-4 mb-8">
              <div className={`p-4 rounded-3xl ${currentSection.bg} ${currentSection.color}`}>
                <currentSection.icon className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900">{currentSection.title} Overview</h2>
            </div>

            <div className="space-y-10">
              {currentSection.content.tips && (
                <div>
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" /> Professional Tips
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentSection.content.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl text-gray-700 font-medium">
                        <span className="mt-1 text-blue-600 font-bold">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {currentSection.content.order && (
                <div>
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Recommended Hierarchy</h4>
                  <div className="flex flex-wrap gap-3">
                    {currentSection.content.order.map((item, i) => (
                      <div key={i} className="px-5 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm font-bold text-gray-900 flex items-center gap-3">
                        <span className="text-xs text-blue-600">{i + 1}</span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentSection.content.categories && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentSection.content.categories.map((cat, i) => (
                    <div key={i} className="p-6 border border-gray-100 rounded-3xl">
                      <h5 className="font-bold text-gray-900 mb-4 text-lg">{cat.name}</h5>
                      <div className="flex flex-wrap gap-2">
                        {cat.skills.map((skill, j) => (
                          <span key={j} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-semibold italic">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {currentSection.content.examples && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">High-Impact Examples</h4>
                  {currentSection.content.examples.map((ex, i) => (
                    <div key={i} className="p-6 bg-gradient-to-r from-emerald-50 to-white border-l-4 border-emerald-500 rounded-r-3xl text-gray-900 font-medium italic">
                      {ex}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <section className="mt-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Success Tactics</h2>
          <p className="text-gray-500 mt-2">Finish your resume with these power moves</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Tailor Each Applied', icon: Target, text: 'Customize your resume for every specific company and job description.' },
            { title: 'Use Action Verbs', icon: Zap, text: 'Start bullet points with strong words like "Generated", "Orchestrated", or "Improved".' },
            { title: 'Quantify Results', icon: BarChart3, text: 'Include hard numbers, percentages, and performance metrics whenever possible.' },
            { title: 'Proofread Carefully', icon: Search, text: 'Check for spelling, grammar, and layout inconsistencies multiple times.' },
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 transition-transform hover:scale-110">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Resume;