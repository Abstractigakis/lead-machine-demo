const form = document.getElementById("km-form");
const status = document.getElementById("km-status");
const result = document.getElementById("result");

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  const km = Number(data.km);
  if (!(km >= 0)) {
    status.textContent = "Enter kilometres of zero or more.";
    status.dataset.ok = "0";
    result.hidden = true;
    return;
  }
  const [firstRate, restRate] = KM_2026[data.where] || KM_2026.province;
  const firstKm = Math.min(km, 5000);
  const restKm = Math.max(0, km - 5000);
  const first = firstKm * firstRate;
  const rest = restKm * restRate;
  document.getElementById("out-first").textContent = cad(first);
  document.getElementById("out-rest").textContent = cad(rest);
  document.getElementById("out-total").textContent = cad(first + rest);
  result.hidden = false;
  status.textContent = "Estimate only. Keep a contemporaneous log.";
  status.dataset.ok = "1";
});
