const text = "JavaScript is a high-level programming language that follows the ECMAScript standard. It was originally designed as a scripting language for websites but became widely adopted as a general-purpose programming language, and is currently the most popular programming language in use.";

const wordCounts = new Map();

// Preprocess text by splitting into words and removing punctuation
const words = text.toLowerCase().split(/\W+/);

for (const word of words) {
  if (wordCounts.has(word)) {
    wordCounts.set(word, wordCounts.get(word) + 1);
  } else {
    wordCounts.set(word, 1);
  }
}

// Sort wordCounts by value (count) in descending order
const sortedWords = Array.from(wordCounts.entries()).sort((a, b) => b[1] - a[1]);

console.log('Word Frequency:');
for (const [word, count] of sortedWords) {
  console.log(`${word}: ${count}`);
}