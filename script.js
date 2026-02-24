document.addEventListener('DOMContentLoaded', () => {
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

      // Fake successful submission
      form.reset();
      if (statusText) {
        statusText.textContent =
          'Thank you! Your message has been recorded locally. You can also email me directly at mr.suah19@gmail.com.';
        statusText.style.color = '#22c55e';
      }
    });
  }

  // Set current year in footer
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

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
