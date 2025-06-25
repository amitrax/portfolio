// Typing animation
const textElement = document.getElementById("typing-text");
const phrases = ["Web Developer", "Freelancer", "Tech Enthusiast"];
let index = 0, charIndex = 0, isDeleting = false;

function type() {
  let current = phrases[index];
  if (isDeleting) {
    charIndex--;
    if (charIndex <= 0) {
      isDeleting = false;
      index = (index + 1) % phrases.length;
    }
  } else {
    charIndex++;
    if (charIndex === current.length + 1) {
      isDeleting = true;
      setTimeout(type, 1000);
      return;
    }
  }
  textElement.innerText = current.slice(0, charIndex);
  setTimeout(type, isDeleting ? 50 : 100);
}
type();

// Dark Mode toggle
document.getElementById("toggle-dark").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Particles background
particlesJS('particles-js', {
  "particles": {
    "number": { "value": 80 },
    "color": { "value": "#ffffff" },
    "shape": { "type": "circle" },
    "opacity": { "value": 0.3 },
    "size": { "value": 3 },
    "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 },
    "move": { "enable": true, "speed": 2 }
  },
  "interactivity": {
    "events": {
      "onhover": { "enable": true, "mode": "repulse" },
      "onclick": { "enable": true, "mode": "push" }
    },
    "modes": {
      "repulse": { "distance": 100 },
      "push": { "particles_nb": 4 }
    }
  },
  "retina_detect": true
});
