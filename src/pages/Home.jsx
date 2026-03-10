import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Rocket,
  Code,
  BookOpen,
  Users,
  CheckCircle2,
  ArrowRight,
  Star,
  Award,
  Zap,
  ChevronRight
} from 'lucide-react';

function Home() {
  const navigate = useNavigate();

  const features = [
    {
      title: 'DSA Excellence',
      description: 'Master critical data structures and algorithms with our expertly curated problem sets and step-by-step solutions.',
      items: ['450+ Practice Problems', 'Topic-wise Organization', 'Difficulty Progression'],
      icon: Code,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      title: 'Core Fundamentals',
      description: 'Build a solid foundation in computer science concepts that top companies test in technical interviews.',
      items: ['System Design Basics', 'OS, DBMS, & Networks', 'Concept Deep-dives'],
      icon: BookOpen,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50'
    },
    {
      title: 'Career Toolkit',
      description: 'Transform your profile with industry-standard resume templates and comprehensive interview strategies.',
      items: ['ATS-Friendly Templates', 'Behavioral Preparation', 'Salary Negotiation'],
      icon: Rocket,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    }
  ];

  const companies = [
    'Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Netflix'
  ];

  const testimonials = [
    {
      name: 'Arjun Sharma',
      role: 'SDE at Google',
      content: 'Placement Helper was instrumental in my success. The structured approach and quality problems made all the difference.',
      avatar: 'AS'
    },
    {
      name: 'Priya Patel',
      role: 'SDE II at Microsoft',
      content: 'The resume guide and interview materials helped me secure multiple offers from top tier companies.',
      avatar: 'PP'
    },
    {
      name: 'Rahul Kumar',
      role: 'Developer at Amazon',
      content: 'Best resource for placement preparation. The systematic curriculum and practice problems are top-notch.',
      avatar: 'RK'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-3xl opacity-60 animate-pulse"></div>
          <div className="absolute bottom-[5%] right-[-5%] w-[30%] h-[30%] bg-indigo-100/50 rounded-full blur-3xl opacity-60"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-8 animate-bounce">
            <Award className="w-4 h-4" />
            <span>Trusted by 10,000+ Students</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Land Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Dream Job</span> <br />
            with India's Premier Platform
          </h1>

          <p className="max-w-2xl mx-auto text-xl text-gray-500 mb-10 leading-relaxed">
            Join thousands of successful graduates who secured top-tier positions through our systematic approach to placement preparation.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
            <button
              onClick={() => navigate('/dsa')}
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2 group"
            >
              Start Free Practice
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/subjects')}
              className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 border border-gray-200 font-bold rounded-2xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
            >
              Explore Curriculum
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto pt-8 border-t border-gray-100">
            {[
              { label: 'Success Rate', value: '94%' },
              { label: 'Avg Package', value: '₹12L+' },
              { label: 'Practice Questions', value: '1,000+' },
              { label: 'Partner Companies', value: '150+' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 bg-gray-50/50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-8">
            Our students have been placed at
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {companies.map(company => (
              <span key={company} className="text-2xl font-bold text-gray-600">{company}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">Everything You Need to Succeed</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              A comprehensive platform covering every aspect of your preparation journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-300 group">
                <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-500 mb-6 leading-relaxed">{feature.description}</p>
                <ul className="space-y-3 mb-8">
                  {feature.items.map((item, j) => (
                    <li key={j} className="flex items-center text-gray-700 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link to={i === 0 ? '/dsa' : i === 1 ? '/subjects' : '/resume'} className="inline-flex items-center font-bold text-blue-600 hover:text-blue-700">
                  Learn more <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-16">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star key={star} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed italic">"{t.content}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{t.name}</h4>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gray-900 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8">Ready to Transform Your Career?</h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of successful students and start your journey to landing your dream job today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate('/signup')}
              className="px-10 py-4 bg-white text-gray-900 font-extrabold rounded-2xl hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
            >
              Get Started Free <Zap className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            </button>
            <button
              onClick={() => navigate('/interview')}
              className="px-10 py-4 bg-white/10 text-white font-extrabold rounded-2xl hover:bg-white/20 transition-all border border-white/20 backdrop-blur-sm"
            >
              View Questions
            </button>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl"></div>
      </section>
    </div>
  );
}

export default Home;