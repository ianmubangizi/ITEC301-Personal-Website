var nav = document.getElementById("nav")

var onmin = matchMedia("(min-width: 768px)")
var onmax = matchMedia("(max-width: 768px)")

function toggleMenu() {
    nav.classList.toggle("display-flex")
}

onmin.addListener((mq) => {
    if (mq.matches) {
        nav.classList.remove("display-flex")
    }
})
