// Global Variables
let isScrolling = false;
let isPlayingMusic = false;
const bgMusic = document.getElementById('bgMusic');
const musicControl = document.getElementById('musicControl');

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize animations
  initAnimations();
  
  // Setup smooth scrolling
  setupSmoothScroll();
  
  // Setup navbar scroll behavior
  setupNavbar();
  
  // Setup music player
  setupMusicPlayer();
  
  // Setup profile image interaction
  setupProfileImage();
  
  // Setup contact form
  setupContactForm();
  
  // Setup project cards
  setupProjectCards();
});

document.addEventListener('DOMContentLoaded', function() {
  // Setup navbar scroll behavior
  setupNavbar();
  
  // Setup theme toggle
  setupThemeToggle();
  
  // Setup music player
  setupMusicPlayer();
  
  // Setup other functions from original code if they exist
  if (typeof setupProfileImage === 'function') setupProfileImage();
  if (typeof setupContactForm === 'function') setupContactForm();
  if (typeof setupProjectCards === 'function') setupProjectCards();
  
  // Initialize animations
  initAnimations();
});


// Initialize animations by checking elements in viewport
function initAnimations() {
  const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
  
  // Initial check for elements in viewport
  checkElementsInViewport(animatedElements);
  
  // Check on scroll
  window.addEventListener('scroll', function() {
    if (!isScrolling) {
      window.requestAnimationFrame(function() {
        checkElementsInViewport(animatedElements);
        isScrolling = false;
      });
      isScrolling = true;
    }
  });
}

// Check if elements are in viewport and add visible class
function checkElementsInViewport(elements) {
  elements.forEach(function(element) {
    if (isElementInViewport(element)) {
      element.classList.add('visible');
    }
  });
}

// Check if element is in viewport
function isElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
    rect.bottom >= 0 &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
    rect.right >= 0
  );
}

// Setup smooth scrolling for navigation links
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Special animation for about button
        if (targetId === "#about" && this.id === "btnAbout") {
          const profileImage = document.getElementById('profileImage');
          profileImage.classList.add('photo-to-about');
          
          setTimeout(() => {
            window.scrollTo({
              top: targetElement.offsetTop - 70,
              behavior: 'smooth'
            });
            
            setTimeout(() => {
              profileImage.classList.remove('photo-to-about');
            }, 1000);
          }, 500);
        } else {
          // Normal smooth scroll
          window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
          });
        }
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(navLink => {
          navLink.classList.remove('active');
        });
        document.querySelector(`a[href="${targetId}"]`).classList.add('active');
      }
    });
  });
}

// Setup navbar scroll behavior
function setupNavbar() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Change navbar style on scroll
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Active link handler
  navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      navLinks.forEach(function(item) {
        item.classList.remove('active');
      });
      this.classList.add('active');
    });
  });
  
  // Handle section scrolling and active link updating
  window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(function(section) {
      const sectionTop = section.offsetTop;
      
      if (window.scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(function(link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });
}

// Setup theme toggle
function setupThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  
  // Check for saved theme preference or respect OS theme settings
  if (localStorage.getItem('theme') === 'dark' || 
      (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && 
       !localStorage.getItem('theme'))) {
    document.body.classList.add('dark-mode');
  }
  
  // Theme toggle click handler
  themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    
    // Save user preference
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });
}

// Setup music player functionality
function setupMusicPlayer() {
  const musicControl = document.getElementById('musicControl');
  const bgMusic = document.getElementById('bgMusic');
  let isPlaying = false;
  
  // Function to play music
  function playMusic() {
    bgMusic.play()
      .then(() => {
        isPlaying = true;
        musicControl.classList.add('playing');
      })
      .catch(error => {
        console.error("Error playing audio:", error);
      });
  }
  
  // Function to pause music
  function pauseMusic() {
    bgMusic.pause();
    isPlaying = false;
    musicControl.classList.remove('playing');
  }
  
  // Toggle music on button click
  musicControl.addEventListener('click', function() {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  });
  
  // Handle page visibility changes
  document.addEventListener('visibilitychange', function() {
    if (document.hidden && isPlaying) {
      pauseMusic();
    }
  });
}

