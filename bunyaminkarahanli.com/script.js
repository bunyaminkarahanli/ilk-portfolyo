let menuicon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuicon.onclick = ()=>{
    
    navbar.classList.toggle("active")
}


window.addEventListener("click", (e) => {
    // Eğer tıklanan yer navbar veya menuicon değilse
    if (!navbar.contains(e.target) && !menuicon.contains(e.target)) {
        navbar.classList.remove("active");
        
    }
});