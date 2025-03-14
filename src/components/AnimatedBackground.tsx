
import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Top-right blob */}
      <div 
        className="absolute right-[-100px] top-[-100px] w-[400px] h-[400px] rounded-full 
                  bg-gradient-to-br from-primary/30 to-primary/5 blur-3xl animate-float opacity-60"
        style={{ animationDelay: '0s' }}
      />
      
      {/* Bottom-left blob */}
      <div 
        className="absolute left-[-100px] bottom-[-100px] w-[300px] h-[300px] rounded-full 
                  bg-gradient-to-tr from-primary/20 to-accent/5 blur-3xl animate-float opacity-50"
        style={{ animationDelay: '-3s' }}
      />
      
      {/* Center-right blob */}
      <div 
        className="absolute right-[20%] top-[40%] w-[250px] h-[250px] rounded-full 
                  bg-gradient-to-bl from-primary/10 to-accent/5 blur-3xl animate-float opacity-40"
        style={{ animationDelay: '-1.5s' }}
      />

      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(rgba(120,120,120,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(120,120,120,0.05)_1px,transparent_1px)]" 
        style={{ backgroundSize: '50px 50px' }}
      />
    </div>
  );
};

export default AnimatedBackground;
