const menuicon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");

menuicon.addEventListener("click", (e) => {
  e.stopPropagation();
  navbar.classList.toggle("active");
});

// Menü içindeki linke basınca kapat
navbar.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => navbar.classList.remove("active"));
});

// Dışarı tıklayınca kapat
document.addEventListener("click", (e) => {
  if (!navbar.contains(e.target) && !menuicon.contains(e.target)) {
    navbar.classList.remove("active");
  }
});

// ESC ile kapat
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") navbar.classList.remove("active");
});

const WHATSAPP_NUMBER = "905515111041";

document.getElementById("whatsappSendBtn").addEventListener("click", () => {
  const message = document.getElementById("contactMessage").value.trim();

  if (!message) {
    alert("Lütfen bir mesaj yazın.");
    return;
  }
  const text = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  window.open(url, "_blank");
});
