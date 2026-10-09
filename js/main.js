/**
 * KANCHWALA ARCHITECT — Interactive Atelier Website Logic
 * Bandra West, Mumbai | +91 9664786374
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Portfolio Data (Strictly preserving user rule: no room labels) ---
  const projectsData = [
    {
      id: "01",
      number: "Project 01",
      image: "assets/images/project-01.png",
      location: "Private Residence · Mumbai",
      details: "Bespoke spatial curation emphasizing balanced geometry, ambient illumination, and bespoke modular seating in a tranquil neutral palette."
    },
    {
      id: "02",
      number: "Project 02",
      image: "assets/images/project-02.png",
      location: "Bespoke Atelier Craft · Bandra West",
      details: "Full-height statement vanity mirror framed in prismatic beveled crystal facets, complemented by custom fluted rose-wood paneling."
    },
    {
      id: "03",
      number: "Project 03",
      image: "assets/images/project-03.png",
      location: "Residential Suite · Mumbai",
      details: "Architectural wall feature incorporating dark tactile tiles, warm indirect halo lighting, neoclassical wall mouldings, and tailored leather upholstery."
    },
    {
      id: "04",
      number: "Project 04",
      image: "assets/images/project-04.png",
      location: "Master Residence · Mumbai",
      details: "Intricate vertical wall moulding balanced with vertical bronze mirror insets, custom headboard detailing, and warm symmetrical pendant warmth."
    },
    {
      id: "05",
      number: "Project 05",
      image: "assets/images/project-05.png",
      location: "Urban Apartment · Mumbai",
      details: "Contemporary spatial layout featuring fluted wooden millwork, patterned acoustic backsplashes, and frosted fluted glass sliding partitions."
    }
  ];

  let currentProjectIndex = 0;

  // --- 2. Lightbox Modal Elements ---
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxNum = document.getElementById('lightboxNum');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const lightboxBookBtn = document.getElementById('lightboxBookBtn');
  const lightboxInquireBtn = document.getElementById('lightboxInquireBtn');

  const openLightbox = (index) => {
    currentProjectIndex = index;
    const project = projectsData[currentProjectIndex];
    if (!project) return;

    lightboxImage.src = project.image;
    lightboxImage.alt = `Kanchwala Architect — ${project.number}`;
    lightboxNum.textContent = project.number;
    lightboxCounter.textContent = `${currentProjectIndex + 1} / ${projectsData.length}`;

    // Configure WhatsApp direct inquiry for this specific project
    const whatsappText = encodeURIComponent(
      `Hello Kanchwala Architect, I am viewing ${project.number} on your website and would love to discuss a similar interior design concept for my property.`
    );
    lightboxInquireBtn.onclick = () => {
      window.open(`https://wa.me/919664786374?text=${whatsappText}`, '_blank');
    };

    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const showNextProject = () => {
    currentProjectIndex = (currentProjectIndex + 1) % projectsData.length;
    openLightbox(currentProjectIndex);
  };

  const showPrevProject = () => {
    currentProjectIndex = (currentProjectIndex - 1 + projectsData.length) % projectsData.length;
    openLightbox(currentProjectIndex);
  };

  // Attach click listeners to work cards
  const workCards = document.querySelectorAll('.work-card');
  workCards.forEach((card) => {
    card.addEventListener('click', () => {
      const index = parseInt(card.getAttribute('data-index'), 10);
      openLightbox(isNaN(index) ? 0 : index);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', showNextProject);
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevProject);
  if (lightboxBookBtn) {
    lightboxBookBtn.addEventListener('click', () => {
      closeLightbox();
    });
  }

  // Keyboard navigation for Lightbox
  window.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNextProject();
    if (e.key === 'ArrowLeft') showPrevProject();
  });

  // --- 3. Consultation Booking Form Logic ---
  const bookingForm = document.getElementById('consultationForm');
  const bookingDateInput = document.getElementById('bookingDate');

  // Set minimum date to tomorrow
  if (bookingDateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    bookingDateInput.min = `${yyyy}-${mm}-${dd}`;
    bookingDateInput.value = `${yyyy}-${mm}-${dd}`;
  }

  // Option pill click behavior
  const setupPillOptions = (containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    const pills = container.querySelectorAll('.option-pill');
    pills.forEach((pill) => {
      const radio = pill.querySelector('input[type="radio"]');
      radio.addEventListener('change', () => {
        pills.forEach(p => p.classList.remove('selected'));
        if (radio.checked) {
          pill.classList.add('selected');
        }
      });
    });
  };

  setupPillOptions('modeOptions');
  setupPillOptions('serviceOptions');

  // Success Modal Elements
  const successModal = document.getElementById('successModal');
  const successClose = document.getElementById('successClose');
  const successBackdrop = document.getElementById('successBackdrop');
  const closeSuccessBtn = document.getElementById('closeSuccessBtn');
  const confirmedClientName = document.getElementById('confirmedClientName');
  const confirmedRefCode = document.getElementById('confirmedRefCode');
  const confirmedMode = document.getElementById('confirmedMode');
  const confirmedDateTime = document.getElementById('confirmedDateTime');
  const confirmedPhone = document.getElementById('confirmedPhone');
  const confirmedWhatsappBtn = document.getElementById('confirmedWhatsappBtn');

  const closeSuccess = () => {
    if (successModal) {
      successModal.classList.remove('active');
      successModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  if (successClose) successClose.addEventListener('click', closeSuccess);
  if (successBackdrop) successBackdrop.addEventListener('click', closeSuccess);
  if (closeSuccessBtn) closeSuccessBtn.addEventListener('click', closeSuccess);

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(bookingForm);
      const name = formData.get('clientName') || 'Valued Client';
      const phone = formData.get('clientPhone') || '09664786374';
      const email = formData.get('clientEmail') || 'Not provided';
      const mode = formData.get('consultationMode') || 'Studio Visit (Bandra West)';
      const projectType = formData.get('projectType') || 'Residential Interior';
      const date = formData.get('bookingDate') || '';
      const time = formData.get('bookingTime') || 'Preferred Time';
      const location = formData.get('propertyLocation') || 'Mumbai';
      const notes = formData.get('projectNotes') || 'None';

      // Generate stylish Reference ID
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      const refCode = `KA-2026-${randomCode}`;

      // Format Date string nicely
      let formattedDateStr = date;
      if (date) {
        try {
          const dateObj = new Date(date);
          formattedDateStr = dateObj.toLocaleDateString('en-IN', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          });
        } catch (err) {
          formattedDateStr = date;
        }
      }

      // Populate Success Modal
      if (confirmedClientName) confirmedClientName.textContent = name;
      if (confirmedRefCode) confirmedRefCode.textContent = refCode;
      if (confirmedMode) confirmedMode.textContent = mode;
      if (confirmedDateTime) confirmedDateTime.textContent = `${formattedDateStr} · ${time}`;
      if (confirmedPhone) confirmedPhone.textContent = phone;

      // Construct WhatsApp message URL for direct messaging to 09664786374
      const waMessage = 
`Hello Kanchwala Architect,
I have booked a design consultation through your website:

• Reference: ${refCode}
• Client: ${name}
• Contact: ${phone}
• Email: ${email}
• Format: ${mode}
• Type: ${projectType}
• Proposed Slot: ${formattedDateStr} (${time})
• Property Location: ${location}
• Notes: ${notes}

Looking forward to your confirmation. Thank you!`;

      if (confirmedWhatsappBtn) {
        confirmedWhatsappBtn.href = `https://wa.me/919664786374?text=${encodeURIComponent(waMessage)}`;
      }

      // Show Success Modal
      if (successModal) {
        successModal.classList.add('active');
        successModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }

      // Reset form
      bookingForm.reset();
      if (bookingDateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const yyyy = tomorrow.getFullYear();
        const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const dd = String(tomorrow.getDate()).padStart(2, '0');
        bookingDateInput.value = `${yyyy}-${mm}-${dd}`;
      }
    });
  }

  // --- 4. Mobile Menu Navigation ---
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('open');
      if (isOpen) {
        navMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      } else {
        navMenu.classList.add('open');
        menuToggle.setAttribute('aria-expanded', 'true');
      }
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- 5. Header Scroll Effect ---
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
});
