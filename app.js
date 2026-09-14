const form = document.getElementById("quote-form");
const status = document.getElementById("form-status");

function show(message, ok) {
  status.textContent = message;
  status.dataset.ok = ok ? "1" : "0";
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  const missing = ["name", "phone", "issue", "address"].filter((key) => !String(data[key] || "").trim());
  if (missing.length) {
    show("Fill every field. We will not guess a street.", false);
    return;
  }

  const request = {
    ...data,
    receivedAt: new Date().toISOString(),
  };
  const key = form.dataset.store || "lead-machine-quotes";
  const existing = JSON.parse(localStorage.getItem(key) || "[]");
  existing.unshift(request);
  localStorage.setItem(key, JSON.stringify(existing.slice(0, 50)));
  form.reset();
  show("Request saved on this device. In a live install this texts the shop.", true);
});
