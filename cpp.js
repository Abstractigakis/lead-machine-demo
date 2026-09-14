const form = document.getElementById("cpp-form");
const status = document.getElementById("cpp-status");
const result = document.getElementById("result");
const fr = document.documentElement.lang.startsWith("fr");
const money = (n) => cad(n, fr ? "fr-CA" : "en-CA");

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  const pensionable = Number(data.pensionable);
  const insurable = Number(data.insurable);
  if (!(pensionable >= 0) || !(insurable >= 0)) {
    status.textContent = fr
      ? "Entrez des montants de zéro ou plus."
      : "Enter amounts of zero or more.";
    status.dataset.ok = "0";
    result.hidden = true;
    return;
  }
  const out = payroll2026(pensionable, insurable, data.region);
  document.getElementById("out-cpp").textContent = money(out.cpp);
  document.getElementById("out-cpp2").textContent = money(out.cpp2);
  document.getElementById("out-ei").textContent = money(out.ei);
  document.getElementById("out-employee").textContent = money(out.employee);
  document.getElementById("out-employer").textContent = money(out.employer);
  result.hidden = false;
  status.textContent = fr
    ? data.region === "qc"
      ? "Québec : chiffres RRQ, pas RPC. Estimation seulement."
      : "Estimation seulement. Les tables de l’ARC ont préséance."
    : data.region === "qc"
      ? "Quebec: QPP figures, not CPP. Estimate only."
      : "Estimate only. CRA payroll tables win on a live paycheque.";
  status.dataset.ok = "1";
});
