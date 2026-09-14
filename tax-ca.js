const PROVINCES = {
  AB: { name: "Alberta", nameFr: "Alberta", gst: 0.05, pst: 0, hst: 0 },
  BC: { name: "British Columbia", nameFr: "Colombie-Britannique", gst: 0.05, pst: 0.07, hst: 0 },
  MB: { name: "Manitoba", nameFr: "Manitoba", gst: 0.05, pst: 0.07, hst: 0 },
  NB: { name: "New Brunswick", nameFr: "Nouveau-Brunswick", gst: 0, pst: 0, hst: 0.15 },
  NL: { name: "Newfoundland and Labrador", nameFr: "Terre-Neuve-et-Labrador", gst: 0, pst: 0, hst: 0.15 },
  NS: { name: "Nova Scotia", nameFr: "Nouvelle-Écosse", gst: 0, pst: 0, hst: 0.14 },
  NT: { name: "Northwest Territories", nameFr: "Territoires du Nord-Ouest", gst: 0.05, pst: 0, hst: 0 },
  NU: { name: "Nunavut", nameFr: "Nunavut", gst: 0.05, pst: 0, hst: 0 },
  ON: { name: "Ontario", nameFr: "Ontario", gst: 0, pst: 0, hst: 0.13 },
  PE: { name: "Prince Edward Island", nameFr: "Île-du-Prince-Édouard", gst: 0, pst: 0, hst: 0.15 },
  QC: { name: "Quebec", nameFr: "Québec", gst: 0.05, pst: 0.09975, hst: 0 },
  SK: { name: "Saskatchewan", nameFr: "Saskatchewan", gst: 0.05, pst: 0.06, hst: 0 },
  YT: { name: "Yukon", nameFr: "Yukon", gst: 0.05, pst: 0, hst: 0 },
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
  return 1 + row.gst + row.pst;
}

function taxOn(net, code) {
  const row = PROVINCES[code] || PROVINCES.ON;
  net = cents(net);
  const gst = cents(net * row.gst);
  const hst = cents(net * row.hst);
  const pst = cents(net * row.pst);
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

const PAYROLL_2026 = {
  ybe: 3500,
  ympe: 74600,
  yampe: 85000,
  mie: 68900,
  cpp2Rate: 0.04,
  cpp2Max: 416,
  ca: { cppRate: 0.0595, cppMax: 4230.45, eiRate: 0.0163, eiMax: 1123.07, eiErMax: 1572.3 },
  qc: { cppRate: 0.063, cppMax: 4479.3, eiRate: 0.013, eiMax: 895.7, eiErMax: 1253.98 },
};

function payroll2026(pensionable, insurable, region) {
  const plan = region === "qc" ? PAYROLL_2026.qc : PAYROLL_2026.ca;
  const p = Math.max(0, Number(pensionable) || 0);
  const i = Math.max(0, Number(insurable) || 0);
  const cppEarn = Math.min(Math.max(0, p - PAYROLL_2026.ybe), PAYROLL_2026.ympe - PAYROLL_2026.ybe);
  const cpp = Math.min(cents(cppEarn * plan.cppRate), plan.cppMax);
  const cpp2Earn = Math.min(Math.max(0, p - PAYROLL_2026.ympe), PAYROLL_2026.yampe - PAYROLL_2026.ympe);
  const cpp2 = Math.min(cents(cpp2Earn * PAYROLL_2026.cpp2Rate), PAYROLL_2026.cpp2Max);
  const ei = Math.min(cents(Math.min(i, PAYROLL_2026.mie) * plan.eiRate), plan.eiMax);
  const eiEmployer = Math.min(cents(ei * 1.4), plan.eiErMax);
  return {
    cpp,
    cpp2,
    ei,
    eiEmployer,
    employee: cents(cpp + cpp2 + ei),
    employer: cents(cpp + cpp2 + eiEmployer),
  };
}

if (typeof module !== "undefined") {
  module.exports = {
    PROVINCES,
    KM_2026,
    PAYROLL_2026,
    cents,
    cad,
    taxOn,
    taxFromTotal,
    factor,
    payroll2026,
  };
}
