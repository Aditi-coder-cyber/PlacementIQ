import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Github, Twitter, Linkedin, Mail } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-50 pt-20 pb-10 border-t border-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo & Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6 group">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Placement Helper
              </span>
            </Link>
            <p className="text-gray-500 mb-6 leading-relaxed">
              Your comprehensive guide to mastering DSA, fundamentals, and acing technical interviews.
            </p>
            <div className="flex space-x-4">
              <Link to="#" className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-all">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link to="#" className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-all">
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link to="#" className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-all">
                <Github className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Practice Links */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Start Practice</h4>
            <ul className="space-y-4">
              <li><Link to="/dsa" className="text-gray-500 hover:text-blue-600 transition-colors">DSA Roadmap</Link></li>
              <li><Link to="/subjects" className="text-gray-500 hover:text-blue-600 transition-colors">OS & DBMS</Link></li>
              <li><Link to="/subjects" className="text-gray-500 hover:text-blue-600 transition-colors">System Design</Link></li>
              <li><Link to="/interview" className="text-gray-500 hover:text-blue-600 transition-colors">Practice Questions</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Resources</h4>
            <ul className="space-y-4">
              <li><Link to="/resume" className="text-gray-500 hover:text-blue-600 transition-colors">Resume Guide</Link></li>
              <li><Link to="#" className="text-gray-500 hover:text-blue-600 transition-colors">Mock Interviews</Link></li>
              <li><Link to="#" className="text-gray-500 hover:text-blue-600 transition-colors">Behavioral Tips</Link></li>
              <li><Link to="#" className="text-gray-500 hover:text-blue-600 transition-colors">Preparation Roadmap</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Stay Updated</h4>
            <p className="text-gray-500 mb-4 text-sm">Join our newsletter for the latest job updates and tips.</p>
            <div className="relative">
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
              />
              <button className="absolute right-2 top-2 p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm italic">
            &copy; 2026 Placement Helper. Built for students, by developers.
          </p>
          <div className="flex space-x-8 text-sm text-gray-400">
            <Link to="#" className="hover:text-gray-900 transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-gray-900 transition-colors">Terms of Service</Link>
            <Link to="#" className="hover:text-gray-900 transition-colors">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;