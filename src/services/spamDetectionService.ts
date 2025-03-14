
/**
 * This service handles the core spam detection logic by interfacing
 * with a machine learning model. It provides methods for detecting spam
 * in text messages.
 */

// Simple function to determine if a message might be spam based on keywords
// This is a placeholder for demonstration purposes - in a real implementation
// this would connect to a proper ML model or API
export const analyzeText = async (text: string): Promise<{
  result: 'spam' | 'ham';
  confidence: number;
}> => {
  // Simulate API call with a delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Spam indicators - very simplified for demonstration
  const spamIndicators = [
    'free', 'winner', 'won', 'prize', 'offer', 'limited', 'urgent', 'action',
    'buy now', 'click here', 'cash', 'discount', 'guarantee', 'credit',
    'save', 'money', 'deal', 'cheap', 'loan', 'subscribe', 'investment',
    'income', 'viagra', 'pharmacy', 'medicine', 'weight loss', 'diet',
    'earn money', 'make money', 'work from home', 'opportunity'
  ];
  
  // Count indicators
  let indicatorCount = 0;
  const lowerText = text.toLowerCase();
  
  spamIndicators.forEach(indicator => {
    if (lowerText.includes(indicator.toLowerCase())) {
      indicatorCount++;
    }
  });
  
  // Calculate a confidence score between 0 and 1
  // This is a very simplistic approach for demonstration
  const maxPossibleIndicators = Math.min(spamIndicators.length, 10); // Cap at 10 for more reasonable scaling
  const confidence = Math.min(indicatorCount / maxPossibleIndicators, 1);
  
  // Determine if spam based on a threshold (this is arbitrary)
  const isSpam = confidence > 0.3;
  
  return {
    result: isSpam ? 'spam' : 'ham',
    confidence: isSpam ? confidence : 1 - confidence, // For ham, the confidence is inverted
  };
};
