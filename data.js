/**
 * ART SPACE VISUALIZER — DATA LAYER
 * ---------------------------------------------------------------
 * This file is the single source of truth for artwork data on the
 * page. It is written as a standalone array *on purpose*: the
 * public Buda Studio Store (https://budastudio.github.io/store.html)
 * does not expose a JSON endpoint or embedded data object to read
 * from at build time, so this stage ships with the real fields we
 * could confirm from the Store's own content, and clearly-flagged
 * placeholders everywhere else.
 *
 * Confirmed from the Store page:
 *   - Artist: Leonardo M. Scarcia
 *   - Categories: ALL / PAINTINGS / T-SHIRTS / PHYSICAL / OBJKT
 *   - "WAVES — TRIPTYCH" is presented as a triptych edition
 *   - Formats: Fine Art print, Hahnemühle Canvas, framed edition,
 *     NFT Certificate / Original (where applicable)
 *
 * STAGE 2 TODO:
 *   Replace `ARTWORKS` below with a fetch() against whatever
 *   structured source the Store migrates to (JSON feed, CMS,
 *   or on-chain metadata). Keep the field names the same so
 *   `js/main.js` and the CSS in `css/style.css` don't need to
 *   change — only this file should need to be swapped out.
 */

const ARTWORKS = [
  {
    id: "waves-triptych",
    title: "Waves — Triptych",
    artist: "Leonardo M. Scarcia",
    year: "2024",
    format: "Fine Art Print / Hahnemühle Canvas / Framed Edition",
    category: "PAINTINGS",
    featured: true,
    placeholder: false,
    palette: ["#2b2f2c", "#9aa596", "#cdbd9d", "#12110d"]
  },
  {
    id: "still-water-i",
    title: "Still Water I",
    artist: "Leonardo M. Scarcia",
    year: "2024",
    format: "Fine Art Print",
    category: "PAINTINGS",
    placeholder: true,
    palette: ["#1c231f", "#5c6a5a", "#cdbd9d", "#0c0b09"]
  },
  {
    id: "study-in-clay",
    title: "Study in Clay",
    artist: "Leonardo M. Scarcia",
    year: "2023",
    format: "Hahnemühle Canvas",
    category: "PAINTINGS",
    placeholder: true,
    palette: ["#4a3a2b", "#8a6a49", "#cdbd9d", "#171310"]
  },
  {
    id: "store-tee-i",
    title: "Buda Studio Tee",
    artist: "Leonardo M. Scarcia",
    year: "2024",
    format: "Wearable Edition",
    category: "T-SHIRTS",
    placeholder: true,
    palette: ["#221f1a", "#b3915a", "#f3ede1", "#0c0b09"]
  },
  {
    id: "object-i",
    title: "Object, Untitled",
    artist: "Leonardo M. Scarcia",
    year: "2023",
    format: "Physical Object, Original",
    category: "PHYSICAL",
    placeholder: true,
    palette: ["#26221c", "#736a56", "#cdbd9d", "#100e0b"]
  },
  {
    id: "objkt-i",
    title: "Last Drop, Fragment",
    artist: "Leonardo M. Scarcia",
    year: "2024",
    format: "NFT Certificate / OBJKT",
    category: "OBJKT",
    placeholder: true,
    palette: ["#1a1c22", "#556a8a", "#cdbd9d", "#0c0b09"]
  }
];
