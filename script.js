document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing components...');
    
    // Initialize all components
    initMobileMenu();
    initThemeToggle();
    initTypingAnimation();
    initScrollAnimations();
    initBackToTop();
    initSmoothScrolling();
    initContactForm();
    initParticleEffect();
    initProjectCards();
    initSkillCards();
    initStatsCounter();
  });
  
  // Mobile Menu Toggle
  function initMobileMenu() {
    console.log('Initializing mobile menu...');
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (!mobileMenuButton || !mobileMenu) {
      console.error('Mobile menu elements not found:', { mobileMenuButton, mobileMenu });
      return;
    }
    
    const mobileMenuIcon = mobileMenuButton.querySelector('i');
    
    console.log('Mobile menu elements found:', { mobileMenuButton, mobileMenu, mobileMenuIcon });
  
    mobileMenuButton.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Mobile menu button clicked');
      mobileMenu.classList.toggle('active');
      mobileMenuIcon.classList.toggle('fa-bars');
      mobileMenuIcon.classList.toggle('fa-times');
    });
  
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('active');
        mobileMenuIcon.classList.replace('fa-times', 'fa-bars');
      }
    });
  }
  
  // Theme Toggle
  function initThemeToggle() {
    console.log('Initializing theme toggle...');
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    const body = document.body;
    
    if (!themeToggle || !themeIcon) {
      console.error('Theme toggle elements not found:', { themeToggle, themeIcon });
      return;
    }
    
    console.log('Theme toggle elements found:', { themeToggle, themeIcon });
  
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    console.log('Saved theme:', savedTheme);
    
    if (savedTheme === 'dark') {
      body.classList.add('dark');
      themeIcon.classList.replace('fa-moon', 'fa-sun');
      console.log('Dark theme applied from localStorage');
    }
  
    themeToggle.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Theme toggle clicked');
      body.classList.toggle('dark');
      const isDark = body.classList.contains('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      
      if (isDark) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        console.log('Switched to dark theme');
      } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        console.log('Switched to light theme');
      }
    });
  }
  
  // Typing Animation
  function initTypingAnimation() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;
  
    const words = ['AI and Machine Learning Student', 'Full Stack Developer', 'Problem Solver', 'Tech Lover', 'Creative Coder'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;
  
    function type() {
      const currentWord = words[wordIndex];
      const currentChar = currentWord.substring(0, charIndex);
      typingText.textContent = currentChar;
  
      if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(type, 100);
      } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(type, 50);
      } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
          wordIndex = (wordIndex + 1) % words.length;
        }
        setTimeout(type, 1000);
      }
    }
  
    // Start typing animation after 1 second
    setTimeout(type, 1000);
  }
  
  // Scroll Animations
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);
  
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.skill-card, .project-card, .testimonial-card, .timeline-item, .feature');
    animateElements.forEach(el => {
      observer.observe(el);
    });
  }
  
  // Back to Top Button
  function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
  
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });
  
    backToTopButton.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Smooth Scrolling for Anchor Links
  function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const headerHeight = document.querySelector('.header').offsetHeight;
          const targetPosition = targetElement.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          const mobileMenu = document.querySelector('.mobile-menu');
          const mobileMenuIcon = document.querySelector('.mobile-menu-button i');
          if (mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            mobileMenuIcon.classList.replace('fa-times', 'fa-bars');
          }
        }
      });
    });
  }
  
  // Contact Form
  function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;
  
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      
      // Basic validation
      if (!data.name || !data.email || !data.subject || !data.message) {
        showNotification('Please fill in all fields', 'error');
        return;
      }
      
      if (!isValidEmail(data.email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
      }
      
      // Update button state
      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.innerHTML;
      
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitButton.disabled = true;
      
      try {
        // Send to backend
        const response = await fetch('http://localhost:3000/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
          showNotification(result.message, 'success');
          this.reset();
        } else {
          showNotification(result.message || 'Failed to send message. Please try again.', 'error');
        }
      } catch (error) {
        console.error('Contact form error:', error);
        showNotification('Network error. Please check your connection and try again.', 'error');
      } finally {
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
      }
    });
  }
  
  // Email validation
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Notification system
  function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `;
    
    // Add styles
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 10000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);
  }
  
  // Particle Effect
  function initParticleEffect() {
    const heroParticles = document.querySelector('.hero-particles');
    if (!heroParticles) return;
  
    // Create floating particles
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: var(--primary);
        border-radius: 50%;
        opacity: 0.3;
        animation: float-particle ${3 + Math.random() * 4}s ease-in-out infinite;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
      `;
      heroParticles.appendChild(particle);
    }
  }
  
  // Project Cards Interaction
  function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
      });
    });
  }
  
  // Skill Cards Interaction
  function initSkillCards() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = 'var(--shadow-xl)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'var(--shadow)';
      });
    });
  }
  
  // Testimonial Cards Interaction
  function initTestimonialCards() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
      });
    });
  }
  
  // Stats Counter Animation
  function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px 0px -50px 0px'
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const finalValue = parseInt(target.textContent.replace('+', ''));
          const isPlus = target.textContent.includes('+');
          
          animateCounter(target, 0, finalValue, isPlus);
          observer.unobserve(target);
        }
      });
    }, observerOptions);
  
    stats.forEach(stat => observer.observe(stat));
  }
  
  function animateCounter(element, start, end, isPlus) {
    const duration = 2000;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const current = Math.floor(start + (end - start) * progress);
      element.textContent = isPlus ? `${current}+` : current;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    }
    
    requestAnimationFrame(updateCounter);
  }
  
  // Add CSS for animations
  const style = document.createElement('style');
  style.textContent = `
    .animate-in {
      animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes float-particle {
      0%, 100% {
        transform: translateY(0px) translateX(0px);
        opacity: 0.3;
      }
      50% {
        transform: translateY(-20px) translateX(10px);
        opacity: 0.6;
      }
    }
    
    .skill-card, .project-card, .testimonial-card, .timeline-item, .feature {
      opacity: 0;
      transform: translateY(30px);
    }
    
    .skill-card.animate-in, .project-card.animate-in, .testimonial-card.animate-in, .timeline-item.animate-in, .feature.animate-in {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);