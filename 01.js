function solveMafia(matrix) {
  const n = matrix.length;
  const mafiaCount = Math.floor(n / 3);

  let bestScore = -Infinity;
  let bestAssignment = null;

  // تولید همه ترکیب‌های m نفره به عنوان مافیا
  function* combinations(arr, k, start = 0, chosen = []) {
    if (chosen.length === k) {
      yield chosen;
      return;
    }
    for (let i = start; i < arr.length; i++) {
      yield* combinations(arr, k, i + 1, [...chosen, arr[i]]);
    }
  }

  // محاسبه امتیاز یک تخصیص
  function scoreAssignment(assignment) {
    let score = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (i === j) continue;
        const vote = matrix[i][j];
        if (vote === 0) continue;

        const target = assignment[j]; // 0 = مافیا, 1 = شهر
        if (vote === 1) {
          score += target === 1 ? 1 : -1;
        } else if (vote === -1) {
          score += target === 0 ? 1 : -1;
        }
      }
    }
    return score;
  }

  // بررسی همه حالت‌های ممکن
  const allPlayers = Array.from({ length: n }, (_, i) => i);
  for (const mafiaGroup of combinations(allPlayers, mafiaCount)) {
    const assignment = Array(n).fill(1); // همه شهر
    for (const idx of mafiaGroup) assignment[idx] = 0; // مافیا

    const sc = scoreAssignment(assignment);
    if (sc > bestScore) {
      bestScore = sc;
      bestAssignment = assignment;
    }
  }

  return {
    bestAssignment,
    bestScore
  };
}

// ===== نمونه تست =====
const matrix = [
  [1, 0, -1, 1, 1, 0, -1],
  [-1, 1, 1, 0, 0, -1, 0],
  [0, 1, 1, -1, -1, 0, 0],
  [0, 0, -1, 1, 0, 0, -1],
  [0, 0, -1, 1, 1, 1, -1],
  [1, 0, 0, 1, 1, 1, 0],
  [0, 1, 0, -1, -1, 0, 1],
];

const result = solveMafia(matrix);
console.log("Best assignment:", result.bestAssignment.join(""));
console.log("Score:", result.bestScore);
