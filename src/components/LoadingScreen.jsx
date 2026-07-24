import { useEffect, useState } from "react";

const LoadingScreen = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
        <h1 className="text-5xl font-bold text-orange-500">
          LAKAFX
        </h1>

        <p className="text-white mt-3">
          Loading...
        </p>
      </div>
    );
  }

  return children;
};

export default LoadingScreen;