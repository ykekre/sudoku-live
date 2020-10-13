const alphabetIndexMap = new Map();
alphabetIndexMap.set(0, "A");
alphabetIndexMap.set(1, "B");
alphabetIndexMap.set(2, "C");
alphabetIndexMap.set(3, "D");
alphabetIndexMap.set(4, "E");
alphabetIndexMap.set(5, "F");
alphabetIndexMap.set(6, "G");
alphabetIndexMap.set(7, "H");
alphabetIndexMap.set(8, "I");

export const getLetterFromIndex = (index) => {
  return alphabetIndexMap.get(index);
};

export const getIndexFromLetter = (letter) => {
  for (const [key, value] of alphabetIndexMap) {
    if (value === letter) {
      return key;
    }
  }
};
export const getCoordinates = (cell) => {
  const i = getIndexFromLetter(cell[0]);
  const j = parseInt(cell[1]) - 1;

  return [i, j];
};
