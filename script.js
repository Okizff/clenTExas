/**
 * FreshNest Cleaning - Frontend SPA Controller & Interaction Script
 * Location: Austin, Texas
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Client-Side SPA Navigation & Route Metadata ---
  const routes = {
    home: {
      title: 'FreshNest Cleaning | Professional Cleaning Services in Austin, TX',
      elementId: 'page-home'
    },
    services: {
      title: 'Cleaning Services in Austin, TX | FreshNest Cleaning',
      elementId: 'page-services'
    },
    about: {
      title: 'About FreshNest Cleaning | Austin Cleaning Company',
      elementId: 'page-about'
    },
    contact: {
      title: 'Contact FreshNest Cleaning | Get a Free Quote',
      elementId: 'page-contact'
    }
  };

  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const pageSections = document.querySelectorAll('.page-section');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');

  function navigateTo(pageKey) {
    if (!routes[pageKey]) pageKey = 'home';

    // Hide all pages
    pageSections.forEach(section => section.classList.remove('active'));

    // Show active page
    const activeSection = document.getElementById(routes[pageKey].elementId);
    if (activeSection) {
      activeSection.classList.add('active');
    }

    // Update HTML Title for SEO
    document.title = routes[pageKey].title;

    // Update active nav link states
    navLinks.forEach(link => {
      if (link.dataset.page === pageKey) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Close Mobile Drawer if open
    mobileDrawer.classList.remove('open');

    // Scroll to top of viewport
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Handle click events on links with data-page attributes
  document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-page]');
    if (link) {
      e.preventDefault();
      const pageKey = link.dataset.page;
      navigateTo(pageKey);
      history.pushState({ page: pageKey }, '', `#${pageKey}`);
    }
  });

  // Handle Browser Back/Forward buttons
  window.addEventListener('popstate', (e) => {
    const pageKey = location.hash.replace('#', '') || 'home';
    navigateTo(pageKey);
  });

  // Initial Route Load
  const initialPage = location.hash.replace('#', '') || 'home';
  navigateTo(initialPage);


  // --- 2. Mobile Drawer Menu Toggle ---
  if (hamburgerBtn && mobileDrawer) {
    hamburgerBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
    });
  }


  // --- 3. Contact Page Tabs Switching ---
  const tabQuoteBtn = document.getElementById('tabQuoteBtn');
  const tabContactBtn = document.getElementById('tabContactBtn');
  const formQuote = document.getElementById('formQuote');
  const formContact = document.getElementById('formContact');
  const successAlert = document.getElementById('formSuccessAlert');

  if (tabQuoteBtn && tabContactBtn) {
    tabQuoteBtn.addEventListener('click', () => {
      tabQuoteBtn.classList.add('active');
      tabContactBtn.classList.remove('active');
      formQuote.classList.remove('hidden-form');
      formQuote.classList.add('active-form');
      formContact.classList.add('hidden-form');
      formContact.classList.remove('active-form');
      successAlert.classList.add('hidden');
    });

    tabContactBtn.addEventListener('click', () => {
      tabContactBtn.classList.add('active');
      tabQuoteBtn.classList.remove('active');
      formContact.classList.remove('hidden-form');
      formContact.classList.add('active-form');
      formQuote.classList.add('hidden-form');
      formQuote.classList.remove('active-form');
      successAlert.classList.add('hidden');
    });
  }


  // --- 4. Frontend Form Validation & Submission ---

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function handleInputValidation(inputElement, isError) {
    const group = inputElement.closest('.form-group');
    if (group) {
      if (isError) {
        group.classList.add('has-error');
      } else {
        group.classList.remove('has-error');
      }
    }
  }

  // Quote Form Submission
  if (formQuote) {
    formQuote.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const name = document.getElementById('quoteName');
      const email = document.getElementById('quoteEmail');
      const property = document.getElementById('quoteProperty');
      const service = document.getElementById('quoteService');

      // Validate Name
      if (!name.value.trim()) {
        handleInputValidation(name, true);
        isValid = false;
      } else {
        handleInputValidation(name, false);
      }

      // Validate Email
      if (!email.value.trim() || !validateEmail(email.value)) {
        handleInputValidation(email, true);
        isValid = false;
      } else {
        handleInputValidation(email, false);
      }

      // Validate Property
      if (!property.value) {
        handleInputValidation(property, true);
        isValid = false;
      } else {
        handleInputValidation(property, false);
      }

      // Validate Service
      if (!service.value) {
        handleInputValidation(service, true);
        isValid = false;
      } else {
        handleInputValidation(service, false);
      }

      if (isValid) {
        const btn = formQuote.querySelector('button[type="submit"]');
        const btnText = btn.querySelector('.btn-text');
        const btnLoader = btn.querySelector('.btn-loader');

        // Show Loading State
        btnText.classList.add('hidden');
        btnLoader.classList.remove('hidden');
        btn.disabled = true;

        // Simulate API call delay
        setTimeout(() => {
          btnText.classList.remove('hidden');
          btnLoader.classList.add('hidden');
          btn.disabled = false;

          // Reset Form & Show Success Alert
          formQuote.reset();
          document.getElementById('successTitle').innerText = 'Quote Request Received!';
          document.getElementById('successMessage').innerText = 'Thank you for reaching out! A FreshNest Austin team member will review your details and send your estimate shortly.';
          successAlert.classList.remove('hidden');

          successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 1200);
      }
    });
  }

  // Contact Form Submission
  if (formContact) {
    formContact.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const name = document.getElementById('contactName');
      const email = document.getElementById('contactEmail');
      const message = document.getElementById('contactMessage');

      if (!name.value.trim()) {
        handleInputValidation(name, true);
        isValid = false;
      } else {
        handleInputValidation(name, false);
      }

      if (!email.value.trim() || !validateEmail(email.value)) {
        handleInputValidation(email, true);
        isValid = false;
      } else {
        handleInputValidation(email, false);
      }

      if (!message.value.trim()) {
        handleInputValidation(message, true);
        isValid = false;
      } else {
        handleInputValidation(message, false);
      }

      if (isValid) {
        const btn = formContact.querySelector('button[type="submit"]');
        const btnText = btn.querySelector('.btn-text');
        const btnLoader = btn.querySelector('.btn-loader');

        btnText.classList.add('hidden');
        btnLoader.classList.remove('hidden');
        btn.disabled = true;

        setTimeout(() => {
          btnText.classList.remove('hidden');
          btnLoader.classList.add('hidden');
          btn.disabled = false;

          formContact.reset();
          document.getElementById('successTitle').innerText = 'Message Sent!';
          document.getElementById('successMessage').innerText = 'Thank you for contacting FreshNest Cleaning. We will respond to your message within 24 hours.';
          successAlert.classList.remove('hidden');

          successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 1200);
      }
    });
  }

  // Remove error state on typing
  document.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('input', () => {
      handleInputValidation(input, false);
    });
  });

});