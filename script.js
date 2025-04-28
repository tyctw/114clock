document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.querySelector('.nav-links');
  const themeToggle = document.getElementById('theme-toggle');
  const mobileThemeToggle = document.getElementById('mobile-theme-toggle');

  // Detect iOS device
  detectIOSDevice();
  
  // Handle viewport height issues on mobile browsers
  handleMobileViewportHeight();
  
  // Initialize theme
  initTheme();

  // Theme toggle functionality
  themeToggle.addEventListener('click', toggleTheme);
  mobileThemeToggle.addEventListener('click', toggleTheme);

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
        showNotification('請完成人機驗證', 'error');
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
          
          showNotification('感謝您的合作意願！我們將盡快與您聯繫。', 'success');
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
          
          showNotification('提交失敗：' + error.message, 'error');
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
    
    // Update progress bar
    updateProgressBar(diff);
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
  
  function updateProgressBar(diff) {
    // Calculate the original total time (365 days in ms)
    const totalTime = 365 * 24 * 60 * 60 * 1000;
    // Calculate remaining percentage
    const percentage = (diff / totalTime) * 100;
    
    // Create or update progress bar if it doesn't exist
    let progressBar = document.querySelector('.progress-bar');
    if (!progressBar) {
      // Create progress container
      const progressContainer = document.createElement('div');
      progressContainer.className = 'progress-container';
      progressContainer.innerHTML = '<div class="progress-title">距離會考完成</div>';
      
      // Create progress bar
      progressBar = document.createElement('div');
      progressBar.className = 'progress-bar';
      
      // Create progress fill
      const progressFill = document.createElement('div');
      progressFill.className = 'progress-fill';
      
      // Create progress text
      const progressText = document.createElement('div');
      progressText.className = 'progress-text';
      
      // Assemble the elements
      progressBar.appendChild(progressFill);
      progressBar.appendChild(progressText);
      progressContainer.appendChild(progressBar);
      
      // Add to DOM after countdown
      document.querySelector('.countdown').after(progressContainer);
    }
    
    // Update progress fill and text
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    
    // Calculate inverse percentage (how much is done)
    const inversePercentage = 100 - Math.min(100, Math.max(0, percentage));
    
    progressFill.style.width = `${inversePercentage}%`;
    progressText.textContent = `${Math.round(inversePercentage)}%`;
    
    // Update color based on percentage
    if (inversePercentage < 30) {
      progressFill.style.backgroundColor = '#38bdf8';
    } else if (inversePercentage < 70) {
      progressFill.style.backgroundColor = '#0ea5e9';
    } else {
      progressFill.style.backgroundColor = '#0284c7';
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Add subtle animations and interactivity to elements
  document.querySelectorAll('.time-block').forEach(block => {
    block.addEventListener('mouseenter', () => {
      block.style.transform = 'translateY(-8px)';
    });
  
    block.addEventListener('mouseleave', () => {
      block.style.transform = 'translateY(0)';
    });
  });
  
  // Add particle background effect
  createParticles();
  
  // Add animation to partner cards
  animatePartnerCards();
  
  // 添加 rcpett 廣告欄位動畫效果
  animateRcpettAd();
  
  // Add hover effects to schedule items
  document.querySelectorAll('.subject-list li').forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'translateX(8px)';
      item.style.background = 'rgba(56, 189, 248, 0.15)';
    });
    
    item.addEventListener('mouseleave', () => {
      item.style.transform = 'translateX(0)';
      item.style.background = '';
    });
  });
  
  // Add scroll animations
  addScrollAnimations();
  
  // Listen for orientation changes and resize events to adjust layout
  window.addEventListener('resize', handleOrientationChange);
  window.addEventListener('orientationchange', handleOrientationChange);
});

function detectIOSDevice() {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
                
  if (isIOS) {
    document.documentElement.classList.add('ios-device');
  }
  
  // Remove the check class after detection
  document.documentElement.classList.remove('ios-check');
}

function handleMobileViewportHeight() {
  // Fix for mobile browsers' viewport height issues
  function setVH() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  
  // Set on initial load
  setVH();
  
  // Update on resize
  window.addEventListener('resize', setVH);
}

