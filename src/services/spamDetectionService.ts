
/**
 * This service handles the core spam detection logic by interfacing
 * with a machine learning model. It provides methods for detecting spam
 * in text messages.
 */

// Function to call the backend API for spam detection
export const analyzeText = async (text: string): Promise<{
  result: 'spam' | 'ham';
  confidence: number;
}> => {
  try {
    // Call our backend API
    const response = await fetch('http://localhost:5000/api/detect-spam', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('API error:', errorData);
      throw new Error(`API error: ${errorData.error || 'Unknown error'}`);
    }
    
    const data = await response.json();
    return {
      result: data.result,
      confidence: data.confidence,
    };
  } catch (error) {
    console.error('Spam detection error:', error);
    
    // Fallback to the original implementation if the API is not available
    console.log('Using fallback spam detection logic');
    
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
    const maxPossibleIndicators = Math.min(spamIndicators.length, 10); // Cap at 10 for more reasonable scaling
    const confidence = Math.min(indicatorCount / maxPossibleIndicators, 1);
    
    // Determine if spam based on a threshold (this is arbitrary)
    const isSpam = confidence > 0.3;
    
    return {
      result: isSpam ? 'spam' : 'ham',
      confidence: isSpam ? confidence : 1 - confidence, // For ham, the confidence is inverted
    };
  }
};
