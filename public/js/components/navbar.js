
function initUpdateNavbarOnScroll() {
  const navbar = document.querySelector('.navbar-wagon');
  const navbarLinks = document.querySelectorAll('.navbar-wagon-link');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= window.innerHeight - 100) {
        navbar.classList.add('navbar-wagon-white');
        navbarLinks.forEach(link => {
          link.classList.add('navbar-wagon-link-black');
        });
      } else {
        navbar.classList.remove('navbar-wagon-white');
        navbarLinks.forEach(link => {
          link.classList.remove('navbar-wagon-link-black');
        });
      }
    });
  }
}

function disableScroll() {
  const login = document.querySelector('.login-page');
  if (login) {
    console.log("hello");
    const navbar = document.querySelector('.navbar-wagon');
    const navbarLinks = document.querySelectorAll('.navbar-wagon-link');
    navbar.classList.add('navbar-wagon-white');
    navbarLinks.forEach(link => {
      link.classList.add('navbar-wagon-link-black');
    });
  }
}

export { initUpdateNavbarOnScroll, disableScroll };
