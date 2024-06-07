document.addEventListener('DOMContentLoaded', function () {
  AOS.init({
    duration: 1000,
    once: false, // Make animations trigger every time on scroll
  });

  function countUp(element, endValue) {
    let startValue = 0;
    let duration = Math.floor(2000 / endValue);
    let counter = setInterval(function () {
      startValue += 1;
      element.textContent = startValue;
      if (startValue === endValue) {
        clearInterval(counter);
      }
    }, duration);
  }

  countUp(document.getElementById('project-count'), 20);
  countUp(document.getElementById('client-count'), 15);
  countUp(document.getElementById('experience-count'), 5);

  // Canvas animation for hero section
  const canvas = document.getElementById('hero-canvas');
  const ctx = canvas.getContext('2d');

  let particles = [];
  const numParticles = 100;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function createParticles() {
    particles = [];
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        dx: (Math.random() - 0.5) * 2,
        dy: (Math.random() - 0.5) * 2,
        color: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.7)`
      });
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;

      if (p.x - p.radius < 0 || p.x + p.radius > canvas.width) p.dx *= -1;
      if (p.y - p.radius < 0 || p.y + p.radius > canvas.height) p.dy *= -1;
    });
  }

  function animate() {
    drawParticles();
    requestAnimationFrame(animate);
  }

  createParticles();
  animate();
});


// ### Updated `scripts.js`

// Adding smooth scroll behavior for the navigation links:

javascript
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Initialize AOS (Animate On Scroll) library
  AOS.init({
    duration: 1000,
    once: false // Ensure animation happens every time element comes into view
  });
});

document.addEventListener('DOMContentLoaded', function () {
  AOS.init({
      duration: 1200,
  });

  const projectCount = document.getElementById('project-count');
  const clientCount = document.getElementById('client-count');
  const experienceCount = document.getElementById('experience-count');

  let projects = 50;
  let clients = 20;
  let experience = 5;

  const counterUp = (el, count) => {
      let current = 0;
      const updateCount = () => {
          if (current < count) {
              current += 1;
              el.innerText = current;
              setTimeout(updateCount, 50);
          } else {
              el.innerText = count;
          }
      };
      updateCount();
  };

  counterUp(projectCount, projects);
  counterUp(clientCount, clients);
  counterUp(experienceCount, experience);
});

document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  fetch(form.action, {
    method: form.method,
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      document.getElementById('result').innerHTML = '<div class="alert alert-success">Message sent successfully!</div>';
      form.reset();
    } else {
      response.json().then(data => {
        document.getElementById('result').innerHTML = '<div class="alert alert-danger">' + (data.message || 'Failed to send message.') + '</div>';
      });
    }
  }).catch(error => {
    document.getElementById('result').innerHTML = '<div class="alert alert-danger">An error occurred. Please try again later.</div>';
  });
});