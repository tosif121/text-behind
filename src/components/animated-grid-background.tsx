"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function AnimatedGridBackground() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <>
      {/* Animated Grid Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className={`absolute inset-0 ${isDark ? 'opacity-10' : 'opacity-20'}`}>
          <div
            className={`absolute inset-0 animate-grid-move ${
              isDark
                ? 'bg-[linear-gradient(rgba(100,100,100,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(100,100,100,0.1)_1px,transparent_1px)]'
                : 'bg-[linear-gradient(rgba(200,200,200,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(200,200,200,0.3)_1px,transparent_1px)]'
            }`}
            style={{ backgroundSize: '80px 80px' }}
          />
        </div>
      </div>

      {/* Subtle Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Gray Orb - Top Left */}
        <div 
          className={`absolute top-0 -left-40 w-80 h-80 ${
            isDark ? 'bg-gray-700' : 'bg-gray-300'
          } rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob`}
        />
        
        {/* Gray Orb - Top Right */}
        <div 
          className={`absolute top-0 -right-40 w-80 h-80 ${
            isDark ? 'bg-gray-600' : 'bg-gray-400'
          } rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000`}
        />
        
        {/* Gray Orb - Bottom Center */}
        <div 
          className={`absolute -bottom-40 left-1/2 transform -translate-x-1/2 w-80 h-80 ${
            isDark ? 'bg-gray-800' : 'bg-gray-200'
          } rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000`}
        />
      </div>

      {/* Subtle Gradient Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className={`absolute inset-0 ${
            isDark 
              ? 'bg-gradient-radial from-transparent via-gray-950/30 to-gray-950' 
              : 'bg-gradient-radial from-transparent via-white/30 to-white'
          }`}
        />
      </div>
    </>
  );
}