import React, { useState, useEffect, useCallback } from 'react';
import {
  ChevronDown, ChevronUp, ExternalLink, BookOpen, Code,
  Lightbulb, Clock, Target, CheckCircle2, Circle,
  Trophy, RotateCcw, TrendingUp, Filter
} from 'lucide-react';
import { DSA_TOPICS } from '../data/dsaData';

const STORAGE_KEY = 'placementiq_dsa_solved';

function DSA() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [dsaTopics, setDsaTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [solvedSet, setSolvedSet] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Persist solvedSet to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...solvedSet]));
  }, [solvedSet]);

  useEffect(() => {
    // Load static data immediately; optionally enhance with API data
    setDsaTopics(DSA_TOPICS);
    setLoading(false);
  }, []);

  // Unique key for each problem
  const problemKey = (topicName, pIdx) => `${topicName}::${pIdx}`;

  const toggleSolved = useCallback((topicName, pIdx, e) => {
    e.stopPropagation();
    const key = problemKey(topicName, pIdx);
    setSolvedSet(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  const handleTopicClick = (topic) => {
    setSelectedTopic(selectedTopic === topic ? null : topic);
  };

  const handleReset = () => {
    setSolvedSet(new Set());
    setShowResetConfirm(false);
  };

  // Computed stats
  const totalProblems = dsaTopics.reduce((acc, t) => acc + t.problems.length, 0);
  const totalSolved = solvedSet.size;
  const overallPct = totalProblems > 0 ? Math.round((totalSolved / totalProblems) * 100) : 0;

  const getTopicSolved = (topic) =>
    topic.problems.filter((_, i) => solvedSet.has(problemKey(topic.name, i))).length;

  const difficultyConfig = {
    easy: { label: 'Easy', rowBg: 'bg-green-50/60 border-green-100', badge: 'bg-green-50 border-green-100 text-green-600', header: 'bg-green-50 border-green-200 text-green-700', dot: 'bg-green-500' },
    medium: { label: 'Medium', rowBg: 'bg-amber-50/60 border-amber-100', badge: 'bg-amber-50 border-amber-100 text-amber-600', header: 'bg-amber-50 border-amber-200 text-amber-700', dot: 'bg-amber-500' },
    hard: { label: 'Hard', rowBg: 'bg-red-50/60   border-red-100', badge: 'bg-red-50   border-red-100   text-red-600', header: 'bg-red-50   border-red-200   text-red-700', dot: 'bg-red-500' },
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
      {/* Header */}
      <header className="py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">DSA Practice Sheet</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Master Data Structures and Algorithms with our curated problem sets and step-by-step guidance.
        </p>
      </header>

      {/* ── Overall Progress Stats ── */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 mb-10 text-white shadow-2xl shadow-blue-500/25 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-40 h-40 bg-indigo-400/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-5 h-5 text-blue-200" />
                <span className="text-blue-200 text-sm font-semibold uppercase tracking-widest">Overall Progress</span>
              </div>
              <p className="text-4xl font-extrabold">
                {totalSolved}
                <span className="text-blue-300 text-2xl font-bold"> / {totalProblems}</span>
                <span className="ml-3 text-2xl font-bold text-blue-200">({overallPct}%)</span>
              </p>
              <p className="text-blue-200 mt-1 text-sm">problems solved</p>
            </div>

            <div className="flex items-center gap-6">
              {/* Stat pills */}
              {[
                { label: 'Easy', color: 'bg-green-400/20 text-green-200', diff: 'easy' },
                { label: 'Medium', color: 'bg-amber-400/20 text-amber-200', diff: 'medium' },
                { label: 'Hard', color: 'bg-red-400/20 text-red-200', diff: 'hard' },
              ].map(({ label, color, diff }) => {
                const count = dsaTopics.reduce((acc, t) =>
                  acc + t.problems.filter((p, i) =>
                    p.difficulty.toLowerCase() === diff && solvedSet.has(problemKey(t.name, i))
                  ).length, 0);
                const total = dsaTopics.reduce((acc, t) =>
                  acc + t.problems.filter(p => p.difficulty.toLowerCase() === diff).length, 0);
                return (
                  <div key={diff} className={`${color} rounded-2xl px-4 py-3 text-center min-w-[72px]`}>
                    <p className="text-lg font-extrabold">{count}/{total}</p>
                    <p className="text-xs font-bold uppercase tracking-wider mt-0.5">{label}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-white/20 rounded-full h-3">
            <div
              className="bg-white rounded-full h-3 transition-all duration-700"
              style={{ width: `${overallPct}%` }}
            />
          </div>

          {overallPct === 100 && (
            <div className="mt-4 flex items-center gap-2 text-yellow-300 font-bold">
              <Trophy className="w-5 h-5" />
              🎉 You've solved all problems! Incredible!
            </div>
          )}
        </div>
      </div>

      {/* ── Controls Row ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        {/* Difficulty filter buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-semibold text-gray-500 mr-1">Filter:</span>
          {[
            { key: 'all', label: 'All', active: 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/25' },
            { key: 'easy', label: 'Easy', active: 'bg-green-500 text-white border-green-500' },
            { key: 'medium', label: 'Medium', active: 'bg-amber-500 text-white border-amber-500' },
            { key: 'hard', label: 'Hard', active: 'bg-red-500   text-white border-red-500' },
          ].map(({ key, label, active }) => (
            <button
              key={key}
              onClick={() => setDifficultyFilter(key)}
              className={`px-4 py-1.5 rounded-full text-sm font-bold capitalize transition-all border ${difficultyFilter === key ? active : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Reset button */}
        {showResetConfirm ? (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-2xl px-4 py-2">
            <span className="text-sm font-semibold text-red-600">Reset all progress?</span>
            <button onClick={handleReset} className="text-xs font-bold bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors">Yes, reset</button>
            <button onClick={() => setShowResetConfirm(false)} className="text-xs font-bold text-gray-500 px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors">Cancel</button>
          </div>
        ) : (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-red-500 transition-colors px-3 py-2 rounded-xl hover:bg-red-50"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Progress
          </button>
        )}
      </div>

      {/* ── Topics List ── */}
      <div className="grid grid-cols-1 gap-5">
        {dsaTopics.map((topic, index) => {
          const topicSolved = getTopicSolved(topic);
          const topicTotal = topic.problems.length;
          const topicPct = topicTotal > 0 ? Math.round((topicSolved / topicTotal) * 100) : 0;
          const isComplete = topicSolved === topicTotal && topicTotal > 0;

          // Group problems by difficulty, filtered by active button
          const groups = ['easy', 'medium', 'hard']
            .filter(d => difficultyFilter === 'all' || difficultyFilter === d)
            .map(diff => ({
              diff,
              ...difficultyConfig[diff],
              items: topic.problems
                .map((p, i) => ({ ...p, origIdx: i }))
                .filter(p => p.difficulty.toLowerCase() === diff),
            })).filter(g => g.items.length > 0);

          return (
            <div
              key={index}
              className={`bg-white rounded-3xl border shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md ${isComplete ? 'border-green-200 bg-green-50/30' : 'border-gray-100'
                }`}
            >
              {/* ── Topic Header ── */}
              <button
                onClick={() => handleTopicClick(topic)}
                className="w-full px-8 py-6 flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className={`p-3 rounded-2xl flex-shrink-0 transition-transform group-hover:scale-110 ${isComplete ? 'bg-green-100 text-green-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                    {isComplete ? <Trophy className="w-6 h-6" /> : <BookOpen className="w-6 h-6" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-xl font-bold text-gray-900">{topic.name}</h3>
                      {isComplete && (
                        <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                          ✓ Complete
                        </span>
                      )}
                    </div>
                    {/* Difficulty pills + mini progress */}
                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                      {['easy', 'medium', 'hard'].map(diff => {
                        const cfg = difficultyConfig[diff];
                        const total = topic.problems.filter(p => p.difficulty.toLowerCase() === diff).length;
                        if (!total) return null;
                        return (
                          <span key={diff} className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${cfg.badge}`}>
                            {total} {cfg.label}
                          </span>
                        );
                      })}
                      <div className="w-24 bg-gray-100 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full transition-all duration-500 ${isComplete ? 'bg-green-500' : 'bg-blue-500'
                            }`}
                          style={{ width: `${topicPct}%` }}
                        />
                      </div>
                      <span className={`text-xs font-bold ${isComplete ? 'text-green-600' : 'text-gray-400'}`}>
                        {topicSolved}/{topicTotal}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-shrink-0">
                  <span className="hidden sm:block text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full italic">
                    {selectedTopic === topic ? 'Minimize' : 'Explore Problems'}
                  </span>
                  {selectedTopic === topic
                    ? <ChevronUp className="w-5 h-5 text-gray-400" />
                    : <ChevronDown className="w-5 h-5 text-gray-400" />
                  }
                </div>
              </button>

              {/* ── Expanded Problems (grouped by difficulty) ── */}
              {selectedTopic === topic && (
                <div className="px-8 pb-8 animate-in slide-in-from-top-4 duration-300">
                  <div className="h-px bg-gray-100 mb-6" />

                  <div className="space-y-8">
                    {groups.map(({ diff, label, dot, header, rowBg, badge, items }) => {
                      const groupSolved = items.filter(p => solvedSet.has(problemKey(topic.name, p.origIdx))).length;
                      return (
                        <div key={diff}>
                          {/* Difficulty section header */}
                          <div className={`flex items-center justify-between px-4 py-2.5 rounded-2xl border mb-3 ${header}`}>
                            <div className="flex items-center gap-2">
                              <span className={`w-2.5 h-2.5 rounded-full ${dot}`} />
                              <span className="font-extrabold text-sm uppercase tracking-widest">{label}</span>
                              <span className="text-xs font-semibold opacity-70">· {items.length} problem{items.length !== 1 ? 's' : ''}</span>
                            </div>
                            <span className="text-xs font-bold opacity-80">{groupSolved}/{items.length} solved</span>
                          </div>

                          {/* Problems in this difficulty */}
                          <div className="space-y-2.5 pl-1">
                            {items.map((problem) => {
                              const key = problemKey(topic.name, problem.origIdx);
                              const isSolved = solvedSet.has(key);
                              return (
                                <div
                                  key={problem.origIdx}
                                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl transition-all border group ${isSolved ? rowBg : 'bg-gray-50/50 border-transparent hover:bg-gray-50 hover:border-gray-100'
                                    }`}
                                >
                                  <div className="flex items-center gap-3 mb-2 sm:mb-0 flex-1 min-w-0">
                                    {/* Solved toggle */}
                                    <button
                                      onClick={(e) => toggleSolved(topic.name, problem.origIdx, e)}
                                      className="flex-shrink-0 transition-transform hover:scale-110 active:scale-95"
                                      title={isSolved ? 'Mark as unsolved' : 'Mark as solved'}
                                    >
                                      {isSolved
                                        ? <CheckCircle2 className="w-6 h-6 text-green-500" />
                                        : <Circle className="w-6 h-6 text-gray-300 hover:text-blue-400 transition-colors" />
                                      }
                                    </button>

                                    {/* Original index badge */}
                                    <span className="w-7 h-7 flex-shrink-0 flex items-center justify-center bg-white rounded-lg text-xs font-bold text-gray-400 border border-gray-100">
                                      {problem.origIdx + 1}
                                    </span>

                                    {/* Problem link */}
                                    <a
                                      href={problem.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className={`font-bold flex items-center gap-2 truncate transition-colors ${isSolved ? 'text-green-700 line-through decoration-green-400/50' : 'text-gray-800 hover:text-blue-600'
                                        }`}
                                    >
                                      {problem.title}
                                      <ExternalLink className="w-3.5 h-3.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                  </div>

                                  <div className="flex items-center gap-3 pl-[82px] sm:pl-0">
                                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-white border border-gray-100 rounded text-gray-500">
                                      {problem.platform}
                                    </span>
                                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded border ${badge}`}>
                                      {problem.difficulty}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Topic footer */}
                  <div className={`mt-6 flex items-center justify-between pt-4 border-t ${isComplete ? 'border-green-100' : 'border-gray-100'
                    }`}>
                    <span className="text-sm text-gray-400 font-medium">
                      {topicSolved} of {topicTotal} solved
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-40 bg-gray-100 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${isComplete ? 'bg-green-500' : 'bg-blue-500'
                            }`}
                          style={{ width: `${topicPct}%` }}
                        />
                      </div>
                      <span className={`text-sm font-bold ${isComplete ? 'text-green-600' : 'text-blue-600'}`}>
                        {topicPct}%
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Study Tips Section ── */}
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
