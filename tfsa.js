const LIMITS = [
  [2009, 5000],
  [2010, 5000],
  [2011, 5000],
  [2012, 5000],
  [2013, 5500],
  [2014, 5500],
  [2015, 10000],
  [2016, 5500],
  [2017, 5500],
  [2018, 5500],
  [2019, 6000],
  [2020, 6000],
  [2021, 6000],
  [2022, 6000],
  [2023, 6500],
  [2024, 7000],
  [2025, 7000],
  [2026, 7000],
];

const RRSP_CAP_2026 = 33810;

function money(n) {
  return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(n);
}

function lifetimeFrom(year18) {
  return LIMITS.filter(([year]) => year >= year18).reduce((sum, [, limit]) => sum + limit, 0);
}

const form = document.getElementById("room-form");
const status = document.getElementById("room-status");
const result = document.getElementById("result");

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  const year18 = Number(data.age18);
  const tfsaIn = Number(data.tfsaIn);
  const tfsaOut25 = Number(data.tfsaOut25);
  const earned = Number(data.earned);
  const carry = Number(data.rrspCarry);
  const pa = Number(data.pa);

  if (year18 < 2009 || year18 > 2026) {
    status.textContent = "Year turned 18 must be between 2009 and 2026 for this table.";
    status.dataset.ok = "0";
    result.hidden = true;
    return;
  }

  const lifetime = lifetimeFrom(year18);
  const tfsaRoom = Math.max(0, lifetime - tfsaIn + tfsaOut25);
  const newRrsp = Math.max(0, Math.min(earned * 0.18, RRSP_CAP_2026) - pa);
  const rrspRoom = Math.max(0, newRrsp + carry);

  document.getElementById("tfsa-out").textContent = money(tfsaRoom);
  document.getElementById("tfsa-life").textContent = money(lifetime);
  document.getElementById("rrsp-out").textContent = money(rrspRoom);
  result.hidden = false;
  status.textContent = "Estimate only. Check CRA My Account before you transfer money.";
  status.dataset.ok = "1";
});
