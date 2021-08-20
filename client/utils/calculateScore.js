export const calculateWordScore = (word, pangrams) => {
  if (word.length == 4) {
    return 1;
  } else if (pangrams.includes(word)) {
    return word.length + 7;
  } else {
    return word.length;
  }
};

export const calculateTotalScore = (words, pangrams) => {
  return words.reduce(
    (acc, curr) => (acc += calculateWordScore(curr, pangrams)),
    0
  );
};
