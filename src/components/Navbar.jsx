import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Rocket, LogIn, UserPlus, ChevronDown, User, Settings, LogOut, LayoutDashboard } from 'lucide-react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Re-read user from localStorage whenever the route changes
  useEffect(() => {
    const stored = localStorage.getItem('user');
    setUser(stored ? JSON.parse(stored) : null);
    setDropdownOpen(false);
    setIsOpen(false);
  }, [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setDropdownOpen(false);
    window.location.href = '/';
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'DSA Sheet', path: '/dsa' },
    { name: 'Core Subjects', path: '/subjects' },
    { name: 'Resume Guide', path: '/resume' },
    { name: 'Interview Questions', path: '/interview' },
  ];

  const avatarLetter = user?.name ? user.name[0].toUpperCase() : '?';

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-gray-100 ${scrolled ? 'py-3 shadow-md' : 'py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-blue-600 rounded-lg group-hover:rotate-12 transition-transform duration-300">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Placement Helper
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${isActive(link.path) ? 'text-blue-600' : 'text-gray-600'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              /* Profile Dropdown */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors group"
                >
                  {/* Avatar */}
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold shadow-md">
                    {avatarLetter}
                  </div>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                    {user.name}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl shadow-gray-200/60 border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    {/* User Info Header */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
                          {avatarLetter}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      <Link
                        to="/dashboard"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </Link>
                      <Link
                        to="#"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </Link>
                      <Link
                        to="#"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </Link>
                    </div>

                    <div className="border-t border-gray-100 pt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95 flex items-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen border-b border-gray-100' : 'max-h-0'} overflow-hidden bg-white`}>
        <div className="px-4 pt-2 pb-6 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-3 text-base font-medium rounded-xl transition-all ${isActive(link.path) ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'}`}
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-4 border-t border-gray-100">
            {user ? (
              <>
                {/* User info in mobile */}
                <div className="flex items-center gap-3 px-3 py-3 mb-2 bg-gray-50 rounded-xl">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                    {avatarLetter}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium rounded-xl text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-all flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>
                <button onClick={handleLogout} className="w-full mt-2 px-3 py-3 text-base font-semibold text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-all flex items-center gap-2">
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-3 mt-2">
                <Link to="/login" onClick={() => setIsOpen(false)} className="w-full px-4 py-3 text-center font-semibold text-gray-700 bg-gray-50 rounded-xl hover:bg-gray-100 flex items-center justify-center gap-2">
                  <LogIn className="w-4 h-4" /> Login
                </Link>
                <Link to="/signup" onClick={() => setIsOpen(false)} className="w-full px-4 py-3 text-center font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 flex items-center justify-center gap-2">
                  <UserPlus className="w-4 h-4" /> Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;