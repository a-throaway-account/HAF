const CLIENT_LOGOS = [
    { src: 'https://picsum.photos/200/80?random=1' },
    { src: 'https://picsum.photos/200/80?random=2' },
    { src: 'https://picsum.photos/200/80?random=3' },
    { src: 'https://picsum.photos/200/80?random=4' },
    { src: 'https://picsum.photos/200/80?random=5' },
    { src: 'https://picsum.photos/200/80?random=6' }
];

function initScrollVelocityLogos() {
    const tracks = document.querySelectorAll('.logo-track');
    let currentScroll = window.pageYOffset;
    let velocity = 0;
    let scrollPos = 0;

    // 1. Fill all 3 tracks with logos
    tracks.forEach(track => {
        const logoHtml = CLIENT_LOGOS.map(logo => `
            <div class="logo-item"><img src="${logo.src}" draggable="false"></div>
        `).join('');
        track.innerHTML = logoHtml + logoHtml + logoHtml + logoHtml;
    });

    // 2. Track Scroll Velocity
    window.addEventListener('scroll', () => {
        const newScroll = window.pageYOffset;
        velocity = (newScroll - currentScroll) * 0.5; // Sensitivity
        currentScroll = newScroll;
    });

    function animate() {
        // Apply friction (velocity decay)
        velocity *= 0.95; 
        
        // Add a tiny bit of base velocity if you want it to NEVER fully stop 
        // (If you want it to stop completely, leave the next line out)
        // if (Math.abs(velocity) < 0.1) velocity = 0;

        scrollPos += velocity;

        tracks.forEach((track, index) => {
            const resetPoint = track.scrollWidth / 4;
            let moveAmount = scrollPos;

            // Make the middle row (index 1) move in the opposite direction
            if (index === 1) {
                moveAmount = -scrollPos;
            }

            // Infinite loop math
            const xPos = ((moveAmount % resetPoint) - resetPoint) % resetPoint;
            track.style.transform = `translate3d(${xPos}px, 0, 0)`;
        });

        requestAnimationFrame(animate);
    }

    animate();
}

document.addEventListener('DOMContentLoaded', initScrollVelocityLogos);