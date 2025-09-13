// Device Detection and Customization
function detectDevice() {
    const width = window.innerWidth;
    if (width < 768) {
        return 'mobile';
    } else if (width < 1024) {
        return 'tablet';
    } else {
        return 'desktop';
    }
}

function applyDeviceClass() {
    const device = detectDevice();
    document.body.classList.add(`device-${device}`);
}

function customizeForDevice() {
    const device = detectDevice();

    if (device === 'mobile') {
        // Customize for mobile: reduce animations, adjust scroll behavior
        document.querySelectorAll('section').forEach(section => {
            section.style.transition = 'opacity 0.3s ease, transform 0.3s ease'; // Faster transitions
        });

        // Disable hover effects on touch devices
        document.querySelectorAll('.project-card').forEach(card => {
            card.style.transform = 'none'; // Remove hover transform
        });

        // Adjust navbar background for better mobile visibility
        const navbar = document.querySelector('.navbar');
        navbar.style.backdropFilter = 'blur(5px)';
    } else if (device === 'tablet') {
        // Tablet specific customizations
        // Perhaps adjust grid layouts or font sizes
    } else {
        // Desktop: full features
    }
}

// Device class and customization applied in the main DOMContentLoaded below

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize EmailJS
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
})();

// Form validation and submission
const contactForm = document.querySelector('.contact-form');
const submitBtn = contactForm.querySelector('button[type="submit"]');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.querySelector('input[placeholder="Your Name"]').value.trim();
    const email = document.querySelector('input[placeholder="Your Email"]').value.trim();
    const subject = document.querySelector('input[placeholder="Subject"]').value.trim();
    const message = document.querySelector('textarea[placeholder="Your Message"]').value.trim();

    // Basic validation
    if (!name || !email || !subject || !message) {
        showMessage('Please fill in all fields.', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
    }

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // Prepare template parameters
    const templateParams = {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
        to_name: 'Rajkishore Huduk'
    };

    // Send email using EmailJS
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams) // Replace with your service and template IDs
        .then(function(response) {
            showMessage('Thank you for your message! I will get back to you soon.', 'success');
            contactForm.reset();
        }, function(error) {
            showMessage('Failed to send message. Please try again later.', 'error');
            console.error('EmailJS error:', error);
        })
        .finally(function() {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        });
});

// Function to show messages
function showMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create new message element
    const messageEl = document.createElement('div');
    messageEl.className = `form-message ${type}`;
    messageEl.textContent = message;

    // Insert after form
    contactForm.appendChild(messageEl);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (messageEl.parentNode) {
            messageEl.remove();
        }
    }, 5000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for fade-in animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Project cards hover effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Theme Management
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const themeIcon = themeToggleBtn.querySelector('i');

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';

// Apply the current theme
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

// Theme toggle function
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

// Update theme icon
function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
}

// Event listener for theme toggle
themeToggleBtn.addEventListener('click', toggleTheme);

// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

// Filter projects function
function filterProjects(filterValue) {
    projectCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'block';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        } else {
            card.style.display = 'none';
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
        }
    });
}

// Add event listeners to filter buttons
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        button.classList.add('active');

        // Get filter value and apply filter
        const filterValue = button.getAttribute('data-filter');
        filterProjects(filterValue);
    });
});

// Mobile-specific improvements and device customization
document.addEventListener('DOMContentLoaded', function() {
    // Apply device class and customization
    applyDeviceClass();
    customizeForDevice();

    // Improve mobile navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Prevent zoom on double tap for iOS
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    // Improve touch interactions for filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });

        button.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });

    // Add viewport height fix for mobile browsers
    function setVH() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);

    // Handle resize for device changes
    window.addEventListener('resize', function() {
        // Remove old classes
        document.body.classList.remove('device-mobile', 'device-tablet', 'device-desktop');
        applyDeviceClass();
        customizeForDevice();
    });
});
