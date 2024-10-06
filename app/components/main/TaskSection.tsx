import React from 'react';

const TaskSection: React.FC = () => {
  const tasks = [
    { title: 'Join DeGENS Community', reward: '+100 COIN', buttonText: 'Join', isComplete: false },
    { title: 'Boost COIN channel', reward: '+50 COIN', buttonText: 'Check', isComplete: false },
    { title: 'Binance Airdrop $100k', reward: '+150 COIN', buttonText: 'Check', isComplete: true },
    { title: 'Join DOGS', reward: '+150 COIN', buttonText: 'Check', isComplete: true },
    { title: 'Add ⚪ to nickname', reward: '+300 COIN', buttonText: 'Check', isComplete: true },
  ];

  return (
    <section className="h-screen flex flex-col items-center justify-start bg-[#1a1333] text-white p-4 backdrop-blur-lg">
      {/* Daily Task Section */}
      <div className="mb-6 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Daily Tasks</h2>
        <div className="flex items-center justify-between bg-white/10 backdrop-blur-md shadow-lg rounded-md p-4 border border-white/20">
          <div>
            <p className="font-semibold">Make TON Great Again</p>
            <span className="text-gray-300">+2000 COIN</span>
          </div>
          <button className="bg-blue-500 text-white rounded-full px-4 py-2 text-sm">TON</button>
        </div>
      </div>

      {/* Main Task List */}
      <div className="w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Tasks</h2>

        {tasks.map((task, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white/10 backdrop-blur-md shadow-lg rounded-md p-4 mb-4 border border-white/20"
          >
            <div>
              <p className="font-semibold">{task.title}</p>
              <span className="text-gray-300">{task.reward}</span>
            </div>
            <div className="flex space-x-2">
              {!task.isComplete ? (
                <>
                  <button className="text-gray-300 border border-gray-300 rounded-full px-4 py-1 text-sm">Check</button>
                  <button className="bg-black text-white rounded-full px-4 py-2 text-sm">{task.buttonText}</button>
                </>
              ) : (
                <div className="flex items-center">
                  <span className="bg-green-200 text-green-600 rounded-full px-2 py-1 text-sm">✔</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TaskSection
