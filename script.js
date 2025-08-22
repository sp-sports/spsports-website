window.addEventListener('load', function() {
    // Supabase client initialization
    const SUPABASE_URL = 'https://cvuzjxefmaocofpxzxzw.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2dXpqeGVmbWFvY29mcHh6eHp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5Nzc3NTAsImV4cCI6MjA2NzU1Mzc1MH0.9ubyu2At5rA_mbYQigR5OS2yEcDJZ1jxkoH_Oj_LgtU';
    const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    
    // --- DATA ---
    const galleryImages = [
        'pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg', 'pic6.jpg',
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
        new Swiper('.swiper', {
            loop: true, autoplay: { delay: 3000, disableOnInteraction: false }, effect: 'coverflow', grabCursor: true, centeredSlides: true, slidesPerView: 'auto',
            coverflowEffect: { rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: true, },
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            on: {
                beforeInit: function (swiper) {
                    galleryImages.forEach(src => {
                         swiper.appendSlide(`<div class="swiper-slide"><img src="${src}" alt="SP Sports Gallery Image" loading="lazy"></div>`);
                    });
                }
            }
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
        const personsInput = document.getElementById('persons');
        const personsPlusBtn = document.getElementById('persons-plus');
        const personsMinusBtn = document.getElementById('persons-minus');
    
        // --- PRICING DATA ---
        const prices = {
            weekday: 100, // ₹100 per person per hour
            weekend: 150  // ₹150 per person per hour
        };
        const closingTime = 22; // 10:00 PM
    
        // --- CALCULATION LOGIC ---
        function calculateTotal() {
            const dateVal = dateInput.value;
            const startTimeVal = parseInt(startTimeSelect.value, 10);
            const hoursVal = parseInt(hoursInput.value, 10);
            const personsVal = parseInt(personsInput.value, 10);
    
            if (!dateVal || isNaN(startTimeVal) || isNaN(hoursVal) || isNaN(personsVal)) {
                totalPriceDisplay.textContent = '₹ 0';
                return;
            }
    
            const selectedDate = new Date(dateVal);
            const dayOfWeek = selectedDate.getDay(); // 0 = Sunday, 6 = Saturday
            const dayType = (dayOfWeek === 0 || dayOfWeek === 6) ? 'weekend' : 'weekday';
            const hourlyRatePerPerson = prices[dayType];
            const total = hourlyRatePerPerson * hoursVal * personsVal;
            totalPriceDisplay.textContent = `₹ ${total.toLocaleString('en-IN')}`;
        }
    
        function updateHourConstraints() {
            const startTimeVal = parseInt(startTimeSelect.value, 10);
            if (isNaN(startTimeVal)) return;
            
            const maxHours = closingTime - startTimeVal;
            hoursInput.max = maxHours > 0 ? maxHours : 1;
            
            if (parseInt(hoursInput.value, 10) > maxHours) {
                hoursInput.value = maxHours > 0 ? maxHours : 1;
            }
            calculateTotal();
        }
        
        // --- EVENT LISTENERS ---
        dateInput.min = new Date().toISOString().split("T")[0];
        
        [dateInput, startTimeSelect, hoursInput, personsInput].forEach(el => {
            if (el) { 
                el.addEventListener('change', calculateTotal);
            }
        });

        if(startTimeSelect) {
            startTimeSelect.addEventListener('change', updateHourConstraints);
        }
    
        if(hoursPlusBtn) {
            hoursPlusBtn.addEventListener('click', () => {
                const max = parseInt(hoursInput.max, 10);
                let currentVal = parseInt(hoursInput.value, 10);
                if (currentVal < max) {
                    hoursInput.value = currentVal + 1;
                    calculateTotal();
                }
            });
        }
        
        if(hoursMinusBtn) {
            hoursMinusBtn.addEventListener('click', () => {
                let currentVal = parseInt(hoursInput.value, 10);
                if (currentVal > 1) {
                    hoursInput.value = currentVal - 1;
                    calculateTotal();
                }
            });
        }

        if(personsPlusBtn) {
            personsPlusBtn.addEventListener('click', () => {
                const max = parseInt(personsInput.max, 10);
                let currentVal = parseInt(personsInput.value, 10);
                if (currentVal < max) {
                    personsInput.value = currentVal + 1;
                    calculateTotal();
                }
            });
        }
        
        if(personsMinusBtn) {
            personsMinusBtn.addEventListener('click', () => {
                const min = parseInt(personsInput.min, 10);
                let currentVal = parseInt(personsInput.value, 10);
                if (currentVal > min) {
                    personsInput.value = currentVal - 1;
                    calculateTotal();
                }
            });
        }

        // ============================ CORRECTED FORM SUBMISSION ============================
        bookingForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (bookingForm.checkValidity()) {
                const name = nameInput.value;
                const phone = phoneInput.value;
                const date = dateInput.value;
                const startTime = startTimeSelect.options[startTimeSelect.selectedIndex].text;
                const hours = hoursInput.value;
                const persons = personsInput.value;
                const totalAmountText = totalPriceDisplay.textContent; // This is the formatted string, e.g., "₹ 1,200"

                // === FIX: Convert the formatted price string to a pure number for the database ===
                // "₹ 1,200" becomes 1200. This is crucial for numeric columns.
                const numericTotalAmount = parseInt(totalAmountText.replace(/[^0-9]/g, ''), 10) || 0;
                
                // Send clean data to Google Sheets
                try {
                    const response = await fetch('https://script.google.com/macros/s/AKfycbz99tgtJwucCm7YDvLSQ6Pcfvk5sp-iXLZiKFzhrGuimZM3zZoAAgNQzIXNvO5DN6-P/exec', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ name, phone, date, start_time: startTime, hours: parseInt(hours, 10), total_amount: numericTotalAmount, person_count: parseInt(persons, 10)})
                    });
                    if (!response.ok) console.error('Google Apps Script error:', await response.json());
                } catch (err) {
                    console.error('Google Apps Script exception:', err);
                }

                // Send clean data to Supabase
                try {
                    const { error } = await supabase.from('bookings').insert([
                        // Use the corrected numeric variable here
                        { name, phone, date, start_time: startTime, hours: parseInt(hours, 10), total_amount: numericTotalAmount, person_count: parseInt(persons, 10) }
                    ]);
                    if (error) console.error('Supabase insert error:', error);
                } catch (err) {
                    console.error('Supabase exception:', err);
                }

                const whatsappNumber = '919841326626';
                // Use the original formatted text for the user-facing WhatsApp message
                const message = `Hi SP Sports! I'd like to book a session.\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Date:* ${date}\n*Start Time:* ${startTime}\n*Hours:* ${hours}\n*Number of Persons:* ${persons}\n\n*Estimated Total:* ${totalAmountText}`;

                // Detect if user is on mobile or desktop
                const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

                // Build correct WhatsApp URL
                const whatsappUrl = isMobile
                    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
                    : `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;

                console.log(whatsappUrl);

                // Open WhatsApp link
                window.location.href = whatsappUrl;
                if (bookingModal) bookingModal.hide();
                } else {
                    bookingForm.classList.add('was-validated');
                }

        });
        // ====================================================================================
    
        if(bookingModalEl) {
            bookingModalEl.addEventListener('hidden.bs.modal', function () {
                bookingForm.classList.remove('was-validated');
                bookingForm.reset();
                totalPriceDisplay.textContent = '₹ 0';
                hoursInput.max = 16;
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
