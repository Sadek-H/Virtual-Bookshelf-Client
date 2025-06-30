import React from "react";

const SkeletonLoader = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-lg p-8 flex flex-col justify-between animate-pulse"
            >
              <div>
                <div className="h-6 bg-gray-300 rounded w-2/3 mb-4" />
                <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-4/6 mb-6" />
              </div>
              <div>
                <div className="h-4 bg-blue-200 rounded w-full mb-1" />
                <div className="h-4 bg-blue-200 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkeletonLoader;