function handleOrientationChange() {
  // Adjust layouts for orientation change
  if (window.innerHeight < 500 && window.innerWidth > window.innerHeight) {
    // Landscape mode on small devices
    document.body.classList.add('landscape-mode');
  } else {
    document.body.classList.remove('landscape-mode');
  }
}

function initTheme() {
  // Check if user has a preferred theme in localStorage
  const savedTheme = localStorage.getItem('theme');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  const themeToggle = document.getElementById('theme-toggle');
  const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
  
  if (savedTheme) {
    // If there's a saved theme, use it
    if (savedTheme === 'light') {
      document.body.classList.add('light-mode');
      updateThemeIcons('light');
      updateTurnstileTheme('light');
    } else {
      document.body.classList.remove('light-mode');
      updateThemeIcons('dark');
      updateTurnstileTheme('dark');
    }
  } else {
    // Otherwise, use the system preference
    if (prefersDarkScheme.matches) {
      document.body.classList.remove('light-mode');
      updateThemeIcons('dark');
      updateTurnstileTheme('dark');
    } else {
      document.body.classList.add('light-mode');
      updateThemeIcons('light');
      updateTurnstileTheme('light');
    }
  }
  
  // Add listener for system theme changes
  prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      if (e.matches) {
        document.body.classList.remove('light-mode');
        updateThemeIcons('dark');
        updateTurnstileTheme('dark');
      } else {
        document.body.classList.add('light-mode');
        updateThemeIcons('light');
        updateTurnstileTheme('light');
      }
      // Recreate particles for the new theme
      createParticles();
    }
  });
}

function updateThemeIcons(theme) {
  const themeToggle = document.getElementById('theme-toggle');
  const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
  
  if (theme === 'light') {
    themeToggle.innerHTML = '<i class="bx bx-sun"></i>';
    mobileThemeToggle.innerHTML = '<i class="bx bx-sun"></i>';
  } else {
    themeToggle.innerHTML = '<i class="bx bx-moon"></i>';
    mobileThemeToggle.innerHTML = '<i class="bx bx-moon"></i>';
  }
}

function updateTurnstileTheme(theme) {
  const turnstile = document.querySelector('.cf-turnstile');
  if (turnstile) {
    turnstile.setAttribute('data-theme', theme);
    // Reset the turnstile widget to apply the new theme
    if (window.turnstile) {
      window.turnstile.reset();
    }
  }
}

function toggleTheme() {
  const isDarkMode = !document.body.classList.contains('light-mode');
  
  if (isDarkMode) {
    // Switch to light mode
    document.body.classList.add('light-mode');
    updateThemeIcons('light');
    localStorage.setItem('theme', 'light');
    updateTurnstileTheme('light');
    
    // Update particles for light mode
    createParticles();
    
    // Show notification
    showNotification('已切換至淺色模式', 'success');
  } else {
    // Switch to dark mode
    document.body.classList.remove('light-mode');
    updateThemeIcons('dark');
    localStorage.setItem('theme', 'dark');
    updateTurnstileTheme('dark');
    
    // Update particles for dark mode
    createParticles();
    
    // Show notification
    showNotification('已切換至深色模式', 'success');
  }
}

