// Assignment definitions
const assignments = [
  {
    name: "Intro + design + palvelumuotoilu",
    aPlus: 25,
    paatehtava: 25,
    total: 50,
  },
  {
    name: "Design figma",
    aPlus: 25,
    paatehtava: 75,
    total: 100,
  },
  {
    name: "Git + Terminal + Intro",
    aPlus: 25,
    paatehtava: 25,
    total: 50,
  },
  {
    name: "HTML + CSS #0",
    aPlus: 75,
    paatehtava: null,
    total: 75,
  },
  {
    name: "HTML + CSS #1",
    aPlus: null,
    paatehtava: 100,
    total: 100,
  },
  {
    name: "JS #0",
    aPlus: 25,
    paatehtava: 25,
    total: 50,
  },
  {
    name: "JS #1",
    aPlus: 25,
    paatehtava: 50,
    total: 75,
  },
  {
    name: "JS #2",
    aPlus: 25,
    paatehtava: 75,
    total: 100,
  },
  {
    name: "React #0",
    aPlus: 25,
    paatehtava: 25,
    total: 50,
  },
  {
    name: "React #1",
    aPlus: 25,
    paatehtava: 50,
    total: 75,
  },
  {
    name: "React #2 - React projekti",
    aPlus: 25,
    paatehtava: 75,
    total: 100,
  },
  {
    name: "Lopputyö",
    aPlus: null,
    paatehtava: 175,
    total: 175,
  },
];

// Late penalty multipliers
const LATE_PENALTIES = {
  onTime: 1.0,
  lessThan2Weeks: 0.75,
  moreThan2Weeks: 0.5,
};

// Grade thresholds
const GRADE_THRESHOLDS = [
  { points: 950, grade: 5 },
  { points: 900, grade: 4 },
  { points: 850, grade: 3 },
  { points: 800, grade: 2 },
  { points: 750, grade: 1 },
];

// Initialize the calculator
function init() {
  generateAssignmentTable();
  attachEventListeners();
  calculate();
}

