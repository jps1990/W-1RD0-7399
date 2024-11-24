import React from 'react';
import { Binary } from 'lucide-react';

const SplashScreen = () => {
  return (
    <div className="fixed inset-0 bg-purple-900 flex items-center justify-center">
      <div className="text-center">
        <Binary className="w-20 h-20 text-purple-300 mx-auto mb-4 animate-pulse" />
        <h1 className="text-4xl font-bold text-purple-100 mb-2 tracking-wider">
          WΞ1RD0 <span className="text-purple-400">7399</span>
        </h1>
        <p className="text-purple-300 text-lg">Text Obfuscator</p>
      </div>
    </div>
  );
};

export default SplashScreen;