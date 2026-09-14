const form = document.getElementById("inv-form");

fillProvinceSelect(form?.elements.province, "ON");

function paint() {
  const data = Object.fromEntries(new FormData(form));
  const net = Number(data.net);
  if (!(net >= 0) || !data.shop || !data.client) return;
  const out = taxOn(net, data.province);
  document.getElementById("bill-shop").textContent = data.shop;
  document.getElementById("bill-meta").textContent = `Invoice ${data.number} · ${out.row.name}`;
  document.getElementById("bill-client").textContent = data.client;
  document.getElementById("bill-work").textContent = data.work;
  document.getElementById("bill-net").textContent = cad(net);
  document.getElementById("bill-tax").textContent = cad(out.tax);
  document.getElementById("bill-total").textContent = cad(out.total);
  document.getElementById("bill-note").textContent =
    `GST ${cad(out.gst)} · HST ${cad(out.hst)} · PST/QST ${cad(out.pst)}. Estimate only.`;
}

function downloadInvoice() {
  paint();
  const shop = form.elements.shop.value.trim() || "invoice";
  const html = `<!DOCTYPE html><html lang="en-CA"><head><meta charset="utf-8"/><title>${shop.replace(/</g, "")}</title></head><body>${document.getElementById("bill").outerHTML}</body></html>`;
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${shop.replace(/[^\w]+/g, "-").toLowerCase()}-invoice.html`;
  link.click();
  URL.revokeObjectURL(url);
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  paint();
});
form?.addEventListener("input", paint);
document.getElementById("print")?.addEventListener("click", () => {
  paint();
  window.print();
});
document.getElementById("download")?.addEventListener("click", downloadInvoice);
paint();
