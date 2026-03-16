/**
 * Zentro Luxury Salon - Interactive Scripts
 * Antigravity Theme & Glassmorphism
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Navbar Scroll Effect & Mobile Menu ---
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('#mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-links a, .nav-cta');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Toggle Mobile Menu
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('is-active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('overflow-hidden'); // Prevent scrolling when menu is open
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('is-active');
            navMenu.classList.remove('active');
            document.body.classList.remove('overflow-hidden');
        });
    });

    // --- 2. Scroll Reveal Animations with Intersection Observer ---
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-fade, .reveal-left, .reveal-right');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // --- 3. Parallax Hover on Hero Section (Antigravity Effect) ---
    const parallaxContainer = document.getElementById('parallax-container');
    const floatItems = document.querySelectorAll('.float-item');

    if (parallaxContainer) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX * -1) / 100;
            const y = (e.clientY * -1) / 100;

            floatItems.forEach(item => {
                const speed = item.getAttribute('data-speed');
                const xPos = x * speed;
                const yPos = y * speed;
                item.style.transform = `translate(${xPos}px, ${yPos}px)`;
            });
        });
    }

    // --- 4. Ambient Canvas Particles (Luxury Dust/Glow) ---
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particlesArray;

        // Resize Canvas
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Particle Class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                // Particles drift upwards for antigravity feel
                this.directionX = (Math.random() - 0.5) * 0.5;
                this.directionY = Math.random() * -1 - 0.2;
                this.size = Math.random() * 2 + 0.5;

                // Color palette (Gold, Soft Neon, White)
                const colors = [
                    'rgba(212, 175, 55, 0.4)',  // Gold
                    'rgba(255, 255, 255, 0.2)', // White
                    'rgba(183, 110, 121, 0.3)'  // Rose Gold
                ];
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            update() {
                // Keep inside screen
                if (this.x > canvas.width || this.x < 0) {
                    this.directionX = -this.directionX;
                }

                // Reset to bottom when floating off top (Antigravity loop)
                if (this.y < 0 - this.size) {
                    this.y = canvas.height + this.size;
                    this.x = Math.random() * canvas.width;
                }

                this.x += this.directionX;
                this.y += this.directionY;

                this.draw();
            }
        }

        // Initialize Particles
        function initParticles() {
            particlesArray = [];
            const numberOfParticles = (canvas.width * canvas.height) / 15000;
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }

        // Animation Loop
        function animateParticles() {
            requestAnimationFrame(animateParticles);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
        }

        initParticles();
        animateParticles();
    }

    // --- 5. Service Card Mouse Effect ---
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
    // --- 6. AJAX Booking Form Submission ---
    const bookingForm = document.querySelector('.contact-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // Visual feedback
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            
            const formData = new FormData(bookingForm);
            
            try {
                const response = await fetch(bookingForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Success styling
                    bookingForm.innerHTML = `
                        <div class="booking-success text-center reveal-fade active" style="padding: 40px 0;">
                            <div class="icon-wrap" style="margin: 0 auto 30px; background: var(--gold); color: #000; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-size: 2rem;">
                                <i class="fas fa-check"></i>
                            </div>
                            <h3 style="color: var(--gold); font-size: 2rem; margin-bottom: 15px;">Reservation Received!</h3>
                            <p style="color: var(--text-muted); font-size: 1.1rem;">We've sent a confirmation request to our team. <br> <strong>Important:</strong> If this is your first time using this email, please check your inbox for an activation link from FormSubmit.</p>
                        </div>
                    `;
                } else {
                    throw new Error('Submission failed');
                }
            } catch (error) {
                console.error('Form Error:', error);
                alert('Submission failed. \n\n1. Check your internet connection.\n2. Ensure the email zentrosalononline@gmail.com has been activated via FormSubmit.\n3. Make sure the site is running on a web server (Live Server/Netlify).');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    }
});
