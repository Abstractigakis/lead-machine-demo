const PROVINCES = {
  AB: { name: "Alberta", nameFr: "Alberta", gst: 0.05, pst: 0, hst: 0, qstOnGst: false },
  BC: { name: "British Columbia", nameFr: "Colombie-Britannique", gst: 0.05, pst: 0.07, hst: 0, qstOnGst: false },
  MB: { name: "Manitoba", nameFr: "Manitoba", gst: 0.05, pst: 0.07, hst: 0, qstOnGst: false },
  NB: { name: "New Brunswick", nameFr: "Nouveau-Brunswick", gst: 0, pst: 0, hst: 0.15, qstOnGst: false },
  NL: { name: "Newfoundland and Labrador", nameFr: "Terre-Neuve-et-Labrador", gst: 0, pst: 0, hst: 0.15, qstOnGst: false },
  NS: { name: "Nova Scotia", nameFr: "Nouvelle-Écosse", gst: 0, pst: 0, hst: 0.14, qstOnGst: false },
  NT: { name: "Northwest Territories", nameFr: "Territoires du Nord-Ouest", gst: 0.05, pst: 0, hst: 0, qstOnGst: false },
  NU: { name: "Nunavut", nameFr: "Nunavut", gst: 0.05, pst: 0, hst: 0, qstOnGst: false },
  ON: { name: "Ontario", nameFr: "Ontario", gst: 0, pst: 0, hst: 0.13, qstOnGst: false },
  PE: { name: "Prince Edward Island", nameFr: "Île-du-Prince-Édouard", gst: 0, pst: 0, hst: 0.15, qstOnGst: false },
  QC: { name: "Quebec", nameFr: "Québec", gst: 0.05, pst: 0.09975, hst: 0, qstOnGst: true },
  SK: { name: "Saskatchewan", nameFr: "Saskatchewan", gst: 0.05, pst: 0.06, hst: 0, qstOnGst: false },
  YT: { name: "Yukon", nameFr: "Yukon", gst: 0.05, pst: 0, hst: 0, qstOnGst: false },
};

const KM_2026 = {
  province: [0.73, 0.67],
  territory: [0.77, 0.71],
};

function cents(n) {
  return Math.round((Number(n) + Number.EPSILON) * 100) / 100;
}

function cad(n, locale) {
  return new Intl.NumberFormat(locale || "en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2,
  }).format(n);
}

function factor(code) {
  const row = PROVINCES[code] || PROVINCES.ON;
  if (row.hst) return 1 + row.hst;
  if (row.qstOnGst) return (1 + row.gst) * (1 + row.pst);
  return 1 + row.gst + row.pst;
}

function taxOn(net, code) {
  const row = PROVINCES[code] || PROVINCES.ON;
  net = cents(net);
  const gst = cents(net * row.gst);
  const hst = cents(net * row.hst);
  const pst = cents(row.qstOnGst ? (net + gst) * row.pst : net * row.pst);
  const tax = cents(gst + hst + pst);
  return { row, net, gst, hst, pst, tax, total: cents(net + tax) };
}

function taxFromTotal(total, code) {
  return taxOn(cents(Number(total) / factor(code)), code);
}

function fillProvinceSelect(select, selected, lang) {
  if (!select) return;
  const fr = lang === "fr";
  select.innerHTML = Object.entries(PROVINCES)
    .map(
      ([code, row]) =>
        `<option value="${code}"${code === selected ? " selected" : ""}>${fr ? row.nameFr : row.name}</option>`,
    )
    .join("");
}

if (typeof module !== "undefined") {
  module.exports = { PROVINCES, KM_2026, cents, cad, taxOn, taxFromTotal, factor };
}
