import React from 'react';


const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between text-sm text-gray-600">
        {/* Left side - Links */}
        <div className="flex items-center space-x-6">
          <a
            href="#"
            className="hover:text-gray-900 transition-colors flex items-center space-x-1"
          >
            <span>Support</span>
            <div className="w-3 h-3 bg-gray-400 rounded flex items-center justify-center text-white text-xs">🔗</div>
          </a>
          <a
            href="#"
            className="hover:text-gray-900 transition-colors flex items-center space-x-1"
          >
            <span>Documentation</span>
            <div className="w-3 h-3 bg-gray-400 rounded flex items-center justify-center text-white text-xs">🔗</div>
          </a>
          <a
            href="#"
            className="hover:text-gray-900 transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="hover:text-gray-900 transition-colors"
          >
            Terms of Service
          </a>
        </div>

        {/* Center - Version and Status */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success-500 rounded-full"></div>
            <span>All systems operational</span>
          </div>
          <span>•</span>
          <span>v1.0.0</span>
        </div>

        {/* Right side - Made with love */}
        <div className="flex items-center space-x-1 text-gray-500">
          <span>Made with</span>
          <div className="w-3 h-3 bg-red-500 rounded flex items-center justify-center text-white text-xs">❤️</div>
          <span>by AI-BOS Team</span>
        </div>
      </div>

      {/* Mobile responsive footer */}
      <div className="mt-2 lg:hidden">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success-500 rounded-full"></div>
            <span>Operational</span>
          </div>
          <span>v1.0.0</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 