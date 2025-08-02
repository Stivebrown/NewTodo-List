import React from "react";

const About = () => {
  return (
    <div>
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">About Task Dashboard</h1>
        <p className="text-gray-700">
          This is a Task Dashboard application built with React.js and
          TailwindCSS. It allows users to manage tasks by adding, deleting, and
          toggling their status. The app fetches tasks from the JSONPlaceholder
          API and supports filtering and persistence using localStorage.
        </p>
      </main>
    </div>
  );
};

export default About;
