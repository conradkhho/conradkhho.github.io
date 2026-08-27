/* Booking modal. Delegated from document so it survives Material's instant navigation. */
document.addEventListener("click", (event) => {
  const opener = event.target.closest("[data-booking-open]");
  if (opener) {
    const dialog = document.getElementById("booking-dialog");
    if (dialog) {
      const frame = dialog.querySelector("iframe");
      if (frame && !frame.src) frame.src = frame.dataset.src;   // load on first open
      dialog.showModal();
    }
    return;
  }
  if (event.target.closest("[data-booking-close]")) {
    document.getElementById("booking-dialog")?.close();
  }
});

/* Click the backdrop to dismiss */
document.addEventListener("click", (event) => {
  const dialog = event.target;
  if (dialog.id !== "booking-dialog" || !dialog.open) return;
  const box = dialog.getBoundingClientRect();
  const outside =
    event.clientX < box.left || event.clientX > box.right ||
    event.clientY < box.top  || event.clientY > box.bottom;
  if (outside) dialog.close();
});
