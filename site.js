// Lumetra site: rotating photographs, hash list, charts and tooltips.
// Every number on the page was measured (see "All measurements").

// ---- photographs ------------------------------------------------------------
// Picked at random on each load (never the same opener twice in a row).
// Screenshots of the app are not in these pools.
const POOLS = {
  hero: [
    { src: "img/hero_6888.jpg", alt: "A lit capitol dome at blue hour between dark trees, under heavy cloud.", cap: "EOS R50 · ISO 640 · 1/60 s · f/2 · 85 mm" },
    { src: "img/hero_6916.jpg", alt: "Long-exposure light trails on a curving divided highway at night.", cap: "EOS R50 · ISO 100 · 13 s · f/14 · 70 mm" },
    { src: "img/hero_6919.jpg", alt: "Red and white light trails sweeping along a highway at night, street lamps over a grass median.", cap: "EOS R50 · ISO 100 · 13 s · f/14 · 70 mm" },
    { src: "img/hero_6882.jpg", alt: "A white dome and its gilded statue against a deep blue evening sky.", cap: "EOS R50 · ISO 1000 · 1/200 s · f/2 · 85 mm" },
    { src: "img/hero_6879.jpg", alt: "The top of a capitol dome with a gold statue, against a saturated blue sky.", cap: "EOS R50 · ISO 1250 · 1/200 s · f/2 · 85 mm" },
  ],
  plate: [
    { src: "img/plate_6837.jpg", alt: "A capitol dome in late golden light behind trees, an old neon sign to the left.", cap: "EOS R50 · ISO 160 · 1/1250 s · f/4 · 85 mm" },
    { src: "img/plate_cali_0736.jpg", alt: "A wide river under blue sky with snow-capped mountains in the distance.", cap: "EOS R50 camera JPEG · ISO 100 · 1/320 s · f/9 · 26 mm" },
    { src: "img/plate_cali_0202.jpg", alt: "Surf breaking against low sandstone cliffs along a coastline.", cap: "EOS R50 camera JPEG · ISO 100 · 1/320 s · f/10 · 18 mm" },
    { src: "img/plate_cali_0536.jpg", alt: "A view from wooded hills over a hazy bay and distant city under cloud.", cap: "EOS R50 camera JPEG · ISO 100 · 1/320 s · f/9 · 27 mm" },
    { src: "img/plate_4291.jpg", alt: "Rolling green hills and a red farmstead under cumulus clouds.", cap: "EOS R50 · ISO 400 · 1/500 s · f/9 · 85 mm" },
    { src: "img/plate_4442.jpg", alt: "A wide lake with a pine shoreline under a blue sky with clouds.", cap: "EOS R50 · ISO 125 · 1/500 s · f/8 · 85 mm" },
    { src: "img/plate_3166.jpg", alt: "A city skyline across flat lake water under an overcast sky.", cap: "EOS R50 · ISO 100 · 1/320 s · f/9 · 37 mm" },
  ],
};

function shuffle(a) {
  const b = a.slice();
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}
(function photos() {
  let last = null;
  try { last = localStorage.getItem("lumetra-hero"); } catch (e) {}
  const order = {
    hero: shuffle(POOLS.hero.filter((p) => p.src !== last)),
    plate: shuffle(POOLS.plate),
  };
  try { localStorage.setItem("lumetra-hero", order.hero[0].src); } catch (e) {}
  for (const pool of ["hero", "plate"]) {
    const imgs = document.querySelectorAll(`img[data-pool="${pool}"]`);
    const caps = document.querySelectorAll(`[data-cap="${pool}"]`);
    imgs.forEach((img, i) => {
      const p = order[pool][i % order[pool].length];
      img.src = p.src;
      img.alt = p.alt;
      if (caps[i]) caps[i].textContent = p.cap;
    });
  }
})();

// Light / dark switch: follows the system until chosen, then remembers the choice.
(function theme() {
  const root = document.documentElement;
  const btn = document.querySelector(".theme");
  const dark = () => root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  const label = () => btn.setAttribute("aria-label", dark() ? "Switch to light mode" : "Switch to dark mode");
  let fadeTimer;
  btn.addEventListener("click", () => {
    root.classList.add("theme-fade");
    clearTimeout(fadeTimer);
    fadeTimer = setTimeout(() => root.classList.remove("theme-fade"), 600);
    root.dataset.theme = dark() ? "light" : "dark";
    try { localStorage.setItem("lumetra-theme", root.dataset.theme); } catch (e) {}
    label();
  });
  label();
})();

// Masthead: over the photograph at the top, solid below it.
(function mast() {
  const m = document.querySelector(".mast");
  const hero = document.querySelector(".hero");
  const set = () => m.classList.toggle("solid", hero.getBoundingClientRect().bottom < 70);
  addEventListener("scroll", set, { passive: true });
  set();
})();

// ---- hashes -----------------------------------------------------------------
// MD5 of each export: DPP 4.21 vs Lumetra, same files and settings.
const HASHES = [
  ["IMG_0086", "d1ff6878039a63f7c7f6dd92a67a5dee"],
  ["IMG_0087", "581835957d669a00b1e2a3db1ed7bc36"],
  ["IMG_0088", "1837666aafd2dd1431d457787463d3a9"],
  ["IMG_0089", "82f75cdf96877e5d1209be8df45a0937"],
  ["IMG_0090", "8c5cd57d5cc613a62db5a096db5ba5be"],
  ["IMG_0091", "44324a0ab842bbb3720521823d97f0ad"],
  ["IMG_0092", "3014153f821233fba5743c7a97989b91"],
  ["IMG_0093", "857ae3c62e71df68acc271afc81f9708"],
  ["IMG_0094", "b158eab5f2c267280d7a2f9a31d29400"],
  ["IMG_0095", "0a7659d7c7a8317534cef3ad9f7e4d03"],
  ["IMG_0096", "e5d5380a7917094b19d7e2666133c952"],
  ["IMG_0097", "0fa15153b62f8729d7ec89fb3760cd70"],
];
const ol = document.getElementById("hashlist");
HASHES.forEach(([name, h]) => {
  const li = document.createElement("li");
  li.title = name + ".jpg";
  li.innerHTML = `<span class="a">${h}</span><span class="b">${h}</span>`;
  ol.appendChild(li);
});

