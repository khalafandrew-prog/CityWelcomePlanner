// CityWP – City Welcome Planner, London
// All display data lives here so you can edit/add easily.

// ---------- DATA ----------

// Airport train options (shortened from your cards, you can expand text later)
const airports = [
  {
    code: "LHR",
    name: "Heathrow (LHR)",
    area: "West London",
    intro: "Underground + fast trains from Heathrow to central London.",
    routes: [
      {
        type: "Train",
        name: "Heathrow Express",
        from: "London Paddington",
        to: "Heathrow Terminals 2, 3 & 5",
        duration: "15–20 minutes",
        notes:
          "Very fast non-stop train. More expensive. Buy separate Heathrow Express ticket."
      },
      {
        type: "Train",
        name: "TfL Rail / Elizabeth line",
        from: "London Paddington",
        to: "Heathrow Terminals",
        duration: "30–50 minutes",
        notes:
          "Cheaper than Heathrow Express. Contactless or Oyster usually valid – always check signs."
      },
      {
        type: "Tube",
        name: "Piccadilly line",
        from: "Various Zone 1 stations",
        to: "All Heathrow Terminals",
        duration: "45–60 minutes",
        notes:
          "Cheapest option with Oyster/contactless. Can be busy at peak times; no reservations."
      }
    ]
  },
  {
    code: "LGW",
    name: "Gatwick (LGW)",
    area: "South of London",
    intro: "Fast trains from Gatwick into central London.",
    routes: [
      {
        type: "Train",
        name: "Gatwick Express",
        from: "London Victoria",
        to: "Gatwick Airport",
        duration: "30–35 minutes",
        notes: "Fast, dedicated airport train. Separate ticket required."
      },
      {
        type: "Train",
        name: "Southern / Thameslink",
        from: "London Victoria / London Bridge / St Pancras",
        to: "Gatwick Airport",
        duration: "30–45 minutes",
        notes: "Regular trains. Often cheaper; may stop at multiple stations."
      }
    ]
  },
  {
    code: "LTN",
    name: "Luton (LTN)",
    area: "North of London",
    intro: "Train + shuttle bus from Luton Airport Parkway.",
    routes: [
      {
        type: "Train",
        name: "East Midlands / Thameslink",
        from: "St Pancras, Farringdon, Blackfriars",
        to: "Luton Airport Parkway",
        duration: "25–35 minutes",
        notes:
          "From Parkway station take shuttle bus to terminal (around 10 minutes, extra fee)."
      }
    ]
  },
  {
    code: "STN",
    name: "Stansted (STN)",
    area: "North-east of London",
    intro: "Fast train from Liverpool Street to Stansted Airport.",
    routes: [
      {
        type: "Train",
        name: "Stansted Express",
        from: "London Liverpool Street",
        to: "Stansted Airport",
        duration: "45–50 minutes",
        notes:
          "Frequent direct train. Separate ticket required; Oyster not valid."
      }
    ]
  },
  {
    code: "LCY",
    name: "London City (LCY)",
    area: "East London / Docklands",
    intro: "Small business-focused airport with quick DLR connection.",
    routes: [
      {
        type: "Train",
        name: "DLR (Docklands Light Railway)",
        from: "Bank / Stratford via DLR",
        to: "London City Airport",
        duration: "25–35 minutes",
        notes:
          "Pay with contactless/Oyster. Change to DLR at Bank, Canning Town or Stratford."
      }
    ]
  }
];

