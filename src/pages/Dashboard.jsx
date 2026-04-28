import React from 'react';

const Dashboard = () => {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-gray-200/50 border border-gray-100 mt-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome, {user?.name || 'User'}!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          You are successfully logged in 🎉
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                <h3 className="text-xl font-semibold text-blue-900 mb-2">Your Profile</h3>
                <p className="text-blue-800"><strong>Name:</strong> {user?.name}</p>
                <p className="text-blue-800"><strong>Email:</strong> {user?.email}</p>
            </div>
            
            <div className="p-6 bg-green-50 rounded-2xl border border-green-100 flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-green-900 mb-2">Getting Started</h3>
                <p className="text-green-800">Check out the DSA Sheet or Core Subjects to start preparing for your placements!</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
