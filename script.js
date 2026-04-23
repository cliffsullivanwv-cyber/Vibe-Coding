const resources = [
  {
    title: "Canva for Education",
    description: "Create engaging lessons, visuals, and student projects.",
    category: "Technology",
    tags: ["Design", "Free"],
    link: "https://www.canva.com/education/"
  },
  {
    title: "Khan Academy",
    description: "Standards‑aligned practice across subjects.",
    category: "Instruction",
    tags: ["Math", "ELA"],
    link: "https://www.khanacademy.org/"
  },
  {
    title: "AI Classroom Guidance",
    description: "Guidance for ethical and effective AI use.",
    category: "AI",
    tags: ["Policy", "AI"],
    link: "ai-classroom-guidance.html"
  },
  {
    title: "Professional Learning Hub",
    description: "On‑demand PD and certifications.",
    category: "PD",
    tags: ["PD", "Certifications"],
    link: "#"
  }
];

const grid = document.getElementById("resourceGrid");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");

let currentFilter = "all";

function renderResources() {
  grid.innerHTML = "";

  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  resources
    .filter(res =>
      (currentFilter === "all" || res.category === currentFilter) &&
      res.title.toLowerCase().includes(searchInput.value.toLowerCase())
    )
    .forEach(res => {
      const card = document.createElement("div");
      card.className = "card";

      const isFavorite = favorites.includes(res.title);

      card.innerHTML = `
        <h3>${res.title}</h3>
        <p>${res.description}</p>
        <div class="tags">
          ${res.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
        </div>
        <div class="card-actions">
          <a href="${res.link}" target="_blank">Open</a>
          <span class="favorite ${isFavorite ? "active" : ""}">★</span>
        </div>
      `;

      const favBtn = card.querySelector(".favorite");
      favBtn.onclick = () => toggleFavorite(res.title);

      grid.appendChild(card);
    });
}

function toggleFavorite(title) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites = favorites.includes(title)
    ? favorites.filter(f => f !== title)
    : [...favorites, title];

  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderResources();
}

filterButtons.forEach(btn => {
  btn.onclick = () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderResources();
  };
});

searchInput.oninput = renderResources;

renderResources();
``