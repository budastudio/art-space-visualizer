/**
 * ART SPACE VISUALIZER — STAGE 2 INTERACTIONS
 * ---------------------------------------------------------------
 * Everything here reads from PRODUCTS in js/data.js, which is the
 * real Store catalog. `paintCanvas()` is still a stand-in for the
 * real artwork photography (those files live in the Store's own
 * repo, not this one) — swap it for <img src="..."> once the
 * image assets are shared into this project.
 */

function paintCanvas(el, palette) {
  const [a, b, c, d] = palette;
  el.style.background = `
    radial-gradient(120% 90% at 20% 15%, ${a}cc 0%, transparent 55%),
    radial-gradient(110% 100% at 85% 80%, ${b}b3 0%, transparent 60%),
    radial-gradient(140% 120% at 50% 100%, ${c}55 0%, transparent 65%),
    linear-gradient(160deg, ${d} 0%, ${a} 100%)
  `;
}

/**
 * Renders a real Store photo on top of a painted gradient wash.
 * If the image 404s (wrong path, moved file, offline, etc.) it
 * quietly hides itself and the wash underneath keeps showing —
 * the page never shows a broken-image icon.
 */
function renderArtworkVisual(container, work) {
  paintCanvas(container, work.palette);
  if (!work.image) return;

  const img = document.createElement("img");
  img.src = work.image;
  img.alt = work.name;
  img.loading = "lazy";
  img.style.cssText = "width:100%;height:100%;object-fit:cover;display:block;";
  img.onerror = () => img.remove();
  container.appendChild(img);
}

/* ---------------------------------------------------------------
   AMBIENT HERO — cross-fades through a curated set of real works
--------------------------------------------------------------- */

let ambientIndex = 0;
let ambientSlides = [];

function buildAmbientSlides() {
  const pilot = PRODUCTS.find(p => p.pilot);
  const rest = PRODUCTS.filter(p => !p.pilot).slice(0, 4);
  ambientSlides = [pilot, ...rest].filter(Boolean);

  const track = document.getElementById("ambientTrack");
  const dots = document.getElementById("ambientDots");
  track.innerHTML = "";
  dots.innerHTML = "";

  ambientSlides.forEach((work, i) => {
    const slide = document.createElement("div");
    slide.className = "ambient-slide" + (i === 0 ? " active" : "");
    slide.innerHTML = `<div class="ambient-canvas"></div>`;
    track.appendChild(slide);
    renderArtworkVisual(slide.querySelector(".ambient-canvas"), work);

    const dot = document.createElement("div");
    dot.className = "ambient-dot" + (i === 0 ? " active" : "");
    dots.appendChild(dot);
  });

  updateAmbientText();
}

function showAmbient(i) {
  const slides = document.querySelectorAll(".ambient-slide");
  const dots = document.querySelectorAll(".ambient-dot");
  if (!slides.length) return;

  ambientIndex = (i + slides.length) % slides.length;
  slides.forEach(s => s.classList.remove("active"));
  dots.forEach(d => d.classList.remove("active"));
  slides[ambientIndex].classList.add("active");
  dots[ambientIndex].classList.add("active");
  updateAmbientText();
}

function updateAmbientText() {
  const work = ambientSlides[ambientIndex];
  if (!work) return;
  document.getElementById("ambientTitle").textContent = work.name.toUpperCase();
  document.getElementById("ambientSubtitle").textContent = work.description;
}

/* ---------------------------------------------------------------
   FEATURED WORK — the pilot piece, "Waves — Triptych"
--------------------------------------------------------------- */

function renderFeatured() {
  const work = PRODUCTS.find(p => p.pilot) || PRODUCTS[0];

  const canvas = document.getElementById("featuredCanvas");
  canvas.innerHTML = "";
  renderArtworkVisual(canvas, work);

  document.getElementById("pedestalLabel").textContent =
    `On view now — ${work.badge}`;

  document.getElementById("featuredInfo").innerHTML = `
    <div class="row">
      <span class="k">Artist</span>
      <span class="v">${ARTIST_NAME}</span>
    </div>
    <div class="row">
      <span class="k">Title</span>
      <span class="v name">${work.name}</span>
    </div>
    <div class="row">
      <span class="k">Technique</span>
      <span class="v">${work.technique}</span>
    </div>
    <div class="row">
      <span class="k">Dimensions</span>
      <span class="v" style="font-size:13px;">${work.dimensions}</span>
    </div>
    <a class="view-store-link" href="${work.storeUrl}" target="_blank" rel="noopener">
      View in Store <span aria-hidden="true">→</span>
    </a>
  `;
}

/* ---------------------------------------------------------------
   SELECTED WORKS GRID
--------------------------------------------------------------- */

function renderGrid() {
  const grid = document.getElementById("worksGrid");
  grid.innerHTML = "";

  PRODUCTS.forEach(work => {
    const card = document.createElement("article");
    card.className = "work-card";
    card.dataset.category = work.category;

    card.innerHTML = `
      <div class="work-card-image">
        <span class="work-badge">${work.badge}</span>
        <div class="work-canvas" style="width:100%;height:100%;"></div>
      </div>
      <div class="work-card-info">
        <div class="work-type">${work.category}</div>
        <div class="work-name">${work.name}</div>
        <p class="work-desc">${work.description}</p>
        <div class="work-meta">
          <span><strong>Technique:</strong> ${work.technique}</span>
          <span><strong>Dimensions:</strong> ${work.dimensions}</span>
        </div>
        <a class="work-card-link" href="${work.storeUrl}" target="_blank" rel="noopener">
          View in Store
        </a>
      </div>
    `;

    grid.appendChild(card);
    renderArtworkVisual(card.querySelector(".work-canvas"), work);
  });
}

function initFilters() {
  const bar = document.getElementById("worksFilter");
  const pills = Array.from(bar.querySelectorAll(".filter"));

  bar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn) return;

    pills.forEach(p => p.classList.toggle("active", p === btn));

    const filter = btn.dataset.filter;
    document.querySelectorAll(".work-card").forEach(card => {
      card.hidden = !(filter === "ALL" || card.dataset.category === filter);
    });
  });
}

/* ---------------------------------------------------------------
   NAV TOGGLE (mobile)
--------------------------------------------------------------- */

function initNavToggle() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("navLinks");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    nav.classList.toggle("is-open");
  });
}

/* ---------------------------------------------------------------
   INIT
--------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  buildAmbientSlides();
  renderFeatured();
  renderGrid();
  initFilters();
  initNavToggle();
  setInterval(() => showAmbient(ambientIndex + 1), 5500);
});
