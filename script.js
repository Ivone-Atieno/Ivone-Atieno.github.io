// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const primaryNav = document.getElementById('primaryNav');
navToggle.addEventListener('click', () => {
  const isOpen = primaryNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});
primaryNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    primaryNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Scroll-spy: highlight nav link for section in view
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.primary-nav a');
const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });
sections.forEach(section => spyObserver.observe(section));

// Scroll reveal
document.querySelectorAll('.section, .project-card').forEach(el => el.classList.add('reveal'));
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Typing terminal effect
const codeLines = [
" SELECT integrity, clarity",
" FROM Ivone_analyst",
" WHERE curiosity = HIGH",
" AND assumptions = FASLE",
" ORDER BY impact DESC;"
];
const typedEl = document.getElementById('typedCode');

function typeLines(lines, el, speed = 32, pause = 900) {
  let lineIndex = 0;
  let charIndex = 0;
  let text = '';

  function step() {
    if (lineIndex >= lines.length) {
      setTimeout(() => {
        text = '';
        el.textContent = '';
        lineIndex = 0;
        charIndex = 0;
        step();
      }, 1800);
      return;
    }
    const currentLine = lines[lineIndex];
    if (charIndex <= currentLine.length) {
      el.textContent = text + currentLine.slice(0, charIndex);
      charIndex++;
      setTimeout(step, speed);
    } else {
      text += currentLine + '\n';
      lineIndex++;
      charIndex = 0;
      setTimeout(step, pause);
    }
  }
  step();
}

if (typedEl) {
  typeLines(codeLines, typedEl);
}
