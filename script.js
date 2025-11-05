// ===== Mobile Navigation Toggle =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    hamburger.classList.toggle('active');
    const spans = hamburger.querySelectorAll('span');
    if (hamburger.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ===== Smooth Scrolling for Navigation Links =====
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Smooth scrolling for hero buttons
const heroButtons = document.querySelectorAll('.hero-buttons a');
heroButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const href = button.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(href);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===== Navbar Background on Scroll =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 15, 35, 0.95)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.08)';
        navbar.style.boxShadow = 'none';
    }
});

// ===== Active Navigation Link on Scroll =====
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== Scroll Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .info-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (name && email && message) {
        // Show success message
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
    } else {
        showNotification('Please fill in all fields.', 'error');
    }
});

// ===== Notification System =====
function showNotification(message, type) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.position = 'fixed';
    notification.style.top = '100px';
    notification.style.right = '20px';
    notification.style.padding = '20px 30px';
    notification.style.borderRadius = '12px';
    notification.style.zIndex = '10000';
    notification.style.fontWeight = '500';
    notification.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
    notification.style.backdropFilter = 'blur(20px)';
    notification.style.animation = 'slideIn 0.5s ease';
    
    if (type === 'success') {
        notification.style.background = 'rgba(34, 197, 94, 0.2)';
        notification.style.border = '2px solid rgba(34, 197, 94, 0.5)';
        notification.style.color = '#86efac';
    } else {
        notification.style.background = 'rgba(239, 68, 68, 0.2)';
        notification.style.border = '2px solid rgba(239, 68, 68, 0.5)';
        notification.style.color = '#fca5a5';
    }
    
    // Add to document
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 5000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== Parallax Effect for Hero Section =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const orbs = document.querySelectorAll('.gradient-orb');
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - scrolled / 700;
    }
    
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.3;
        orb.style.transform = `translate(${scrolled * speed * 0.1}px, ${scrolled * speed * 0.05}px)`;
    });
});

// ===== Typing Effect for Hero Title =====
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Apply typing effect on page load
window.addEventListener('load', () => {
    const heroName = document.querySelector('.hero-name');
    const originalText = heroName.textContent;
    
    setTimeout(() => {
        typeWriter(heroName, originalText, 80);
    }, 500);
});

// ===== Cursor Follow Effect (Optional Enhancement) =====
const createCursorFollower = () => {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-follower';
    cursor.style.position = 'fixed';
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursor.style.borderRadius = '50%';
    cursor.style.background = 'rgba(102, 126, 234, 0.5)';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '9999';
    cursor.style.transition = 'all 0.1s ease';
    cursor.style.transform = 'translate(-50%, -50%)';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Enlarge cursor on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.background = 'rgba(139, 92, 246, 0.3)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.background = 'rgba(102, 126, 234, 0.5)';
        });
    });
};

// Initialize cursor follower on desktop only
if (window.innerWidth > 968) {
    createCursorFollower();
}

// ===== Project Card Tilt Effect =====
const projectCards = document.querySelectorAll('.project-card, .skill-category');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== Add Loading Animation =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== Console Message =====
console.log('%c👋 Welcome to Michael Ngugi\'s Portfolio!', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%c💼 Interested in working together? Let\'s connect!', 'color: #8b5cf6; font-size: 14px;');