// Generate the assignment table rows
function generateAssignmentTable() {
  const tbody = document.getElementById("assignments-tbody");
  tbody.innerHTML = "";

  assignments.forEach((assignment, index) => {
    const row = document.createElement("tr");
    row.dataset.index = index;

    // Assignment name with max points
    const nameCell = document.createElement("td");
    nameCell.className = "assignment-name";
    nameCell.dataset.label = "Kierros";
    const nameSpan = document.createElement("span");
    nameSpan.textContent = assignment.name;
    const maxSpan = document.createElement("span");
    maxSpan.className = "max-points-label";
    maxSpan.textContent = ` (${assignment.total}p)`;
    nameCell.appendChild(nameSpan);
    nameCell.appendChild(maxSpan);
    row.appendChild(nameCell);

    // A+ input (if applicable)
    const aPlusCell = document.createElement("td");
    aPlusCell.className = "input-cell";
    aPlusCell.dataset.label = "A+";
    if (assignment.aPlus !== null) {
      const inputWrapper = document.createElement("div");
      inputWrapper.className = "input-wrapper";
      const aPlusInput = document.createElement("input");
      aPlusInput.type = "number";
      aPlusInput.min = "0";
      aPlusInput.max = assignment.aPlus;
      aPlusInput.value = "0";
      aPlusInput.placeholder = `max ${assignment.aPlus}p`;
      aPlusInput.dataset.type = "aplus";
      aPlusInput.dataset.max = assignment.aPlus;
      const maxLabel = document.createElement("span");
      maxLabel.className = "input-max-label";
      maxLabel.textContent = `max ${assignment.aPlus}p`;
      inputWrapper.appendChild(aPlusInput);
      inputWrapper.appendChild(maxLabel);
      aPlusCell.appendChild(inputWrapper);
    } else {
      aPlusCell.textContent = "-";
      aPlusCell.style.color = "var(--text-secondary)";
    }
    row.appendChild(aPlusCell);

    // Päätehtävä input (if applicable)
    const paatehtavaCell = document.createElement("td");
    paatehtavaCell.className = "input-cell";
    paatehtavaCell.dataset.label = "Päätehtävä";
    if (assignment.paatehtava !== null) {
      const inputWrapper = document.createElement("div");
      inputWrapper.className = "input-wrapper";
      const paatehtavaInput = document.createElement("input");
      paatehtavaInput.type = "number";
      paatehtavaInput.min = "0";
      paatehtavaInput.max = assignment.paatehtava;
      paatehtavaInput.value = "0";
      paatehtavaInput.placeholder = `max ${assignment.paatehtava}p`;
      paatehtavaInput.dataset.type = "paatehtava";
      paatehtavaInput.dataset.max = assignment.paatehtava;
      const maxLabel = document.createElement("span");
      maxLabel.className = "input-max-label";
      maxLabel.textContent = `max ${assignment.paatehtava}p`;
      inputWrapper.appendChild(paatehtavaInput);
      inputWrapper.appendChild(maxLabel);
      paatehtavaCell.appendChild(inputWrapper);
    } else {
      paatehtavaCell.textContent = "-";
      paatehtavaCell.style.color = "var(--text-secondary)";
    }
    row.appendChild(paatehtavaCell);

    // Add class to input cells if only one exists (for mobile styling)
    const aPlusHasInput = assignment.aPlus !== null;
    const paatehtavaHasInput = assignment.paatehtava !== null;
    if (aPlusHasInput && !paatehtavaHasInput) {
      aPlusCell.classList.add("single-input");
    } else if (!aPlusHasInput && paatehtavaHasInput) {
      paatehtavaCell.classList.add("single-input");
    }

    // Total (calculated)
    const totalCell = document.createElement("td");
    totalCell.className = "total-cell";
    totalCell.dataset.label = "Total";
    totalCell.textContent = "0";
    totalCell.dataset.total = "0";
    row.appendChild(totalCell);

    // Late submission checkboxes
    const lateCell = document.createElement("td");
    lateCell.className = "late-cell";
    lateCell.dataset.label = "Myöhästyminen";
    const checkboxWrapper = document.createElement("div");
    checkboxWrapper.className = "checkbox-wrapper";

    const checkbox1 = document.createElement("input");
    checkbox1.type = "checkbox";
    checkbox1.id = `late-less-${index}`;
    checkbox1.dataset.type = "late";
    checkbox1.dataset.penalty = "lessThan2Weeks";
    const label1 = document.createElement("label");
    label1.htmlFor = `late-less-${index}`;
    label1.appendChild(checkbox1);
    label1.appendChild(document.createTextNode("Alle 2vko myöhässä"));

    const checkbox2 = document.createElement("input");
    checkbox2.type = "checkbox";
    checkbox2.id = `late-more-${index}`;
    checkbox2.dataset.type = "late";
    checkbox2.dataset.penalty = "moreThan2Weeks";
    const label2 = document.createElement("label");
    label2.htmlFor = `late-more-${index}`;
    label2.appendChild(checkbox2);
    label2.appendChild(document.createTextNode("Tosi paljon myöhässä"));

    // Make checkboxes mutually exclusive
    checkbox1.addEventListener("change", () => {
      if (checkbox1.checked) {
        checkbox2.checked = false;
      }
      calculate();
    });

    checkbox2.addEventListener("change", () => {
      if (checkbox2.checked) {
        checkbox1.checked = false;
      }
      calculate();
    });

    checkboxWrapper.appendChild(label1);
    checkboxWrapper.appendChild(label2);
    lateCell.appendChild(checkboxWrapper);
    row.appendChild(lateCell);

    tbody.appendChild(row);
  });
}

// Attach event listeners to all inputs
function attachEventListeners() {
  // Assignment inputs
  const inputs = document.querySelectorAll(
    "#assignments-tbody input[type='number']"
  );
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      validateInput(input);
      updateRowTotal(input.closest("tr"));
      calculate();
    });
  });

  // Late submission checkboxes are already handled in generateAssignmentTable

  // Lecture points input
  const lectureInput = document.getElementById("lecture-points");
  lectureInput.addEventListener("input", () => {
    validateInput(lectureInput);
    calculate();
  });

  // Fill max points button
  const fillMaxBtn = document.getElementById("fill-max-btn");
  fillMaxBtn.addEventListener("click", fillMaxPoints);
}

