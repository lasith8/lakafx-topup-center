import { useEffect, useState } from "react";

const LoadingScreen = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-slate-950 flex items-center justify-center">

      <div className="text-center">

        <div className="w-20 h-20 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-8"></div>

        <h1 className="text-4xl font-black text-orange-400">
          LAKAFX
        </h1>

        <p className="text-gray-400 mt-3">
          Loading Premium Experience...
        </p>

      </div>

    </div>
  );
};

export default LoadingScreen;