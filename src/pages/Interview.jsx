import React, { useState, useMemo } from 'react';
import {
  Users, Code2, MessageSquare, Star, BookmarkCheck,
  Search, Filter, Zap, Target, Activity, Calendar,
  UserCheck, ShieldAlert, CheckCircle2, Sparkles
} from 'lucide-react';
import { interviewData } from '../data/interviewData';
import QuestionCard from '../components/QuestionCard';

const CATEGORIES = [
  {
    key: "All",
    label: "All Questions",
    icon: Sparkles,
    gradient: "from-gray-700 to-gray-900",
    light: "bg-gray-100",
    text: "text-gray-700",
    count: interviewData.length,
  },
  {
    key: "HR",
    label: "HR Round",
    icon: Users,
    gradient: "from-blue-600 to-indigo-600",
    light: "bg-blue-50",
    text: "text-blue-600",
    count: interviewData.filter(q => q.category === "HR").length,
    description: "Behavioral & personality questions to test cultural fit",
  },
  {
    key: "Technical",
    label: "Technical Round",
    icon: MessageSquare,
    gradient: "from-violet-600 to-purple-600",
    light: "bg-violet-50",
    text: "text-violet-600",
    count: interviewData.filter(q => q.category === "Technical").length,
    description: "Programming, system design, and CS fundamentals",
  },
  {
    key: "Coding",
    label: "Coding Prep",
    icon: Code2,
    gradient: "from-emerald-600 to-teal-600",
    light: "bg-emerald-50",
    text: "text-emerald-600",
    count: interviewData.filter(q => q.category === "Coding").length,
    description: "Strategies for acing live coding challenges",
  },
];

const DIFFICULTIES = ["All", "Beginner", "Intermediate", "Advanced"];

const SAVED_KEY = "placementiq_saved_questions";

