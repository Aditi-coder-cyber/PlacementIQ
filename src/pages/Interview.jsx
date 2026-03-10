import React, { useState } from 'react';
import {
  Users,
  MessageSquare,
  Code2,
  Lightbulb,
  Calendar,
  CheckCircle2,
  Activity,
  ChevronRight,
  UserCheck,
  ShieldAlert
} from 'lucide-react';

function Interview() {
  const [activeCategory, setActiveCategory] = useState('hr');

  const interviewQuestions = {
    hr: {
      title: 'HR Round',
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      description: 'Behavioral and personality questions to test cultural fit',
      questions: [
        { question: 'Tell me about yourself', tip: 'Focus on your education, skills, and career goals. 2-3 minutes max.' },
        { question: 'Why do you want to work here?', tip: 'Mention specific reasons about their culture, products, or values.' },
        { question: 'What are your strengths and weaknesses?', tip: 'For strengths, mention relevant skills. For weaknesses, show improvement.' },
        { question: 'Where do you see yourself in 5 years?', tip: 'Show ambition but be realistic. Mention growth within the company.' },
        { question: 'Why should we hire you?', tip: 'Highlight your unique combination of skills and enthusiasm.' }
      ]
    },
    technical: {
      title: 'Technical Round',
      icon: MessageSquare,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
      description: 'Testing your programming logic and CS core subject depth',
      questions: [
        { question: 'Explain your favorite programming language', tip: 'Discuss specific features, use cases, and your experience.' },
        { question: 'How do you approach debugging a program?', tip: 'Mention systematic approaches like logging and breakpoints.' },
        { question: 'SQL vs NoSQL databases?', tip: 'Explain structure, scalability, consistency, and use cases.' },
        { question: 'Explain object-oriented programming concepts', tip: 'Cover encapsulation, inheritance, polymorphism, and abstraction.' },
        { question: 'Describe a complex project you worked on', tip: 'Use STAR method, focus on technical challenges and contributions.' }
      ]
    },
    coding: {
      title: 'Coding Prep',
      icon: Code2,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      description: 'Strategies for acing live coding and technical assessments',
      questions: [
        { question: 'Clarify the problem first', tip: 'Ask questions about input format, constraints, and edge cases.' },
        { question: 'Think out loud during solving', tip: 'Explain your thought process and reasoning to the interviewer.' },
        { question: 'Start with a brute force solution', tip: 'Get a working solution first, then optimize.' },
        { question: 'Consider complexity (Time & Space)', tip: 'Analyze and discuss the Big O complexity of your solution.' },
        { question: 'Test your code with examples', tip: 'Walk through your code with given examples and boundary conditions.' }
      ]
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <header className="py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Interview Questions</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">Master the art of being interviewed with our comprehensive categorization and tips.</p>
      </header>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-16">
        {Object.keys(interviewQuestions).map((cat) => {
          const Category = interviewQuestions[cat];
          const Icon = Category.icon;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-3 px-8 py-4 rounded-3xl font-bold transition-all ${activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/25 scale-105'
                  : 'bg-white text-gray-600 border border-gray-100 hover:border-gray-300'
                }`}
            >
              <Icon className="w-5 h-5" />
              {Category.title}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Discussion */}
        <div className="lg:col-span-2 space-y-6">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{interviewQuestions[activeCategory].title}</h2>
            <p className="text-gray-500 text-lg">{interviewQuestions[activeCategory].description}</p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {interviewQuestions[activeCategory].questions.map((item, idx) => (
              <div key={idx} className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-start gap-5 mb-4">
                  <div className={`mt-1 flex-shrink-0 w-10 h-10 rounded-2xl ${interviewQuestions[activeCategory].bg} ${interviewQuestions[activeCategory].color} flex items-center justify-center font-bold`}>
                    {idx + 1}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 leading-tight pt-1">{item.question}</h3>
                </div>
                <div className="flex gap-4 p-5 bg-gray-50 rounded-2xl border-l-4 border-blue-500">
                  <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  <p className="text-gray-600 font-medium italic text-base">
                    <span className="text-blue-600 font-bold uppercase text-xs mr-2">Tip:</span>
                    {item.tip}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strategies Sidebar */}
        <div className="space-y-8">
          <div className="bg-gray-900 rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 relative z-10">
              <Activity className="w-6 h-6 text-blue-400" />
              Prep Strategy
            </h3>
            <div className="space-y-8 relative z-10">
              {[
                { time: '1 Week Before', items: ['Company Research', 'Resume Review', 'Behavioral Prep'] },
                { time: '1 Day Before', items: ['Tech setup check', 'Outfit ready', 'Sleep early'] },
                { time: 'Interview Day', items: ['Login 10m early', 'Show confidence', 'Have questions ready'] },
              ].map((phase, i) => (
                <div key={i} className="border-l border-white/20 pl-6 relative">
                  <div className="absolute -left-1.5 top-0 w-3 h-3 bg-blue-500 rounded-full border-2 border-gray-900"></div>
                  <h4 className="font-bold text-blue-400 text-sm uppercase tracking-widest mb-3">{phase.time}</h4>
                  <ul className="space-y-2">
                    {phase.items.map((item, j) => (
                      <li key={j} className="text-gray-400 flex items-center gap-2 text-sm">
                        <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {/* Decorative */}
            <div className="absolute bottom-0 right-0 -mb-16 -mr-16 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl"></div>
          </div>

          <div className="bg-white rounded-[40px] border border-gray-100 p-8 shadow-sm">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-500" />
              Power Tactics
            </h3>
            <div className="space-y-4">
              {[
                { title: 'Mock Interviews', text: 'Practice with peers to kill anxiety', icon: UserCheck },
                { title: 'Know Your Why', text: 'Have 3 reasons why this company', icon: Target },
                { title: 'Digital Presence', text: 'Check LinkedIn & GitHub parity', icon: Calendar },
              ].map((t, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0 w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                    <t.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900 text-sm">{t.title}</h5>
                    <p className="text-xs text-gray-500">{t.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Fallback for Target which was simplified in previous step
const Target = ({ className }) => <CheckCircle2 className={className} />;

export default Interview;