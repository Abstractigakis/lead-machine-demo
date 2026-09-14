const form = document.getElementById("tax-form");
const status = document.getElementById("tax-status");
const result = document.getElementById("result");

fillProvinceSelect(form?.elements.province, "ON");

function paint() {
  const data = Object.fromEntries(new FormData(form));
  const amount = Number(data.amount);
  if (!(amount >= 0)) {
    status.textContent = "Enter an amount of zero or more.";
    status.dataset.ok = "0";
    result.hidden = true;
    return;
  }
  const out = data.mode === "total" ? taxFromTotal(amount, data.province) : taxOn(amount, data.province);
  document.getElementById("out-net").textContent = cad(out.net);
  document.getElementById("out-gst").textContent = cad(out.gst);
  document.getElementById("out-hst").textContent = cad(out.hst);
  document.getElementById("out-pst").textContent = cad(out.pst);
  document.getElementById("out-tax").textContent = cad(out.tax);
  document.getElementById("out-total").textContent = cad(out.total);
  result.hidden = false;
  status.textContent = `Place of supply: ${out.row.name}. Estimate only.`;
  status.dataset.ok = "1";
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  paint();
});
form?.addEventListener("input", paint);
paint();
