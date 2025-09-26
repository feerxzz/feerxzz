// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    initNavigation();
    
    // Smooth scrolling
    initSmoothScrolling();
    
    // Skills animation
    initSkillsAnimation();
    
    // Form handling
    initFormHandling();
    
    // Scroll animations
    initScrollAnimations();
    
    // Mobile menu
    initMobileMenu();

    // Experience background
    initExperienceBackground();

    // Hero background
    initHeroBackground();

    // Reviews background (if on reviews page)
    initReviewsBackground();
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Update active nav link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
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
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                const hamburger = document.querySelector('.hamburger');
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
}

// Skills animation
function initSkillsAnimation() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillsSection = document.querySelector('#skills');
    
    const animateSkills = () => {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        });
    };
    
    // Intersection Observer for skills animation
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateSkills, 500);
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
}

// Form handling
function initFormHandling() {
    const form = document.querySelector('.form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const name = form.querySelector('input[placeholder="Tu nombre"]').value;
            const email = form.querySelector('input[placeholder="Tu email"]').value;
            const subject = form.querySelector('input[placeholder="Asunto"]').value;
            const message = form.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Por favor, completa todos los campos', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Por favor, ingresa un email válido', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('¡Mensaje enviado correctamente!', 'success');
            form.reset();
        });
    }
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
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #4CAF50, #45a049)' : 
                    type === 'error' ? 'linear-gradient(135deg, #f44336, #da190b)' : 
                    'linear-gradient(135deg, var(--primary-color), var(--accent-color))'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        font-weight: 600;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
    `;
    
    if (!document.querySelector('#notification-styles')) {
        style.id = 'notification-styles';
        document.head.appendChild(style);
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.about-card, .stat-item, .timeline-item, .contact-card, .skill-category');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Interactive background for Experience section (particles + links + glow)
function initExperienceBackground() {
    const section = document.getElementById('experience');
    if (!section) return;

    // Ensure section has proper positioning
    if (getComputedStyle(section).position === 'static') section.style.position = 'relative';
    section.style.overflow = section.style.overflow || 'hidden';

    // Keep content above the canvas
    const container = section.querySelector('.container');
    if (container) container.style.zIndex = 2;

    // Create or reuse canvas
    let canvas = section.querySelector('canvas.experience-fx');
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.className = 'experience-fx';
        canvas.style.position = 'absolute';
        canvas.style.inset = '0';
        canvas.style.zIndex = '1';
        canvas.style.pointerEvents = 'none';
        section.insertBefore(canvas, section.firstChild);
    }

    const ctx = canvas.getContext('2d');
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0, height = 0, particles = [], rafId = null;

    const config = {
        maxLinkDist: 140,
        speed: 0.18,
        sizeMin: 1.1,
        sizeMax: 2.6,
        density: 0.12 // particles per px width
    };

    function rand(min, max) { return Math.random() * (max - min) + min; }

    function createParticles(n) {
        return new Array(n).fill(0).map(() => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * config.speed,
            vy: (Math.random() - 0.5) * config.speed,
            r: rand(config.sizeMin, config.sizeMax)
        }));
    }

    function resize() {
        // section height may change with content; measure both
        const rect = section.getBoundingClientRect();
        width = Math.max(300, Math.floor(rect.width));
        height = Math.max(300, Math.floor(section.offsetHeight));
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        // Adjust particle count with width; lower on mobile
        let target = Math.floor(width * config.density);
        if (width < 700) target = Math.floor(target * 0.6);
        if (width < 480) target = Math.floor(target * 0.5);
        target = Math.max(35, Math.min(target, 160));
        particles = createParticles(target);
    }

    const mouse = { x: 0, y: 0, active: false };
    section.addEventListener('mousemove', (e) => {
        const rect = section.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        mouse.active = true;
    });
    section.addEventListener('mouseleave', () => { mouse.active = false; });

    function draw() {
        ctx.clearRect(0, 0, width, height);
        ctx.globalCompositeOperation = 'lighter';

        // Background subtle vignette
        const bg = ctx.createRadialGradient(width*0.2, height*0.1, 0, width*0.2, height*0.1, Math.max(width, height)*0.7);
        bg.addColorStop(0, 'rgba(255, 215, 0, 0.06)');
        bg.addColorStop(1, 'rgba(255, 215, 0, 0)');
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, width, height);

        // Mouse glow
        if (mouse.active) {
            const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 180);
            g.addColorStop(0, 'rgba(255, 215, 0, 0.16)');
            g.addColorStop(1, 'rgba(255, 215, 0, 0)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, width, height);
        }

        // Update motion and keep inside
        for (let p of particles) {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            // Repulse from mouse
            if (mouse.active) {
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const dist2 = dx*dx + dy*dy;
                const range = 120;
                if (dist2 < range*range && dist2 > 0.01) {
                    const dist = Math.sqrt(dist2);
                    const force = (range - dist) / range * 0.55;
                    p.vx += (dx / dist) * force * 0.35;
                    p.vy += (dy / dist) * force * 0.35;
                }
            }
        }

        // Links between near particles
        for (let i = 0; i < particles.length; i++) {
            const a = particles[i];
            for (let j = i + 1; j < particles.length; j++) {
                const b = particles[j];
                const dx = a.x - b.x, dy = a.y - b.y;
                const dist = Math.hypot(dx, dy);
                if (dist < config.maxLinkDist) {
                    const alpha = 1 - dist / config.maxLinkDist;
                    ctx.strokeStyle = `rgba(255, 215, 0, ${alpha * 0.35})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            }
        }

        // Draw particles with glow
        for (let p of particles) {
            ctx.fillStyle = 'rgba(255, 215, 0, 0.95)';
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();

            const g2 = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
            g2.addColorStop(0, 'rgba(255, 215, 0, 0.22)');
            g2.addColorStop(1, 'rgba(255, 215, 0, 0)');
            ctx.fillStyle = g2;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.globalCompositeOperation = 'source-over';
        rafId = requestAnimationFrame(draw);
    }

    // Animate only when section is visible
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!rafId) rafId = requestAnimationFrame(draw);
            } else {
                if (rafId) cancelAnimationFrame(rafId);
                rafId = null;
            }
        });
    }, { threshold: 0.05 });
    io.observe(section);

    // Resize handling
    const ro = new ResizeObserver(() => resize());
    ro.observe(section);
    window.addEventListener('resize', resize);
    resize();

    // Respect reduced motion
    const mq = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq && mq.matches) {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
    }
}

