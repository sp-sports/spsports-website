window.addEventListener('load', function() {
    // Supabase client initialization
    const SUPABASE_URL = 'https://cvuzjxefmaocofpxzxzw.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2dXpqeGVmbWFvY29mcHh6eHp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5Nzc3NTAsImV4cCI6MjA2NzU1Mzc1MH0.9ubyu2At5rA_mbYQigR5OS2yEcDJZ1jxkoH_Oj_LgtU';
    const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    
    // --- DATA ---
    const galleryImages = [
        'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/3621168/pexels-photo-3621168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/163452/basketball-dunk-blue-game-163452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
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
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll('.main-nav .nav-link');
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
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

    const bookingForm = document.getElementById('whatsapp-form');
    if (bookingForm) {
        // --- FORM ELEMENTS ---
        const bookingModalEl = document.getElementById('bookingModal');
        const bookingModal = bootstrap.Modal.getInstance(bookingModalEl) || new bootstrap.Modal(bookingModalEl);
        const dateInput = document.getElementById('date');
        const startTimeSelect = document.getElementById('startTime');
        const hoursInput = document.getElementById('hours');
        const hoursPlusBtn = document.getElementById('hours-plus');
        const hoursMinusBtn = document.getElementById('hours-minus');
        const totalPriceDisplay = document.getElementById('total-price');
        const nameInput = document.getElementById('name');
        const phoneInput = document.getElementById('phone');
    
        // --- PRICING DATA ---
        const prices = {
            weekday: { morning: 1000, evening: 1200 }, // Morning before 4 PM
            weekend: { morning: 1200, evening: 1500 }  // Evening 4 PM onwards
        };
        const eveningStartTime = 16; // 4:00 PM
        const closingTime = 22; // 10:00 PM
    
        // --- CALCULATION LOGIC ---
        function calculateTotal() {
            const dateVal = dateInput.value;
            const startTimeVal = parseInt(startTimeSelect.value, 10);
            const hoursVal = parseInt(hoursInput.value, 10);
    
            if (!dateVal || isNaN(startTimeVal) || isNaN(hoursVal)) {
                totalPriceDisplay.textContent = '₹ 0';
                return;
            }
    
            // Determine day type
            const selectedDate = new Date(dateVal);
            const dayOfWeek = selectedDate.getDay(); // 0 = Sunday, 6 = Saturday
            const dayType = (dayOfWeek === 0 || dayOfWeek === 6) ? 'weekend' : 'weekday';
    
            // Determine time of day based on the first hour
            const timeOfDay = (startTimeVal < eveningStartTime) ? 'morning' : 'evening';
            
            // Get hourly rate
            const hourlyRate = prices[dayType][timeOfDay];
    
            // Calculate total
            const total = hourlyRate * hoursVal;
            totalPriceDisplay.textContent = `₹ ${total.toLocaleString('en-IN')}`;
        }
    
        function updateHourConstraints() {
            const startTimeVal = parseInt(startTimeSelect.value, 10);
            if (isNaN(startTimeVal)) return;
            
            const maxHours = closingTime - startTimeVal;
            hoursInput.max = maxHours > 0 ? maxHours : 1;
            
            // If current hours exceed new max, adjust it
            if (parseInt(hoursInput.value, 10) > maxHours) {
                hoursInput.value = maxHours > 0 ? maxHours : 1;
            }
            calculateTotal();
        }
        
        // --- EVENT LISTENERS ---
        dateInput.min = new Date().toISOString().split("T")[0];
        [dateInput, startTimeSelect, hoursInput].forEach(el => el.addEventListener('change', calculateTotal));
        startTimeSelect.addEventListener('change', updateHourConstraints);
    
        hoursPlusBtn.addEventListener('click', () => {
            const max = parseInt(hoursInput.max, 10);
            let currentVal = parseInt(hoursInput.value, 10);
            if (currentVal < max) {
                hoursInput.value = currentVal + 1;
                calculateTotal();
            }
        });
        
        hoursMinusBtn.addEventListener('click', () => {
            let currentVal = parseInt(hoursInput.value, 10);
            if (currentVal > 1) {
                hoursInput.value = currentVal - 1;
                calculateTotal();
            }
        });
    
    bookingForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (bookingForm.checkValidity()) {
            const name = nameInput.value;
            const phone = phoneInput.value;
            const date = dateInput.value;
            const startTime = startTimeSelect.options[startTimeSelect.selectedIndex].text;
            const hours = hoursInput.value;
            const totalAmount = totalPriceDisplay.textContent;
            
            // Send data to Google Apps Script Web App
            try {
                const response = await fetch('https://script.google.com/macros/s/AKfycbz99tgtJwucCm7YDvLSQ6Pcfvk5sp-iXLZiKFzhrGuimZM3zZoAAgNQzIXNvO5DN6-P/exec', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, phone, date, start_time: startTime, hours: parseInt(hours, 10), total_amount: totalAmount })
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Google Apps Script error:', errorData.error);
                }
            } catch (err) {
                console.error('Google Apps Script exception:', err);
            }

            // --- Supabase Insert ---
            try {
                const { data, error } = await supabase.from('bookings').insert([
                    { name, phone, date, start_time: startTime, hours: parseInt(hours, 10), total_amount: totalAmount }
                ]);
                if (error) {
                    console.error('Supabase insert error:', error);
                }
            } catch (err) {
                console.error('Supabase exception:', err);
            }

            const whatsappNumber = '+917358085526'; // Your number
            
            const message = `Hi SP Sports! I'd like to book a session.\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Date:* ${date}\n*Start Time:* ${startTime}\n*Hours:* ${hours}\n\n*Total Amount:* ${totalAmount}`;
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
            
            window.open(whatsappUrl, '_blank');
            if (bookingModal) bookingModal.hide();
        } else {
            bookingForm.classList.add('was-validated');
        }
    });
    
        if(bookingModalEl) {
            bookingModalEl.addEventListener('hidden.bs.modal', function () {
                bookingForm.classList.remove('was-validated');
                bookingForm.reset();
                totalPriceDisplay.textContent = '₹ 0'; // Reset total display
                hoursInput.max = 16; // Reset max hours
            });
        }
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