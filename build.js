const TRADES = {
  hvac: {
    label: "HVAC",
    kicker: "TSSA · WSIB · insured",
    headline: "The system dies on a Thursday. Someone should answer.",
    lede: "We repair and replace furnaces, heat pumps, and air conditioners for homeowners who want a price before the truck rolls — not after.",
    cards: [
      ["No-heat / no-cool", "Igniters, capacitors, contactors, condensate, and control boards. Most of these are same-day if the part is on the truck."],
      ["Replacement", "Furnace, AC, or heat-pump changeouts with a written price before we book the install day."],
      ["Maintenance", "Spring and fall clean-and-checks so the next outage is less likely to be on a holiday weekend."],
    ],
    issuePh: "No heat, AC dead, estimate for a heat pump…",
  },
  plumbing: {
    label: "Plumbing",
    kicker: "WSIB · insured · licensed",
    headline: "The pipe fails at dinner. Someone should answer.",
    lede: "We handle leaks, water heaters, and drain backups for homeowners who want a price before the truck rolls — not after.",
    cards: [
      ["Leaks and bursts", "Shutoff, patch, and a written repair price before we open the wall further."],
      ["Water heaters", "Repair or replace. Tank and tankless. Same-week if the unit is a stock size."],
      ["Drains", "Kitchen, bath, and main-line backups. We say if it is a snake job or a camera job."],
    ],
    issuePh: "Burst pipe, no hot water, basement backup…",
  },
  electrical: {
    label: "Electrical",
    kicker: "ESA · WSIB · insured",
    headline: "The panel trips again. Someone should answer.",
    lede: "We diagnose no-power, panels, and EV-charger circuits for homeowners who want a price before we pull a permit — not after.",
    cards: [
      ["No-power / trips", "Breakers, GFCI, aluminum pigtails, and the ugly box in the basement."],
      ["Panel work", "Upgrades and replacements with a written price and permit path before we book."],
      ["Adds", "Outlets, lighting, and EV circuits. We say no if the panel cannot take it."],
    ],
    issuePh: "Tripping breaker, panel upgrade, EV charger…",
  },
};

const CSS = `:root{--bg:#f4efe6;--ink:#1c1914;--muted:#5c564c;--line:#d8d0c2;--paper:#fffdf8;--accent:#9a3412;--accent-ink:#fff7ed;--shade:#ebe4d6;--max:1040px}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;color:var(--ink);background:var(--bg);font:18px/1.5 Iowan Old Style,Palatino Linotype,Palatino,serif}h1,h2,h3,.brand,.btn,.phone,button,nav a,.kicker,.price strong,.towns{font-family:Avenir Next,Segoe UI,Helvetica,sans-serif}h1,h2,h3{line-height:1.15;letter-spacing:-.02em;font-weight:600}h1{font-size:clamp(2.1rem,5vw,3.4rem);margin:0 0 .7rem}h2{font-size:1.55rem;margin:0 0 .7rem}h3{font-size:1.05rem;margin:0 0 .4rem}p{margin:0 0 1rem}a{color:var(--accent)}.wrap{width:min(var(--max),calc(100% - 40px));margin:0 auto}.top{border-bottom:1px solid var(--line);background:var(--paper)}.bar,.hero-grid,.quote-grid,.foot-bar,.hero-actions{display:flex;gap:24px}.bar{min-height:64px;align-items:center;justify-content:space-between}.brand{display:flex;align-items:center;gap:10px;color:var(--ink);text-decoration:none;font-weight:650}.mark{width:12px;height:12px;background:var(--accent)}nav{display:flex;gap:18px}nav a,.phone{text-decoration:none;color:var(--ink);font-size:.92rem}.phone{font-weight:650}.hero{padding:72px 0 56px}.hero-grid{align-items:start}.hero-grid>div{flex:1.3}.panel{flex:.9;background:var(--paper);border:1px solid var(--line);padding:22px 22px 8px}.kicker{text-transform:uppercase;letter-spacing:.08em;font-size:.72rem;color:var(--muted);margin-bottom:12px}.lede{font-size:1.15rem;max-width:36rem;color:var(--muted)}.btn,button{display:inline-block;background:var(--accent);color:var(--accent-ink);text-decoration:none;border:0;padding:12px 16px;font-size:.95rem;font-weight:650;cursor:pointer}.fine,.panel-note,.form-status,.foot{color:var(--muted);font-size:.92rem}.hero-actions{flex-direction:column;align-items:flex-start;gap:10px}.price{list-style:none;padding:0;margin:0 0 12px}.price li{display:flex;justify-content:space-between;gap:16px;padding:10px 0;border-top:1px solid var(--line)}.section{padding:56px 0}.muted{background:var(--shade)}.cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}.cards article{background:var(--paper);border:1px solid var(--line);padding:18px 18px 8px}.towns{list-style:none;padding:0;margin:0;columns:2;font-size:.95rem}.towns li{padding:4px 0}form{flex:1.1;display:grid;grid-template-columns:1fr 1fr;gap:12px 14px;background:var(--paper);border:1px solid var(--line);padding:18px}label{display:flex;flex-direction:column;gap:6px;font-size:.82rem;font-family:Avenir Next,Segoe UI,Helvetica,sans-serif}.wide,button[type=submit],.form-status{grid-column:1/-1}input{font:inherit;padding:10px;border:1px solid var(--line);background:var(--bg);color:var(--ink)}.foot{border-top:1px solid var(--line);padding:22px 0 40px}.foot-bar{justify-content:space-between}.credit{font-size:.8rem}@media(max-width:800px){.bar nav{display:none}.hero-grid,.quote-grid,.foot-bar,form{display:block}.cards{grid-template-columns:1fr}.hero,.section{padding:40px 0}.panel,form{margin-top:24px}button[type=submit]{width:100%}}`;

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/'/g, "&#39;");
}

