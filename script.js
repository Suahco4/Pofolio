document.addEventListener('DOMContentLoaded', () => {
  // Initialize EmailJS
  if (typeof emailjs !== 'undefined') {
    emailjs.init({
      publicKey: "jFBFsAeFuUoDxGhDj",
    });
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.length > 1) {
        event.preventDefault();
        const section = document.querySelector(targetId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Mobile navigation toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });

    // Close menu when a nav link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('show');
      });
    });
  }

  // Theme Toggle Functionality
  const themeToggleBtn = document.getElementById('theme-toggle');
  const bodyEl = document.body;

  const applyTheme = (theme) => {
    bodyEl.classList.toggle('light-mode', theme === 'light');
  };

  // Apply saved theme or system preference on load
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    applyTheme('light');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isLight = bodyEl.classList.toggle('light-mode');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
  }

  // Hide header on scroll down, show on scroll up
  const header = document.querySelector('.main-header');
  if (header) {
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
      if (lastScrollY < window.scrollY && window.scrollY > header.offsetHeight) {
        // Scrolled down past the header height
        header.classList.add('header-hidden');
      } else {
        // Scrolled up or at the top
        header.classList.remove('header-hidden');
      }
      lastScrollY = window.scrollY;
    });
  }

  // Parallax effect for hero banner
  const hero = document.querySelector('.hero');
  // Performance: Disable parallax on mobile (< 768px) to improve scroll score
  if (hero && window.matchMedia("(min-width: 768px)").matches) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          hero.style.backgroundPositionY = window.scrollY * 0.5 + 'px';
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // Contact form validation + feedback
  const form = document.getElementById('contact-form');
  const statusText = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();

      // Clear previous errors
      document.querySelectorAll('.error-message').forEach(span => {
        span.textContent = '';
      });
      if (statusText) {
        statusText.textContent = '';
        statusText.style.color = '';
      }

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const subject = form.subject.value.trim();
      const message = form.message.value.trim();

      let isValid = true;

      if (!name) {
        setError('name', 'Please enter your name.');
        isValid = false;
      }

      if (!email) {
        setError('email', 'Please enter your email.');
        isValid = false;
      } else if (!validateEmail(email)) {
        setError('email', 'Please enter a valid email address.');
        isValid = false;
      }

      if (!subject) {
        setError('subject', 'Please enter a subject.');
        isValid = false;
      }

      if (!message) {
        setError('message', 'Please enter a message.');
        isValid = false;
      }

      if (!isValid) {
        if (statusText) {
          statusText.textContent = 'Please correct the errors above and try again.';
          statusText.style.color = '#f97373';
        }
        return;
      }

      // EmailJS Configuration
      const serviceID = 'service_jxcp9fk';
      const templateID = 'template_kulz1jq';
      const autoReplyID = 'template_7r1v7yo';

      const submitBtn = form.querySelector('button[type="submit"]');
      const btnText = submitBtn.querySelector('.btn-text');
      const originalBtnText = btnText.textContent;
      btnText.textContent = 'Sending...';
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      // Prepare params for auto-reply to match the HTML template variables {{name}}, {{title}}
      const autoReplyParams = {
        name: name,
        email: email,
        title: subject,
        message: message
      };

      // Send both emails (Notification + Auto-reply)
      Promise.all([
        emailjs.sendForm(serviceID, templateID, form),
        emailjs.send(serviceID, autoReplyID, autoReplyParams)
      ])
        .then(() => {
          btnText.textContent = originalBtnText;
          submitBtn.classList.remove('loading');
          submitBtn.disabled = false;
          if (statusText) {
            statusText.textContent = 'Message sent successfully!';
            statusText.style.color = '#22c55e';
          }
          form.reset();
        }, (error) => {
          btnText.textContent = originalBtnText;
          submitBtn.classList.remove('loading');
          submitBtn.disabled = false;
          console.error('EmailJS Error:', error);
          if (statusText) {
            statusText.textContent = 'Failed to send message. Please try again.';
            statusText.style.color = '#f97373';
          }
        });
    });
  }

  // Set current year in footer
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Scroll-triggered fade-in animations for sections
  const sectionsToAnimate = document.querySelectorAll('.fade-in-section');

  if (sectionsToAnimate.length > 0 && 'IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -100px 0px' // Trigger when the section is 100px into the viewport
    });

    sectionsToAnimate.forEach(section => {
      sectionObserver.observe(section);
    });
  }

    // Scroll to Top Button
  const scrollTopBtn = document.getElementById('scroll-top');

  if (scrollTopBtn) {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
      } else {
        scrollTopBtn.classList.remove('show');
      }
    };

    // Ensure 'throttle' is defined in your script as shown in your file
    window.addEventListener('scroll', throttle(handleScroll, 100));

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Firefly cursor follower
  const firefly = document.querySelector('.firefly');
  // Performance: Only enable on devices with a mouse (hover capability)
  if (firefly && window.matchMedia("(hover: hover)").matches) {
    let isMoving = false;
    document.addEventListener('mousemove', (e) => {
      if (!isMoving) {
        window.requestAnimationFrame(() => {
          firefly.style.left = `${e.clientX}px`;
          firefly.style.top = `${e.clientY}px`;
          isMoving = false;
        });
        isMoving = true;
      }
    });
  }

  // Fetch and display song lyrics preview
  const lyricsPreviewGrid = document.getElementById('lyrics-preview-grid');
  if (lyricsPreviewGrid) {
    fetchLyricsPreview();
  }
});

async function fetchLyricsPreview() {
    const API_URL = 'https://pofolio-ck5d.onrender.com/api/lyrics';
    const grid = document.getElementById('lyrics-preview-grid');

    try {
        const res = await fetch(API_URL);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const allLyrics = await res.json();

        // Clear loading message
        grid.innerHTML = '';

        if (allLyrics.length === 0) {
            grid.innerHTML = '<p class="grid-status-message">No lyrics have been added yet. <a href="lyrics.html">Add one!</a></p>';
            return;
        }

        // Take the first 3 lyrics for the preview
        const lyricsToDisplay = allLyrics.slice(0, 3);

        lyricsToDisplay.forEach(song => {
            const linkWrapper = document.createElement('a');
            linkWrapper.href = `lyrics.html#${song._id}`;
            linkWrapper.className = 'card-link';
            linkWrapper.title = `View full lyrics for "${song.title}"`;

            const contentSnippet = song.content.split('\n').slice(0, 4).join('\n');
            const needsEllipsis = song.content.split('\n').length > 4;

            linkWrapper.innerHTML = `
                <article class="card">
                    <h3>${song.title}</h3>
                    <p class="lyric-preview-artist">By ${song.artist || 'Unknown Artist'}</p>
                    <div class="lyric-preview-content">${contentSnippet}${needsEllipsis ? '\n...' : ''}</div>
                </article>
            `;
            grid.appendChild(linkWrapper);
        });

    } catch (error) {
        console.error('Failed to fetch lyrics preview:', error);
        grid.innerHTML = '<p class="grid-status-message grid-status-message--error">Could not load lyrics. Is the backend server running?</p>';
    }
}

function setError(fieldName, message) {
  const errorSpan = document.querySelector(`.error-message[data-for="${fieldName}"]`);
  if (errorSpan) {
    errorSpan.textContent = message;
  }
}

function validateEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email.toLowerCase());
}

function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
