// Banner part
const textElement = document.getElementById("animated-text");
const texts = ["Emon Ahmmed Joy", "Front-End Developer"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
  const currentText = texts[textIndex];
  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  textElement.textContent = currentText.substring(0, charIndex);

  if (!isDeleting && charIndex === currentText.length) {
    setTimeout(() => {
      isDeleting = true;
      typeEffect();
    }, 2000);
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
  }

  setTimeout(typeEffect, isDeleting ? 50 : typingSpeed);
}

document.addEventListener("DOMContentLoaded", typeEffect);

// Skill Part
document.addEventListener('DOMContentLoaded', function() {
    const skillCards = document.querySelectorAll('.skill-card');
    const skillPercentages = {
        html: 95,
        css: 90,
        bootstrap: 85,
        js: 80
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Get the skill type from the card class
                let skillType;
                if (entry.target.classList.contains('html-card')) skillType = 'html';
                else if (entry.target.classList.contains('css-card')) skillType = 'css';
                else if (entry.target.classList.contains('bootstrap-card')) skillType = 'bootstrap';
                else if (entry.target.classList.contains('js-card')) skillType = 'js';
                
                if (skillType) {
                    // Animate percentage counter
                    animatePercentage(skillType, skillPercentages[skillType]);
                    
                    // Animate progress bar
                    const progressBar = entry.target.querySelector('.progress-bar');
                    progressBar.style.width = skillPercentages[skillType] + '%';
                }
            }
        });
    }, {
        threshold: 0.2
    });
    
    skillCards.forEach(card => {
        observer.observe(card);
    });
    
    // Function to animate percentage counter
    function animatePercentage(skillType, targetPercentage) {
        const element = document.querySelector(`.${skillType}-percentage`);
        const duration = 1500; // animation duration in ms
        const stepTime = 20; // time between each percentage update
        const steps = duration / stepTime;
        const increment = targetPercentage / steps;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= targetPercentage) {
                clearInterval(timer);
                current = targetPercentage;
            }
            element.textContent = Math.floor(current) + '%';
        }, stepTime);
    }
    
    // Hover animation for icons
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.skill-icon i');
            icon.style.transform = 'scale(1.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.skill-icon i');
            icon.style.transform = 'scale(1)';
        });
    });
});