const form = document.getElementById("cpp-form");
const status = document.getElementById("cpp-status");
const result = document.getElementById("result");

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  const pensionable = Number(data.pensionable);
  const insurable = Number(data.insurable);
  if (!(pensionable >= 0) || !(insurable >= 0)) {
    status.textContent = "Enter amounts of zero or more.";
    status.dataset.ok = "0";
    result.hidden = true;
    return;
  }
  const out = payroll2026(pensionable, insurable, data.region);
  document.getElementById("out-cpp").textContent = cad(out.cpp);
  document.getElementById("out-cpp2").textContent = cad(out.cpp2);
  document.getElementById("out-ei").textContent = cad(out.ei);
  document.getElementById("out-employee").textContent = cad(out.employee);
  document.getElementById("out-employer").textContent = cad(out.employer);
  result.hidden = false;
  status.textContent =
    data.region === "qc"
      ? "Quebec: QPP figures, not CPP. Estimate only."
      : "Estimate only. CRA payroll tables win on a live paycheque.";
  status.dataset.ok = "1";
});