// Attractions / Museums / Family / Parks / Shopping
// To keep it simple we use one big list with categories.
const places = [
  // Landmarks
  {
    category: "attraction",
    name: "Big Ben & Houses of Parliament",
    area: "Westminster",
    price: "Outside view free; tours ticketed",
    desc: "Iconic clock tower and UK Parliament building on the River Thames.",
    tags: ["landmark", "photo", "river"]
  },
  {
    category: "attraction",
    name: "Tower Bridge",
    area: "Tower Hill",
    price: "Outside free; exhibition ticketed",
    desc: "Famous bascule bridge with glass-floor walkway and Tower Bridge Experience.",
    tags: ["landmark", "view", "photo"]
  },
  {
    category: "attraction",
    name: "London Eye",
    area: "South Bank",
    price: "Paid – from around £30",
    desc: "Giant riverside wheel with panoramic views over London.",
    tags: ["view", "family", "paid"]
  },
  {
    category: "attraction",
    name: "Buckingham Palace (Outside & Changing of the Guard)",
    area: "Green Park / St James’s Park",
    price: "Outside free; inside tours seasonally ticketed",
    desc: "Official London residence of the King with ceremonial Changing of the Guard.",
    tags: ["royal", "landmark", "photo"]
  },
  // Museums
  {
    category: "museum",
    name: "British Museum",
    area: "Bloomsbury",
    price: "Free (paid exhibitions)",
    desc: "Vast collection of world art and artefacts, including the Rosetta Stone.",
    tags: ["indoor", "history", "free"]
  },
  {
    category: "museum",
    name: "Natural History Museum",
    area: "South Kensington",
    price: "Free (paid exhibitions)",
    desc: "Dinosaurs, volcanoes and nature exhibits in a beautiful building – great for kids.",
    tags: ["family", "indoor", "free"]
  },
  {
    category: "museum",
    name: "Science Museum",
    area: "South Kensington",
    price: "Free (some paid experiences)",
    desc: "Interactive science, space and technology exhibits; very child-friendly.",
    tags: ["family", "hands-on", "indoor"]
  },
  {
    category: "museum",
    name: "Victoria & Albert Museum (V&A)",
    area: "South Kensington",
    price: "Free (paid exhibitions)",
    desc: "Art, design and fashion museum with stunning galleries.",
    tags: ["art", "design", "indoor"]
  },
  // Family
  {
    category: "family",
    name: "London Zoo",
    area: "Regent’s Park",
    price: "Paid – book ahead for best price",
    desc: "Historic zoo with animals, play areas and family-friendly events.",
    tags: ["animals", "family"]
  },
  {
    category: "family",
    name: "Sea Life London Aquarium",
    area: "South Bank",
    price: "Paid",
    desc: "Large aquarium opposite the Houses of Parliament.",
    tags: ["indoor", "family"]
  },
  {
    category: "family",
    name: "Hamleys Toy Store",
    area: "Regent Street",
    price: "Free entry",
    desc: "Seven floors of toys, games and demonstrations – fun even if you don’t buy.",
    tags: ["shopping", "family"]
  },
  // Parks
  {
    category: "park",
    name: "Hyde Park & Kensington Gardens",
    area: "Central / West",
    price: "Free",
    desc: "Large central park with Serpentine lake, playgrounds and walking paths.",
    tags: ["park", "picnic", "lake"]
  },
  {
    category: "park",
    name: "Regent’s Park & Primrose Hill",
    area: "North-west",
    price: "Free",
    desc: "Beautiful gardens and a hill with great views over the city skyline.",
    tags: ["park", "view"]
  },
  {
    category: "park",
    name: "Greenwich Park",
    area: "Greenwich",
    price: "Free",
    desc: "Green park with views over Canary Wharf and the Maritime Museum/Observatory nearby.",
    tags: ["park", "view", "family"]
  },
  // Shopping
  {
    category: "shopping",
    name: "Oxford Street",
    area: "West End",
    price: "Window shopping free",
    desc: "London’s busiest shopping street with major brands and department stores.",
    tags: ["shopping", "busy"]
  },
  {
    category: "shopping",
    name: "Regent Street & Carnaby",
    area: "West End",
    price: "Window shopping free",
    desc: "Flagship stores and stylish side streets with cafés and boutiques.",
    tags: ["shopping"]
  },
  {
    category: "shopping",
    name: "Covent Garden",
    area: "Central London",
    price: "Free to wander",
    desc: "Covered market, street performers, shops and restaurants in historic piazza.",
    tags: ["shopping", "food", "street-performers"]
  },
  {
    category: "shopping",
    name: "Camden Market",
    area: "Camden",
    price: "Free entry",
    desc: "Alternative market with food stalls, vintage clothes and music culture.",
    tags: ["market", "food"]
  }
];

