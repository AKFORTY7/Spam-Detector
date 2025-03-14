
import React from 'react';
import { cn } from '@/lib/utils';
import { AlertTriangle, CheckCircle2, BarChart2 } from 'lucide-react';

type ResultType = 'spam' | 'ham' | null;

interface TextAnalysisResultProps {
  result: ResultType;
  confidence?: number;
  isAnalyzing: boolean;
  errorMessage?: string;
}

const TextAnalysisResult: React.FC<TextAnalysisResultProps> = ({
  result,
  confidence = 0,
  isAnalyzing,
  errorMessage
}) => {
  if (errorMessage) {
    return (
      <div className="glass-panel p-6 mt-6 animate-scale-in">
        <div className="flex flex-col items-center text-center">
          <AlertTriangle className="w-12 h-12 text-destructive mb-3" />
          <h3 className="text-lg font-medium mb-2">Analysis Error</h3>
          <p className="text-muted-foreground">{errorMessage}</p>
        </div>
      </div>
    );
  }

  if (isAnalyzing) {
    return (
      <div className="glass-panel p-8 mt-6 animate-pulse-subtle">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-muted animate-pulse mb-4"></div>
          <div className="h-6 w-32 bg-muted rounded-md animate-pulse mb-3"></div>
          <div className="h-4 w-48 bg-muted rounded-md animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!result) return null;

  const resultConfig = {
    spam: {
      title: 'Spam Detected',
      description: 'This message appears to be spam.',
      icon: AlertTriangle,
      color: 'text-spam',
      bgColor: 'bg-spam/10'
    },
    ham: {
      title: 'Not Spam',
      description: 'This message appears to be legitimate.',
      icon: CheckCircle2,
      color: 'text-ham',
      bgColor: 'bg-ham/10'
    }
  };

  const config = resultConfig[result];
  const Icon = config.icon;
  const roundedConfidence = Math.round(confidence * 100);

  return (
    <div className={cn(
      "glass-panel p-6 mt-6 animate-scale-in border-t-4",
      result === 'spam' ? "border-t-spam/70" : "border-t-ham/70"
    )}>
      <div className="flex flex-col items-center text-center">
        <div className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center mb-4",
          config.bgColor
        )}>
          <Icon className={cn("w-8 h-8", config.color)} />
        </div>
        
        <h3 className="text-xl font-medium mb-1">{config.title}</h3>
        <p className="text-muted-foreground mb-4">{config.description}</p>
        
        {confidence > 0 && (
          <div className="w-full max-w-xs">
            <div className="flex justify-between text-sm mb-1">
              <span>Confidence</span>
              <span className="font-medium">{roundedConfidence}%</span>
            </div>
            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full rounded-full transition-all duration-1000 ease-out",
                  result === 'spam' ? "bg-spam" : "bg-ham"
                )}
                style={{ width: `${roundedConfidence}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextAnalysisResult;
