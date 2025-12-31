document.addEventListener("DOMContentLoaded", function () {
  // ======================================================
  // 1. INYECCIÓN DEL MENÚ UNIVERSAL (NUEVO)
  // ======================================================

  // A. Detectar ubicación para definir la ruta correcta (../ o ./)
  const path = window.location.pathname;
  const isSubfolder = path.includes("/productos/") || path.includes("/blog/");

  // 'ruta' = Para volver al inicio (logo, index.html)
  const ruta = isSubfolder ? "../" : "./";
  // 'rutaProd' = Para ir a productos (desde inicio entra a carpeta, desde productos se queda)
  const rutaProd = isSubfolder ? "./" : "./productos/";

  // B. Definir el HTML del Menú (Con enlaces corregidos y unificados)
  const menuHTML = `
    <div class="top-bar">
      📍 Envíos e Instalación en Barranquilla, Cartagena, Santa Marta y todo el país
    </div>

    <header>
      <div class="container navbar">
        <a href="${ruta}index.html" class="logo-container">
          <img src="${ruta}img/logo.png" alt="Gramas y Parques Colombia" class="logo-img" width="150" height="auto" />
        </a>

        <div class="mobile-toggle" aria-label="Abrir menú de navegación">&#9776;</div>

        <nav class="nav-menu">
          
          <div class="dropdown">
            <a href="${rutaProd}gramas.html" class="dropbtn" id="link-gramas">GRAMAS</a>
            <span class="submenu-toggle">▼</span>
            <div class="dropdown-content">
              <a href="${rutaProd}gramas.html"><strong>Ver Todo Gramas</strong></a>
              <a href="${rutaProd}gramas.html#paisajismo">Paisajismo y Decoración</a>
              <a href="${rutaProd}gramas.html#deportivas">Deportivas</a>
            </div>
          </div>

          <div class="dropdown">
            <a href="${rutaProd}canchas-sinteticas.html" class="dropbtn" id="link-canchas">CANCHAS DEPORTIVAS</a>
            <span class="submenu-toggle">▼</span>
            <div class="dropdown-content">
              <a href="${rutaProd}canchas-sinteticas.html"><strong>Ver Portafolio</strong></a>
              <a href="${rutaProd}canchas-sinteticas.html#sinteticas">Sintéticas y Múltiples</a>
              <a href="${rutaProd}canchas-sinteticas.html#cubiertas">Cubiertas y Estructuras</a>
              <a href="${rutaProd}canchas-sinteticas.html#cerramientos">Cerramientos y Mallas</a>
              <a href="${rutaProd}canchas-sinteticas.html#dotacion">Dotación Profesional</a>
            </div>
          </div>

          <div class="dropdown">
            <a href="${rutaProd}parques.html" class="dropbtn" id="link-parques">PARQUES</a>
            <span class="submenu-toggle">▼</span>
            <div class="dropdown-content">
              <a href="${rutaProd}parques.html"><strong>Ver Todo Parques</strong></a>
              <a href="${rutaProd}parques.html#metalica">Línea Metálica (Alto Tráfico)</a>
              <a href="${rutaProd}parques.html#madera">Línea Madera Inmunizada</a>
              <a href="${rutaProd}parques.html#playground">Playground Importados</a>
              <a href="${rutaProd}parques.html#mantenimiento">Mantenimiento de Parques</a>
            </div>
          </div>

          <a href="${rutaProd}biosaludables.html" id="link-biosaludables">BIOSALUDABLES</a>

          <div class="dropdown">
            <a href="${rutaProd}mobiliario-urbano.html" class="dropbtn" id="link-mobiliario">MOBILIARIO</a>
            <span class="submenu-toggle">▼</span>
            <div class="dropdown-content">
              <a href="${rutaProd}mobiliario-urbano.html"><strong>Ver Todo Mobiliario</strong></a>
              <a href="${rutaProd}mobiliario-urbano.html#concreto">Bancas de Concreto</a>
              <a href="${rutaProd}mobiliario-urbano.html#madera">Bancas de Madera</a>
              <a href="${rutaProd}mobiliario-urbano.html#canecas">Canecas Acero Inox</a>
              <a href="${rutaProd}mobiliario-urbano.html#mesas">Mesas de Picnic</a>
            </div>
          </div>

          <a href="${ruta}blog.html" style="font-weight: 700" id="link-blog">BLOG</a>
          <a href="${ruta}contacto.html" class="contacto-link" id="link-contacto">CONTÁCTENOS</a>
        </nav>
      </div>
    </header>
  `;

  // C. Inyectar el HTML en el contenedor
  const menuContainer = document.getElementById("menu-universal");
  if (menuContainer) {
    menuContainer.innerHTML = menuHTML;
    // Resaltar página actual (Color Naranja)
    highlightCurrentPage(path);
  } else {
    // Si no encuentra el div, no hace nada (útil para debug)
    console.warn(
      "No se encontró el <div id='menu-universal'>. Asegúrate de agregarlo en el HTML."
    );
  }

  // ======================================================
  // 2. LÓGICA DE INTERACCIÓN (TU CÓDIGO ORIGINAL MEJORADO)
  // ======================================================

  // Seleccionamos los elementos AHORA que ya existen en el DOM
  const toggleButton = document.querySelector(".mobile-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu a");
  const header = document.querySelector("header");
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  // --- A. MENÚ MÓVIL ---
  if (toggleButton && navMenu) {
    const setMenuState = (isOpen) => {
      if (isOpen) {
        toggleButton.innerHTML = "&#10005;"; // Icono X
        toggleButton.style.color = "var(--naranja-urgencia)";
        toggleButton.setAttribute("aria-expanded", "true");
      } else {
        toggleButton.innerHTML = "&#9776;"; // Icono Hamburguesa
        toggleButton.style.color = "var(--verde-natural)";
        toggleButton.setAttribute("aria-expanded", "false");
      }
    };

    toggleButton.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpened = navMenu.classList.toggle("active");
      setMenuState(isOpened);
    });

    // Cerrar menú al hacer clic en enlace (excepto dropdowns)
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (!link.classList.contains("dropbtn")) {
          navMenu.classList.remove("active");
          setMenuState(false);
        }
      });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener("click", (e) => {
      if (
        navMenu.classList.contains("active") &&
        !navMenu.contains(e.target) &&
        !toggleButton.contains(e.target) &&
        !e.target.classList.contains("submenu-toggle")
      ) {
        navMenu.classList.remove("active");
        setMenuState(false);
      }
    });
  }

  // --- B. SUBMENÚS (FLECHITAS MÓVIL) ---
  const submenuToggles = document.querySelectorAll(".submenu-toggle");
  submenuToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const parentDropdown = toggle.parentElement;
      parentDropdown.classList.toggle("active-dropdown");
    });
  });

  // --- C. HEADER STICKY (PEGAJOSO) ---
  let lastScrollY = window.scrollY;
  let ticking = false;
  if (header) {
    window.addEventListener(
      "scroll",
      () => {
        lastScrollY = window.scrollY;
        if (!ticking) {
          window.requestAnimationFrame(() => {
            if (lastScrollY > 50) {
              header.classList.add("scrolled");
            } else {
              header.classList.remove("scrolled");
            }
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true }
    );
  }

  // --- D. BOTÓN WHATSAPP Y MODAL ---
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
      const nameInput = document.getElementById("wa-name");
      const interest = document.getElementById("wa-interest").value;
      const desc = document.getElementById("wa-desc").value.trim();
      const name = nameInput.value.trim();
      const phoneNumber = "573112531330"; // TU NÚMERO

      if (name === "") {
        alert("Por favor escribe tu nombre para atenderte mejor.");
        nameInput.focus();
        return;
      }
      let message = `Hola, mi nombre es *${name}*. Estoy interesado en *${interest}*.`;
      if (desc !== "") message += ` Detalle adicional: ${desc}`;
      else message += ` Me gustaría recibir una cotización.`;

      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        message
      )}`;
      window.open(whatsappUrl, "_blank");
      waModal.style.display = "none";
    });
  }

  // --- E. BOTÓN SCROLL TOP ---
  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) scrollTopBtn.classList.add("show");
      else scrollTopBtn.classList.remove("show");
    });
    scrollTopBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // --- F. LIGHTBOX (GALERÍA DE IMÁGENES) ---
  const modal = document.getElementById("myLightbox");
  const modalImg = document.getElementById("img01");
  const captionText = document.getElementById("caption");
  // Selector ampliado para que funcione en todas las páginas
  const images = document.querySelectorAll(
    ".park-img, .main-photo, .tech-img-box img"
  );
  const span = document.getElementsByClassName("close-lightbox")[0];

  if (modal && modalImg && images.length > 0) {
    images.forEach((img) => {
      img.addEventListener("click", function () {
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
      });
    });
    if (span)
      span.addEventListener("click", () => (modal.style.display = "none"));
    modal.addEventListener("click", (event) => {
      if (event.target === modal) modal.style.display = "none";
    });
  }
});

// FUNCIÓN AUXILIAR: Resaltar enlace activo
function highlightCurrentPage(path) {
  const p = path.toLowerCase();
  function active(id) {
    const el = document.getElementById(id);
    if (el) {
      el.style.color = "var(--naranja-urgencia)";
      el.style.fontWeight = "800";
    }
  }
  if (p.includes("gramas")) active("link-gramas");
  else if (p.includes("canchas")) active("link-canchas");
  else if (p.includes("parques")) active("link-parques");
  else if (p.includes("biosaludables")) active("link-biosaludables");
  else if (p.includes("mobiliario")) active("link-mobiliario");
  else if (p.includes("blog")) active("link-blog");
  else if (p.includes("contacto")) active("link-contacto");
}
