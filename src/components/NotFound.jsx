import React from "react";

const NotFound = () => {
  return (
    <div>
      <main className="container mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-gray-700">
          Sorry, the page you’re looking for doesn’t exist.
        </p>
      </main>
    </div>
  );
};

export default NotFound;
