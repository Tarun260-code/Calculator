const display = document.getElementById("display");
const themeToggle = document.getElementById("theme-toggle");
const historyList = document.getElementById("history-list");

function append(value) {
  display.value += value;
}
function clearDisplay() {
  display.value = "";
}
function deleteChar() {
  display.value = display.value.slice(0, -1);
}
function calculate() {
  try {
    const expression = display.value.replace(/÷/g, "/").replace(/×/g, "*");
    const result = eval(expression);
    display.value = result;
    addToHistory(expression, result);
  } catch {
    display.value = "Error";
  }
}
function addToHistory(expr, res) {
  const div = document.createElement("div");
  div.classList.add("history-item");
  div.innerHTML = `<span>${expr}</span> <span>= ${res}</span>`;
  historyList.prepend(div);
  // Only keep latest 10 items
  const items = document.querySelectorAll(".history-item");
  if (items.length > 10) items[items.length - 1].remove();
}
// Theme toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
// Restore theme on load
window.onload = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
  }
};