// Fill all inputs with maximum points
function fillMaxPoints() {
  const rows = document.querySelectorAll("#assignments-tbody tr");

  rows.forEach((row, index) => {
    const assignment = assignments[index];

    // Fill A+ input if it exists
    const aPlusInput = row.querySelector('input[data-type="aplus"]');
    if (aPlusInput && assignment.aPlus !== null) {
      aPlusInput.value = assignment.aPlus;
      updateRowTotal(row);
    }

    // Fill Päätehtävä input if it exists
    const paatehtavaInput = row.querySelector('input[data-type="paatehtava"]');
    if (paatehtavaInput && assignment.paatehtava !== null) {
      paatehtavaInput.value = assignment.paatehtava;
      updateRowTotal(row);
    }

    // Set all late submissions to on-time (uncheck all checkboxes)
    const checkboxLess = row.querySelector(
      'input[data-penalty="lessThan2Weeks"]'
    );
    const checkboxMore = row.querySelector(
      'input[data-penalty="moreThan2Weeks"]'
    );
    if (checkboxLess) checkboxLess.checked = false;
    if (checkboxMore) checkboxMore.checked = false;
  });

  // Fill lecture points to maximum (60)
  const lectureInput = document.getElementById("lecture-points");
  lectureInput.value = 60;

  // Recalculate everything
  calculate();
}

// Validate input to ensure it's within bounds
function validateInput(input) {
  const max = parseFloat(input.max);
  const min = parseFloat(input.min);
  let value = parseFloat(input.value) || 0;

  if (value > max) {
    value = max;
    input.value = max;
  }
  if (value < min) {
    value = min;
    input.value = min;
  }
}

// Update the total for a single row
function updateRowTotal(row) {
  const index = parseInt(row.dataset.index);
  const assignment = assignments[index];

  const aPlusInput = row.querySelector('input[data-type="aplus"]');
  const paatehtavaInput = row.querySelector('input[data-type="paatehtava"]');

  let total = 0;
  if (aPlusInput) {
    total += parseFloat(aPlusInput.value) || 0;
  }
  if (paatehtavaInput) {
    total += parseFloat(paatehtavaInput.value) || 0;
  }

  const totalCell = row.querySelector(".total-cell");
  totalCell.textContent = total;
  totalCell.dataset.total = total;
}

// Calculate all points and update display
function calculate() {
  let totalPointsBeforePenalties = 0;
  let totalPointsAfterPenalties = 0;
  const weeklyScores = [];

  // Calculate points for each assignment
  const rows = document.querySelectorAll("#assignments-tbody tr");
  rows.forEach((row, index) => {
    const assignment = assignments[index];
    const aPlusInput = row.querySelector('input[data-type="aplus"]');
    const paatehtavaInput = row.querySelector('input[data-type="paatehtava"]');

    let points = 0;
    if (aPlusInput) {
      points += parseFloat(aPlusInput.value) || 0;
    }
    if (paatehtavaInput) {
      points += parseFloat(paatehtavaInput.value) || 0;
    }

    // Store weekly score (before penalties) for requirement check
    if (assignment.name !== "Lopputyö") {
      const percentage = (points / assignment.total) * 100;
      weeklyScores.push({
        name: assignment.name,
        points: points,
        max: assignment.total,
        percentage: percentage,
      });
    }

    totalPointsBeforePenalties += points;

    // Apply late penalty based on checkbox state
    let penaltyType = "onTime";
    const checkboxLess = row.querySelector(
      'input[data-penalty="lessThan2Weeks"]'
    );
    const checkboxMore = row.querySelector(
      'input[data-penalty="moreThan2Weeks"]'
    );

    if (checkboxLess && checkboxLess.checked) {
      penaltyType = "lessThan2Weeks";
    } else if (checkboxMore && checkboxMore.checked) {
      penaltyType = "moreThan2Weeks";
    }

    const penalty = LATE_PENALTIES[penaltyType];
    const adjustedPoints = points * penalty;
    totalPointsAfterPenalties += adjustedPoints;
  });

  // Get bonus lecture points
  const lecturePoints =
    parseFloat(document.getElementById("lecture-points").value) || 0;

  // Total with bonus (bonus doesn't count for passing requirements)
  const totalWithBonus = totalPointsAfterPenalties + lecturePoints;

  // Update display
  updateResults(
    totalPointsAfterPenalties,
    lecturePoints,
    totalWithBonus,
    weeklyScores
  );
}

