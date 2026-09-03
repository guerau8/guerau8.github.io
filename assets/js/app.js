// assets/js/app.js
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for same-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Reveal-on-scroll using IntersectionObserver
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.card, .timeline-item, .section .lead, .hero-inner').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // Lazy-load YouTube thumbnails -> replace with iframe on click/keyboard
  function createIframe(videoId) {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1`);
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('loading', 'lazy');
    iframe.style.width = '100%';
    iframe.style.height = '220px';
    iframe.style.border = '0';
    return iframe;
  }

  document.querySelectorAll('.yt-thumb').forEach(el => {
    const videoId = el.dataset.videoId;
    if (!videoId) return;
    // Click and keyboard (Enter/Space)
    const play = () => {
      const iframe = createIframe(videoId);
      el.innerHTML = '';
      el.appendChild(iframe);
    };
    el.addEventListener('click', play);
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        play();
      }
    });
  });

  // Neon flicker effect (subtle)
  const neon = document.querySelector('.neon');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (neon && !prefersReduced) {
    const flickerOnce = () => {
      neon.style.filter = 'drop-shadow(0 0 18px rgba(255,60,172,0.18))';
      setTimeout(() => neon.style.filter = '', 200 + Math.random() * 400);
    };
    setTimeout(flickerOnce, 400);
    setTimeout(flickerOnce, 900);
  }
});