// Contact buttons functionality
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('contact-link')) {
        e.preventDefault();
        
        const linkText = e.target.textContent;
        
        switch(linkText) {
            case 'Agregar en Discord':
                copyToClipboard('feerxzz_');
                showNotification('Discord copiado al portapapeles', 'success');
                break;
                
            case 'Enviar Email':
                window.location.href = 'mailto:feerrxzz@gmail.com?subject=Consulta Staff';
                break;

            case 'Ver': // Ez-bio
                window.location.href = 'https://e-z.bio/Ferxzz';
                break;
                
            case 'Contactar':
                copyToClipboard('https://e-z.bio/Ferxzz');
                showNotification('EzBio copiado al portapapeles', 'success');
                break;
        }
    }
});

// Copy to clipboard function
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Texto copiado al portapapeles');
        }).catch(err => {
            console.error('Error al copiar: ', err);
            fallbackCopyTextToClipboard(text);
        });
    } else {
        fallbackCopyTextToClipboard(text);
    }
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
    } catch (err) {
        console.error('Fallback: Error al copiar', err);
    }
    
    document.body.removeChild(textArea);
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(255, 215, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Floating cards animation enhancement
function enhanceFloatingCards() {
    const cards = document.querySelectorAll('.floating-card');
    
    cards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.05)';
            card.style.boxShadow = '0 20px 40px rgba(255, 215, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = 'none';
        });
    });
}

