const currentPage =
    window.location.pathname
        .split("/")
        .pop();

const navLinks =
    document.querySelectorAll(".nav-icon");

navLinks.forEach(function(link) {

    const page =
        link.getAttribute("href");

    if (page === currentPage) {

        link.style.display = "none";

    }

});