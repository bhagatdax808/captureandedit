// CAPTURE® — Interactive Photography Portfolio Logic

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // SERVICES INTERACTIVE HOVER / SELECTION
  // --------------------------------------------------------------------------
  const serviceData = {
    'headshots': {
      image: 'photos/PZYfFvZVyilvFHwmkx9JUpJbUI.webp',
      alt: 'Professional Headshots in natural light',
      quote: '"Clean, authentic portraits that radiate confidence, professionalism, and unmistakable presence."'
    },
    'events': {
      image: 'photos/oONkplnSCJIO6GK2EOsqsX3Exg.webp',
      alt: 'Vibrant neon evening events',
      quote: '"From high-energy festivals to intimate gallery evenings, capturing the electricity of the night."'
    },
    'weddings': {
      image: 'photos/eS4Rwaq0KdMka7YC0Lt7QwVvpk.webp',
      alt: 'Bride and groom ascending staircase into sunlight',
      quote: '"From the first look to the final dance, every laugh, tear, and fleeting glance will be preserved in vivid detail."'
    },
    'family': {
      image: 'photos/gXhtgn7iO6cEsZ2EjotGPNV3l4.webp',
      alt: 'Warm family laughter and candid moments',
      quote: '"Unscripted laughter, warm embrace, and spontaneous warmth that define your family\'s story."'
    },
    'lifestyle': {
      image: 'photos/qqgMFFhBjbmzllL7E6Dml51Gw.webp',
      alt: 'Editorial lifestyle and runway fashion',
      quote: '"Editorial visual storytelling crafted for visionary brands, architects, and creators."'
    }
  };

  const serviceRows = document.querySelectorAll('.service-item-row');
  const servicePreviewImg = document.getElementById('service-preview-img');
  const serviceQuoteEl = document.getElementById('service-quote-text');

  serviceRows.forEach(row => {
    const serviceKey = row.dataset.service;

    const activateService = () => {
      if (row.classList.contains('active')) return;

      serviceRows.forEach(r => r.classList.remove('active'));
      row.classList.add('active');

      const data = serviceData[serviceKey];
      if (data && servicePreviewImg && serviceQuoteEl) {
        // Smooth fade out
        servicePreviewImg.style.opacity = '0';
        serviceQuoteEl.style.opacity = '0';

        setTimeout(() => {
          servicePreviewImg.src = data.image;
          servicePreviewImg.alt = data.alt;
          serviceQuoteEl.textContent = data.quote;

          servicePreviewImg.style.opacity = '1';
          serviceQuoteEl.style.opacity = '1';
        }, 200);
      }
    };

    row.addEventListener('mouseenter', activateService);
    row.addEventListener('click', activateService);
  });

  // --------------------------------------------------------------------------
  // ABOUT ME VIDEO MOCKUP CONTROLS
  // --------------------------------------------------------------------------
  const playBtn = document.getElementById('video-play-toggle');
  const progressFill = document.querySelector('.progress-fill');
  let isPlaying = false;
  let progressInterval = null;
  let currentPct = 35;

  if (playBtn && progressFill) {
    playBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      playBtn.textContent = isPlaying ? '❚❚' : '▶';

      if (isPlaying) {
        progressInterval = setInterval(() => {
          currentPct += 1.5;
          if (currentPct > 100) currentPct = 0;
          progressFill.style.width = currentPct + '%';
        }, 150);
      } else {
        clearInterval(progressInterval);
      }
    });
  }

  // --------------------------------------------------------------------------
  // CHAT MODAL / INQUIRY ACTION
  // --------------------------------------------------------------------------
  const chatButtons = document.querySelectorAll('.nav-btn, .card-chat-btn, .inline-chat-link, .milestone-btn, .service-chat-btn');
  const modal = document.getElementById('chat-modal');
  const closeModal = document.getElementById('modal-close-btn');

  chatButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeModal && modal) {
    closeModal.addEventListener('click', () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // --------------------------------------------------------------------------
  // SMOOTH SCROLL NAV HIGHLIGHT
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.pageYOffset + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
});