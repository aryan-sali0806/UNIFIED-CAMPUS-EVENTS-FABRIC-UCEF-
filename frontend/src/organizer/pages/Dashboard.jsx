const Dashboard = () => {
    return (
      <div className="space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-rose-500 text-white rounded-xl p-6 shadow">
            <p className="text-sm opacity-80">Total Events</p>
            <h2 className="text-3xl font-bold mt-2">3</h2>
          </div>
  
          <div className="bg-emerald-500 text-white rounded-xl p-6 shadow">
            <p className="text-sm opacity-80">Active Events</p>
            <h2 className="text-3xl font-bold mt-2">2</h2>
          </div>
  
          <div className="bg-sky-500 text-white rounded-xl p-6 shadow">
            <p className="text-sm opacity-80">Participants</p>
            <h2 className="text-3xl font-bold mt-2">128</h2>
          </div>
        </div>
  
        {/* Calendar placeholder */}
        <div className="bg-white rounded-xl p-6 shadow">
          <h3 className="text-lg font-semibold mb-4">Event Calendar</h3>
          <div className="h-64 flex items-center justify-center text-slate-400 border rounded-lg">
            📅 Calendar coming here
          </div>
        </div>
      </div>
    );
  };
  
  export default Dashboard;
  