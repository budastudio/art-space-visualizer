/**
 * ART SPACE VISUALIZER — STAGE 1 INTERACTIONS
 * ---------------------------------------------------------------
 * Scope on purpose: render the featured work + metadata, render
 * the Selected Works grid, filter by category, and a mobile nav
 * toggle. No 3D, no physics, no wallet — that's Stage 2+.
 *
 * `paintCanvas(el, palette)` stands in for real artwork imagery
 * until Stage 2 wires this up to real Store assets (see the note
 * at the top of js/data.js). It paints a soft, gallery-lit wash
 * from each artwork's palette so every card still reads as a
 * distinct piece on the wall, not a generic placeholder block.
 */

function paintCanvas(el, palette) {
  const [a, b, c, d] = palette;
  el.style.background = `
    radial-gradient(120% 90% at 20% 15%, ${a}cc 0%, transparent 55%),
    radial-gradient(110% 100% at 85% 80%, ${b}b3 0%, transparent 60%),
    radial-gradient(140% 120% at 50% 100%, ${c}66 0%, transparent 65%),
    linear-gradient(160deg, ${d} 0%, ${a} 100%)
  `;
}

function renderFeatured() {
  const work = ARTWORKS.find(w => w.featured) || ARTWORKS[0];

  const canvas = document.getElementById("featuredCanvas");
  paintCanvas(canvas, work.palette);

  const label = document.getElementById("featuredLabel");
  label.textContent = `On view now — ${work.category.charAt(0)}${work.category.slice(1).toLowerCase()}`;

  const info = document.getElementById("artworkInfo");
  info.innerHTML = `
    <div class="meta-row">
      <span class="meta-label">Artist</span>
      <span class="meta-value">${work.artist}</span>
    </div>
    <div class="meta-row">
      <span class="meta-label">Title</span>
      <span class="meta-value title">${work.title}</span>
    </div>
    <div class="meta-row">
      <span class="meta-label">Year</span>
      <span class="meta-value">${work.year}</span>
    </div>
    <div class="meta-row">
      <span class="meta-label">Format</span>
      <span class="meta-value" style="font-size:1rem;">${work.format}</span>
    </div>
    <a class="view-artwork" href="https://budastudio.github.io/store.html" target="_blank" rel="noopener">
      View artwork <span aria-hidden="true">→</span>
    </a>
  `;
}

function renderGrid() {
  const grid = document.getElementById("worksGrid");
  grid.innerHTML = "";

  ARTWORKS.forEach(work => {
    const card = document.createElement("article");
    card.className = "work-card";
    card.dataset.category = work.category;

    card.innerHTML = `
      <div class="work-canvas-wrap">
        <div class="work-canvas"></div>
        <div class="work-meta-overlay">
          <span class="k">${work.format}</span>
        </div>
      </div>
      <div class="work-caption">
        <span class="name">${work.title}</span>
        <span class="year">${work.year}</span>
      </div>
    `;

    grid.appendChild(card);
    paintCanvas(card.querySelector(".work-canvas"), work.palette);
  });
}

function initFilters() {
  const filterBar = document.getElementById("worksFilter");
  const pills = Array.from(filterBar.querySelectorAll(".filter-pill"));
  const cards = () => Array.from(document.querySelectorAll(".work-card"));

  filterBar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-pill");
    if (!btn) return;

    pills.forEach(p => {
      p.classList.toggle("is-active", p === btn);
      p.setAttribute("aria-selected", p === btn ? "true" : "false");
    });

    const filter = btn.dataset.filter;
    cards().forEach(card => {
      const show = filter === "ALL" || card.dataset.category === filter;
      card.hidden = !show;
    });
  });
}

function initNavToggle() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("siteNav");

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderFeatured();
  renderGrid();
  initFilters();
  initNavToggle();
});