// Initialize floating cards enhancement
setTimeout(enhanceFloatingCards, 1000);


// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero elements
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    const heroButtons = document.querySelector('.hero-buttons');
    
    if (heroTitle) {
        heroTitle.style.animation = 'fadeInUp 1s ease 0.2s both';
    }
    if (heroDescription) {
        heroDescription.style.animation = 'fadeInUp 1s ease 0.4s both';
    }
    if (heroButtons) {
        heroButtons.style.animation = 'fadeInUp 1s ease 0.6s both';
    }

    // Mount wavy timeline line
    try { mountWavyTimeline(); } catch(_) {}
});

// Creative animated background for Hero (aurora waves)
function initHeroBackground() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    if (getComputedStyle(hero).position === 'static') hero.style.position = 'relative';

    let canvas = hero.querySelector('canvas.hero-fx');
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.className = 'hero-fx';
        hero.insertBefore(canvas, hero.firstChild);
    }

    const ctx = canvas.getContext('2d');
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0, height = 0, rafId = null, tick = 0;

    const layers = [
        { color: 'rgba(255, 215, 0, 0.10)', speed: 0.15, amp: 90, freq: 0.0016, thickness: 180 },
        { color: 'rgba(255, 235, 59, 0.12)', speed: 0.10, amp: 120, freq: 0.0012, thickness: 220 },
        { color: 'rgba(255, 255, 255, 0.05)', speed: 0.06, amp: 60, freq: 0.0022, thickness: 140 }
    ];

    function resize() {
        const rect = hero.getBoundingClientRect();
        width = Math.max(300, Math.floor(rect.width));
        height = Math.max(400, Math.floor(rect.height));
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function drawLayer(opts, offsetY) {
        const { color, amp, freq, thickness } = opts;
        const grad = ctx.createLinearGradient(0, offsetY - thickness, 0, offsetY + thickness);
        grad.addColorStop(0, 'rgba(0,0,0,0)');
        grad.addColorStop(0.5, color);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;

        ctx.beginPath();
        ctx.moveTo(0, offsetY);
        for (let x = 0; x <= width; x += 6) {
            const y = offsetY + Math.sin(x * freq + tick * 0.02) * amp * Math.sin(x * freq * 0.6 + tick * 0.018);
            ctx.lineTo(x, y);
        }
        ctx.lineTo(width, offsetY + thickness);
        ctx.lineTo(0, offsetY + thickness);
        ctx.closePath();
        ctx.fill();
    }

    const mouse = { x: 0.5, y: 0.5 };
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        mouse.x = (e.clientX - rect.left) / rect.width;
        mouse.y = (e.clientY - rect.top) / rect.height;
    });

    function draw() {
        ctx.clearRect(0, 0, width, height);

        // Background subtle radial tint
        const rg = ctx.createRadialGradient(width*0.7, height*0.2, 0, width*0.7, height*0.2, Math.max(width, height)*0.7);
        rg.addColorStop(0, 'rgba(255, 215, 0, 0.06)');
        rg.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = rg;
        ctx.fillRect(0, 0, width, height);

        const baseY = height * (0.45 + (mouse.y - 0.5) * 0.1);
        let y = baseY;
        layers.forEach((layer, i) => {
            const offset = (i - 1) * 120 + (mouse.x - 0.5) * 40; // separacion entre capas + leve parallax
            drawLayer(layer, y + offset);
        });

        tick += 1;
        rafId = requestAnimationFrame(draw);
    }

    // Animate only when hero is visible
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!rafId) rafId = requestAnimationFrame(draw);
            } else {
                if (rafId) cancelAnimationFrame(rafId);
                rafId = null;
            }
        });
    }, { threshold: 0.05 });
    io.observe(hero);

    const ro = new ResizeObserver(resize);
    ro.observe(hero);
    window.addEventListener('resize', resize);
    resize();

    // reduced motion
    const mq = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq && mq.matches) {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
    }
}

