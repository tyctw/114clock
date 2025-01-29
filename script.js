document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.querySelector('.nav-links');

  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = mobileMenuBtn.querySelectorAll('span');
    spans.forEach(span => span.classList.toggle('active'));
  });
});

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

// Add hover effects for time blocks
document.querySelectorAll('.time-block').forEach(block => {
  block.addEventListener('mouseenter', () => {
    block.style.transform = 'scale(1.05)';
  });
  
  block.addEventListener('mouseleave', () => {
    block.style.transform = 'scale(1)';
  });
});