function Interview() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeDifficulty, setActiveDifficulty] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  const savedIds = useMemo(() => {
    return new Set(JSON.parse(localStorage.getItem(SAVED_KEY) || "[]"));
  }, []);

  const filtered = useMemo(() => {
    return interviewData.filter(q => {
      const catMatch = activeCategory === "All" || q.category === activeCategory;
      const diffMatch = activeDifficulty === "All" || q.difficulty === activeDifficulty;
      const searchMatch = !searchQuery || q.question.toLowerCase().includes(searchQuery.toLowerCase());
      const savedMatch = !showSavedOnly || savedIds.has(q.id);
      return catMatch && diffMatch && searchMatch && savedMatch;
    });
  }, [activeCategory, activeDifficulty, searchQuery, showSavedOnly, savedIds]);

  const activeCat = CATEGORIES.find(c => c.key === activeCategory) || CATEGORIES[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

      {/* ── Header ── */}
      <header className="py-14 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-sm font-bold mb-4">
          <Zap className="w-3.5 h-3.5" />
          {interviewData.length} Questions · Strategy · Sample Answers · Practice Mode
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Interview Prep
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mt-1">
            That Actually Prepares You
          </span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Not just questions — full strategy, answer structure, sample answers, do's & don'ts, and a built-in practice mode.
        </p>
      </header>

      {/* ── Category Tabs ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {CATEGORIES.map(({ key, label, icon: Icon, gradient, count }) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={`relative flex flex-col items-center gap-2 p-4 rounded-3xl font-bold transition-all border ${activeCategory === key
              ? `bg-gradient-to-br ${gradient} text-white shadow-xl border-transparent scale-[1.02]`
              : "bg-white text-gray-600 border-gray-100 hover:border-gray-200 hover:shadow-md"
              }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-sm leading-tight text-center">{label}</span>
            <span className={`text-xs font-extrabold px-2 py-0.5 rounded-full ${activeCategory === key ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}>
              {count}
            </span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ── Left: Questions List ── */}
        <div className="lg:col-span-2 space-y-5">

          {/* Search + Filters */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-4 space-y-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
              />
            </div>

            {/* Difficulty + Saved filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              {DIFFICULTIES.map(d => (
                <button
                  key={d}
                  onClick={() => setActiveDifficulty(d)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all border ${activeDifficulty === d
                    ? d === "All" ? "bg-gray-900 text-white border-gray-900"
                      : d === "Beginner" ? "bg-emerald-500 text-white border-emerald-500"
                        : d === "Intermediate" ? "bg-amber-500 text-white border-amber-500"
                          : "bg-red-500 text-white border-red-500"
                    : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
                    }`}
                >
                  {d}
                </button>
              ))}
              <button
                onClick={() => setShowSavedOnly(!showSavedOnly)}
                className={`ml-auto flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all border ${showSavedOnly ? "bg-yellow-400 text-yellow-900 border-yellow-400" : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"}`}
              >
                {showSavedOnly ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Star className="w-3.5 h-3.5" />}
                Saved
              </button>
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-gray-400 font-medium px-1">
            Showing <span className="font-bold text-gray-700">{filtered.length}</span> question{filtered.length !== 1 ? "s" : ""}
            {activeCategory !== "All" && ` in ${activeCategory}`}
            {activeDifficulty !== "All" && ` · ${activeDifficulty}`}
          </p>

          {/* Question Cards */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <Search className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="font-semibold">No questions found</p>
              <p className="text-sm mt-1">Try adjusting your filters or search</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((q, idx) => (
                <QuestionCard key={q.id} q={q} index={idx} />
              ))}
            </div>
          )}
        </div>

        {/* ── Right Sidebar ── */}
        <div className="space-y-6 lg:sticky lg:top-24 h-fit">

          {/* Active category info */}
          {activeCategory !== "All" && (
            <div className={`bg-gradient-to-br ${activeCat.gradient} rounded-3xl p-6 text-white shadow-xl`}>
              <div className="flex items-center gap-2 mb-2">
                <activeCat.icon className="w-5 h-5 text-white/80" />
                <h3 className="font-extrabold text-lg">{activeCat.label}</h3>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">{activeCat.description}</p>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-2xl font-extrabold">{activeCat.count}</span>
                <span className="text-white/60 text-sm">questions ready</span>
              </div>
            </div>
          )}

          {/* Prep Timeline */}
          <div className="bg-gray-900 rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute bottom-0 right-0 -mb-12 -mr-12 w-36 h-36 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
            <h3 className="text-lg font-extrabold mb-6 flex items-center gap-2 relative z-10">
              <Activity className="w-5 h-5 text-blue-400" />
              Prep Timeline
            </h3>
            <div className="space-y-7 relative z-10">
              {[
                { time: "1 Week Before", items: ["Company Research", "Resume Review", "Behavioral Prep"], color: "bg-blue-500" },
                { time: "1 Day Before", items: ["Tech setup check", "Outfit ready", "Sleep early"], color: "bg-indigo-500" },
                { time: "Interview Day", items: ["Login 10m early", "Show confidence", "Have questions ready"], color: "bg-violet-500" },
              ].map((phase, i) => (
                <div key={i} className="border-l border-white/10 pl-5 relative">
                  <div className={`absolute -left-1.5 top-0 w-3 h-3 ${phase.color} rounded-full border-2 border-gray-900`} />
                  <h4 className="font-bold text-blue-400 text-xs uppercase tracking-widest mb-2">{phase.time}</h4>
                  <ul className="space-y-1.5">
                    {phase.items.map((item, j) => (
                      <li key={j} className="text-gray-400 flex items-center gap-2 text-sm">
                        <div className="w-1 h-1 bg-white/20 rounded-full flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Power Tactics */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-base font-extrabold mb-5 flex items-center gap-2 text-gray-900">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              Power Tactics
            </h3>
            <div className="space-y-3">
              {[
                { title: "Mock Interviews", text: "Practice with peers to kill anxiety", icon: UserCheck, color: "bg-blue-50 text-blue-600" },
                { title: "STAR Method", text: "Situation → Task → Action → Result", icon: Target, color: "bg-violet-50 text-violet-600" },
                { title: "Digital Presence", text: "GitHub + LinkedIn must be updated", icon: Calendar, color: "bg-emerald-50 text-emerald-600" },
                { title: "Ask Questions", text: "Always have 2–3 questions for them", icon: CheckCircle2, color: "bg-amber-50 text-amber-600" },
              ].map((t, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-2xl hover:bg-gray-50 transition-colors group cursor-default">
                  <div className={`flex-shrink-0 w-9 h-9 ${t.color} rounded-xl flex items-center justify-center`}>
                    <t.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900 text-sm">{t.title}</h5>
                    <p className="text-xs text-gray-500 mt-0.5">{t.text}</p>
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

export default Interview;