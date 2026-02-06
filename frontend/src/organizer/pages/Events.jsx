const Events = () => {
    return (
      <div className="bg-white rounded-xl p-6 shadow">
        <h2 className="text-xl font-bold mb-4">Your Events</h2>
  
        <div className="space-y-4">
          <div className="border rounded-lg p-4 hover:shadow transition">
            <h3 className="font-semibold">Codigo Hackathon</h3>
            <p className="text-sm text-slate-500">
              Online + Offline • 2 Rounds
            </p>
          </div>
  
          <div className="border rounded-lg p-4 hover:shadow transition">
            <h3 className="font-semibold">AI Workshop</h3>
            <p className="text-sm text-slate-500">
              Seminar • Certificate Enabled
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Events;
  