function digits(phone) {
  return String(phone || "").replace(/\D/g, "");
}

function slug(name) {
  return (
    String(name || "shop")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "shop"
  );
}

function townsList(towns) {
  return String(towns || "")
    .split(/[,/\n]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function readForm() {
  const form = document.getElementById("builder");
  const data = Object.fromEntries(new FormData(form));
  const trade = TRADES[data.trade] || TRADES.hvac;
  const towns = townsList(data.towns);
  return {
    name: (data.name || "Your shop").trim(),
    phone: (data.phone || "").trim() || "(905) 555-0100",
    email: (data.email || "").trim(),
    towns: towns.length ? towns : ["Your town"],
    diagnostic: (data.diagnostic || "89").replace(/[^\d.]/g, "") || "89",
    afterHours: (data.afterHours || "75").replace(/[^\d.]/g, "") || "75",
    trade,
    tradeKey: data.trade || "hvac",
  };
}

function licensed() {
  return (
    new URLSearchParams(location.search).has("licensed") ||
    /thanks\.html$/i.test(location.pathname)
  );
}

function buildPage(shop) {
  const tel = digits(shop.phone);
  const cards = shop.trade.cards
    .map(
      ([title, body]) =>
        `<article><h3>${escapeHtml(title)}</h3><p>${escapeHtml(body)}</p></article>`,
    )
    .join("");
  const towns = shop.towns.map((town) => `<li>${escapeHtml(town)}</li>`).join("");
  const mail = shop.email
    ? `const mail=${JSON.stringify(shop.email)};const body=encodeURIComponent("Name: "+data.name+"\\nPhone: "+data.phone+"\\nIssue: "+data.issue+"\\nAddress: "+data.address);window.location.href="mailto:"+mail+"?subject="+encodeURIComponent("Quote request")+"&body="+body;`
    : `show("Add a shop email in the generator so this form can open a message.",false);return;`;
  const credit = licensed()
    ? ""
    : `<p class="credit">Built with <a href="https://abstractigakis.github.io/lead-machine-demo/build.html">Lead Machine</a>. $49 CAD removes this line.</p>`;

  return `<!DOCTYPE html>
<html lang="en-CA">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>${escapeHtml(shop.name)} — same-day ${escapeHtml(shop.trade.label)} in ${escapeHtml(shop.towns[0])}</title>
<meta name="description" content="${escapeAttr(shop.name)} ${escapeAttr(shop.trade.label.toLowerCase())} for ${escapeAttr(shop.towns.join(", "))}. Price before the truck."/>
<style>${CSS}</style>
</head>
<body>
<a class="skip" href="#quote">Skip to quote form</a>
<header class="top"><div class="wrap bar">
<a class="brand" href="#"><span class="mark" aria-hidden="true"></span>${escapeHtml(shop.name)}</a>
<nav><a href="#work">Services</a><a href="#area">Service area</a><a href="#quote">Get a quote</a></nav>
<a class="phone" href="tel:+1${escapeAttr(tel)}">${escapeHtml(shop.phone)}</a>
</div></header>
<main>
<section class="hero"><div class="wrap hero-grid"><div>
<p class="kicker">${escapeHtml(shop.towns[0])} · ${escapeHtml(shop.trade.kicker)}</p>
<h1>${escapeHtml(shop.trade.headline)}</h1>
<p class="lede">${escapeHtml(shop.trade.lede)}</p>
<div class="hero-actions">
<a class="btn" href="#quote">Request a same-day window</a>
<p class="fine">Typical weekday windows: 8–11, 12–3, 3–6.</p>
</div></div>
<aside class="panel"><h2>What a visit actually costs</h2>
<ul class="price">
<li><span>Diagnostic</span><strong>$${escapeHtml(shop.diagnostic)}</strong></li>
<li><span>Waived if you approve the repair</span><strong>Yes</strong></li>
<li><span>After-hours surcharge</span><strong>$${escapeHtml(shop.afterHours)}</strong></li>
<li><span>Written price before work</span><strong>Always</strong></li>
</ul>
<p class="panel-note">If we cannot name a number, we do not start.</p>
</aside></div></section>
<section id="work" class="section"><div class="wrap">
<h2>Work we take</h2>
<div class="cards">${cards}</div>
</div></section>
<section id="area" class="section muted"><div class="wrap">
<h2>Service area</h2>
<ul class="towns">${towns}</ul>
</div></section>
<section id="quote" class="section"><div class="wrap quote-grid">
<form id="quote-form">
<label>Name<input name="name" autocomplete="name" required/></label>
<label>Phone<input name="phone" type="tel" autocomplete="tel" required/></label>
<label class="wide">What failed<input name="issue" required placeholder="${escapeAttr(shop.trade.issuePh)}"/></label>
<label class="wide">Address<input name="address" autocomplete="street-address" required/></label>
<button type="submit">Send the request</button>
<p class="form-status" id="form-status" role="status"></p>
</form>
<aside class="panel">
<h2>Or call</h2>
<p><a class="phone" href="tel:+1${escapeAttr(tel)}">${escapeHtml(shop.phone)}</a></p>
<p class="panel-note">The form opens an email to the shop. Nothing is stored on a server.</p>
</aside>
</div></section>
</main>
<footer class="foot"><div class="wrap foot-bar">
<p>${escapeHtml(shop.name)} · price before the truck.</p>
${credit}
</div></footer>
<script>
const form=document.getElementById("quote-form");
const status=document.getElementById("form-status");
function show(message,ok){status.textContent=message;status.dataset.ok=ok?"1":"0"}
form.addEventListener("submit",function(event){
event.preventDefault();
const data=Object.fromEntries(new FormData(form));
if(["name","phone","issue","address"].some(function(key){return !String(data[key]||"").trim()})){show("Fill every field.",false);return;}
${mail}
form.reset();
show("Request opened in your mail app.",true);
});
</script>
</body></html>`;
}

function render() {
  const shop = readForm();
  const html = buildPage(shop);
  const frame = document.getElementById("preview");
  if (frame) frame.srcdoc = html;
  const download = document.getElementById("download");
  if (download) download.dataset.file = slug(shop.name) + ".html";
  return html;
}

function downloadPage() {
  const html = render();
  const name = document.getElementById("download")?.dataset.file || "shop.html";
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.click();
  URL.revokeObjectURL(url);
}

document.getElementById("builder")?.addEventListener("input", render);
document.getElementById("download")?.addEventListener("click", downloadPage);
render();