// Embassies – initial set of popular ones.
// You can add MANY more by copying the same object structure.
const embassies = [
  {
    country: "Canada",
    phone: "020 7004 6000",
    hours: "Mon–Fri 08:00–16:00",
    nearestUnderground: [
      "Charing Cross – Bakerloo / Northern (4 min walk)",
      "Piccadilly Circus – Piccadilly / Bakerloo (4 min walk)",
      "Leicester Square – Piccadilly / Northern (5 min walk)"
    ],
    address: "Canada House, Trafalgar Square, London, SW1Y 5BJ",
    website: "https://www.international.gc.ca/country-pays/uk-royaume_uni/london"
  },
  {
    country: "United States of America",
    phone: "020 7499 9000",
    hours: "Mon–Fri (appointment only)",
    nearestUnderground: ["Marble Arch – Central line", "Bond Street – Central / Elizabeth"],
    address: "33 Nine Elms Lane, London, SW11 7US",
    website: "https://uk.usembassy.gov/"
  },
  {
    country: "Australia",
    phone: "020 7379 4334",
    hours: "Mon–Fri (check website)",
    nearestUnderground: ["Temple – District / Circle", "Holborn – Central / Piccadilly"],
    address: "Strand, London, WC2B 4LA",
    website: "https://uk.embassy.gov.au/"
  },
  {
    country: "New Zealand",
    phone: "020 7930 8422",
    hours: "Mon–Fri (check website)",
    nearestUnderground: ["Green Park – Piccadilly / Victoria / Jubilee"],
    address: "New Zealand House, Haymarket, London, SW1Y 4TE",
    website: "https://www.mfat.govt.nz/en/embassies/new-zealand-high-commission-london/"
  },
  {
    country: "Ireland",
    phone: "020 7235 2171",
    hours: "Mon–Fri",
    nearestUnderground: ["Green Park – Piccadilly / Victoria / Jubilee"],
    address: "17 Grosvenor Place, London, SW1X 7HR",
    website: "https://www.dfa.ie/irish-embassy/great-britain/"
  },
  {
    country: "France",
    phone: "020 7073 1000",
    hours: "Mon–Fri",
    nearestUnderground: ["South Kensington", "Gloucester Road"],
    address: "58 Knightsbridge, London, SW1X 7JT",
    website: "https://uk.ambafrance.org/"
  },
  {
    country: "Germany",
    phone: "020 7824 1300",
    hours: "Mon–Fri",
    nearestUnderground: ["Green Park", "Hyde Park Corner"],
    address: "23 Belgrave Square, London, SW1X 8PZ",
    website: "https://uk.diplo.de/"
  },
  {
    country: "Italy",
    phone: "020 7312 2200",
    hours: "Mon–Fri",
    nearestUnderground: ["Green Park"],
    address: "14 Three Kings Yard, London, W1K 4EH",
    website: "https://amblondra.esteri.it/"
  },
  {
    country: "Spain",
    phone: "020 7727 3553",
    hours: "Mon–Fri",
    nearestUnderground: ["Notting Hill Gate"],
    address: "39 Chesham Place, London, SW1X 8SB",
    website: "https://www.exteriores.gob.es/embajadas/londres"
  },
  {
    country: "Portugal",
    phone: "020 7235 5331",
    hours: "Mon–Fri",
    nearestUnderground: ["South Kensington"],
    address: "11 Belgrave Square, London, SW1X 8PP",
    website: "https://www.londres.embaixadaportugal.mne.gov.pt/"
  },
  {
    country: "India",
    phone: "020 7632 3030",
    hours: "Mon–Fri",
    nearestUnderground: ["Aldgate East", "Liverpool Street"],
    address: "India House, Aldwych, London, WC2B 4NA",
    website: "https://www.hcilondon.gov.in/"
  },
  {
    country: "China",
    phone: "020 7299 4049",
    hours: "Mon–Fri",
    nearestUnderground: ["Gloucester Road"],
    address: "49–51 Portland Place, London, W1B 1JL",
    website: "http://www.chinese-embassy.org.uk/"
  },
  {
    country: "Japan",
    phone: "020 7465 6500",
    hours: "Mon–Fri",
    nearestUnderground: ["Green Park"],
    address: "101–104 Piccadilly, London, W1J 7JT",
    website: "https://www.uk.emb-japan.go.jp/"
  },
  {
    country: "Brazil",
    phone: "020 7747 4500",
    hours: "Mon–Fri",
    nearestUnderground: ["Green Park"],
    address: "14–16 Cockspur Street, London, SW1Y 5BL",
    website: "https://www.gov.br/mre/pt-br/embaixada-londres"
  },
  {
    country: "Saudi Arabia",
    phone: "020 7917 3000",
    hours: "Mon–Fri",
    nearestUnderground: ["Marble Arch"],
    address: "30 Charles Street, Mayfair, London, W1J 5DZ",
    website: "https://embassies.mofa.gov.sa/sites/UK/"
  }
];

