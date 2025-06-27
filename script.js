document.addEventListener('DOMContentLoaded', function() {
    
    // --- DATA ---
    const galleryImages = [
        'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/3621168/pexels-photo-3621168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/163452/basketball-dunk-blue-game-163452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        // --- IMPORTANT: ADD YOUR REAL IMAGE URL HERE ---
        // 'https://your-website.com/path/to/your-custom-image.jpg', 
        'https://images.pexels.com/photos/2294477/pexels-photo-2294477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/863963/pexels-photo-863963.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ];

    const testimonials = [
        { quote: "My son absolutely loves SP Sports! The coaches are fantastic, patient, and really know how to make sports fun. His confidence has skyrocketed!", author: "Priya S.", title: "Parent", rating: 5 },
        { quote: "A clean, safe, and incredibly fun environment for kids to learn and grow. The multi-sport program is a brilliant idea for younger children.", author: "Rajeev M.", title: "Parent", rating: 5 },
        { quote: "The basketball court facilities are top-notch. It's our go-to place for practice sessions. The booking process is always smooth.", author: "Coach Anand", title: "Basketball Coach", rating: 5 },
        { quote: "From the multisport program to the friendly staff, everything is designed with kids in mind. Highly recommended for any parent in Chennai.", author: "Anjali K.", title: "Parent", rating: 5 },
    ];
    
    // --- UI ENHANCEMENTS & EVENT LISTENERS ---

    // Header scroll effect
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Active Nav Link based on current page
    const currentPath = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll('.main-nav .nav-link');
    navLinks.forEach(link => {
        // Check if the link's href matches the current page's filename
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active-link');
        }
    });

    // Smooth scroll for anchor links with class 'nav-link-scroll'
    const navScrollLinks = document.querySelectorAll('.nav-link-scroll');
    navScrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- DYNAMIC CONTENT INJECTION ---
    
    // Floating Basketballs (only on homepage)
    const basketballsContainer = document.querySelector('.basketballs');
    if (basketballsContainer) {
        for (let i = 0; i < 15; i++) {
            const ball = document.createElement('div');
            ball.className = 'ball';
            const size = Math.random() * 80 + 20;
            ball.style.width = `${size}px`;
            ball.style.height = `${size}px`;
            ball.style.left = `${Math.random() * 100}%`;
            ball.style.animationDuration = `${Math.random() * 20 + 15}s`;
            ball.style.animationDelay = `${Math.random() * 10}s`;
            basketballsContainer.appendChild(ball);
        }
    }

    // Swiper Gallery (only on homepage)
    const galleryWrapper = document.querySelector('.swiper-wrapper');
    if (galleryWrapper) {
        galleryImages.forEach(src => {
            galleryWrapper.innerHTML += `<div class="swiper-slide"><img src="${src}" alt="SP Sports Gallery Image" loading="lazy"></div>`;
        });
        new Swiper('.swiper', {
            loop: true,
            autoplay: { delay: 3000, disableOnInteraction: false },
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflowEffect: { rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: true, },
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        });
    }
    
    // Dynamic Testimonials (only on homepage)
    const testimonialCarousel = document.getElementById('testimonialCarousel');
    if (testimonialCarousel) {
        const carouselInner = testimonialCarousel.querySelector('.carousel-inner');
        const carouselIndicators = testimonialCarousel.querySelector('.carousel-indicators');

        testimonials.forEach((t, index) => {
            const stars = '⭐'.repeat(t.rating);
            carouselIndicators.innerHTML += `<button type="button" data-bs-target="#testimonialCarousel" data-bs-slide-to="${index}" class="${index === 0 ? 'active' : ''}" aria-current="${index === 0 ? 'true' : 'false'}" aria-label="Slide ${index + 1}"></button>`;
            carouselInner.innerHTML += `
                <div class="carousel-item ${index === 0 ? 'active' : ''}">
                    <div class="testimonial-card">
                        <p>"${t.quote}"</p>
                        <div>${stars}</div>
                        <div class="testimonial-author">${t.author} <span>- ${t.title}</span></div>
                    </div>
                </div>
            `;
        });
    }

    // --- BOOKING FORM (WhatsApp) & VALIDATION ---
   // --- BOOKING FORM (WhatsApp) & VALIDATION ---
const bookingForm = document.getElementById('whatsapp-form');
if (bookingForm) {
    const bookingModalEl = document.getElementById('bookingModal');
    // Important: Get the Bootstrap Modal instance correctly
    const bookingModal = bootstrap.Modal.getInstance(bookingModalEl); 
    const dateInput = document.getElementById('date');
    if(dateInput) {
        dateInput.min = new Date().toISOString().split("T")[0]; // Prevent past dates
    }

    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (bookingForm.checkValidity()) {
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const date = document.getElementById('date').value;
            const whatsappNumber = '+917358085526'; // Your number
            
            const message = `Hi SP Sports! I'd like to book a session. \n\nName: ${name}\nPhone: ${phone}\nDate: ${date}`;
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
            
            window.open(whatsappUrl, '_blank');
            
            // Hide the modal after submission
            if (bookingModal) {
                 bookingModal.hide();
            }

            // Reset the form fields and remove validation classes
            bookingForm.reset();
            bookingForm.classList.remove('was-validated');

        } else {
            // This class adds the green/red validation styles
            bookingForm.classList.add('was-validated');
        }
    });

    // Add an event listener for when the modal is hidden
    bookingModalEl.addEventListener('hidden.bs.modal', function () {
        // This is a failsafe to ensure the form is clean when the modal is closed
        bookingForm.classList.remove('was-validated');
        bookingForm.reset();
    });
}
    
    // --- INTERSECTION OBSERVER for Scroll Animations ---
    const observerOptions = { rootMargin: '0px', threshold: 0.1 };
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-animate').forEach(el => scrollObserver.observe(el));
});