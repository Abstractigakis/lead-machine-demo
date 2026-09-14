const form = document.getElementById("tax-form");
const status = document.getElementById("tax-status");
const result = document.getElementById("result");

fillProvinceSelect(form?.elements.province, "ON");

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  const net = Number(data.net);
  if (!(net >= 0)) {
    status.textContent = "Enter a price of zero or more.";
    status.dataset.ok = "0";
    result.hidden = true;
    return;
  }
  const out = taxOn(net, data.province);
  document.getElementById("out-gst").textContent = cad(out.gst);
  document.getElementById("out-hst").textContent = cad(out.hst);
  document.getElementById("out-pst").textContent = cad(out.pst);
  document.getElementById("out-tax").textContent = cad(out.tax);
  document.getElementById("out-total").textContent = cad(out.total);
  result.hidden = false;
  status.textContent = `Place of supply: ${out.row.name}. Estimate only.`;
  status.dataset.ok = "1";
});
