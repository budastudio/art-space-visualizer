/**
 * ART SPACE VISUALIZER — ROOM VISUALIZER (Stage 2 addition)
 * ---------------------------------------------------------------
 * The actual "see it in your space" feature: the person uploads a
 * photo of their wall, picks a work from PRODUCTS, and drags /
 * resizes it into place on an HTML5 canvas. Everything happens in
 * the browser — no upload to a server, no backend. "Download
 * preview" exports the composited canvas as a PNG.
 *
 * This is intentionally simple (2D drag + resize, no perspective
 * correction or wall detection) — that kind of AR-grade placement
 * is real Stage 3/4 territory. This gives a working, honest
 * version of the idea today.
 */

const rv = {
  canvas: null,
  ctx: null,
  roomImg: null,
  work: null,
  artworkImg: null,
  imgAspect: null, // locked width/height ratio of the current artwork's frame photo
  rect: { x: 0, y: 0, w: 0, h: 0 },
  mode: null, // 'move' | 'resize' | null
  dragStart: null,
  rectStart: null
};

function rvDrawPaletteWash(ctx, x, y, w, h, palette) {
  const [a, b, c, d] = palette;

  const base = ctx.createLinearGradient(x, y, x, y + h);
  base.addColorStop(0, d);
  base.addColorStop(1, a);
  ctx.fillStyle = base;
  ctx.fillRect(x, y, w, h);

  const glow = (cx, cy, r, color) => {
    const rg = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    rg.addColorStop(0, color + "cc");
    rg.addColorStop(1, color + "00");
    ctx.fillStyle = rg;
    ctx.fillRect(x, y, w, h);
  };

  glow(x + w * 0.2, y + h * 0.15, Math.max(w, h) * 0.7, a);
  glow(x + w * 0.85, y + h * 0.8, Math.max(w, h) * 0.65, b);
  glow(x + w * 0.5, y + h * 1.0, Math.max(w, h) * 0.75, c);
}

function rvDrawScene() {
  const { ctx, canvas, rect } = rv;
  if (!ctx || !canvas.width) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (rv.roomImg) {
    ctx.drawImage(rv.roomImg, 0, 0, canvas.width, canvas.height);
  } else {
    ctx.fillStyle = "#111111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.55)";
  ctx.shadowBlur = 26;
  ctx.shadowOffsetY = 12;

  if (rv.artworkImg && rv.artworkImg.complete && rv.artworkImg.naturalWidth > 0) {
    ctx.drawImage(rv.artworkImg, rect.x, rect.y, rect.w, rect.h);
  } else if (rv.work) {
    rvDrawPaletteWash(ctx, rect.x, rect.y, rect.w, rect.h, rv.work.palette);
  }
  ctx.restore();

  ctx.strokeStyle = "rgba(255,255,255,0.4)";
  ctx.lineWidth = 2;
  ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);

  // resize handle, bottom-right corner
  ctx.fillStyle = "#d4af37";
  ctx.fillRect(rect.x + rect.w - 12, rect.y + rect.h - 12, 16, 16);
}

function rvPointToCanvas(e) {
  const r = rv.canvas.getBoundingClientRect();
  const scaleX = rv.canvas.width / r.width;
  const scaleY = rv.canvas.height / r.height;
  const point = e.touches ? e.touches[0] : e;
  return {
    x: (point.clientX - r.left) * scaleX,
    y: (point.clientY - r.top) * scaleY
  };
}

function rvHitTest(p) {
  const { x, y, w, h } = rv.rect;
  const handleSize = 22;
  if (p.x >= x + w - handleSize && p.x <= x + w + 6 &&
      p.y >= y + h - handleSize && p.y <= y + h + 6) {
    return "resize";
  }
  if (p.x >= x && p.x <= x + w && p.y >= y && p.y <= y + h) {
    return "move";
  }
  return null;
}

function rvOnDown(e) {
  if (!rv.roomImg) return;
  const p = rvPointToCanvas(e);
  const hit = rvHitTest(p);
  if (!hit) return;
  e.preventDefault();
  rv.mode = hit;
  rv.dragStart = p;
  rv.rectStart = { ...rv.rect };
}

function rvOnMove(e) {
  if (!rv.mode) return;
  e.preventDefault();
  const p = rvPointToCanvas(e);
  const dx = p.x - rv.dragStart.x;
  const dy = p.y - rv.dragStart.y;

  if (rv.mode === "move") {
    rv.rect.x = Math.max(0, Math.min(rv.canvas.width - rv.rect.w, rv.rectStart.x + dx));
    rv.rect.y = Math.max(0, Math.min(rv.canvas.height - rv.rect.h, rv.rectStart.y + dy));
  } else if (rv.mode === "resize") {
    const minSize = 40;
    const aspect = rv.imgAspect || (rv.rectStart.w / rv.rectStart.h);

    // Drive the resize off whichever axis moved further, then derive
    // the other dimension from the locked aspect ratio — this keeps
    // the framed painting proportional, never stretched or squashed.
    const driveByWidth = Math.abs(dx) >= Math.abs(dy * aspect);
    let newW, newH;

    if (driveByWidth) {
      newW = Math.max(minSize, rv.rectStart.w + dx);
      newH = newW / aspect;
    } else {
      newH = Math.max(minSize, rv.rectStart.h + dy);
      newW = newH * aspect;
    }

    // Clamp so the frame never runs off the canvas, preserving aspect
    const maxW = rv.canvas.width - rv.rect.x;
    const maxH = rv.canvas.height - rv.rect.y;
    if (newW > maxW) { newW = maxW; newH = newW / aspect; }
    if (newH > maxH) { newH = maxH; newW = newH * aspect; }
    if (newW < minSize) { newW = minSize; newH = newW / aspect; }
    if (newH < minSize) { newH = minSize; newW = newH * aspect; }

    rv.rect.w = newW;
    rv.rect.h = newH;
  }

  rvDrawScene();
}

