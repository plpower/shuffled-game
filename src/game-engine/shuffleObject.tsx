interface WordWithPosition {
  word: string;
  originalPosition: number;
}

const splitWordsIntoVowelsAndConsonants = (
  words: string[]
): { vowels: WordWithPosition[]; consonants: WordWithPosition[] } => {
  const vowels: WordWithPosition[] = [];
  const consonants: WordWithPosition[] = [];

  words.forEach((word, index) => {
    const vowelsInWord = word.match(/[aeiou]/gi)?.join("") || "";
    const consonantsInWord = word.match(/[^aeiou]/gi)?.join("") || "";

    vowels.push({ word: vowelsInWord, originalPosition: index });
    consonants.push({ word: consonantsInWord, originalPosition: index });
  });

  return { vowels, consonants };
};

const shuffleVowels = (
  vowels: WordWithPosition[]
): WordWithPosition[] => {
  const shuffledVowels: WordWithPosition[] = vowels.map(
    ({ word, originalPosition }) => ({
      word,
      originalPosition,
    })
  );

  for (let i = shuffledVowels.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements using destructuring assignment
    [shuffledVowels[i], shuffledVowels[j]] = [
      shuffledVowels[j],
      shuffledVowels[i],
    ];
  }

  return shuffledVowels;
};

export { splitWordsIntoVowelsAndConsonants, shuffleVowels };
export type { WordWithPosition };
