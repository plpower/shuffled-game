
const getCorrectList = (words: string[], correctpositions: number[]): string[] => {
  // Filter strings based on the positions array
  const subarray = correctpositions.map((position) => words[position]);
  return subarray;
};

export default getCorrectList;