// Draw a wavy central line for the timeline using SVG
function mountWavyTimeline() {
    const timeline = document.querySelector('.timeline');
    if (!timeline) return;

    // Remove existing svg if any
    const old = timeline.querySelector('svg.timeline-wave');
    if (old) old.remove();

    // Create the svg element
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('timeline-wave');
    svg.style.position = 'absolute';
    svg.style.left = '0';
    svg.style.top = '0';
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.style.zIndex = '1';
    svg.style.pointerEvents = 'none';

    // Gradient
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const grad = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    grad.setAttribute('id', 'waveGrad');
    grad.setAttribute('x1', '0%'); grad.setAttribute('y1', '0%');
    grad.setAttribute('x2', '0%'); grad.setAttribute('y2', '100%');
    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%'); stop1.setAttribute('stop-color', '#FFD700'); stop1.setAttribute('stop-opacity', '0.9');
    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%'); stop2.setAttribute('stop-color', '#FFEB3B'); stop2.setAttribute('stop-opacity', '0.7');
    grad.appendChild(stop1); grad.appendChild(stop2); defs.appendChild(grad);
    svg.appendChild(defs);

    // Path
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'url(#waveGrad)');
    path.setAttribute('stroke-width', '3');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    path.style.filter = 'drop-shadow(0 0 6px rgba(255, 215, 0, 0.15))';

    svg.appendChild(path);
    timeline.style.position = timeline.style.position || 'relative';
    timeline.insertBefore(svg, timeline.firstChild);

    function buildPath() {
        const rect = timeline.getBoundingClientRect();
        const h = rect.height;
        const w = rect.width;

        // Center X: match dots position (50%) on desktop, 20px on mobile layout
        let cx = w * 0.5;
        if (window.matchMedia('(max-width: 768px)').matches) {
            cx = 20; // coincide con el estilo móvil de la l��nea original
        }

        const amplitude = Math.min(50, Math.max(24, w * 0.04));
        const period = 360; // px por onda (mayor = menos curvas)
        const segments = Math.max(3, Math.ceil(h / period) + 1);

        // Start at top
        let d = `M ${cx} 0`;
        let y = 0;
        for (let i = 0; i < segments; i++) {
            const y1 = y + period / 4;
            const y2 = y + period / 2;
            const y3 = y + period * 3 / 4;
            const y4 = y + period;
            // alterna izquierda-derecha
            const dir = i % 2 === 0 ? 1 : -1;
            const x1 = cx + dir * amplitude;
            const x2 = cx - dir * amplitude;
            const x3 = cx + dir * amplitude;
            const x4 = cx;
            d += ` C ${x1} ${y1}, ${x2} ${y2}, ${x4} ${y2}`; // media onda
            d += ` S ${x3} ${y3}, ${cx} ${y4}`; // segunda media
            y = y4;
        }
        path.setAttribute('d', d);
    }

    const ro = new ResizeObserver(buildPath);
    ro.observe(timeline);
    window.addEventListener('resize', buildPath);
    buildPath();
}

