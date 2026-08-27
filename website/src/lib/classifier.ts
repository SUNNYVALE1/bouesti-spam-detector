import modelData from './model_weights.json';

// Build reverse vocab map ONCE at module load — O(1) lookup vs O(n) scan
const reverseVocab: Record<number, string> = {};
for (const [word, idx] of Object.entries(modelData.vocab as Record<string, number>)) {
  reverseVocab[idx as unknown as number] = word;
}

export interface ClassificationResult {
  prediction: 'Spam' | 'Ham';
  confidence: number; // 0 to 100
  probability: number; // 0 to 1
  indicators: { word: string; weight: number }[];
  processedText: string;
}

// Stop words matching standard NLTK + English stop words
const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t', 'as', 'at',
  'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can', 'cannot', 'could', 'couldn\'t',
  'did', 'didn\'t', 'do', 'does', 'doesn\'t', 'doing', 'don\'t', 'down', 'during', 'each', 'few', 'for', 'from', 'further',
  'had', 'hadn\'t', 'has', 'hasn\'t', 'have', 'haven\'t', 'having', 'he', 'he\'d', 'he\'ll', 'he\'s', 'her', 'here', 'here\'s',
  'hers', 'herself', 'him', 'himself', 'his', 'how', 'how\'s', 'i', 'i\'d', 'i\'ll', 'i\'m', 'i\'ve', 'if', 'in', 'into', 'is',
  'isn\'t', 'it', 'it\'s', 'its', 'itself', 'let\'s', 'me', 'more', 'most', 'mustn\'t', 'my', 'myself', 'no', 'nor', 'not',
  'of', 'off', 'on', 'once', 'only', 'or', 'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same',
  'shan\'t', 'she', 'she\'d', 'she\'ll', 'she\'s', 'should', 'shouldn\'t', 'so', 'some', 'such', 'than', 'that', 'that\'s',
  'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'there\'s', 'these', 'they', 'they\'d', 'they\'ll',
  'they\'re', 'they\'ve', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'wasn\'t', 'we',
  'we\'d', 'we\'ll', 'we\'re', 'we\'ve', 'were', 'weren\'t', 'what', 'what\'s', 'when', 'when\'s', 'where', 'where\'s', 'which',
  'while', 'who', 'who\'s', 'whom', 'why', 'why\'s', 'with', 'won\'t', 'would', 'wouldn\'t', 'you', 'you\'d', 'you\'ll',
  'you\'re', 'you\'ve', 'your', 'yours', 'yourself', 'yourselves'
]);

/**
 * Clean, tokenize, remove punctuation/stopwords, and extract tokens.
 */
export function preprocessText(text: string): { rawTokens: string[]; processedText: string } {
  if (!text) return { rawTokens: [], processedText: '' };

  // Convert to lowercase & clean special chars
  let cleaned = text.toLowerCase()
    .replace(/http\S+|www\S+/g, ' ')
    .replace(/\S+@\S+/g, ' ')
    .replace(/[0-9]+/g, ' ')
    .replace(/[^a-z\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const rawTokens = cleaned.split(' ').filter(t => t.length > 2 && !STOP_WORDS.has(t));
  const processedText = rawTokens.join(' ');

  return { rawTokens, processedText };
}

/**
 * Perform pure TypeScript TF-IDF feature extraction & Logistic Regression inference.
 */
export function classifyEmail(emailContent: string): ClassificationResult {
  const { rawTokens, processedText } = preprocessText(emailContent);
  const vocab: Record<string, number> = modelData.vocab;
  const idf: number[] = modelData.idf;
  const coef: number[] = modelData.coef;
  const intercept: number = modelData.intercept;

  // Count term frequencies (unigrams and bigrams)
  const tfMap: Map<number, number> = new Map();
  const wordWeightMap: Map<string, number> = new Map();

  // Unigrams
  for (const token of rawTokens) {
    if (Object.prototype.hasOwnProperty.call(vocab, token)) {
      const idx = vocab[token];
      tfMap.set(idx, (tfMap.get(idx) || 0) + 1);
    }
  }

  // Bigrams
  for (let i = 0; i < rawTokens.length - 1; i++) {
    const bigram = `${rawTokens[i]} ${rawTokens[i + 1]}`;
    if (Object.prototype.hasOwnProperty.call(vocab, bigram)) {
      const idx = vocab[bigram];
      tfMap.set(idx, (tfMap.get(idx) || 0) + 1);
    }
  }

  // Calculate TF-IDF dot product z
  let z = intercept;
  let totalTokens = rawTokens.length || 1;

  tfMap.forEach((count, idx) => {
    const tf = count / totalTokens;
    const tfidf = tf * idf[idx];
    const weight = coef[idx];
    z += tfidf * weight;

    // Track contributing word weight — O(1) reverse lookup
    const word = reverseVocab[idx];
    if (word && Math.abs(weight) > 0.5) {
      wordWeightMap.set(word, weight);
    }
  });

  // Sigmoid logit prediction
  const prob = 1 / (1 + Math.exp(-z));
  const isSpam = prob >= 0.5;
  const confidence = Math.round((isSpam ? prob : 1 - prob) * 1000) / 10;

  // Sort top indicators
  const sortedIndicators = Array.from(wordWeightMap.entries())
    .map(([word, weight]) => ({ word, weight }))
    .sort((a, b) => (isSpam ? b.weight - a.weight : a.weight - b.weight))
    .slice(0, 10);

  return {
    prediction: isSpam ? 'Spam' : 'Ham',
    confidence,
    probability: prob,
    indicators: sortedIndicators,
    processedText
  };
}
