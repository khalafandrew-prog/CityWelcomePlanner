// --- Section navigation ---

const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".section");

navLinks.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-section");

    // active nav
    navLinks.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    // show section
    sections.forEach((sec) => {
      if (sec.id === `section-${target}`) {
        sec.classList.add("section-visible");
      } else {
        sec.classList.remove("section-visible");
      }
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// --- Embassy data ---

const embassies = {
  canada: {
    country: "Canada",
    phone: "020 7004 6000",
    address: "Canada House, Trafalgar Square, London, SW1Y 5BJ",
    opening: "Monday–Friday, 08:00–16:00",
    nearest: [
      "Charing Cross (Bakerloo & Northern) – 4 min walk",
      "Leicester Square (Northern & Piccadilly) – 5 min walk",
      "Piccadilly Circus (Bakerloo & Piccadilly) – 4 min walk",
    ],
    website: "https://www.international.gc.ca/country-pays/uk-royaume_uni/london-londres.aspx",
  },
  usa: {
    country: "United States",
    phone: "020 7499 9000",
    address: "33 Nine Elms Lane, London, SW11 7US",
    opening: "Check website for appointments",
    nearest: [
      "Vauxhall (Victoria line / National Rail)",
      "Nine Elms (Northern line)",
    ],
    website: "https://uk.usembassy.gov/",
  },
  france: {
    country: "France",
    phone: "020 7073 1000",
    address: "58 Knightsbridge, London, SW1X 7JT",
    opening: "Mon–Fri, office hours (check website)",
    nearest: [
      "Knightsbridge (Piccadilly line)",
      "Hyde Park Corner (Piccadilly line)",
    ],
    website: "https://uk.ambafrance.org/",
  },
  germany: {
    country: "Germany",
    phone: "020 7824 1300",
    address: "23 Belgrave Square, London, SW1X 8PZ",
    opening: "Mon–Fri, office hours (check website)",
    nearest: [
      "Hyde Park Corner (Piccadilly line)",
      "Victoria (Victoria/Circle/District + rail)",
    ],
    website: "https://uk.diplo.de/",
  },
  australia: {
    country: "Australia",
    phone: "020 7379 4334",
    address: "Australia House, Strand, London, WC2B 4LA",
    opening: "Mon–Fri, office hours (check website)",
    nearest: [
      "Temple (Circle & District)",
      "Holborn (Central & Piccadilly)",
    ],
    website: "https://uk.embassy.gov.au/",
  },
  india: {
    country: "India",
    phone: "020 7632 3035",
    address: "India House, Aldwych, London, WC2B 4NA",
    opening: "Mon–Fri, office hours (check website)",
    nearest: [
      "Temple (Circle & District)",
      "Holborn (Central & Piccadilly)",
    ],
    website: "https://www.hcilondon.gov.in/",
  },
};

const embassySelect = document.getElementById("embassySelect");
const embassyCard = document.getElementById("embassyCard");

function renderEmbassy(code) {
  const e = embassies[code];
  if (!e) return;

  embassyCard.innerHTML = `
    <p><strong>${e.country} Embassy</strong></p>
    <p><strong>Telephone:</strong> ${e.phone}</p>
    <p><strong>Address:</strong> ${e.address}</p>
    <p><strong>Opening hours:</strong> ${e.opening}</p>
    <p><strong>Nearest Underground:</strong></p>
    <ul>
      ${e.nearest.map((n) => `<li>${n}</li>`).join("")}
    </ul>
    <p><a href="${e.website}" target="_blank" rel="noopener">Visit official website</a></p>
  `;
}

// Initial embassy
if (embassySelect && embassyCard) {
  renderEmbassy(embassySelect.value);
  embassySelect.addEventListener("change", () => {
    renderEmbassy(embassySelect.value);
  });
}

// --- Offline indicator ---

const offlineStatus = document.getElementById("offlineStatus");

function updateNetworkStatus() {
  if (!offlineStatus) return;
  if (navigator.onLine) {
    offlineStatus.textContent = "Offline-ready";
    offlineStatus.style.backgroundColor = "rgba(16, 185, 129, 0.2)";
  } else {
    offlineStatus.textContent = "Offline (content saved)";
    offlineStatus.style.backgroundColor = "rgba(239, 68, 68, 0.2)";
  }
}

window.addEventListener("online", updateNetworkStatus);
window.addEventListener("offline", updateNetworkStatus);
updateNetworkStatus();