// Creative background for Reviews (diagonal golden stripes)
function initReviewsBackground() {
    const section = document.querySelector('#reviews');
    if (!section) return;

    if (getComputedStyle(section).position === 'static') section.style.position = 'relative';

    let canvas = section.querySelector('canvas.reviews-fx');
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.className = 'reviews-fx';
        section.insertBefore(canvas, section.firstChild);
    }

    const ctx = canvas.getContext('2d');
    let width = 0, height = 0, dpr = Math.min(window.devicePixelRatio || 1, 2), rafId = null, t = 0;

    const stripes = [];

    function rebuild() {
        stripes.length = 0;
        const stripeWidth = Math.max(80, Math.floor(width * 0.12));
        const gap = Math.floor(stripeWidth * 0.6);
        const total = Math.ceil((width + height) / (stripeWidth + gap)) + 2;
        for (let i = -2; i < total; i++) {
            stripes.push({
                w: stripeWidth,
                offset: i * (stripeWidth + gap),
                alpha: 0.04 + Math.random() * 0.06,
                hue: 45 + Math.random() * 10
            });
        }
    }

    function resize() {
        const rect = section.getBoundingClientRect();
        width = Math.max(320, Math.floor(rect.width));
        height = Math.max(480, Math.floor(rect.height));
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        rebuild();
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);

        // diagonal transform
        ctx.save();
        const angle = -Math.PI / 6; // -30deg
        ctx.translate(width * -0.2, height * 0.1 + (t * 0.2 % (stripes[0]?.w || 120)));
        ctx.rotate(angle);

        stripes.forEach((s, idx) => {
            const grad = ctx.createLinearGradient(0, 0, s.w, 0);
            grad.addColorStop(0, `hsla(${s.hue}, 100%, 60%, 0)`);
            grad.addColorStop(0.5, `hsla(${s.hue}, 100%, 60%, ${s.alpha})`);
            grad.addColorStop(1, `hsla(${s.hue}, 100%, 60%, 0)`);
            ctx.fillStyle = grad;
            ctx.fillRect(s.offset, -height, s.w, height * 3);
        });
        ctx.restore();

        // subtle vignette
        const vg = ctx.createRadialGradient(width*0.5, height*0.3, 0, width*0.5, height*0.3, Math.max(width, height)*0.8);
        vg.addColorStop(0, 'rgba(255, 215, 0, 0.06)');
        vg.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = vg;
        ctx.fillRect(0, 0, width, height);

        t += 1;
        rafId = requestAnimationFrame(draw);
    }

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!rafId) rafId = requestAnimationFrame(draw);
            } else {
                if (rafId) cancelAnimationFrame(rafId);
                rafId = null;
            }
        });
    }, { threshold: 0.05 });
    io.observe(section);

    const ro = new ResizeObserver(resize);
    ro.observe(section);
    window.addEventListener('resize', resize);
    resize();

    // reduced motion
    const mq = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq && mq.matches) {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
    }
}

// Add fadeInUp animation
const fadeInUpStyle = document.createElement('style');
fadeInUpStyle.textContent = `
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
`;
document.head.appendChild(fadeInUpStyle);

// Anti-devtools and context-menu protection
(function() {
    // Disable right click
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });

    // Block common devtools/view-source shortcuts
    document.addEventListener('keydown', function(e) {
        const key = e.key || '';
        if (
            key === 'F12' ||
            (e.ctrlKey && e.shiftKey && (key === 'I' || key === 'i' || key === 'J' || key === 'j' || key === 'C' || key === 'c')) ||
            (e.ctrlKey && (key === 'U' || key === 'u' || key === 'S' || key === 's'))
        ) {
            e.preventDefault();
            e.stopPropagation();
            try { showNotification('Acción deshabilitada', 'error'); } catch(_) {}
            return false;
        }
    }, true);

    // Detect devtools open by viewport difference and show overlay
    let devtoolsOpen = false;
    const threshold = 160;
    setInterval(function() {
        const widthDiff = window.outerWidth - window.innerWidth;
        const heightDiff = window.outerHeight - window.innerHeight;
        const opened = widthDiff > threshold || heightDiff > threshold;
        if (opened && !devtoolsOpen) {
            devtoolsOpen = true;
            const overlay = document.createElement('div');
            overlay.id = 'anti-devtools-overlay';
            overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.98);color:#fff;display:flex;align-items:center;justify-content:center;z-index:99999;text-align:center;padding:2rem;';
            overlay.innerHTML = '<div><i class="fas fa-shield-alt" style="font-size:2rem;color:var(--primary-color)"></i><h2 style="margin:1rem 0">Contenido protegido</h2><p>Cierra las herramientas de desarrollador para continuar.</p></div>';
            document.body.appendChild(overlay);
        } else if (!opened && devtoolsOpen) {
            devtoolsOpen = false;
            const ov = document.getElementById('anti-devtools-overlay');
            if (ov) ov.remove();
        }
    }, 1000);
})();