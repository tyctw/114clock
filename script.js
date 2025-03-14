document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.querySelector('.nav-links');

  // Add click handler for mobile menu
  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = mobileMenuBtn.querySelectorAll('span');
    spans.forEach(span => span.classList.toggle('active'));
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-links') && 
        !e.target.closest('.mobile-menu-btn') && 
        navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      const spans = mobileMenuBtn.querySelectorAll('span');
      spans.forEach(span => span.classList.remove('active'));
    }
  });

  // Partnership form handling
  const partnershipForm = document.getElementById('partnershipForm');
  if (partnershipForm) {
    partnershipForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('partnerName').value;
      const email = document.getElementById('partnerEmail').value;
      const type = document.getElementById('partnerType').value;
      
      // Get the turnstile token
      const token = turnstile.getResponse();
      
      if (!token) {
        alert('請完成人機驗證');
        return;
      }
      
      // Show loading animation
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<div class="loader"></div> 處理中...';
      submitBtn.disabled = true;
      
      // Send data to Google Apps Script
      const formData = new FormData();
      formData.append('partnerName', name);
      formData.append('partnerEmail', email);
      formData.append('partnerType', type);
      formData.append('cf-turnstile-response', token);
      
      // Replace this URL with your actual Google Apps Script web app URL
      const scriptURL = 'https://script.google.com/macros/s/AKfycbzsSfAgepU5CB6W0LTbUdIgOtCAqFbp9HFEjYqhHr37ZpU1jTAQ01Cy9x4l7cIKgo6agA/exec';
      
      fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('提交失敗，請稍後再試');
          }
        })
        .then(data => {
          // Reset form and button
          submitBtn.innerHTML = '<div class="success-icon">✓</div> 提交成功!';
          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
          }, 2000);
          
          alert('感謝您的合作意願！我們將盡快與您聯繫。');
          partnershipForm.reset();
        })
        .catch(error => {
          console.error('Error:', error);
          // Reset button with error state
          submitBtn.innerHTML = '<div class="error-icon">✗</div> 提交失敗';
          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
          }, 2000);
          
          alert('提交失敗：' + error.message);
        });
    });
  }

  function updateCountdown() {
    const examDate = new Date('2025-05-17T08:20:00');
    const now = new Date();
    const diff = examDate - now;

    if (diff < 0) {
      document.querySelector('.countdown').innerHTML = '<h2>會考已經開始！加油！</h2>';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    updateTimeBlock('days', days);
    updateTimeBlock('hours', hours);
    updateTimeBlock('minutes', minutes);
    updateTimeBlock('seconds', seconds);
  }

  function updateTimeBlock(id, value) {
    const element = document.getElementById(id);
    const oldValue = element.textContent;
    const newValue = String(value).padStart(2, '0');
  
    if (oldValue !== newValue) {
      element.textContent = newValue;
      element.classList.remove('animate');
      void element.offsetWidth; // Trigger reflow
      element.classList.add('animate');
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Add subtle animations and interactivity to elements
  document.querySelectorAll('.time-block').forEach(block => {
    block.addEventListener('mouseenter', () => {
      block.style.transform = 'translateY(-5px)';
    });
  
    block.addEventListener('mouseleave', () => {
      block.style.transform = 'translateY(0)';
    });
  });
  
  // Add particle background effect
  createParticles();
  
  // Add animation to partner cards
  animatePartnerCards();
  
  // Add hover effects to schedule items
  document.querySelectorAll('.subject-list li').forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'translateX(8px)';
      item.style.color = '#f4c430';
    });
    
    item.addEventListener('mouseleave', () => {
      item.style.transform = 'translateX(0)';
      item.style.color = '';
    });
  });
});

function createParticles() {
  const container = document.querySelector('body');
  const particleCount = 40;
  
  for (let i = 0; i < particleCount; i++) {
    let particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size between 2-5px
    const size = Math.random() * 3 + 2;
    
    // Style the particle
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.background = 'rgba(244, 196, 48, 0.3)';
    particle.style.borderRadius = '50%';
    particle.style.position = 'fixed';
    particle.style.top = `${Math.random() * 100}vh`;
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '0';
    particle.style.boxShadow = '0 0 10px rgba(244, 196, 48, 0.5)';
    
    // Create animation
    const duration = Math.random() * 50 + 30;
    particle.style.animation = `float ${duration}s linear infinite`;
    
    // Set random delays
    particle.style.animationDelay = `-${Math.random() * 40}s`;
    
    container.appendChild(particle);
  }
}

function animatePartnerCards() {
  const cards = document.querySelectorAll('.partner-card');
  cards.forEach((card, index) => {
    // Add icons to partner logos
    const logos = ['📚', '✏️', '📝'];
    card.querySelector('.partner-logo').textContent = logos[index % logos.length];
    
    // Add subtle animation
    card.style.animationDelay = `${index * 0.3}s`;
    card.style.opacity = '0';
    card.style.animation = 'fadeInUp 0.5s forwards';
    card.style.animationDelay = `${0.3 + index * 0.2}s`;
  });
}