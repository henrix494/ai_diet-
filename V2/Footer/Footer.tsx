import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-100 to-gray-200 py-8 mt-12 border-t border-gray-200">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 px-4">
        <div className="text-center md:text-left">
          <h4 className="text-xl font-semibold text-gray-700 mb-1">AI Diet</h4>
          <p className="text-gray-500 text-sm">
            Your personal AI-powered recipe creator for a healthier lifestyle.
          </p>
        </div>
        <div className="text-gray-500 text-sm text-center md:text-right">
          <p>&copy; {new Date().getFullYear()} AI Diet. All rights reserved.</p>
          <p>
            Made with <span className="text-orange-500">♥</span> by the AI Diet
            Team.
          </p>
        </div>
      </div>
    </footer>
  );
};
