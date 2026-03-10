import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Book, HelpCircle, Lightbulb, MessageSquareQuote, CheckCircle } from 'lucide-react';

function Subjects() {
  const [expandedSubject, setExpandedSubject] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5001/subjects')
      .then(res => res.json())
      .then(data => {
        const subjectsArray = Object.keys(data).map(key => ({
          name: key,
          questions: data[key]
        }));
        setSubjects(subjectsArray);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching subjects data:', err);
        setLoading(false);
      });
  }, []);

  const handleSubjectToggle = (subject) => {
    setExpandedSubject(expandedSubject === subject ? null : subject);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700">Loading Core Subjects...</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <header className="py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Core CS Subjects</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">Master the fundamental computer science concepts that separate the top engineers.</p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {subjects.map((subject, index) => (
          <div key={index} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
            <button
              onClick={() => handleSubjectToggle(subject)}
              className="w-full px-8 py-6 flex items-center justify-between text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600 group-hover:scale-110 transition-transform">
                  <Book className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{subject.name}</h3>
                  <p className="text-gray-500 text-sm">{subject.questions.length} critical interview questions</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="hidden sm:block text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full italic">
                  {expandedSubject === subject ? 'Collapse' : 'View Questions'}
                </span>
                {expandedSubject === subject ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
              </div>
            </button>

            {expandedSubject === subject && (
              <div className="px-8 pb-8 animate-in slide-in-from-top-4 duration-300">
                <div className="h-px bg-gray-100 mb-6" />
                <div className="space-y-6">
                  {subject.questions.map((q, qIndex) => (
                    <div key={qIndex} className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex items-start gap-4">
                          <span className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
                            Q{qIndex + 1}
                          </span>
                          <h4 className="text-lg font-bold text-gray-900 leading-tight">{q.question}</h4>
                        </div>
                        <span className="flex-shrink-0 text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-white border border-gray-100 rounded text-gray-500">
                          {q.category}
                        </span>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 pt-1">
                          <MessageSquareQuote className="w-5 h-5 text-indigo-300" />
                        </div>
                        <div>
                          <p className="text-gray-600 leading-relaxed font-medium">
                            <span className="text-indigo-600 font-bold uppercase text-xs mr-2">Answer:</span>
                            {q.short_answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Study Approach */}
      <section className="mt-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">How to Master Core Subjects</h2>
          <p className="text-gray-500 mt-2">Beyond memorization: building deep foundations</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: 'Understand Concepts', icon: Lightbulb, text: "Focus on understanding the 'why' behind each concept rather than just memorizing definitions." },
            { title: 'Make Connections', icon: CheckCircle, text: 'Relate concepts across different subjects (e.g., how OS memory management relates to DSA) to build intuition.' },
            { title: 'Practice Explanations', icon: HelpCircle, text: 'Practice explaining complex concepts in simple terms as if teaching a beginner. If you can\'t explain it simply, you don\'t understand it well enough.' },
            { title: 'Focus on Fundamentals', icon: Book, text: 'Master the low-level basics before moving to advanced implementation details and specific framework behaviors.' },
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex gap-6 group hover:shadow-md transition-all">
              <div className="flex-shrink-0 w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                <item.icon className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-xl mb-2">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Subjects;