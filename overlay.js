(() => {
  const btn = document.getElementById("loveBtn");
  const container = document.createElement("div");
  container.className = "loveBurstOverlay";
  container.setAttribute("aria-hidden", "true");
  document.body.appendChild(container);

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function spawnPiece(x, y) {
    const el = document.createElement("span");
    const types = ["heart", "spark"];
    const type = types[Math.floor(Math.random() * types.length)];

    el.className = type === "heart" ? "lbHeart" : "lbSpark";
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;

    const size = type === "heart" ? rand(14, 26) : rand(10, 18);
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;

    const dur = rand(700, 1100);
    el.style.setProperty("--lb-dur", `${dur}ms`);

    const dx = rand(-120, 120);
    const dy = rand(-220, -420);
    el.style.setProperty("--lb-dx", `${dx}px`);
    el.style.setProperty("--lb-dy", `${dy}px`);

    const rot = rand(-40, 40);
    el.style.setProperty("--lb-rot", `${rot}deg`);

    container.appendChild(el);
    el.addEventListener("animationend", () => el.remove());
  }

  function burst() {
    // bersihkan animasi sebelumnya
    container.innerHTML = "";

    const rect = btn.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    const count = 22;
    for (let i = 0; i < count; i++) {
      const jitterX = rand(-18, 18);
      const jitterY = rand(-10, 10);
      spawnPiece(originX + jitterX, originY + jitterY);
    }

    // efek shake tombol
    btn.classList.remove("loveBtn--burst");
    // reflow paksa agar ulang animasi
    void btn.offsetWidth;
    btn.classList.add("loveBtn--burst");
  }

  btn.addEventListener("click", burst);
})();
