import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, BookOpen, Code, Lightbulb, Clock, Target } from 'lucide-react';

function DSA() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [dsaTopics, setDsaTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5001/dsa')
      .then(res => res.json())
      .then(data => {
        const topicsArray = Object.keys(data).map(key => ({
          name: key,
          problems: data[key]
        }));
        setDsaTopics(topicsArray);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching DSA data:', err);
        setLoading(false);
      });
  }, []);

  const handleTopicClick = (topic) => {
    setSelectedTopic(selectedTopic === topic ? null : topic);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700">Loading DSA Content...</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <header className="py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">DSA Practice Sheet</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">Master Data Structures and Algorithms with our curated problem sets and step-by-step guidance.</p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {dsaTopics.map((topic, index) => (
          <div key={index} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
            <button
              onClick={() => handleTopicClick(topic)}
              className="w-full px-8 py-6 flex items-center justify-between text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-2xl text-blue-600 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{topic.name}</h3>
                  <p className="text-gray-500 text-sm">{topic.problems.length} essential problems</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="hidden sm:block text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full italic">
                  {selectedTopic === topic ? 'Minimize' : 'Explore Problems'}
                </span>
                {selectedTopic === topic ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
              </div>
            </button>

            {selectedTopic === topic && (
              <div className="px-8 pb-8 animate-in slide-in-from-top-4 duration-300">
                <div className="h-px bg-gray-100 mb-6" />
                <div className="space-y-3">
                  {topic.problems.map((problem, pIdx) => (
                    <div key={pIdx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50/50 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 group">
                      <div className="flex items-center gap-4 mb-2 sm:mb-0">
                        <span className="w-8 h-8 flex items-center justify-center bg-white rounded-lg text-xs font-bold text-gray-400 border border-gray-100">
                          {pIdx + 1}
                        </span>
                        <a
                          href={problem.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-gray-800 hover:text-blue-600 flex items-center gap-2"
                        >
                          {problem.title}
                          <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-white border border-gray-100 rounded text-gray-500">
                          {problem.platform}
                        </span>
                        <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded border ${problem.difficulty.toLowerCase() === 'easy' ? 'bg-green-50 border-green-100 text-green-600' :
                            problem.difficulty.toLowerCase() === 'medium' ? 'bg-amber-50 border-amber-100 text-amber-600' :
                              'bg-red-50 border-red-100 text-red-600'
                          }`}>
                          {problem.difficulty}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Study Tips Section */}
      <section className="mt-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Study Tips for Success</h2>
          <p className="text-gray-500 mt-2">Maximum efficiency for your prep journey</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Start with Basics', icon: Target, text: 'Begin with Arrays and Strings before moving to complex data structures.' },
            { title: 'Practice Daily', icon: Clock, text: 'Solve at least 2-3 problems daily to build long-term consistency.' },
            { title: 'Review Solutions', icon: Lightbulb, text: 'Always review multiple approaches and optimize your time/space complexity.' },
            { title: 'Time Yourself', icon: Code, text: 'Practice solving problems within interview time constraints (30-45 mins).' },
          ].map((tip, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-4">
                <tip.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{tip.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{tip.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default DSA;