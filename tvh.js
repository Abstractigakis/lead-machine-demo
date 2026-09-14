const form = document.getElementById("tax-form");
const status = document.getElementById("tax-status");
const result = document.getElementById("result");

fillProvinceSelect(form?.elements.province, "QC", "fr");

function money(n) {
  return cad(n, "fr-CA");
}

function paint() {
  const data = Object.fromEntries(new FormData(form));
  const amount = Number(data.amount);
  if (!(amount >= 0)) {
    status.textContent = "Entrez un montant de zéro ou plus.";
    status.dataset.ok = "0";
    result.hidden = true;
    return;
  }
  const out = data.mode === "total" ? taxFromTotal(amount, data.province) : taxOn(amount, data.province);
  document.getElementById("out-net").textContent = money(out.net);
  document.getElementById("out-gst").textContent = money(out.gst);
  document.getElementById("out-hst").textContent = money(out.hst);
  document.getElementById("out-pst").textContent = money(out.pst);
  document.getElementById("out-tax").textContent = money(out.tax);
  document.getElementById("out-total").textContent = money(out.total);
  result.hidden = false;
  status.textContent = `Lieu de la fourniture : ${out.row.nameFr}. Estimation seulement.`;
  status.dataset.ok = "1";
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  paint();
});
form?.addEventListener("input", paint);
paint();
