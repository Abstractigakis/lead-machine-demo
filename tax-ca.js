const PROVINCES = {
  AB: { name: "Alberta", gst: 0.05, pst: 0, hst: 0, qstOnGst: false },
  BC: { name: "British Columbia", gst: 0.05, pst: 0.07, hst: 0, qstOnGst: false },
  MB: { name: "Manitoba", gst: 0.05, pst: 0.07, hst: 0, qstOnGst: false },
  NB: { name: "New Brunswick", gst: 0, pst: 0, hst: 0.15, qstOnGst: false },
  NL: { name: "Newfoundland and Labrador", gst: 0, pst: 0, hst: 0.15, qstOnGst: false },
  NS: { name: "Nova Scotia", gst: 0, pst: 0, hst: 0.14, qstOnGst: false },
  NT: { name: "Northwest Territories", gst: 0.05, pst: 0, hst: 0, qstOnGst: false },
  NU: { name: "Nunavut", gst: 0.05, pst: 0, hst: 0, qstOnGst: false },
  ON: { name: "Ontario", gst: 0, pst: 0, hst: 0.13, qstOnGst: false },
  PE: { name: "Prince Edward Island", gst: 0, pst: 0, hst: 0.15, qstOnGst: false },
  QC: { name: "Quebec", gst: 0.05, pst: 0.09975, hst: 0, qstOnGst: true },
  SK: { name: "Saskatchewan", gst: 0.05, pst: 0.06, hst: 0, qstOnGst: false },
  YT: { name: "Yukon", gst: 0.05, pst: 0, hst: 0, qstOnGst: false },
};

const KM_2026 = {
  province: [0.73, 0.67],
  territory: [0.77, 0.71],
};

function cad(n) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2,
  }).format(n);
}

function taxOn(net, code) {
  const row = PROVINCES[code] || PROVINCES.ON;
  const gst = net * row.gst;
  const hst = net * row.hst;
  const pst = row.qstOnGst ? (net + gst) * row.pst : net * row.pst;
  const tax = gst + hst + pst;
  return { row, gst, hst, pst, tax, total: net + tax };
}

function fillProvinceSelect(select, selected) {
  if (!select) return;
  select.innerHTML = Object.entries(PROVINCES)
    .map(
      ([code, row]) =>
        `<option value="${code}"${code === selected ? " selected" : ""}>${row.name}</option>`,
    )
    .join("");
}