// Initialize animations by checking elements in viewport
function initAnimations() {
  const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
  
  // Initial check for elements in viewport
  checkElementsInViewport(animatedElements);
  
  // Check on scroll
  let isScrolling = false;
  window.addEventListener('scroll', function() {
    if (!isScrolling) {
      window.requestAnimationFrame(function() {
        checkElementsInViewport(animatedElements);
        isScrolling = false;
      });
      isScrolling = true;
    }
  });
}

// Check if elements are in viewport and add visible class
function checkElementsInViewport(elements) {
  elements.forEach(function(element) {
    if (isElementInViewport(element)) {
      element.classList.add('visible');
    }
  });
}

// Check if element is in viewport
function isElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
    rect.bottom >= 0 &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
    rect.right >= 0
  );
}
// Setup profile image interactions
function setupProfileImage() {
  const profileImage = document.getElementById('profileImage');
  
  profileImage.addEventListener('mouseover', function() {
    this.style.transform = 'scale(1.05) rotate(5deg)';
  });
  
  profileImage.addEventListener('mouseout', function() {
    this.style.transform = 'scale(1)';
  });
  
  // Easter egg - click count
  let clickCount = 0;
  profileImage.addEventListener('click', function() {
    clickCount++;
    if (clickCount >= 5) {
      this.style.transform = 'scale(1.2) rotate(360deg)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
        clickCount = 0;
      }, 1000);
    }
  });
}

// Setup contact form submission
function setupContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // Validate inputs
      if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
        showFormMessage('Please fill in all fields', 'error');
        return;
      }
      
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showFormMessage('Please enter a valid email address', 'error');
        return;
      }
      
      // Here you would typically send the form data to a server
      // For now, we'll just simulate a successful submission
      
      showFormMessage('Thanks for your message! I\'ll get back to you soon.', 'success');
      contactForm.reset();
    });
  }
}

// Show form submission message
function showFormMessage(message, type) {
  // Remove any existing message
  const existingMessage = document.querySelector('.form-message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  // Create new message
  const messageElement = document.createElement('div');
  messageElement.className = `form-message ${type === 'error' ? 'text-danger' : 'text-success'} mt-3`;
  messageElement.textContent = message;
  
  // Add to DOM
  const submitButton = document.querySelector('.btn-submit');
  submitButton.parentNode.insertBefore(messageElement, submitButton.nextSibling);
  
  // Remove message after 5 seconds
  setTimeout(() => {
    messageElement.remove();
  }, 5000);
}

// Setup project cards functionality
function setupProjectCards() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    const projectImage = card.querySelector('.project-image img');
    const projectLink = card.querySelector('.btn-project');
    
    // Add hover effect to project images
    if (projectImage) {
      card.addEventListener('mouseover', function() {
        projectImage.style.transform = 'scale(1.05)';
      });
      
      card.addEventListener('mouseout', function() {
        projectImage.style.transform = 'scale(1)';
      });
    }
    
    // Handle project link clicks (for demo purposes)
    if (projectLink) {
      projectLink.addEventListener('click', function(e) {
        e.preventDefault();
        const projectTitle = card.querySelector('h3').textContent;
        alert(`Project details for "${projectTitle}" would open here. This is a demo functionality.`);
      });
    }
  });
}

// Typing animation for hero text (optional enhancement)
function setupTypingAnimation() {
  const heroText = document.querySelector('.hero h1');
  if (heroText) {
    const text = heroText.innerHTML;
    heroText.innerHTML = '';
    
    let i = 0;
    const typing = setInterval(() => {
      if (i < text.length) {
        heroText.innerHTML += text.charAt(i);
        i++;
      } else {
        clearInterval(typing);
      }
    }, 100);
  }
}

// Optional: Load animations when elements come into view 
// This is a more efficient way to handle scroll animations
function setupScrollAnimations() {
  if ('IntersectionObserver' in window) {
    const appearOptions = {
      threshold: 0.25,
      rootMargin: "0px 0px -100px 0px"
    };
    
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, appearOptions);
    
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(element => {
      appearOnScroll.observe(element);
    });
  } else {
    // Fallback for browsers without Intersection Observer support
    initAnimations();
  }
}
