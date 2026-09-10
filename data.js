/**
 * ART SPACE VISUALIZER — DATA LAYER (STAGE 2)
 * ---------------------------------------------------------------
 * Source of truth: the real Buda Studio Store source, fetched from
 *   https://raw.githubusercontent.com/budastudio/budastudio.github.io/main/store.html
 *
 * These are the Store's actual 11 products (id, name, category,
 * technique, dimensions, badge, description, Ko-fi link). Real
 * artwork *image files* (painting1.jpg, etc.) live in the Store's
 * repo, not this one, so they are not bundled here — `palette` is
 * a generated wash used until Stage 3 pulls the real files in.
 *
 * If the Store adds or edits a product, this is the only file
 * that needs to change — everything else reads from PRODUCTS.
 *
 * IMAGE PATHS: the Store's HTML references its photos as bare
 * relative filenames ("painting1.jpg", "camiseta.jpg"...) from
 * store.html, which lives at the root of budastudio.github.io.
 * That resolves to https://budastudio.github.io/<filename>. This
 * repo doesn't host the files itself, it only links to them —
 * if a path is wrong or a file gets moved, `onerror` in main.js
 * falls back to the generated palette wash automatically.
 *
 * `frameImage` is a second, separate asset used only by the Room
 * Visualizer (space-visualizer.js): pre-framed photos, one per
 * wall-ready piece, `framepainting1.jpg` through `framepainting10.jpg`
 * — matching product ids 1–10. The T-shirt (id 11) has no
 * frameImage and is excluded from that picker since it isn't
 * something you hang on a wall.
 */

const STORE_ORIGIN = "https://budastudio.github.io";

