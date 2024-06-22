let menuBtn = document.getElementById("menuBtn");

menuBtn.addEventListener("click", function(){
    document.querySelector("body").classList.toggle("mobil-nav-active");
    this.classList.toggle("fa-times");
})


// active link on scroll
let navLinks = document.querySelectorAll("nav ul li");
// get all section
let sections = document.querySelectorAll("section");

window.addEventListener("scroll", function() {
    const scrollPos = window.scrollY + 20;
    sections.forEach(section => {
        if (scrollPos > section.offsetTop && scrollPos < (section.offsetTop + section.offsetHeight)) {
          navLinks.forEach(link =>{
            link.classList.remove("active");
            if (section.getAttribute("id") === link.getAttribute("href").substring(1)) {
                link.classList.add("active");
            }
          });  
            
        }
    });
});