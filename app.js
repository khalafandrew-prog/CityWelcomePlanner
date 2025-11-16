// Simple section nav
const navButtons = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".page-section");

navButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.target;

    navButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    sections.forEach(s => {
      s.classList.toggle("active", s.id === target);
    });

    // scroll to top when switching
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// Airport data for London
const airportData = [
  {
    name: "Heathrow",
    code: "LHR",
    tagline: "West London – Underground + fast trains",
    note: "Major international hub with 4 active terminals.",
    services: [
      {
        type: "Train – Heathrow Express",
        from: "London Paddington",
        to: "Heathrow Terminals 2 & 3 / 5",
        duration: "15–20 minutes",
        approx: "Fast but more expensive"
      },
      {
        type: "Train – Elizabeth Line / TfL Rail",
        from: "Paddington & central London stops",
        to: "Heathrow Terminals",
        duration: "30–50 minutes",
        approx: "Cheaper than Heathrow Express"
      },
      {
        type: "Tube – Piccadilly line",
        from: "Central London underground stations",
        to: "All Heathrow terminals",
        duration: "45–60 minutes",
        approx: "Budget-friendly option"
      }
    ]
  },
  {
    name: "Gatwick",
    code: "LGW",
    tagline: "South of London – trains to Victoria & London Bridge",
    note: "",
    services: [
      {
        type: "Train – Gatwick Express",
        from: "London Victoria",
        to: "Gatwick Airport",
        duration: "30–35 minutes",
        approx: "Non-stop train"
      },
      {
        type: "Train – Southern / Thameslink",
        from: "Victoria / London Bridge / St Pancras",
        to: "Gatwick Airport",
        duration: "30–45 minutes",
        approx: "Cheaper; stops on route"
      }
    ]
  },
  {
    name: "Luton",
    code: "LTN",
    tagline: "North of London – train + shuttle bus",
    note: "",
    services: [
      {
        type: "Train – East Midlands / Thameslink",
        from: "St Pancras, Farringdon, Blackfriars",
        to: "Luton Airport Parkway",
        duration: "25–35 minutes",
        approx: "Then shuttle bus 10 minutes to terminal"
      }
    ]
  },
  {
    name: "Stansted",
    code: "STN",
    tagline: "North-east of London – dedicated express train",
    note: "",
    services: [
      {
        type: "Train – Stansted Express",
        from: "Liverpool Street",
        to: "Stansted Airport",
        duration: "45–50 minutes",
        approx: "Fastest rail option"
      }
    ]
  },
  {
    name: "London City",
    code: "LCY",
    tagline: "East London – close to Canary Wharf / City",
    note: "",
    services: [
      {
        type: "DLR – Docklands Light Railway",
        from: "Bank / Tower Gateway stations",
        to: "London City Airport",
        duration: "25–35 minutes",
        approx: "Tap in with contactless / Oyster"
      }
    ]
  }
];

function renderAirports() {
  const container = document.getElementById("airportCards");
  if (!container) return;

  container.innerHTML = airportData
    .map(airport => {
      const services = airport.services
        .map(
          s => `
        <li>
          <strong>${s.type}</strong><br/>
          <span>From: ${s.from}</span><br/>
          <span>To: ${s.to}</span><br/>
          <span>Duration: ${s.duration}</span><br/>
          <span>${s.approx}</span>
        </li>`
        )
        .join("");

      return `
        <article class="card">
          <div class="airport-name">
            ${airport.name} Airport
            <span class="airport-code">(${airport.code})</span>
          </div>
          <p class="airport-tagline">${airport.tagline}</p>
          ${airport.note ? `<p class="subtext">${airport.note}</p>` : ""}
          <span class="transport-pill">Trains &amp; Underground</span>
          <ul class="transport-list">${services}</ul>
        </article>
      `;
    })
    .join("");
}

renderAirports();

// Register service worker for offline use
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("service-worker.js")
      .catch(err => console.log("SW registration failed", err));
  });
}
