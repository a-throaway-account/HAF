const themes = [
    {
        bg: "#F6EFD2", // Your Cream
        text: "#000000",
        accent: "#E43636", // Your Red
        badge: "CAMPAIGN LIVE",
        title: "Elevating Digital <br>Presence.",
        desc: "We craft bespoke digital experiences for world-class brands.",
        brand: "HYPHEN",
        img: "https://picsum.photos/id/20/1200/800"
    },
    {
        bg: "#000000", // Dark Mode
        text: "#F6EFD2",
        accent: "#E43636",
        badge: "AWARD WINNING",
        title: "Defining the <br>Future.",
        desc: "Strategic marketing solutions that drive measurable growth and impact.",
        brand: "NIKE",
        img: "https://picsum.photos/id/26/1200/800"
    },
    {
        bg: "#E2DDB4", // Your Beige
        text: "#000000",
        accent: "#000000",
        badge: "CREATIVE STUDIO",
        title: "Artistry in <br>Every Pixel.",
        desc: "Merging creativity with data to build the next generation of commerce.",
        brand: "APPLE",
        img: "https://picsum.photos/id/30/1200/800"
    }
];

let currentIndex = 0;

function rotateTheme() {
    const leftPart = document.querySelector('.hero-left');
    const heroImg = document.getElementById('hero-img');
    const root = document.documentElement;

    // Start transition
    leftPart.classList.add('fade-out');
    heroImg.classList.add('img-zoom');

    setTimeout(() => {
        currentIndex = (currentIndex + 1) % themes.length;
        const theme = themes[currentIndex];

        // Update Colors
        root.style.setProperty('--hero-bg', theme.bg);
        root.style.setProperty('--hero-text', theme.text);
        root.style.setProperty('--hero-accent', theme.accent);

        // Update Text Content
        document.getElementById('hero-badge').innerText = theme.badge;
        document.getElementById('hero-title').innerHTML = theme.title;
        document.getElementById('hero-desc').innerText = theme.desc;
        document.getElementById('brand-tag').innerText = theme.brand;
        
        // Update Image
        heroImg.src = theme.img;

        // End transition
        leftPart.classList.remove('fade-out');
        heroImg.classList.remove('img-zoom');
    }, 500);
}

// Initialize and run every 5 seconds
document.addEventListener('DOMContentLoaded', () => {
    setInterval(rotateTheme, 5000);
});

function slideBlogs(direction) {
    const container = document.getElementById('blogGrid');
    // Calculate scroll distance (Card width + Gap)
    const card = document.querySelector('.blog-card');
    const cardWidth = card.offsetWidth + 30; // 30 is the gap in CSS

    if (direction === 'left') {
        container.scrollBy({
            left: -cardWidth,
            behavior: 'smooth'
        });
    } else {
        container.scrollBy({
            left: cardWidth,
            behavior: 'smooth'
        });
    }
}

function moveServices(direction) {
    const grid = document.getElementById('servicesGrid');
    const firstCard = grid.querySelector('.service-card');
    const moveDistance = firstCard.offsetWidth + 30; // Card + Gap

    if (direction === 'left') {
        grid.scrollBy({ left: -moveDistance, behavior: 'smooth' });
    } else {
        grid.scrollBy({ left: moveDistance, behavior: 'smooth' });
    }
}

window.addEventListener('scroll', function() {
    const nav = document.querySelector('.main-nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

window.onscroll = function() {
    updateProgressBar();
};

function updateProgressBar() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    document.getElementById("scrollBar").style.width = scrolled + "%";
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Blog Scroll
    const blogTrack = document.getElementById('blogTrack');
    const bPrev = document.querySelector('.blog-prev');
    const bNext = document.querySelector('.blog-next');

    if (blogTrack && bPrev && bNext) {
        bNext.addEventListener('click', () => blogTrack.scrollBy({ left: 430, behavior: 'smooth' }));
        bPrev.addEventListener('click', () => blogTrack.scrollBy({ left: -430, behavior: 'smooth' }));
    }

    // 2. Subtle 3D Tilt for Blog Cards
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((e.clientY - rect.top - centerY) / centerY) * -7; // Subtle 7 deg
            const rotateY = ((e.clientX - rect.left - centerX) / centerX) * 7;
            
            card.style.transform = `perspective(2000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(2000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });
});