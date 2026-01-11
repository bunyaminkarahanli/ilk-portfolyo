// Menu icon accessibility and functionality
const menuicon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");

if (menuicon && navbar) {
  menuicon.addEventListener("click", (e) => {
    e.stopPropagation();
    const isExpanded = navbar.classList.toggle("active");
    menuicon.setAttribute("aria-expanded", isExpanded);
  });

  // Menü içindeki linke basınca kapat
  navbar.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      navbar.classList.remove("active");
      menuicon.setAttribute("aria-expanded", "false");
    });
  });

  // Dışarı tıklayınca kapat
  document.addEventListener("click", (e) => {
    if (!navbar.contains(e.target) && !menuicon.contains(e.target)) {
      navbar.classList.remove("active");
      menuicon.setAttribute("aria-expanded", "false");
    }
  });

  // ESC ile kapat
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      navbar.classList.remove("active");
      menuicon.setAttribute("aria-expanded", "false");
    }
  });
}

// WhatsApp contact functionality
const WHATSAPP_NUMBER = "905515111041";
const whatsappBtn = document.getElementById("whatsappSendBtn");
const contactMessage = document.getElementById("contactMessage");

if (whatsappBtn && contactMessage) {
  whatsappBtn.addEventListener("click", () => {
    const message = contactMessage.value.trim();

    if (!message) {
      alert("Lütfen bir mesaj yazın.");
      contactMessage.focus();
      return;
    }
    
    const text = encodeURIComponent(message);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    window.open(url, "_blank", "noopener,noreferrer");
  });

  // Enter tuşu ile gönder (Shift+Enter ile yeni satır)
  contactMessage.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      whatsappBtn.click();
    }
  });
}

/**
 * Cookie Consent Management (GA4 Consent Mode)
 */
(function () {
  const CONSENT_COOKIE = "cookie_consent_v1";
  const EXP_DAYS = 365;

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  }

  function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/; SameSite=Lax`;
  }

  function applyConsent(value) {
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: value === "accepted" ? "granted" : "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied"
      });

      // Manuel page_view sadece kullanıcı kabul ettikten sonra gönderilir
      if (value === "accepted") {
        window.gtag("event", "page_view", {
          page_title: document.title,
          page_location: window.location.href,
          page_path: window.location.pathname
        });
      }
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const banner = document.getElementById("cookieConsent");
    const acceptBtn = document.getElementById("acceptCookies");
    const rejectBtn = document.getElementById("rejectCookies");
    const saved = getCookie(CONSENT_COOKIE);

    if (!saved && banner) banner.style.display = "block";
    if (saved) applyConsent(saved);

    if (acceptBtn) acceptBtn.onclick = () => {
      setCookie(CONSENT_COOKIE, "accepted", EXP_DAYS);
      applyConsent("accepted");
      banner.style.display = "none";
    };

    if (rejectBtn) rejectBtn.onclick = () => {
      setCookie(CONSENT_COOKIE, "rejected", EXP_DAYS);
      applyConsent("rejected");
      banner.style.display = "none";
    };
  });
})();
