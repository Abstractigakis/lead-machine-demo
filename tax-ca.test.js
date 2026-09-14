const test = require("node:test");
const assert = require("node:assert/strict");
const { taxOn, taxFromTotal, cents } = require("./tax-ca.js");

test("Ontario HST 13%", () => {
  const out = taxOn(100, "ON");
  assert.equal(out.hst, 13);
  assert.equal(out.total, 113);
});

test("Nova Scotia HST 14%", () => {
  const out = taxOn(100, "NS");
  assert.equal(out.hst, 14);
  assert.equal(out.total, 114);
});

test("Quebec GST plus QST on the price before GST (since 2013)", () => {
  const out = taxOn(100, "QC");
  assert.equal(out.gst, 5);
  assert.equal(out.pst, 9.98);
  assert.equal(out.total, 114.98);
});

test("Alberta GST only", () => {
  const out = taxOn(100, "AB");
  assert.equal(out.gst, 5);
  assert.equal(out.pst, 0);
  assert.equal(out.total, 105);
});

test("reverse Ontario 113 is 100 before tax", () => {
  const out = taxFromTotal(113, "ON");
  assert.equal(out.net, 100);
  assert.equal(out.hst, 13);
});

test("cents rounds half up", () => {
  assert.equal(cents(10.474), 10.47);
  assert.equal(cents(10.475), 10.48);
});
