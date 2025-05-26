document.addEventListener('DOMContentLoaded', function() {
    // Navigasi Hamburger
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    navLinks.forEach(link => link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        // Update active link
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        link.classList.add('active');
    }));

    // Efek header saat scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = '#fff';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // Active link berdasarkan section saat scroll
    const sections = document.querySelectorAll("section");
    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
        // Khusus untuk link beranda jika di paling atas
        if (pageYOffset < sections[0].offsetTop + sections[0].clientHeight / 2 && !current) {
            navLinks.forEach(link => link.classList.remove("active"));
            document.querySelector('.nav-link[href="#beranda"]').classList.add('active');
        }
    });


    // Filter Portofolio
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Hapus kelas active dari semua tombol
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Tambah kelas active ke tombol yang diklik
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block'; // Atau 'grid', 'flex' tergantung layout
                    item.classList.remove('hidden-item');
                    // Tambahkan animasi jika perlu
                    // item.style.animation = 'fadeInItem 0.5s ease';
                } else {
                    item.style.display = 'none';
                    item.classList.add('hidden-item');
                }
            });
        });
    });

    // Animasi item portofolio (contoh sederhana)
    // CSS:
    // .portfolio-item.hidden-item { animation: fadeOutItem 0.3s ease forwards; }
    // @keyframes fadeInItem { from { opacity:0; transform: scale(0.9); } to { opacity:1; transform: scale(1); } }
    // @keyframes fadeOutItem { from { opacity:1; transform: scale(1); } to { opacity:0; transform: scale(0.9); } }


    // Form Kontak (Contoh sederhana, idealnya menggunakan backend atau service seperti Formspree)
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Mencegah submit form standar

            // Validasi sederhana (bisa diperluas)
            const nama = document.getElementById('nama').value.trim();
            const email = document.getElementById('email').value.trim();
            const pesan = document.getElementById('pesan').value.trim();

            if (nama === '' || email === '' || pesan === '') {
                formMessage.textContent = 'Mohon isi semua kolom yang wajib diisi.';
                formMessage.className = 'form-message error';
                return;
            }

            // Simulasi pengiriman form
            formMessage.textContent = 'Mengirim pesan...';
            formMessage.className = 'form-message';

            setTimeout(() => {
                // Ganti ini dengan logika pengiriman ke backend Anda
                console.log('Form submitted:', { nama, email, pesan });
                formMessage.textContent = 'Pesan Anda berhasil terkirim! Terima kasih.';
                formMessage.className = 'form-message success';
                contactForm.reset(); // Kosongkan form
            }, 1500);
        });
    }


    // Tombol Scroll to Top
    const scrollToTopButton = document.querySelector('.scroll-to-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) { // Tampilkan tombol setelah scroll 300px
            scrollToTopButton.classList.add('visible');
        } else {
            scrollToTopButton.classList.remove('visible');
        }
    });

    // Animasi saat elemen masuk viewport (Scroll Reveal Effect)
    const scrollElements = document.querySelectorAll('[data-scroll]');

    const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) * (percentageScroll / 100)
        );
    };

    const displayScrollElement = (element) => {
        element.setAttribute('data-scroll', 'in');
    };

    const hideScrollElement = (element) => {
        element.setAttribute('data-scroll', 'out'); // Opsional jika ingin animasi keluar juga
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 80)) { // Tampilkan saat 80% elemen masuk viewport
                displayScrollElement(el);
            } else {
                // hideScrollElement(el); // Aktifkan jika ingin elemen hilang saat keluar viewport
            }
        });
    }

    // Panggil handleScrollAnimation saat load dan scroll
    handleScrollAnimation(); // Panggil sekali saat load untuk elemen yang sudah terlihat
    window.addEventListener('scroll', handleScrollAnimation);


    // Update tahun di footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Newsletter Form (Contoh)
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (emailInput.value.trim() !== '') {
                alert(`Terima kasih telah berlangganan dengan email: ${emailInput.value}`);
                emailInput.value = '';
            } else {
                alert('Mohon masukkan alamat email Anda.');
            }
        });
    }

    // Efek ketik pada hero subtitle (Opsional, contoh)
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        let i = 0;
        heroSubtitle.textContent = ''; // Kosongkan dulu
        function typeWriter() {
            if (i < originalText.length) {
                heroSubtitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50); // Kecepatan ketik (ms)
            }
        }
        // Panggil setelah sedikit delay agar animasi hero utama selesai
        setTimeout(typeWriter, 1200);
    }

});
