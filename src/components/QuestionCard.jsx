import { useState } from "react";
import {
  ChevronDown, ChevronUp, BookOpen, CheckCircle, XCircle,
  Lightbulb, MessageSquare, Star, Bookmark, BookmarkCheck,
  Clock, Mic, ChevronRight
} from "lucide-react";

const difficultyConfig = {
  Beginner: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500" },
  Intermediate: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", dot: "bg-amber-500" },
  Advanced: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", dot: "bg-red-500" },
};

const categoryConfig = {
  HR: { gradient: "from-blue-600 to-indigo-600", light: "bg-blue-50", text: "text-blue-600" },
  Technical: { gradient: "from-violet-600 to-purple-600", light: "bg-violet-50", text: "text-violet-600" },
  Coding: { gradient: "from-emerald-600 to-teal-600", light: "bg-emerald-50", text: "text-emerald-600" },
};

const TABS = [
  { key: "strategy", label: "Strategy", icon: Lightbulb },
  { key: "structure", label: "Structure", icon: BookOpen },
  { key: "answer", label: "Sample Answer", icon: MessageSquare },
  { key: "evaluation", label: "Do's & Don'ts", icon: CheckCircle },
  { key: "followups", label: "Follow-ups", icon: ChevronRight },
];

const SAVED_KEY = "placementiq_saved_questions";

