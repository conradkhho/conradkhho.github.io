/* Cross-fading rotators.
 *
 * Any element with data-rotate rotates its items:
 *   - a <ul> rotates its <li> children   (quotes)
 *   - anything else rotates its <img>s   (photo pools: page backgrounds, hero)
 *
 * Add or remove items in the markdown; nothing here needs changing.
 *
 * Material's `navigation.instant` swaps page content client-side without a
 * full reload, so `document$` (and this function) can fire again for a box
 * that's already rotating. Every code path below is guarded on
 * `box.dataset.rotating` first, so a re-entrant call touches nothing.
 */
function startRotators() {
  document.querySelectorAll("[data-rotate]").forEach((box) => {
    if (box.dataset.rotating) return;
    box.dataset.rotating = "1";

    const items = box.tagName === "UL"
      ? [...box.children]
      : [...box.querySelectorAll("img")];

    if (!items.length) return;
    items[0].classList.add("is-active");
    if (items.length < 2) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let i = 0;
    setInterval(() => {
      items[i].classList.remove("is-active");
      i = (i + 1) % items.length;
      items[i].classList.add("is-active");
    }, Number(box.dataset.rotate) || 7000);
  });
}

if (typeof document$ !== "undefined") { document$.subscribe(startRotators); }
else { document.addEventListener("DOMContentLoaded", startRotators); }

/* Inline photos: ![Caption](path){ .inset }
 * Each becomes a figure showing the whole photo over a blurred copy of itself,
 * so any aspect ratio sits in a tidy frame without being cropped.
 */
function buildInsets() {
  document.querySelectorAll("img.inset").forEach((img) => {
    if (img.closest("figure.inset-figure")) return;

    const figure = document.createElement("figure");
    figure.className = "inset-figure";
    if (img.classList.contains("side")) figure.classList.add("inset-figure--side");

    const frame = document.createElement("div");
    frame.className = "inset-figure__frame";

    const blur = img.cloneNode();
    blur.className = "inset-figure__blur";
    blur.setAttribute("aria-hidden", "true");

    // glightbox may already have wrapped the image in a link
    const anchor = img.closest("a");
    const target = anchor || img;
    target.replaceWith(figure);
    frame.append(blur, target);
    figure.append(frame);

    if (img.alt) {
      const caption = document.createElement("figcaption");
      caption.textContent = img.alt;
      figure.append(caption);
    }
  });
}

if (typeof document$ !== "undefined") { document$.subscribe(buildInsets); }
else { document.addEventListener("DOMContentLoaded", buildInsets); }