const PRODUCTS = [
  {
    id: 1,
    name: "Collective Thoughts",
    category: "PAINTING",
    technique: "Oil on canvas",
    dimensions: "80 × 60 cm · 31.5 × 23.6 in",
    description: "An original oil painting exploring the convergence of individual perception, memory and collective consciousness.",
    badge: "ORIGINAL",
    storeUrl: "https://ko-fi.com/s/46d2940042",
    image: `${STORE_ORIGIN}/painting1.jpg`,
    frameImage: `${STORE_ORIGIN}/framepainting1.jpg`,
    palette: ["#2a2118", "#6b5a3c", "#d4af37", "#0c0b09"]
  },
  {
    id: 2,
    name: "Buddah Enlighting",
    category: "PAINTING",
    technique: "Oil on canvas",
    dimensions: "80 × 60 cm · 31.5 × 23.6 in",
    description: "An original oil painting inspired by the contemplative state between perception, stillness and awakening.",
    badge: "ORIGINAL",
    storeUrl: "https://ko-fi.com/s/38851e3f31",
    image: `${STORE_ORIGIN}/painting2.jpg`,
    frameImage: `${STORE_ORIGIN}/framepainting2.jpg`,
    palette: ["#241d1c", "#7a5a3a", "#d4af37", "#0c0b09"]
  },
  {
    id: 3,
    name: "Pepe Little Princess",
    category: "PAINTING",
    technique: "Oil on canvas",
    dimensions: "26 × 18.5 cm · 10.2 × 7.3 in",
    description: "A playful original portrait of Pepe, combining pop imagery with the expressive language of contemporary painting.",
    badge: "1/1",
    storeUrl: "https://ko-fi.com/s/76813a1c79",
    image: `${STORE_ORIGIN}/painting3.jpg`,
    frameImage: `${STORE_ORIGIN}/framepainting3.jpg`,
    palette: ["#1c2a1e", "#3f6b4a", "#d4af37", "#0c0b09"]
  },
  {
    id: 4,
    name: "Pepe Pumpking",
    category: "PAINTING",
    technique: "Watercolor pencil on 300 gsm paper",
    dimensions: "21 × 15 cm · 8.3 × 5.9 in",
    description: "A hand-rendered Pepe composition created with watercolor pencils on fine 300 gsm paper.",
    badge: "ORIGINAL",
    storeUrl: "https://ko-fi.com/s/d211819c76",
    image: `${STORE_ORIGIN}/painting4.jpg`,
    frameImage: `${STORE_ORIGIN}/framepainting4.jpg`,
    palette: ["#2a1f16", "#8a5a2a", "#d4af37", "#0c0b09"]
  },
  {
    id: 5,
    name: "Bitcoiner Influencer",
    category: "PAINTING",
    technique: "Oil on canvas",
    dimensions: "26 × 19 cm · 10.2 × 7.5 in",
    description: "An original oil painting reflecting the visual culture, personalities and mythology surrounding the Bitcoin ecosystem.",
    badge: "ORIGINAL",
    storeUrl: "https://ko-fi.com/s/7e1c09de43",
    image: `${STORE_ORIGIN}/painting5.jpg`,
    frameImage: `${STORE_ORIGIN}/framepainting5.jpg`,
    palette: ["#241f14", "#8a742a", "#d4af37", "#0c0b09"]
  },
  {
    id: 6,
    name: "Waves — Triptych",
    category: "PAINTING",
    technique: "Oil on canvas · Triptych",
    dimensions: "3 pieces · 18 × 13 cm each · 7.1 × 5.1 in each",
    description: "A triptych of three original paintings exploring rhythm, movement and the organic energy of the ocean.",
    badge: "TRIPTYCH / PILOT",
    pilot: true,
    storeUrl: "https://ko-fi.com/s/fa9902873f",
    image: `${STORE_ORIGIN}/painting6.jpg`,
    frameImage: `${STORE_ORIGIN}/framepainting6.jpg`,
    palette: ["#101d24", "#2e5468", "#d4af37", "#080d0f"]
  },
  {
    id: 7,
    name: "Eye of Perception",
    category: "PAINTING",
    technique: "Oil on canvas on wood panel",
    dimensions: "40 × 40 cm · 15.7 × 15.7 in",
    description: "An original work exploring perception as a threshold between the visible world and the inner landscape.",
    badge: "ORIGINAL",
    storeUrl: "https://ko-fi.com/s/ea15c0870d",
    image: `${STORE_ORIGIN}/painting7.jpg`,
    frameImage: `${STORE_ORIGIN}/framepainting7.jpg`,
    palette: ["#1e1a24", "#524068", "#d4af37", "#0c0b09"]
  },
  {
    id: 8,
    name: "Pepe Hand Made",
    category: "PAINTING",
    technique: "Oil pastels on 300 gr Canson paper",
    dimensions: "25 × 25 cm · 9.8 × 9.8 in",
    description: "A handmade Pepe artwork created with oil pastels on fine 300 gr Canson paper.",
    badge: "HAND MADE",
    storeUrl: "https://ko-fi.com/s/f378fa06fd",
    image: `${STORE_ORIGIN}/painting8.jpg`,
    frameImage: `${STORE_ORIGIN}/framepainting8.jpg`,
    palette: ["#241a1a", "#8a3a3a", "#d4af37", "#0c0b09"]
  },
  {
    id: 9,
    name: "Chaos Theory",
    category: "PHYSICAL",
    technique: "Collage and acrylic on black cardboard",
    dimensions: "70 × 50 cm · 27.6 × 19.7 in",
    description: "An original mixed-media collage exploring fragmented signs, visual tension and the unpredictable language of contemporary urban imagery.",
    badge: "ORIGINAL",
    storeUrl: "https://ko-fi.com/s/6c36c11e9b",
    image: `${STORE_ORIGIN}/painting9.jpg`,
    frameImage: `${STORE_ORIGIN}/framepainting9.jpg`,
    palette: ["#18181a", "#4a4a52", "#d4af37", "#0c0b09"]
  },
  {
    id: 10,
    name: "Señales imposibles",
    category: "PHYSICAL",
    technique: "Recycled metal street sign + acrylic · yellow and black",
    dimensions: "50 × 50 cm · 19.7 × 19.7 in",
    description: "A recycled street-sign artwork transforming an obsolete metal signal into an impossible visual message about UFOs, abduction and contemporary mythology.",
    badge: "ORIGINAL",
    storeUrl: "https://ko-fi.com/s/a6a73cd012",
    image: `${STORE_ORIGIN}/painting10.jpg`,
    frameImage: `${STORE_ORIGIN}/framepainting10.jpg`,
    palette: ["#242018", "#c9a832", "#0c0b09", "#050504"]
  },
  {
    id: 11,
    name: "Buda Studio Black T-Shirt",
    category: "T-SHIRT",
    technique: "Black cotton T-shirt · gold Buda Studio logo",
    dimensions: "Multiple sizes available",
    description: "Buda Studio black T-shirt with the studio logo in gold.",
    badge: "WEARABLE",
    storeUrl: "https://ko-fi.com/s/49bfad9eee",
    image: `${STORE_ORIGIN}/camiseta.jpg`,
    palette: ["#101010", "#2a2a2a", "#d4af37", "#050505"]
  }
];

const ARTIST_NAME = "Leonardo M. Scarcia";