const QuestionCard = ({ q, index }) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("strategy");
  const [practiceMode, setPracticeMode] = useState(false);
  const [practiceText, setPracticeText] = useState("");
  const [saved, setSaved] = useState(() => {
    const ids = JSON.parse(localStorage.getItem(SAVED_KEY) || "[]");
    return ids.includes(q.id);
  });

  const diff = difficultyConfig[q.difficulty] || difficultyConfig.Beginner;
  const cat = categoryConfig[q.category] || categoryConfig.HR;

  const toggleSave = (e) => {
    e.stopPropagation();
    const ids = JSON.parse(localStorage.getItem(SAVED_KEY) || "[]");
    let updated;
    if (saved) {
      updated = ids.filter((id) => id !== q.id);
    } else {
      updated = [...ids, q.id];
    }
    localStorage.setItem(SAVED_KEY, JSON.stringify(updated));
    setSaved(!saved);
  };

  return (
    <div className={`bg-white rounded-3xl border shadow-sm transition-all duration-300 overflow-hidden ${open ? "shadow-lg border-blue-100" : "border-gray-100 hover:shadow-md hover:border-gray-200"}`}>
      {/* ── Card Header ── */}
      <div
        className="px-6 py-5 cursor-pointer select-none"
        onClick={() => { setOpen(!open); setPracticeMode(false); }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1 min-w-0">
            {/* Number badge */}
            <div className={`flex-shrink-0 w-10 h-10 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-white font-extrabold text-sm shadow-md`}>
              {index + 1}
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-gray-900 leading-snug mb-2">{q.question}</h2>
              <div className="flex items-center gap-2 flex-wrap">
                {/* Difficulty badge */}
                <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border ${diff.bg} ${diff.text} ${diff.border}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${diff.dot}`} />
                  {q.difficulty}
                </span>
                {/* Saved badge */}
                {saved && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200">
                    <Star className="w-3 h-3" />
                    Saved
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={toggleSave}
              className={`p-2 rounded-xl transition-all ${saved ? "text-yellow-500 bg-yellow-50 hover:bg-yellow-100" : "text-gray-400 hover:text-yellow-500 hover:bg-yellow-50"}`}
              title={saved ? "Unsave" : "Save question"}
            >
              {saved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
            </button>
            <div className={`p-2 rounded-xl transition-all ${open ? "bg-blue-50 text-blue-600" : "text-gray-400"}`}>
              {open ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          </div>
        </div>
      </div>

      {/* ── Expanded Content ── */}
      {open && (
        <div className="px-6 pb-6">
          <div className="h-px bg-gray-100 mb-5" />

          {/* Tab Switcher */}
          <div className="flex items-center gap-1 flex-wrap mb-5 bg-gray-50 p-1 rounded-2xl">
            {TABS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === key
                  ? `bg-gradient-to-br ${cat.gradient} text-white shadow-md`
                  : "text-gray-500 hover:text-gray-700 hover:bg-white"
                  }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>

          {/* ── Tab: Strategy ── */}
          {activeTab === "strategy" && (
            <div className="space-y-3">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">🧠 How to Think About This Question</p>
              {q.strategy.map((step, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 bg-blue-50/60 rounded-2xl border border-blue-100">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-extrabold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <p className="text-sm text-gray-700 font-medium leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          )}

          {/* ── Tab: Structure ── */}
          {activeTab === "structure" && (
            <div className="space-y-4">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">📐 Answer Blueprint</p>
              {[
                { label: "Intro", value: q.structure.intro, color: "bg-blue-600" },
                { label: "Body", value: q.structure.body, color: "bg-indigo-600" },
                { label: "Conclusion", value: q.structure.conclusion, color: "bg-violet-600" },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex gap-4 items-start">
                  <div className={`flex-shrink-0 w-20 text-center px-2 py-1.5 ${color} text-white text-xs font-extrabold rounded-xl uppercase tracking-wide`}>
                    {label}
                  </div>
                  <div className="flex-1 p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-sm text-gray-700 font-medium leading-relaxed">{value}</p>
                  </div>
                </div>
              ))}
              <div className="mt-2 p-3 bg-amber-50 rounded-2xl border border-amber-100">
                <p className="text-xs text-amber-700 font-semibold">
                  💡 Aim for 2–3 minutes. Practice with the timer in Practice Mode below.
                </p>
              </div>
            </div>
          )}

          {/* ── Tab: Sample Answer ── */}
          {activeTab === "answer" && (
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">📌 Sample Answer</p>
              <div className="relative p-5 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700">
                <div className="absolute top-3 right-3">
                  <span className="text-xs font-bold text-gray-500 bg-gray-700 px-2 py-1 rounded-lg">Example</span>
                </div>
                <p className="text-gray-200 leading-relaxed text-sm">{q.sampleAnswer}</p>
              </div>
              <p className="mt-3 text-xs text-gray-400 font-medium">
                ⚠️ Don't memorize this — adapt it to YOUR real experiences.
              </p>
            </div>
          )}

          {/* ── Tab: Evaluation ── */}
          {activeTab === "evaluation" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Good points */}
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                <h4 className="flex items-center gap-2 text-sm font-extrabold text-emerald-700 mb-3 uppercase tracking-wide">
                  <CheckCircle className="w-4 h-4" /> Great Answer Does This
                </h4>
                <ul className="space-y-2">
                  {q.goodAnswerPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-emerald-800">
                      <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bad points */}
              <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
                <h4 className="flex items-center gap-2 text-sm font-extrabold text-red-700 mb-3 uppercase tracking-wide">
                  <XCircle className="w-4 h-4" /> Common Mistakes to Avoid
                </h4>
                <ul className="space-y-2">
                  {q.badAnswerPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-red-800">
                      <span className="text-red-500 font-bold mt-0.5">✗</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* ── Tab: Follow-ups ── */}
          {activeTab === "followups" && (
            <div className="space-y-3">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">🔁 Likely Follow-up Questions</p>
              {q.followUps.map((fu, i) => (
                <div key={i} className="flex items-center gap-3 p-3.5 bg-violet-50 rounded-2xl border border-violet-100 group hover:bg-violet-100 transition-colors">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-200 text-violet-700 text-xs font-extrabold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <p className="text-sm text-gray-700 font-medium">{fu}</p>
                </div>
              ))}
              <div className="mt-3 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-xs text-gray-500 font-medium">
                  💡 Prepare for at least 2 of these before your interview.
                </p>
              </div>
            </div>
          )}

          {/* ── Practice Mode ── */}
          <div className="mt-5 pt-5 border-t border-gray-100">
            {!practiceMode ? (
              <button
                onClick={() => setPracticeMode(true)}
                className={`flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r ${cat.gradient} text-white text-sm font-bold rounded-xl shadow-md hover:opacity-90 transition-all active:scale-95`}
              >
                <Mic className="w-4 h-4" />
                Practice Your Answer
              </button>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <Mic className="w-4 h-4 text-blue-500" />
                  <p className="text-sm font-bold text-gray-700">Write your answer below — then review it against the sample:</p>
                </div>
                <textarea
                  className="w-full p-4 rounded-2xl border border-gray-200 bg-gray-50 text-sm text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
                  rows={5}
                  placeholder="Type your answer here... Keep it under 2 minutes when spoken aloud."
                  value={practiceText}
                  onChange={(e) => setPracticeText(e.target.value)}
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>~{Math.round(practiceText.split(" ").filter(Boolean).length / 130 * 60)} seconds speaking time</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => { setPracticeMode(false); setPracticeText(""); }}
                      className="px-3 py-1.5 text-sm font-semibold text-gray-500 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setActiveTab("answer")}
                      className="px-3 py-1.5 text-sm font-semibold text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                    >
                      Compare with Sample →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
