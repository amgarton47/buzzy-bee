import { calculateTotalScore } from "./calculateScore";

export const getRank = (score, answers, pangrams) => {
  const maxScore = calculateTotalScore(answers, pangrams);
  const pct = Math.round((score / maxScore) * 100);
  if (pct < 2) {
    return { title: "Beginner", level: 0 };
  } else if (pct < 5) {
    return { title: "Good Start", level: 1 };
  } else if (pct < 8) {
    return { title: "Moving Up", level: 2 };
  } else if (pct < 15) {
    return { title: "Good", level: 3 };
  } else if (pct < 25) {
    return { title: "Solid", level: 4 };
  } else if (pct < 40) {
    return { title: "Nice", level: 5 };
  } else if (pct < 50) {
    return { title: "Great", level: 6 };
  } else if (pct < 60) {
    return { title: "Amazing", level: 7 };
  } else if (pct < 100) {
    return { title: "Genius", level: 8 };
  } else {
    return { title: "Queen Bee!", level: 8 };
  }
};
