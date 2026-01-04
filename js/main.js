document.addEventListener("DOMContentLoaded", function () {
  console.log("⚡ JS Iniciado: Gramas y Parques");

  // ======================================================
  // 1. INYECCIÓN DEL MENÚ PRINCIPAL (HEADER)
  // ======================================================
  const path = window.location.pathname;
  // Detectar si estamos en carpeta hija (productos/ o blog/)
  const isSubfolder = path.includes("/productos/") || path.includes("/blog/");
  const ruta = isSubfolder ? "../" : "./";
  const rutaProd = isSubfolder ? "./" : "./productos/";

  /* === REEMPLAZO DENTRO DE js/main.js === */
  const menuHTML = `
    <div class="top-bar">
      📍 Envíos e Instalación en Barranquilla, Cartagena, Santa Marta y todo el país
    </div>
    <header>
      <div class="container navbar">
        <a href="${ruta}index.html" class="logo-container">
          <img src="${ruta}img/logo.png" alt="Gramas y Parques Colombia" class="logo-img" width="180" height="60" fetchpriority="high" />
        </a>
        <div class="mobile-toggle" role="button" aria-label="Abrir menú de navegación" tabindex="0">&#9776;</div>
        <nav class="nav-menu">
          <div class="dropdown">
            <a href="${rutaProd}gramas.html" class="dropbtn" id="link-gramas">GRAMAS</a>
            <span class="submenu-toggle" role="button" aria-label="Ver subcategorías" tabindex="0">▼</span>
            <div class="dropdown-content">
              <a href="${rutaProd}gramas.html"><strong>Ver Todo Gramas</strong></a>
              <a href="${rutaProd}gramas.html#paisajismo">Paisajismo y Decoración</a>
              <a href="${rutaProd}gramas.html#deportivas">Deportivas</a>
            </div>
          </div>
          <div class="dropdown">
            <a href="${rutaProd}canchas-sinteticas.html" class="dropbtn" id="link-canchas">CANCHAS DEPORTIVAS</a>
            <span class="submenu-toggle" role="button" aria-label="Ver subcategorías" tabindex="0">▼</span>
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
            <span class="submenu-toggle" role="button" aria-label="Ver subcategorías" tabindex="0">▼</span>
            <div class="dropdown-content">
              <a href="${rutaProd}parques.html"><strong>Ver Todo Parques</strong></a>
              <a href="${rutaProd}parques.html#metalica">Línea Metálica (Alto Tráfico)</a>
              <a href="${rutaProd}parques.html#madera">Línea Madera Inmunizada</a>
              <a href="${rutaProd}parques.html#playground">Playground Importados</a>
              <a href="${rutaProd}parques.html#mantenimiento">Mantenimiento y Repuestos</a>
            </div>
          </div>
          <a href="${rutaProd}biosaludables.html" id="link-biosaludables">BIOSALUDABLES</a>
          <div class="dropdown">
            <a href="${rutaProd}mobiliario-urbano.html" class="dropbtn" id="link-mobiliario">MOBILIARIO</a>
            <span class="submenu-toggle" role="button" aria-label="Ver subcategorías" tabindex="0">▼</span>
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

  // Inyectar Menú
  const menuContainer = document.getElementById("menu-universal");
  if (menuContainer) {
    menuContainer.innerHTML = menuHTML;
    highlightCurrentPage(path);
  }

  // ======================================================
  // 2. EJECUTAR LA CONVERSIÓN A STICKY AUTOMÁTICAMENTE
  // ======================================================
  // Intentamos convertir inmediatamente
  try {
    convertirMenuSticky();
  } catch (error) {
    console.error("Error al crear menú sticky:", error);
  }

  // ======================================================
  // 3. INTERACCIONES DEL SITIO
  // ======================================================
  const toggleButton = document.querySelector(".mobile-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const header = document.querySelector("header");
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  // A. Menú Móvil
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

  // B. Submenús (Flechas)
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

  // D. Inicializar componentes
  initWhatsApp();
  initScrollTop(scrollTopBtn);
  initLightbox();
});

// ======================================================
// 4. FUNCIÓN MÁGICA (STICKY FIX)
// ======================================================
function convertirMenuSticky() {
  // Buscar el menú viejo por su clase
  const oldWrapper = document.querySelector(".quick-nav-wrapper");

  // Si no existe, significa que la página ya está arreglada o es index.html
  if (!oldWrapper) {
    console.log("No se encontró menú viejo para convertir. Todo OK.");
    return;
  }

  console.log("⚠️ Menú viejo encontrado. Convirtiendo a Sticky...");

  // Encontrar elementos padre
  const textCenterDiv = oldWrapper.closest(".text-center");
  const container = oldWrapper.closest(".container");
  const headerSection = oldWrapper.closest("section");

  if (!headerSection || !container || !textCenterDiv) return;

  // 1. Extraer los enlaces viejos
  const links = Array.from(oldWrapper.querySelectorAll("a")).map((a) => ({
    href: a.getAttribute("href"),
    text: a.innerText,
  }));

  // 2. Crear la barra Sticky nueva (Con estilos forzados)
  const stickyBar = document.createElement("div");
  stickyBar.className = "category-nav";
  stickyBar.style.cssText = `
    position: sticky;
    position: -webkit-sticky;
    top: 0;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.98);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    padding: 15px 0;
    margin-bottom: 0;
    width: 100%;
    text-align: center;
  `;

  stickyBar.innerHTML = `
    <div class="container">
      ${links
        .map(
          (link) => `<a href="${link.href}" class="cat-link">${link.text}</a>`
        )
        .join("")}
    </div>
  `;

  // 3. Crear nueva sección para el contenido de abajo
  const newSection = document.createElement("section");
  newSection.className = "section bg-light";
  newSection.style.paddingTop = "20px"; // Espacio pequeño
  const newContainer = document.createElement("div");
  newContainer.className = "container";
  newSection.appendChild(newContainer);

  // 4. Mover el contenido (Títulos y tarjetas) a la nueva sección
  // Todo lo que esté después del div del título (.text-center)
  let nextNode = textCenterDiv.nextElementSibling;
  while (nextNode) {
    let nodeToMove = nextNode;
    nextNode = nextNode.nextElementSibling;
    newContainer.appendChild(nodeToMove);
  }

  // 5. Ajustar márgenes del header viejo
  headerSection.style.paddingBottom = "0";
  textCenterDiv.style.marginBottom = "15px";

  // 6. Insertar en el DOM
  // Insertamos la sección nueva DESPUÉS del header
  headerSection.after(newSection);
  // Insertamos la barra sticky ENTRE el header y la nueva sección
  headerSection.after(stickyBar);

  // 7. Eliminar el menú viejo
  oldWrapper.remove();
}

// Funciones auxiliares
function highlightCurrentPage(path) {
  const p = path.toLowerCase();
  const active = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.style.color = "var(--naranja-urgencia)";
      el.style.fontWeight = "800";
    }
  };
  if (p.includes("gramas")) active("link-gramas");
  else if (p.includes("canchas")) active("link-canchas");
  else if (p.includes("parques")) active("link-parques");
  else if (p.includes("biosaludables")) active("link-biosaludables");
  else if (p.includes("mobiliario")) active("link-mobiliario");
  else if (p.includes("blog")) active("link-blog");
  else if (p.includes("contacto")) active("link-contacto");
}

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