// ---------- RENDER HELPERS ----------

function createRouteHTML(route) {
  return `
    <div class="route">
      <span class="badge">${route.type}</span>
      <h4>${route.name}</h4>
      <p><strong>From:</strong> ${route.from}<br/>
         <strong>To:</strong> ${route.to}<br/>
         <strong>Duration:</strong> ${route.duration}</p>
      <p class="note">${route.notes}</p>
    </div>
  `;
}

function renderAirports() {
  const container = document.getElementById("airport-list");
  container.innerHTML = airports
    .map((ap) => {
      const routesHTML = ap.routes.map(createRouteHTML).join("");
      return `
      <article class="card">
        <h2>${ap.name}</h2>
        <p class="note">${ap.intro}</p>
        ${routesHTML}
      </article>`;
    })
    .join("");
}

function renderPlaceCard(place) {
  const tagHTML = place.tags
    .map((t) => `<span class="pill">${t}</span>`)
    .join(" ");
  return `
    <article class="card">
      <h2>${place.name}</h2>
      <p><strong>Area:</strong> ${place.area}</p>
      <p><strong>Price:</strong> ${place.price}</p>
      <p class="note">${place.desc}</p>
      <div>${tagHTML}</div>
    </article>
  `;
}

function renderPlaceSection(targetId, category) {
  const container = document.getElementById(targetId);
  const sectionPlaces = places.filter((p) => p.category === category);
  container.innerHTML = sectionPlaces.map(renderPlaceCard).join("");
}

function renderEmbassies(filterText = "") {
  const container = document.getElementById("embassy-list");
  const text = filterText.trim().toLowerCase();

  const filtered = embassies.filter((e) =>
    e.country.toLowerCase().includes(text)
  );

  container.innerHTML = filtered
    .map((e) => {
      const nearest = e.nearestUnderground
        .map((n) => `<li>${n}</li>`)
        .join("");
      return `
        <article class="card">
          <h2>${e.country}</h2>
          <ul class="key-list">
            <li><strong>Telephone:</strong> ${e.phone}</li>
            <li><strong>Opening hours:</strong> ${e.hours}</li>
          </ul>
          <p><strong>Nearest Underground:</strong></p>
          <ul class="key-list">${nearest}</ul>
          <p><strong>Address:</strong> ${e.address}</p>
          <p><a href="${e.website}" target="_blank" rel="noopener">Visit website</a></p>
        </article>
      `;
    })
    .join("");

  if (!filtered.length) {
    container.innerHTML =
      '<p class="note">No embassies match that search yet. Try another country name.</p>';
  }
}

// ---------- NAV LOGIC ----------

function showSection(id) {
  document
    .querySelectorAll(".section")
    .forEach((el) => el.classList.remove("visible"));
  document.getElementById(id).classList.add("visible");

  document
    .querySelectorAll(".nav-tabs .tab")
    .forEach((btn) => btn.classList.remove("active"));
  const activeBtn = document.querySelector(
    `.nav-tabs .tab[data-section="${id}"]`
  );
  if (activeBtn) activeBtn.classList.add("active");
}

// ---------- INIT ----------

document.addEventListener("DOMContentLoaded", function () {
  // Render all dynamic sections
  renderAirports();
  renderPlaceSection("attraction-list", "attraction");
  renderPlaceSection("museum-list", "museum");
  renderPlaceSection("family-list", "family");
  renderPlaceSection("park-list", "park");
  renderPlaceSection("shopping-list", "shopping");
  renderEmbassies();

  // Nav buttons
  document.querySelectorAll(".nav-tabs .tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-section");
      showSection(id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  // Embassy search
  const embassySearch = document.getElementById("embassy-search");
  if (embassySearch) {
    embassySearch.addEventListener("input", (e) => {
      renderEmbassies(e.target.value);
    });
  }
});