function rvOnUp() {
  rv.mode = null;
}

function rvLoadArtwork(work) {
  rv.work = work;
  rv.artworkImg = null;
  rv.imgAspect = null;

  const src = work.frameImage || work.image;
  if (src) {
    const img = new Image();
    img.onload = () => {
      rv.artworkImg = img;
      rv.imgAspect = img.naturalWidth / img.naturalHeight;

      // Re-fit the existing rect to the new aspect ratio, keeping its
      // width and center, so switching artworks never leaves a
      // stretched frame on screen.
      if (rv.roomImg) {
        const cx = rv.rect.x + rv.rect.w / 2;
        const cy = rv.rect.y + rv.rect.h / 2;
        const newH = rv.rect.w / rv.imgAspect;
        rv.rect.h = newH;
        rv.rect.x = Math.max(0, Math.min(rv.canvas.width - rv.rect.w, cx - rv.rect.w / 2));
        rv.rect.y = Math.max(0, Math.min(rv.canvas.height - rv.rect.h, cy - newH / 2));
      }

      rvDrawScene();
    };
    img.onerror = () => { rv.artworkImg = null; rvDrawScene(); };
    img.src = src;
  }

  rvDrawScene();
}

function rvLoadRoomPhoto(file) {
  const img = new Image();
  img.onload = () => {
    const maxW = 900, maxH = 560;
    const scale = Math.min(maxW / img.width, maxH / img.height, 1);
    const w = Math.round(img.width * scale);
    const h = Math.round(img.height * scale);

    rv.canvas.width = w;
    rv.canvas.height = h;
    rv.roomImg = img;

    const rw = Math.round(w * 0.3);
    const aspect = rv.imgAspect || 0.8;
    const rh = Math.round(rw / aspect);
    rv.rect = {
      x: Math.round((w - rw) / 2),
      y: Math.round((h - rh) / 2),
      w: rw,
      h: rh
    };

    document.getElementById("rvDownload").disabled = false;
    document.getElementById("rvHint").hidden = true;
    document.getElementById("rvCanvasWrap").classList.add("has-image");
    rvDrawScene();
  };
  img.src = URL.createObjectURL(file);
}

function rvDownload() {
  if (!rv.roomImg) return;
  const link = document.createElement("a");
  link.download = `art-space-visualizer-${(rv.work?.name || "preview").toLowerCase().replace(/[^a-z0-9]+/g, "-")}.png`;
  link.href = rv.canvas.toDataURL("image/png");
  link.click();
}

function rvRenderPicker(wallWorks, selectedId) {
  const picker = document.getElementById("rvPicker");
  picker.innerHTML = wallWorks.map(work => `
    <button type="button"
            class="rv-thumb${work.id === selectedId ? " is-active" : ""}"
            data-id="${work.id}"
            role="option"
            aria-selected="${work.id === selectedId}"
            title="${work.name}">
      <img src="${work.frameImage}" alt="${work.name}" loading="lazy" />
    </button>
  `).join("");
}

function rvSetActiveThumb(id) {
  document.querySelectorAll(".rv-thumb").forEach(btn => {
    const isActive = Number(btn.dataset.id) === id;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-selected", String(isActive));
  });
}

function initRoomVisualizer() {
  rv.canvas = document.getElementById("rvCanvas");
  if (!rv.canvas) return; // section not present on this page
  rv.ctx = rv.canvas.getContext("2d");

  const wallWorks = PRODUCTS.filter(p => p.frameImage);

  // Deep link support: a link like index.html?artwork=6#space (e.g.
  // a future "Visualize in your space" button on the Store) lands
  // here with that piece already selected.
  const params = new URLSearchParams(window.location.search);
  const requestedId = Number(params.get("artwork"));
  const requested = wallWorks.find(p => p.id === requestedId);
  const pilot = requested || wallWorks.find(p => p.pilot) || wallWorks[0];

  rvRenderPicker(wallWorks, pilot.id);
  rvLoadArtwork(pilot);

  if (requested) {
    setTimeout(() => {
      document.getElementById("space")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  }

  document.getElementById("rvPicker").addEventListener("click", (e) => {
    const btn = e.target.closest(".rv-thumb");
    if (!btn) return;
    const work = wallWorks.find(p => p.id === Number(btn.dataset.id));
    if (!work) return;
    rvSetActiveThumb(work.id);
    rvLoadArtwork(work);
  });

  document.getElementById("roomUpload").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) rvLoadRoomPhoto(file);
  });

  document.getElementById("rvDownload").addEventListener("click", rvDownload);

  document.getElementById("rvTryNow")?.addEventListener("click", () => {
    document.getElementById("rvCanvasWrap")?.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  rv.canvas.addEventListener("mousedown", rvOnDown);
  window.addEventListener("mousemove", rvOnMove);
  window.addEventListener("mouseup", rvOnUp);

  rv.canvas.addEventListener("touchstart", rvOnDown, { passive: false });
  window.addEventListener("touchmove", rvOnMove, { passive: false });
  window.addEventListener("touchend", rvOnUp);
}

document.addEventListener("DOMContentLoaded", initRoomVisualizer);
