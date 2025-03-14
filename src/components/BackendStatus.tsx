
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';

const BackendStatus = () => {
  const [status, setStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  
  useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/detect-spam', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: 'test' }),
          // Short timeout to avoid hanging
          signal: AbortSignal.timeout(3000)
        });
        
        if (response.ok) {
          setStatus('connected');
        } else {
          setStatus('disconnected');
        }
      } catch (error) {
        console.log('Backend connection error:', error);
        setStatus('disconnected');
      }
    };
    
    checkBackendStatus();
    
    // Check periodically
    const interval = setInterval(checkBackendStatus, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, []);
  
  const statusConfig = {
    connecting: {
      color: 'bg-yellow-500/80',
      text: 'Connecting to ML model...'
    },
    connected: {
      color: 'bg-green-500/80',
      text: 'ML model connected'
    },
    disconnected: {
      color: 'bg-red-500/80',
      text: 'Using fallback detection'
    }
  };
  
  const config = statusConfig[status];
  
  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${config.color}`}></div>
      <span className="text-xs text-muted-foreground">{config.text}</span>
    </div>
  );
};

export default BackendStatus;
