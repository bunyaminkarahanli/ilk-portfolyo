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

// Lazy loading images intersection observer
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
        }
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

// Performance: Preload critical resources
const preloadLink = document.createElement("link");
preloadLink.rel = "preload";
preloadLink.as = "style";
preloadLink.href = "assets/css/style.css";
document.head.appendChild(preloadLink);

// Cookie Consent Management
(function() {
  const COOKIE_CONSENT_KEY = 'cookie_consent';
  const COOKIE_EXPIRY_DAYS = 365;
  
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }
  
  function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
  }
  
  function showCookieBanner() {
    const banner = document.getElementById('cookieConsent');
    if (banner) {
      banner.style.display = 'block';
    }
  }
  
  function hideCookieBanner() {
    const banner = document.getElementById('cookieConsent');
    if (banner) {
      banner.style.display = 'none';
    }
  }
  
  function acceptCookies() {
    setCookie(COOKIE_CONSENT_KEY, 'accepted', COOKIE_EXPIRY_DAYS);
    hideCookieBanner();
    // Google Analytics zaten yüklü, sadece banner'ı gizle
  }
  
  function rejectCookies() {
    setCookie(COOKIE_CONSENT_KEY, 'rejected', COOKIE_EXPIRY_DAYS);
    hideCookieBanner();
    // Google Analytics'i devre dışı bırak
    if (window.gtag) {
      window['ga-disable-G-VT9YNH7L0R'] = true;
    }
  }
  
  // Sayfa yüklendiğinde kontrol et
  document.addEventListener('DOMContentLoaded', function() {
    const consent = getCookie(COOKIE_CONSENT_KEY);
    
    if (!consent) {
      // İlk ziyaret - banner'ı göster
      setTimeout(showCookieBanner, 1000);
    } else if (consent === 'rejected') {
      // Daha önce reddedilmiş - Analytics'i devre dışı bırak
      if (window.gtag) {
        window['ga-disable-G-VT9YNH7L0R'] = true;
      }
    }
    
    // Buton event listener'ları
    const acceptBtn = document.getElementById('acceptCookies');
    const rejectBtn = document.getElementById('rejectCookies');
    
    if (acceptBtn) {
      acceptBtn.addEventListener('click', acceptCookies);
    }
    
    if (rejectBtn) {
      rejectBtn.addEventListener('click', rejectCookies);
    }
  });
})();
