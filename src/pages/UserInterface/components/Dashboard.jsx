import React from 'react';

function Dashboard() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mt-2 mb-4 text-white">Subscription Details</h3>
      <div className=" bg-white/10 backdrop-blur-md p-6 rounded-lg"> 
        <div className="space-y-4">
          <div className="bg-white/5 p-4 rounded">
            <p className="text-[#21BFE4] font-semibold">Selected Plan</p>
            <p className="text-white">{localStorage.getItem('userPlanTitle')}</p>
          </div>
          <div className="bg-white/5 p-4 rounded">
            <p className="text-[#21BFE4] font-semibold">Selected Strategy</p>
            <p className="text-white">{localStorage.getItem('userStrategyTitle')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;