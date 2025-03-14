
import React, { useState } from 'react';
import { analyzeText } from '@/services/spamDetectionService';
import TextAnalysisResult from './TextAnalysisResult';
import { useToast } from '@/components/ui/use-toast';
import { Send, Trash2, InfoIcon } from 'lucide-react';

const SpamDetector: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<'spam' | 'ham' | null>(null);
  const [confidence, setConfidence] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const { toast } = useToast();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    // Reset results when input changes
    if (result) {
      setResult(null);
      setConfidence(0);
    }
  };

  const handleClearClick = () => {
    setInputText('');
    setResult(null);
    setConfidence(0);
    setError(undefined);
    toast({
      title: "Input cleared",
      description: "You can now enter a new message to analyze.",
      duration: 3000,
    });
  };

  const handleAnalyzeClick = async () => {
    if (!inputText.trim()) {
      setError("Please enter some text to analyze.");
      return;
    }

    try {
      setError(undefined);
      setIsAnalyzing(true);
      setResult(null);
      
      const analysis = await analyzeText(inputText);
      
      // Animate the result appearing
      setTimeout(() => {
        setResult(analysis.result);
        setConfidence(analysis.confidence);
        setIsAnalyzing(false);
      }, 100);
      
      toast({
        title: "Analysis Complete",
        description: `Analysis performed with ${Math.round(analysis.confidence * 100)}% confidence.`,
        duration: 4000,
      });
    } catch (err) {
      setError("An error occurred while analyzing the text. Please try again.");
      setIsAnalyzing(false);
      toast({
        title: "Analysis Failed",
        description: "There was a problem processing your request.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-blur-in">
      <div className="mb-2 flex items-center opacity-80">
        <InfoIcon className="w-4 h-4 mr-2 text-primary" />
        <p className="text-sm text-muted-foreground">
          Enter a message to check if it's spam or legitimate.
        </p>
      </div>
      
      <div className="glass-panel p-1 relative">
        <textarea
          value={inputText}
          onChange={handleTextChange}
          placeholder="Enter text to analyze for spam..."
          className="w-full min-h-[150px] p-4 bg-transparent resize-y focus:outline-none transition-all"
          disabled={isAnalyzing}
        />
        
        <div className="flex justify-between p-2 border-t border-border">
          <button
            onClick={handleClearClick}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-all rounded-md hover:bg-muted"
            disabled={isAnalyzing || !inputText}
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear</span>
          </button>
          
          <button
            onClick={handleAnalyzeClick}
            disabled={isAnalyzing || !inputText.trim()}
            className="btn-primary flex items-center gap-1.5"
          >
            {isAnalyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-1"></div>
                Analyzing...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Analyze
              </>
            )}
          </button>
        </div>
      </div>
      
      <TextAnalysisResult 
        result={result}
        confidence={confidence}
        isAnalyzing={isAnalyzing}
        errorMessage={error}
      />
      
      {/* Examples section */}
      {!result && !isAnalyzing && !error && (
        <div className="mt-10 opacity-90 animate-fade-in">
          <h3 className="text-lg font-medium mb-3 text-center">Example Messages</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              className="glass-panel p-4 text-left hover:translate-y-[-2px] transition-all text-sm"
              onClick={() => setInputText("Congratulations! You've won a $1000 gift card. Click here to claim your prize now! Limited time offer.")}
            >
              <p className="line-clamp-3 text-muted-foreground">
                Congratulations! You've won a $1000 gift card. Click here to claim your prize now! Limited time offer.
              </p>
              <p className="text-xs mt-2 text-spam font-medium">Likely spam</p>
            </button>
            
            <button
              className="glass-panel p-4 text-left hover:translate-y-[-2px] transition-all text-sm"
              onClick={() => setInputText("Hi Sarah, just wanted to confirm our meeting tomorrow at 10 AM. Let me know if that still works for you. Thanks!")}
            >
              <p className="line-clamp-3 text-muted-foreground">
                Hi Sarah, just wanted to confirm our meeting tomorrow at 10 AM. Let me know if that still works for you. Thanks!
              </p>
              <p className="text-xs mt-2 text-ham font-medium">Likely legitimate</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpamDetector;