// ---- charts -----------------------------------------------------------------
const NS = "http://www.w3.org/2000/svg";
const el = (tag, attrs = {}, parent) => {
  const e = document.createElementNS(NS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(e);
  return e;
};
const tip = document.getElementById("tip");
function hover(target, text) {
  target.addEventListener("pointerenter", () => { tip.textContent = text; tip.hidden = false; });
  target.addEventListener("pointermove", (ev) => {
    tip.style.left = Math.min(ev.clientX + 14, innerWidth - tip.offsetWidth - 8) + "px";
    tip.style.top = ev.clientY + 14 + "px";
  });
  target.addEventListener("pointerleave", () => { tip.hidden = true; });
}
function svg(host, w, h) {
  const s = el("svg", { viewBox: `0 0 ${w} ${h}`, preserveAspectRatio: "xMinYMin meet" }, host);
  const p = el("pattern", { id: "hatch", width: 6, height: 6, patternUnits: "userSpaceOnUse", patternTransform: "rotate(45)" }, el("defs", {}, s));
  el("rect", { width: 6, height: 6, fill: "var(--paper)" }, p);
  el("rect", { width: 2.5, height: 6, class: "mark-lum" }, p);
  return s;
}
function xAxis(s, x0, x1, y, max, ticks, unit) {
  const g = el("g", { class: "grid" }, s);
  ticks.forEach((t, i) => {
    const x = x0 + ((x1 - x0) * t) / max;
    el("line", { x1: x, x2: x, y1: 8, y2: y }, g);
    el("text", { x, y: y + 18, "text-anchor": "middle" }, s).textContent = t + (i === ticks.length - 1 ? " " + unit : "");
  });
  el("line", { x1: x0, x2: x1, y1: y, y2: y, class: "axis" }, s);
}

(function redraw() {
  const DPP = [444, 448, 449, 450, 446, 449, 455, 447, 452, 453, 453, 449];
  const LUM = [61, 65, 61, 103, 72];
  const W = 620, H = 160, x0 = 110, x1 = 600, max = 500;
  const s = svg(document.getElementById("chart-redraw"), W, H);
  xAxis(s, x0, x1, 128, max, [0, 100, 200, 300, 400, 500], "ms");
  const X = (v) => x0 + ((x1 - x0) * v) / max;
  [["DPP 4", DPP, "mark-dpp", 42], ["Lumetra", LUM, "mark-lum", 92]].forEach(([name, vals, cls, y]) => {
    el("text", { x: 0, y: y + 5, class: "lbl" }, s).textContent = name;
    const lo = Math.min(...vals), hi = Math.max(...vals);
    vals.forEach((v, i) => {
      const jy = y + ((i * 7) % 5 - 2) * 3.2;
      el("circle", { cx: X(v), cy: jy, r: 5, class: cls + " dot" }, s);
      hover(el("circle", { cx: X(v), cy: jy, r: 11, class: "hit" }, s), `${name}: ${v} ms`);
    });
    const right = name === "DPP 4";
    el("text", { x: right ? X(lo) - 12 : X(hi) + 14, y: y + 5, class: "val", "text-anchor": right ? "end" : "start" }, s).textContent = `${lo}–${hi} ms`;
  });
})();

(function batch() {
  const ROWS = [
    { name: "DPP 4", sub: "batch export", v: 224.1, cls: "mark-dpp" },
    { name: "Lumetra", sub: "export queue", v: 29.0, cls: "mark-lum" },
  ];
  const W = 620, x0 = 150, x1 = 540, max = 240, bh = 22, gap = 30;
  const H = 20 + ROWS.length * (bh + gap) + 24;
  const s = svg(document.getElementById("chart-batch"), W, H);
  xAxis(s, x0, x1, 14 + ROWS.length * (bh + gap), max, [0, 60, 120, 180, 240], "s");
  ROWS.forEach((r, i) => {
    const y = 18 + i * (bh + gap);
    el("text", { x: 0, y: y + 9, class: "lbl" }, s).textContent = r.name;
    el("text", { x: 0, y: y + 25 }, s).textContent = r.sub;
    const w = ((x1 - x0) * r.v) / max;
    el("path", { d: `M${x0},${y} h${w - 4} a4,4 0 0 1 4,4 v${bh - 8} a4,4 0 0 1 -4,4 h${-(w - 4)} z`, class: r.cls }, s);
    if (r.cls === "mark-own") el("rect", { x: x0, y, width: w, height: bh, fill: "none", stroke: "var(--orange)", "stroke-width": 1 }, s);
    el("text", { x: x0 + w + 10, y: y + 15, class: "val" }, s).textContent = r.v.toFixed(1) + " s";
    hover(el("rect", { x: 0, y: y - 6, width: W, height: bh + 12, class: "hit" }, s), `${r.name}, ${r.sub}: ${r.v.toFixed(1)} s for 12 files`);
  });
})();
