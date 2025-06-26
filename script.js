document.addEventListener('DOMContentLoaded', function() {
    
    // --- DATA ---
    const galleryImages = [
        'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/3621168/pexels-photo-3621168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/163452/basketball-dunk-blue-game-163452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/2294477/pexels-photo-2294477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/863963/pexels-photo-863963.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ];

    const testimonials = [
        { quote: "My son absolutely loves SP Sports! The coaches are fantastic...", author: "Priya S.", title: "Parent", rating: 5 },
        { quote: "A clean, safe, and incredibly fun environment for kids...", author: "Rajeev M.", title: "Parent", rating: 5 },
        { quote: "The basketball court facilities are top-notch. It's our go-to place...", author: "Coach Anand", title: "Basketball Coach", rating: 5 },
        { quote: "From the multisport program to the friendly staff, everything is designed with kids in mind...", author: "Anjali K.", title: "Parent", rating: 5 },
        { quote: "Playing here has improved my skills tremendously. The synthetic court surface is amazing...", author: "Arjun Patel", title: "Basketball Player", rating: 5 }
    ];
    
    // --- SINGLE PAGE APPLICATION (SPA) NAVIGATION ---
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const navScrollLinks = document.querySelectorAll('.nav-link-scroll');

    function showPage(pageName) {
        pages.forEach(page => page.classList.remove('active'));
        const targetPage = document.getElementById(`page-${pageName}`);
        if (targetPage) targetPage.classList.add('active');

        navLinks.forEach(nav => {
            nav.classList.remove('active-link');
            if (nav.getAttribute('data-page') === pageName) {
                nav.classList.add('active-link');
            }
        });
        window.scrollTo(0, 0);
    }
    
    showPage('home'); // Set initial page

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageName = link.getAttribute('data-page');
            if (pageName) showPage(pageName);
        });
    });

    navScrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // --- FLOATING BASKETBALLS ---
    const basketballsContainer = document.querySelector('.basketballs');
    if(basketballsContainer) {
        for (let i = 0; i < 15; i++) {
            const ball = document.createElement('div');
            ball.className = 'ball';
            const size = Math.random() * 80 + 20;
            ball.style.width = `${size}px`;
            ball.style.height = `${size}px`;
            ball.style.left = `${Math.random() * 100}%`;
            ball.style.animationDuration = `${Math.random() * 15 + 10}s`;
            ball.style.animationDelay = `${Math.random() * 10}s`;
            basketballsContainer.appendChild(ball);
        }
    }

    // --- DYNAMIC GALLERY CAROUSEL (Custom logic with Bootstrap grid) ---
    const galleryWrapper = document.querySelector('.gallery-wrapper');
    const galleryPrevBtn = document.getElementById('gallery-prev');
    const galleryNextBtn = document.getElementById('gallery-next');
    let galleryCurrentIndex = 0;
    
    if (galleryWrapper) {
        let itemsPerView = window.innerWidth >= 768 ? 2 : 1;
        
        galleryImages.forEach(src => {
            // Each slide contains a Bootstrap row and column
            galleryWrapper.innerHTML += `
                <div class="gallery-slide">
                    <img src="${src}" alt="Gallery Image">
                </div>
            `;
        });
        const totalSlides = document.querySelectorAll('.gallery-slide').length;
        
        function updateGallery() {
            const offset = -galleryCurrentIndex * (100 / itemsPerView);
            galleryWrapper.style.transform = `translateX(${offset}%)`;
        }

        galleryNextBtn.addEventListener('click', () => {
            if (galleryCurrentIndex < totalSlides - itemsPerView) {
                galleryCurrentIndex++;
            } else {
                galleryCurrentIndex = 0; // Loop back
            }
            updateGallery();
        });

        galleryPrevBtn.addEventListener('click', () => {
            if (galleryCurrentIndex > 0) {
                galleryCurrentIndex--;
            } else {
                galleryCurrentIndex = totalSlides - itemsPerView; // Loop to end
            }
            updateGallery();
        });

        window.addEventListener('resize', () => {
            itemsPerView = window.innerWidth >= 768 ? 2 : 1;
            galleryCurrentIndex = 0; // Reset on resize
            updateGallery();
        });
        updateGallery();
    }
    
    // --- DYNAMIC TESTIMONIALS (Bootstrap Carousel) ---
    const testimonialCarousel = document.getElementById('testimonialCarousel');
    if (testimonialCarousel) {
        const carouselInner = testimonialCarousel.querySelector('.carousel-inner');
        const carouselIndicators = testimonialCarousel.querySelector('.carousel-indicators');

        testimonials.forEach((t, index) => {
            const stars = '⭐'.repeat(t.rating);
            // Create Indicator Button
            const indicator = document.createElement('button');
            indicator.type = 'button';
            indicator.dataset.bsTarget = '#testimonialCarousel';
            indicator.dataset.bsSlideTo = index;
            if (index === 0) indicator.classList.add('active');
            carouselIndicators.appendChild(indicator);

            // Create Carousel Item
            const slide = document.createElement('div');
            slide.classList.add('carousel-item');
            if (index === 0) slide.classList.add('active');
            slide.innerHTML = `
                <div class="testimonial-card">
                    <p>"${t.quote}"</p>
                    <div>${stars}</div>
                    <div class="testimonial-author">${t.author} <span>- ${t.title}</span></div>
                </div>
            `;
            carouselInner.appendChild(slide);
        });
    }

    // --- BOOKING FORM (WhatsApp) ---
    const bookingForm = document.getElementById('whatsapp-form');
    if (bookingForm) {
        const bookingModalEl = document.getElementById('bookingModal');
        const bookingModal = bootstrap.Modal.getInstance(bookingModalEl) || new bootstrap.Modal(bookingModalEl);

        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const date = document.getElementById('date').value;
            const whatsappNumber = '+917358085526';
            
            const message = `Hi, I am ${name}, I'd like to book the basketball court on ${date}. My contact number is ${phone}.`;
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
            
            window.open(whatsappUrl, '_blank');
            bookingModal.hide(); // Use Bootstrap's method to hide the modal
        });
    }
    
    // --- SCROLL ANIMATION OBSERVER ---
    const scrollElements = document.querySelectorAll('.scroll-animate');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    scrollElements.forEach(el => observer.observe(el));
});