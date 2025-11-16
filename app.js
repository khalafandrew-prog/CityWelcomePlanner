// SPA navigation
const navButtons = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll(".section");

navButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.section;
    navButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    sections.forEach(sec => {
      sec.classList.toggle("section-active", sec.id === target);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// Hero CTA buttons
document.querySelectorAll("[data-section-target]").forEach(btn => {
  btn.addEventListener("click", () => {
    const section = btn.dataset.sectionTarget;
    document.querySelector(`.nav-item[data-section="${section}"]`).click();
  });
});

/* ---------- STATIC DATA (you can expand this later) ---------- */

// Airports (board­ing pass style)
const airportData = [
  {
    code: "LHR",
    name: "Heathrow",
    routes: [
      {
        label: "Heathrow Express",
        from: "London Paddington",
        to: "Heathrow Terminals 2 & 3",
        duration: "15–20 mins",
        notes: "Separate ticket – Oyster not valid."
      },
      {
        label: "TfL Rail / Elizabeth line",
        from: "London Paddington",
        to: "Heathrow all terminals",
        duration: "30–35 mins",
        notes: "Contactless & Oyster valid, Zone 6."
      },
      {
        label: "Piccadilly line",
        from: "Any Piccadilly line station",
        to: "All Heathrow terminals",
        duration: "45–60 mins",
        notes: "Cheapest option, but slower."
      }
    ]
  },
  {
    code: "LGW",
    name: "Gatwick",
    routes: [
      {
        label: "Gatwick Express",
        from: "London Victoria",
        to: "Gatwick Airport",
        duration: "30–35 mins",
        notes: "Fastest direct train."
      },
      {
        label: "Southern / Thameslink",
        from: "Victoria / London Bridge",
        to: "Gatwick Airport",
        duration: "30–45 mins",
        notes: "Usually cheaper – check live prices."
      }
    ]
  },
  {
    code: "LTN",
    name: "Luton",
    routes: [
      {
        label: "East Midlands / Thameslink",
        from: "St Pancras / Farringdon",
        to: "Luton Airport Parkway",
        duration: "25–35 mins",
        notes: "Shuttle bus connects to terminal."
      }
    ]
  },
  {
    code: "STN",
    name: "Stansted",
    routes: [
      {
        label: "Stansted Express",
        from: "London Liverpool Street",
        to: "Stansted Airport",
        duration: "45–50 mins",
        notes: "Dedicated airport train."
      }
    ]
  }
];

const airportContainer = document.getElementById("airportCards");
airportData.forEach(ap => {
  ap.routes.forEach(route => {
    const card = document.createElement("article");
    card.className = "boarding-card";
    card.innerHTML = `
      <div class="boarding-header">
        <div>
          <div class="boarding-label">Airport</div>
          <div class="boarding-big">${ap.name} (${ap.code})</div>
        </div>
        <div>
          <div class="boarding-label">Train</div>
          <div>${route.label}</div>
        </div>
      </div>
      <div class="boarding-body">
        <div>
          <div class="boarding-label">From</div>
          <div>${route.from}</div>
        </div>
        <div>
          <div class="boarding-label">To</div>
          <div>${route.to}</div>
        </div>
      </div>
      <div class="boarding-footer">
        <strong>Duration:</strong> ${route.duration} • ${route.notes}
      </div>
    `;
    airportContainer.appendChild(card);
  });
});

// Mini attraction datasets (sample)
const attractions = [
  {
    name: "London Eye",
    area: "South Bank",
    type: "view",
    price: "Paid",
    tags: "family,view,landmark"
  },
  {
    name: "Tower of London",
    area: "Tower Hill",
    type: "landmark",
    price: "Paid",
    tags: "history,landmark"
  },
  {
    name: "Sky Garden",
    area: "City of London",
    type: "view",
    price: "Free (booking)",
    tags: "free,view"
  },
  {
    name: "Borough Market",
    area: "London Bridge",
    type: "food",
    price: "Free entry",
    tags: "food,market,cheap"
  }
];
const museums = [
  {
    name: "British Museum",
    area: "Bloomsbury",
    price: "Free",
    tags: "history,free,indoor"
  },
  {
    name: "Natural History Museum",
    area: "South Kensington",
    price: "Free",
    tags: "family,science"
  }
];
const family = [
  {
    name: "London Zoo",
    area: "Regent’s Park",
    price: "Paid",
    tags: "animals,family"
  },
  {
    name: "Diana Memorial Playground",
    area: "Kensington Gardens",
    price: "Free",
    tags: "free,playground"
  }
];
const parks = [
  {
    name: "Hyde Park",
    area: "Central",
    price: "Free",
    tags: "park,boating"
  },
  {
    name: "Greenwich Park",
    area: "Greenwich",
    price: "Free",
    tags: "views,park"
  }
];
const shopping = [
  { name: "Oxford Street", area: "West End", tags: "high street" },
  { name: "Westfield Stratford City", area: "Stratford", tags: "mall" },
  { name: "Camden Market", area: "Camden", tags: "market,alternative" }
];

function renderCardGrid(list, containerId) {
  const el = document.getElementById(containerId);
  el.innerHTML = "";
  list.forEach(item => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <h3>${item.name}</h3>
      <p class="text-muted">${item.area || ""}</p>
      <p>${item.price ? `<strong>${item.price}</strong>` : ""}</p>
      <p class="text-muted small">${item.tags || ""}</p>
    `;
    el.appendChild(card);
  });
}

renderCardGrid(attractions, "attractionCards");
renderCardGrid(museums, "museumCards");
renderCardGrid(family, "familyCards");
renderCardGrid(parks, "parkCards");
renderCardGrid(shopping, "shoppingCards");

// Simple search/filter for attractions
const attractionSearch = document.getElementById("attractionSearch");
const attractionFilter = document.getElementById("attractionFilter");

function filterAttractions() {
  const q = (attractionSearch.value || "").toLowerCase();
  const f = attractionFilter.value;
  const filtered = attractions.filter(a => {
    const matchesText =
      a.name.toLowerCase().includes(q) || (a.tags || "").toLowerCase().includes(q);
    let matchesFilter = true;
    if (f === "free") matchesFilter = (a.price || "").toLowerCase().includes("free");
    if (f === "family") matchesFilter = (a.tags || "").toLowerCase().includes("family");
    if (f === "view") matchesFilter = a.type === "view";
    return matchesText && matchesFilter;
  });
  renderCardGrid(filtered, "attractionCards");
}

if (attractionSearch && attractionFilter) {
  attractionSearch.addEventListener("input", filterAttractions);
  attractionFilter.addEventListener("change", filterAttractions);
}

/* ---------- Embassy selector (sample data – you can add ALL countries later) ---------- */

const embassies = [
  {
    country: "Canada",
    phone: "020 7004 6000",
    hours: "Mon–Fri 08:00–16:00",
    address: "Canada House, Trafalgar Square, London SW1Y 5BJ",
    nearest: "Charing Cross / Piccadilly Circus / Leicester Square"
  },
  {
    country: "United States",
    phone: "020 7499 9000",
    hours: "Mon–Fri 08:00–17:00",
    address: "33 Nine Elms Lane, London SW11 7US",
    nearest: "Vauxhall"
  },
  {
    country: "Australia",
    phone: "020 7379 4334",
    hours: "Mon–Fri 09:00–17:00",
    address: "Strand, London WC2B 4LA",
    nearest: "Temple / Holborn"
  }
  // TODO: extend list with all embassies
];

const embassySelect = document.getElementById("embassySelect");
const embassyDetails = document.getElementById("embassyDetails");

if (embassySelect) {
  embassies.forEach(e => {
    const opt = document.createElement("option");
    opt.value = e.country;
    opt.textContent = e.country;
    embassySelect.appendChild(opt);
  });

  embassySelect.addEventListener("change", () => {
    const chosen = embassies.find(e => e.country === embassySelect.value);
    if (!chosen) {
      embassyDetails.innerHTML = "";
      return;
    }
    embassyDetails.innerHTML = `
      <strong>${chosen.country} Embassy</strong><br/>
      Tel: ${chosen.phone}<br/>
      Hours: ${chosen.hours}<br/>
      Address: ${chosen.address}<br/>
      Nearest transport: ${chosen.nearest}
    `;
  });

  embassySelect.dispatchEvent(new Event("change"));
}

/* ---------- LOGIN OPTION 3 – Email OR Phone via Firebase ---------- */

const loginBtn = document.getElementById("loginBtn");
const loginModal = document.getElementById("loginModal");
const closeLogin = document.getElementById("closeLogin");
const userChip = document.getElementById("userChip");
const userNameLabel = document.getElementById("userNameLabel");
const logoutBtn = document.getElementById("logoutBtn");
const loginStatus = document.getElementById("loginStatus");

// Tabs
const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".tab-panel");

tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const tab = btn.dataset.tab;
    tabButtons.forEach(b => b.classList.remove("tab-active"));
    btn.classList.add("tab-active");
    tabPanels.forEach(p => p.classList.toggle("tab-panel-active", p.id === tab));
  });
});

function openModal() {
  loginModal.classList.remove("hidden");
  loginStatus.textContent = "";
}

function closeModal() {
  loginModal.classList.add("hidden");
}

loginBtn.addEventListener("click", openModal);
closeLogin.addEventListener("click", closeModal);

if (loginModal) {
  loginModal.addEventListener("click", e => {
    if (e.target === loginModal.querySelector(".modal-backdrop")) closeModal();
  });
}

// Firebase auth helpers
let auth;
try {
  auth = firebase.auth();
} catch (e) {
  console.warn("Firebase not configured yet.");
}

// Email login/signup
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const emailLoginBtn = document.getElementById("emailLoginBtn");
const emailSignupBtn = document.getElementById("emailSignupBtn");

function setStatus(msg, isError = false) {
  if (!loginStatus) return;
  loginStatus.textContent = msg;
  loginStatus.style.color = isError ? "#b91c1c" : "#374151";
}

if (auth && emailLoginBtn && emailSignupBtn) {
  emailLoginBtn.addEventListener("click", async () => {
    try {
      setStatus("Signing in…");
      await auth.signInWithEmailAndPassword(emailInput.value, passwordInput.value);
      setStatus("Logged in.");
    } catch (err) {
      setStatus(err.message, true);
    }
  });

  emailSignupBtn.addEventListener("click", async () => {
    try {
      setStatus("Creating account…");
      await auth.createUserWithEmailAndPassword(emailInput.value, passwordInput.value);
      setStatus("Account created & logged in.");
    } catch (err) {
      setStatus(err.message, true);
    }
  });
}

// Phone auth
const phoneInput = document.getElementById("phoneInput");
const phoneSendCodeBtn = document.getElementById("phoneSendCodeBtn");
const phoneCodeArea = document.getElementById("phoneCodeArea");
const phoneCodeInput = document.getElementById("phoneCodeInput");
const phoneVerifyBtn = document.getElementById("phoneVerifyBtn");

let confirmationResult;

if (auth && phoneSendCodeBtn && phoneVerifyBtn) {
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
    "recaptcha-container",
    { size: "invisible" }
  );

  phoneSendCodeBtn.addEventListener("click", async () => {
    try {
      setStatus("Sending verification code…");
      confirmationResult = await auth.signInWithPhoneNumber(
        phoneInput.value,
        window.recaptchaVerifier
      );
      phoneCodeArea.classList.remove("hidden");
      setStatus("Code sent. Please check your SMS.");
    } catch (err) {
      setStatus(err.message, true);
    }
  });

  phoneVerifyBtn.addEventListener("click", async () => {
    try {
      setStatus("Verifying code…");
      await confirmationResult.confirm(phoneCodeInput.value);
      setStatus("Phone sign-in successful.");
    } catch (err) {
      setStatus(err.message, true);
    }
  });
}

// Keep UI in sync with auth state
if (auth) {
  auth.onAuthStateChanged(user => {
    if (user) {
      const name = user.email || user.phoneNumber || "Traveller";
      userNameLabel.textContent = name;
      userChip.classList.remove("hidden");
      loginBtn.classList.add("hidden");
      closeModal();
    } else {
      userChip.classList.add("hidden");
      loginBtn.classList.remove("hidden");
    }
  });

  logoutBtn.addEventListener("click", () => auth.signOut());
}

/* ---------- SERVICE WORKER REGISTRATION (offline) ---------- */

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("service-worker.js")
      .catch(err => console.log("SW registration failed", err));
  });
}