// Update the results display
function updateResults(
  pointsAfterPenalties,
  bonusPoints,
  totalWithBonus,
  weeklyScores
) {
  // Update point displays
  document.getElementById("points-before-bonus").textContent =
    Math.round(pointsAfterPenalties);
  document.getElementById("bonus-points").textContent = Math.round(bonusPoints);
  document.getElementById("total-points").textContent =
    Math.round(totalWithBonus);

  // Calculate and display grade
  const grade = calculateGrade(totalWithBonus);
  const gradeElement = document.getElementById("grade");
  const gradeDescription = document.getElementById("grade-description");

  gradeElement.textContent = grade;

  // Remove all grade-specific classes first
  gradeElement.classList.remove(
    "grade-5",
    "grade-4",
    "grade-3",
    "grade-2",
    "grade-1",
    "grade-0"
  );

  // Add the appropriate grade class while preserving result-value and grade classes
  if (grade !== "-") {
    gradeElement.classList.add(`grade-${grade}`);
  }

  // Ensure result-value and grade classes are present
  gradeElement.classList.add("result-value", "grade");

  if (grade === "-") {
    gradeDescription.textContent = "-";
  } else {
    gradeDescription.textContent = getGradeDescription(grade);
  }

  // Check passing requirements
  checkPassingRequirements(pointsAfterPenalties, weeklyScores);
}

// Calculate grade based on total points
function calculateGrade(totalPoints) {
  for (const threshold of GRADE_THRESHOLDS) {
    if (totalPoints >= threshold.points) {
      return threshold.grade;
    }
  }
  return 0;
}

// Get grade description
function getGradeDescription(grade) {
  const descriptions = {
    5: "Erinomainen",
    4: "Hyvä",
    3: "Tyydyttävä",
    2: "Välttävä",
    1: "Välttävä",
    0: "Hylätty",
  };
  return descriptions[grade] || "-";
}

// Check passing requirements
function checkPassingRequirements(totalPoints, weeklyScores) {
  // Requirement 1: All weekly assignments >50% (before penalties)
  const allWeeklyAbove50 = weeklyScores.every((score) => score.percentage > 50);
  const weeklyStatus = document.getElementById("req-weekly-status");
  const weeklyItem = document.getElementById("req-weekly");

  if (allWeeklyAbove50) {
    weeklyStatus.textContent = "✓ Täytetty";
    weeklyStatus.className = "requirement-status pass";
    weeklyItem.style.borderColor = "var(--success-color)";
  } else {
    weeklyStatus.textContent = "✗ Ei täytetty";
    weeklyStatus.className = "requirement-status fail";
    weeklyItem.style.borderColor = "var(--danger-color)";
  }

  // Requirement 2: Total points ≥750 (after penalties)
  const totalAbove750 = totalPoints >= 750;
  const totalStatus = document.getElementById("req-total-status");
  const totalItem = document.getElementById("req-total");

  if (totalAbove750) {
    totalStatus.textContent = "✓ Täytetty";
    totalStatus.className = "requirement-status pass";
    totalItem.style.borderColor = "var(--success-color)";
  } else {
    totalStatus.textContent = "✗ Ei täytetty";
    totalStatus.className = "requirement-status fail";
    totalItem.style.borderColor = "var(--danger-color)";
  }

  // Overall passing status
  const passingStatus = document.getElementById("passing-status");
  const passingText = document.getElementById("passing-text");

  if (allWeeklyAbove50 && totalAbove750) {
    passingStatus.className = "passing-status pass";
    passingText.textContent = "✓ Läpipääsyvaatimukset täytetty!";
  } else {
    passingStatus.className = "passing-status fail";
    passingText.textContent = "✗ Läpipääsyvaatimukset eivät ole täytetty";
  }
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
