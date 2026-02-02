const PagePlaceholder = ({ title, subtitle }) => {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold text-indigo-600 mb-4">
          {title}
        </h1>
        <p className="text-slate-500 text-lg">
          {subtitle}
        </p>
      </div>
    );
  };
  
  export default PagePlaceholder;
  