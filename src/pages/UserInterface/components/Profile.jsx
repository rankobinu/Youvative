import React from 'react';

function Profile({ userData }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-white mb-4">
        Profile Information
      </h2>
      
      <div className="flex gap-6">
        {/* Profile Information Section */}
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg flex-1">
          <div className="space-y-4 text-white">
            <div className="flex space-x-2">
              <p className="text-white font-semibold">Name:</p>
              <p>{userData.userName || localStorage.getItem('userName')}</p>
            </div>
            <div className="flex space-x-2">
              <p className="text-white font-semibold">Email:</p>
              <p>{userData.email || localStorage.getItem('userEmail')}</p>
            </div>
            <div className="flex space-x-2">
              <p className="text-white font-semibold">Instagram:</p>
              <p>{userData.instagram || localStorage.getItem('userInsta')}</p>
            </div>
            <div className="flex space-x-2">
              <p className="text-white font-semibold">Location: </p>
              <p>{userData.location || localStorage.getItem('userLocation')}</p>
            </div>
            <div className="flex space-x-2">
              <p className="text-white font-semibold">Goals:</p>
              <p>{userData.goals || localStorage.getItem('userGoals')}</p>
            </div>
          </div>
        </div>

        {/* Subscription Details Section */}
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg flex-1">
          <h3 className="text-xl font-semibold mb-4 text-white">Subscription Details</h3>
          <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded">
              <p className="text-[#21BFE4] font-semibold">Selected Plan</p>
              <p className="text-white">{userData.planTitle || localStorage.getItem('userPlanTitle')}</p>
            </div>
            <div className="bg-white/5 p-4 rounded">
              <p className="text-[#21BFE4] font-semibold">Selected Strategy</p>
              <p className="text-white">{userData.strategyTitle || localStorage.getItem('userStrategyTitle')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