function showNotification(message, type) {
  // Remove any existing notifications first
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(n => n.remove());
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  
  // Create icon based on type
  const icon = document.createElement('span');
  icon.className = 'notification-icon';
  icon.innerHTML = type === 'success' ? '<i class="bx bx-check"></i>' : '<i class="bx bx-x"></i>';
  
  // Create message element
  const textElement = document.createElement('span');
  textElement.textContent = message;
  
  // Assemble notification
  notification.appendChild(icon);
  notification.appendChild(textElement);
  
  // Add to DOM
  document.body.appendChild(notification);
  
  // Trigger animation
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  // Remove after delay
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

function createParticles() {
  const container = document.querySelector('body');
  const particleCount = 40;
  
  // Remove existing particles before creating new ones
  const existingParticles = document.querySelectorAll('.particle');
  existingParticles.forEach(p => p.remove());
  
  // Check current theme
  const isLightMode = document.body.classList.contains('light-mode');
  
  // Reduce particle count on mobile
  const isMobile = window.innerWidth < 768;
  const actualCount = isMobile ? Math.floor(particleCount / 2) : particleCount;
  
  for (let i = 0; i < actualCount; i++) {
    let particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size between 2-5px (smaller on mobile)
    const size = isMobile ? 
                 (Math.random() * 2 + 1.5) : 
                 (Math.random() * 3 + 2);
    
    // Style the particle
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Set color based on theme
    if (isLightMode) {
      particle.style.background = 'rgba(2, 132, 199, 0.3)';
      particle.style.boxShadow = '0 0 10px rgba(2, 132, 199, 0.5)';
    } else {
      particle.style.background = 'rgba(56, 189, 248, 0.3)';
      particle.style.boxShadow = '0 0 10px rgba(56, 189, 248, 0.5)';
    }
    
    particle.style.borderRadius = '50%';
    particle.style.position = 'fixed';
    particle.style.top = `${Math.random() * 100}vh`;
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '0';
    
    // Create animation (longer duration on mobile to save battery)
    const duration = isMobile ? 
                    (Math.random() * 60 + 40) : 
                    (Math.random() * 50 + 30);
    
    particle.style.animation = `float ${duration}s linear infinite`;
    
    // Set random delays
    particle.style.animationDelay = `-${Math.random() * 40}s`;
    
    container.appendChild(particle);
  }
}

function animatePartnerCards() {
  const cards = document.querySelectorAll('.partner-card');
  cards.forEach((card, index) => {
    // Add subtle animation
    card.style.animationDelay = `${index * 0.3}s`;
    card.style.opacity = '0';
    card.style.animation = 'fadeInUp 0.5s forwards';
    card.style.animationDelay = `${0.3 + index * 0.2}s`;
  });
}

function animateRcpettAd() {
  const adBanner = document.querySelector('.rcpett-ad-banner');
  if (adBanner) {
    // 初始顯示動畫
    adBanner.style.opacity = '0';
    adBanner.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      adBanner.style.opacity = '1';
      adBanner.style.transform = 'translateY(0)';
    }, 300);
    
    // 特色標籤彈出動畫
    const features = document.querySelectorAll('.rcpett-feature');
    features.forEach((feature, index) => {
      feature.style.opacity = '0';
      feature.style.transform = 'translateY(10px)';
      
      setTimeout(() => {
        feature.style.opacity = '1';
        feature.style.transform = 'translateY(0)';
      }, 500 + (index * 150));
    });
    
    // 添加間隔閃爍效果到 CTA 按鈕
    const ctaButton = document.querySelector('.rcpett-cta-button');
    if (ctaButton) {
      setInterval(() => {
        ctaButton.style.transform = 'scale(1.05)';
        ctaButton.style.boxShadow = '0 5px 20px rgba(56, 189, 248, 0.5)';
        
        setTimeout(() => {
          ctaButton.style.transform = '';
          ctaButton.style.boxShadow = '';
        }, 700);
      }, 5000);
    }
  }
}

function addScrollAnimations() {
  // Only add intersection observer if it's supported
  if ('IntersectionObserver' in window) {
    // Add classes for animation
    const elements = document.querySelectorAll('.info, .partnership-section, .partner-card');
    
    // Create observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2
    });
    
    // Observe elements
    elements.forEach(el => {
      el.classList.add('fade-in');
      observer.observe(el);
    });
  }
  
  // Add scroll indicator
  const scrollIndicator = document.createElement('div');
  scrollIndicator.className = 'scroll-indicator';
  scrollIndicator.innerHTML = '<div class="mouse"><div class="wheel"></div></div>';
  document.querySelector('.container').prepend(scrollIndicator);
  
  // Hide when scrolled
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      scrollIndicator.classList.add('hidden');
    } else {
      scrollIndicator.classList.remove('hidden');
    }
  });
}