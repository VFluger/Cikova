scrollAnimation();

const animationObserver = new IntersectionObserver((entry) => {
  if (entry.isIntersecting) {
    const televisionAnimationEl = document.querySelectorAll(
      ".television-animation-el"
    );
    televisionAnimationEl.forEach((el) => {
      el.style.animation = "television-appear 1s forwards 1s";
    });
  }
});

animationObserver.observe(document.querySelector("#television"));
