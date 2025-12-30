document.addEventListener("DOMContentLoaded", function () {
  // ==========================================
  // 1. VARIABLES Y SELECTORES GENERALES
  // ==========================================
  const toggleButton = document.querySelector(".mobile-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu a");
  const header = document.querySelector("header");
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  // ==========================================
  // 2. LÓGICA DEL MENÚ MÓVIL (HAMBURGUESA)
  // ==========================================
  /* SEO NOTE: Usamos Unicode para evitar errores de caracteres extraños */
  if (toggleButton && navMenu) {
    const setMenuState = (isOpen) => {
      if (isOpen) {
        toggleButton.innerHTML = "&#10005;"; // Icono X (Cerrar) seguro
        toggleButton.style.color = "var(--naranja-urgencia)";
        toggleButton.setAttribute("aria-expanded", "true");
      } else {
        toggleButton.innerHTML = "&#9776;"; // Icono Hamburguesa seguro
        toggleButton.style.color = "var(--verde-natural)";
        toggleButton.setAttribute("aria-expanded", "false");
      }
    };

    toggleButton.addEventListener("click", () => {
      const isOpened = navMenu.classList.toggle("active");
      setMenuState(isOpened);
    });

    // Cerrar menú al hacer clic en un enlace (que no sea desplegable)
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (!link.classList.contains("dropbtn")) {
          navMenu.classList.remove("active");
          setMenuState(false);
        }
      });
    });

    // Cerrar al hacer clic fuera del menú
    document.addEventListener("click", (e) => {
      if (
        !navMenu.contains(e.target) &&
        !toggleButton.contains(e.target) &&
        !e.target.classList.contains("submenu-toggle") &&
        navMenu.classList.contains("active")
      ) {
        navMenu.classList.remove("active");
        setMenuState(false);
      }
    });
  }

  // ==========================================
  // 3. LÓGICA DE SUBMENÚS MÓVILES (FLECHITAS)
  // ==========================================
  const submenuToggles = document.querySelectorAll(".submenu-toggle");
  submenuToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const parentDropdown = toggle.parentElement;
      parentDropdown.classList.toggle("active-dropdown");
    });
  });

  // ==========================================
  // 4. HEADER STICKY (PERFORMANCE FRIENDLY)
  // ==========================================
  let lastScrollY = window.scrollY;
  let ticking = false;

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

  // ==========================================
  // 5. LÓGICA BOTÓN FLOTANTE WHATSAPP (MODAL)
  // ==========================================
  const waButton = document.getElementById("wa-button");
  const waModal = document.getElementById("wa-modal");
  const closeModal = document.getElementById("close-wa");
  const sendButton = document.getElementById("btn-send-wa");

  if (waButton && waModal && sendButton) {
    waButton.addEventListener("click", function () {
      waModal.style.display = "block";
    });

    closeModal.addEventListener("click", function () {
      waModal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
      if (event.target == waModal) {
        waModal.style.display = "none";
      }
    });

    sendButton.addEventListener("click", function () {
      const nameInput = document.getElementById("wa-name");
      const interest = document.getElementById("wa-interest").value;
      const desc = document.getElementById("wa-desc").value.trim();
      const name = nameInput.value.trim();

      // TU NÚMERO DE CONTACTO
      const phoneNumber = "573112531330";

      if (name === "") {
        alert("Por favor escribe tu nombre para atenderte mejor.");
        nameInput.focus();
        return;
      }

      // Construcción del mensaje URL Encodeado
      let message = `Hola, mi nombre es *${name}*. Estoy interesado en *${interest}*.`;

      if (desc !== "") {
        message += ` Detalle adicional: ${desc}`;
      } else {
        message += ` Me gustaría recibir una cotización.`;
      }

      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        message
      )}`;
      window.open(whatsappUrl, "_blank");
      waModal.style.display = "none";
    });
  }

  // ==========================================
  // 6. LÓGICA BOTÓN SCROLL TOP (SUBIR)
  // ==========================================
  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add("show");
      } else {
        scrollTopBtn.classList.remove("show");
      }
    });

    scrollTopBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // ==========================================
  // 7. LÓGICA LIGHTBOX (NUEVA FUNCIONALIDAD)
  // ==========================================
  const modal = document.getElementById("myLightbox");
  const modalImg = document.getElementById("img01");
  const captionText = document.getElementById("caption");
  // Seleccionamos todas las imágenes que tengan la clase .park-img
  const images = document.querySelectorAll(".park-img");
  const span = document.getElementsByClassName("close-lightbox")[0];

  // Solo ejecutamos si existen los elementos del modal y hay imágenes
  if (modal && modalImg && images.length > 0) {
    // Asignar evento click a cada imagen de producto
    images.forEach((img) => {
      img.addEventListener("click", function () {
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
      });
    });

    // Funcionalidad del botón cerrar (X)
    if (span) {
      span.addEventListener("click", function () {
        modal.style.display = "none";
      });
    }

    // Cerrar al hacer clic fuera de la imagen (en el fondo oscuro)
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  }
}); // FIN DEL DOMContentLoaded
