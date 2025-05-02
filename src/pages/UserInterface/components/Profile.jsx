import React from 'react';
import { FaTiktok, FaYoutube, FaInstagram } from "react-icons/fa";

function Profile({ userData }) {
   const strategyIcons = {
      'Branding Strategy': {platformIcon:<FaTiktok className="text-2xl"/>,platform:'TikTok' },
      'Engagement Booster': {platformIcon:<FaInstagram className="text-2xl" />,platform:'Instagram'},
      'YouTube Starter Kit': {platformIcon:<FaYoutube className="text-2xl" />,platform:'YouTube'},
      'Growth Boost': {platformIcon:<FaInstagram className="text-2xl" /> ,platform:'Instagram'},
      'Niche Domination': {platformIcon:<div className="flex gap-2"><FaTiktok className="text-2xl" /><FaYoutube className="text-2xl" /><FaInstagram className="text-2xl" /></div>,platform:'TikTok, YouTube, Instagram'}
    };
    const strategyDescriptions = {
      'Branding Strategy': 'Build a consistent and professional personal brand with 3 reels/week + Q&A scheme guide',
      'Engagement Booster': 'Improve interaction and comments on posts with a goal of +20% engagement rate',
      'YouTube Starter Kit': 'Align content between platforms for wider reach with 2 videos/week + Q&A post',
      'Growth Boost': 'Increase reach and attract new followers with a goal of +500 followers in 1 month',
      'Niche Domination': 'Focus on dominating a specific niche with weekly expert content across platforms'
    };
    const userStatus ={
      active: 'text-green-800',
      inactive:'text-red-600',
      pending:'text-yellow-800'
    }
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-white mb-4">
        Profile Information
      </h2>
      
      <div className="flex gap-6 flex-col md:flex-row">
        {/* Profile Information Section */}
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg flex-1">
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={userData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.email}`}
              alt={userData.userName}
              className="w-16 h-16 rounded-full border-2 border-[ffffff]"
            />
            <div>
              <h3 className="text-xl font-bold text-white">{userData.userName || localStorage.getItem('userName')}</h3>
              <p className="text-gray-400">{userData.occupation || 'Content Creator'}</p>
            </div>
          </div>
          
          <div className="space-y-4 text-white">
            <div className="flex space-x-2">
              <p className="text-white font-semibold">Email:</p>
              <p>{userData.email || localStorage.getItem('userEmail')}</p>
            </div>
            <div className="flex space-x-2">
              <p className="text-white font-semibold">Instagram:</p>
              <p>{userData.instagram || localStorage.getItem('userInsta')}</p>
            </div>
            <div className="flex space-x-2">
              <p className="text-white font-semibold">Location:</p>
              <p>{userData.location || localStorage.getItem('userLocation')}</p>
            </div>
            <div className="flex space-x-2">
              <p className="text-white font-semibold">Occupation:</p>
              <p>{userData.occupation || 'Content Creator'}</p>
            </div>
            <div className="flex space-x-2">
              <p className="text-white font-semibold">Goals:</p>
              <p>{userData.goals || localStorage.getItem('userGoals')}</p>
            </div>
            <div className="flex space-x-2">
              <p className="text-white font-semibold">Description:</p>
              <p>{userData.description || localStorage.getItem('userDescription')}</p>
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
            <div className="bg-white/5 p-4 rounded">
              <p className="text-[#21BFE4] font-semibold">Registration Date</p>
              <p className="text-white">{userData.registrationDate || 'Not available'}</p>
            </div>
            <div className="bg-white/5 p-4 rounded">
              <p className="text-[#21BFE4] font-semibold">Subscription End Date</p>
              <p className="text-white">{userData.subscriptionEndDate || 'Not available'}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Strategy Details Section */}
      <div className="mt-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Strategy Details
            </h2>
            
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg">
              <div className="flex items-center gap-4 mb-4 text-white">
                {strategyIcons[userData.strategy].platformIcon || <FaInstagram className="text-2xl" />}
                <h3 className="text-xl font-bold text-white">{userData.strategy}</h3>
              </div>
              
              <p className="text-gray-300 mb-6">
                {strategyDescriptions[userData.strategy] || 'Custom strategy for content creation and audience growth.'}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded">
                  <p className="text-[#21BFE4] font-semibold">Platform Focus</p>
                  <div className="flex gap-2 mt-2 text-white">
                    {strategyIcons[userData.strategy].platform || <FaInstagram className="text-2xl" />}
                  </div>
                </div>
                
                <div className="bg-white/5 p-4 rounded">
                  <p className="text-[#21BFE4] font-semibold">Status</p>
                  <div className="flex items-center mt-2">
                  <span className={`px-2 py-[0.25em] text-sm font-semibold rounded-full bg-white ${userStatus[userData.status]}`}>
                    {userData.status}
                  </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </div>
  );
}

export default Profile;
