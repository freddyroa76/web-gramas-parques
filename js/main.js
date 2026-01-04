document.addEventListener("DOMContentLoaded", function () {
  console.log("⚡ JS Limpio: Gramas y Parques");

  // ======================================================
  // 1. INTERACCIONES DEL SITIO (NO TOCAR)
  // ======================================================
  const toggleButton = document.querySelector(".mobile-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const header = document.querySelector("header");
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  // A. Menú Móvil (Abre y cierra el menú en celulares)
  if (toggleButton && navMenu) {
    toggleButton.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpened = navMenu.classList.toggle("active");
      toggleButton.innerHTML = isOpened ? "&#10005;" : "&#9776;";
      toggleButton.style.color = isOpened
        ? "var(--naranja-urgencia)"
        : "var(--verde-natural)";
    });

    // Cerrar al dar click fuera
    document.addEventListener("click", (e) => {
      if (
        navMenu.classList.contains("active") &&
        !navMenu.contains(e.target) &&
        !toggleButton.contains(e.target) &&
        !e.target.classList.contains("submenu-toggle")
      ) {
        navMenu.classList.remove("active");
        toggleButton.innerHTML = "&#9776;";
        toggleButton.style.color = "var(--verde-natural)";
      }
    });
  }

  // B. Submenús (Flechas para desplegar categorías en móvil)
  document.querySelectorAll(".submenu-toggle").forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggle.parentElement.classList.toggle("active-dropdown");
    });
  });

  // C. Header Sombra al bajar
  if (header) {
    window.addEventListener(
      "scroll",
      () => {
        if (window.scrollY > 50) header.classList.add("scrolled");
        else header.classList.remove("scrolled");
      },
      { passive: true }
    );
  }

  // D. Inicializar otros componentes
  initWhatsApp();
  initScrollTop(scrollTopBtn);
  initLightbox();
});

// ======================================================
// 2. FUNCIONES DE HERRAMIENTAS (CONSERVADAS)
// ======================================================

function initWhatsApp() {
  const waButton = document.getElementById("wa-button");
  const waModal = document.getElementById("wa-modal");
  const closeModal = document.getElementById("close-wa");
  const sendButton = document.getElementById("btn-send-wa");

  if (waButton && waModal && sendButton) {
    waButton.addEventListener("click", () => (waModal.style.display = "block"));
    closeModal.addEventListener(
      "click",
      () => (waModal.style.display = "none")
    );
    window.addEventListener("click", (event) => {
      if (event.target == waModal) waModal.style.display = "none";
    });

    sendButton.addEventListener("click", function () {
      const name = document.getElementById("wa-name").value.trim();
      const interest = document.getElementById("wa-interest").value;
      const desc = document.getElementById("wa-desc").value.trim();
      const msg = `Hola, soy ${name}. Me interesa ${interest}. ${desc}`;
      window.open(
        `https://wa.me/573112531330?text=${encodeURIComponent(msg)}`,
        "_blank"
      );
      waModal.style.display = "none";
    });
  }
}

function initScrollTop(btn) {
  if (btn) {
    window.addEventListener("scroll", () =>
      btn.classList.toggle("show", window.scrollY > 300)
    );
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

function initLightbox() {
  const modal = document.getElementById("myLightbox");
  const modalImg = document.getElementById("img01");
  const captionText = document.getElementById("caption");
  const images = document.querySelectorAll(
    ".park-img, .main-photo, .tech-img-box img, .card-img-box img"
  );

  if (modal && modalImg && images.length > 0) {
    const closeBtn = document.querySelector(".close-lightbox");
    images.forEach((img) => {
      img.addEventListener("click", function () {
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
      });
    });
    if (closeBtn)
      closeBtn.addEventListener("click", () => (modal.style.display = "none"));
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.style.display = "none";
    });
  }
}
