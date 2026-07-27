document.getElementById('year').textContent = new Date().getFullYear();

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.section > .container > *:not(.section-title):not(.underline):not(.section-subtitle)').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    }
  });
}, { rootMargin: '-50% 0px -50% 0px' });

document.querySelectorAll('section[id], header[id]').forEach(section => {
  navObserver.observe(section);
});

document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const service = document.getElementById('service').value;
  const message = document.getElementById('message').value.trim();
  const serviceLabels = { web: 'Desarrollo Web', mobile: 'Aplicaciones Móviles', security: 'Ciberseguridad', other: 'Otro' };
  const serviceText = service ? serviceLabels[service] : 'No especificado';
  const subject = encodeURIComponent('Consulta desde portafolio — ' + name);
  const body = encodeURIComponent('Nombre: ' + name + '\nCorreo: ' + email + '\nServicio de interés: ' + serviceText + '\n\nMensaje:\n' + message);
  window.location.href = 'mailto:christblas0511@gmail.com?subject=' + subject + '&body=' + body;
});
