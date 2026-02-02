const stats = [
    { label: "Active Users", value: "28M+" },
    { label: "Assessments", value: "22.3M+" },
    { label: "Opportunities", value: "140K+" },
    { label: "Organisations", value: "42K+" },
    { label: "Brands trust us", value: "800+" },
    { label: "Countries", value: "78+" },
  ];
  
  const StatsSection = () => {
    return (
      <section className="mt-24 mb-28">
        <div className="relative bg-gradient-to-br from-indigo-50 via-white to-violet-50
                        rounded-3xl px-10 py-16 shadow-lg overflow-hidden">
  
          {/* soft background glow */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-200/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-violet-200/30 rounded-full blur-3xl" />
  
          <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 text-center">
            {stats.map(({ label, value }) => (
              <div
                key={label}
                className="group bg-white/80 backdrop-blur rounded-2xl p-6
                           shadow-sm border border-slate-200
                           transition-all duration-300
                           hover:-translate-y-2 hover:shadow-xl"
              >
                <h3
                  className="text-4xl font-extrabold mb-2
                             bg-gradient-to-r from-indigo-600 to-violet-600
                             bg-clip-text text-transparent
                             transition-transform duration-300
                             group-hover:scale-110"
                >
                  {value}
                </h3>
  
                <p className="text-sm text-slate-600 font-medium">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default StatsSection;
  
  