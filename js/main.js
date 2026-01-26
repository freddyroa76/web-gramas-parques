document.addEventListener("DOMContentLoaded", function () {
  console.log(
    "⚡ JS Experto: Gramas y Parques - Sistema de Filtrado Integrado",
  );

  // ======================================================
  // 1. COMPONENTES DE NAVEGACIÓN Y DISEÑO
  // ======================================================

  const toggleButton = document.querySelector(".mobile-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const header = document.querySelector("header");
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  // A. Menú Móvil: Gestiona la apertura/cierre del menú en dispositivos táctiles
  if (toggleButton && navMenu) {
    toggleButton.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpened = navMenu.classList.toggle("active");
      toggleButton.innerHTML = isOpened ? "&#10005;" : "&#9776;"; // Cambia entre icono de hamburguesa y 'X'
      toggleButton.style.color = isOpened
        ? "var(--naranja-urgencia)"
        : "var(--verde-natural)";
    });

    // Cierra el menú automáticamente si el usuario hace clic fuera de él
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

  // B. Submenús: Despliega las categorías dentro del menú móvil mediante flechas
  document.querySelectorAll(".submenu-toggle").forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggle.parentElement.classList.toggle("active-dropdown");
    });
  });

  // C. Header dinámico: Añade sombra al hacer scroll para mejorar la legibilidad
  if (header) {
    window.addEventListener(
      "scroll",
      () => {
        if (window.scrollY > 50) header.classList.add("scrolled");
        else header.classList.remove("scrolled");
      },
      { passive: true },
    );
  }

  // ======================================================
  // 2. SISTEMA DE FILTRADO POR CATEGORÍAS (LÓGICA EXPERTA)
  // ======================================================

  const filterButtons = document.querySelectorAll(".cat-btn");
  const blogCards = document.querySelectorAll(".blog-card");

  // Verificamos que existan botones y tarjetas para evitar errores en páginas sin blog
  if (filterButtons.length > 0 && blogCards.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault(); // Evita que la página salte al hacer clic en el botón

        // Cambio visual de botón activo: Quita 'active' de todos y lo pone en el seleccionado
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        // Obtenemos el valor de filtrado (ej: 'gramas-sinteticas', 'bancas', 'all')
        const filterValue = button.getAttribute("data-filter");

        blogCards.forEach((card) => {
          const cardCategory = card.getAttribute("data-category");

          // Lógica de visualización
          if (filterValue === "all" || cardCategory === filterValue) {
            // Muestra los elementos que coinciden con una transición suave
            card.style.display = "flex";
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "scale(1)";
            }, 10);
          } else {
            // Oculta los elementos que no coinciden
            card.style.opacity = "0";
            card.style.transform = "scale(0.95)";
            setTimeout(() => {
              card.style.display = "none";
            }, 300); // Tiempo alineado con la transición de CSS
          }
        });
      });
    });
  }

  // ======================================================
  // 3. INICIALIZACIÓN DE HERRAMIENTAS ADICIONALES
  // ======================================================
  initWhatsApp();
  initScrollTop(scrollTopBtn);
  initLightbox();
});

// ======================================================
// 4. FUNCIONES DE APOYO (ENCAPSULADAS)
// ======================================================

/**
 * Gestiona el modal y envío de datos a WhatsApp
 */
function initWhatsApp() {
  const waButton = document.getElementById("wa-button");
  const waModal = document.getElementById("wa-modal");
  const closeModal = document.getElementById("close-wa");
  const sendButton = document.getElementById("btn-send-wa");

  if (waButton && waModal && sendButton) {
    waButton.addEventListener("click", () => (waModal.style.display = "block"));
    closeModal.addEventListener(
      "click",
      () => (waModal.style.display = "none"),
    );
    window.addEventListener("click", (event) => {
      if (event.target == waModal) waModal.style.display = "none";
    });

    sendButton.addEventListener("click", function () {
      const name = document.getElementById("wa-name").value.trim();
      const interest = document.getElementById("wa-interest").value;
      const desc = document.getElementById("wa-desc").value.trim();

      if (!name) {
        alert("Por favor, ingresa tu nombre");
        return;
      }

      const msg = `Hola, soy ${name}. Me interesa información sobre ${interest}. ${desc}`;
      window.open(
        `https://wa.me/573112531330?text=${encodeURIComponent(msg)}`,
        "_blank",
      );
      waModal.style.display = "none";
    });
  }
}

/**
 * Controla el botón de "Volver Arriba"
 */
function initScrollTop(btn) {
  if (btn) {
    window.addEventListener(
      "scroll",
      () => btn.classList.toggle("show", window.scrollY > 300),
      { passive: true },
    );
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

/**
 * Galería Lightbox: Amplía imágenes al hacer clic
 */
function initLightbox() {
  const modal = document.getElementById("myLightbox");
  const modalImg = document.getElementById("img01");
  const captionText = document.getElementById("caption");
  const images = document.querySelectorAll(
    ".park-img, .main-photo, .tech-img-box img, .card-img-box img",
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
