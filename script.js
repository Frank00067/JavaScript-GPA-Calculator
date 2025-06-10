#!/usr/bin/env node

const form = document.getElementById("assignment-form");
const nameInput = document.getElementById("name");
const gradeInput = document.getElementById("grade");
const list = document.getElementById("assignment-list");
const gpaDisplay = document.getElementById("gpa");

let assignments = JSON.parse(localStorage.getItem("assignments")) || [];

function updateDisplay() {
  list.innerHTML = '';
  let total = 0;

  assignments.forEach(({ name, grade }) => {
    total += grade;
    const li = document.createElement("li");
    li.textContent = ${name} - ${grade}/5;
    list.appendChild(li);
  });

  const gpa = assignments.length ? (total / assignments.length).toFixed(2) : "0.00";
  gpaDisplay.textContent = gpa;

  localStorage.setItem("assignments", JSON.stringify(assignments));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const grade = parseFloat(gradeInput.value);

  if (!name || isNaN(grade) || grade < 0 || grade > 5) return;

  assignments.push({ name, grade });
  updateDisplay();

  form.reset();
});

document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "s") {
    console.log(assignments);
  }
});

// Initial load
updateDisplay();
