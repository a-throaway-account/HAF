const sliderCSS = `
<style>

    .logo-area {
        padding: 50px 0;
        overflow: hidden; /* Keeps the "bubble" movement contained */
    }

    .logo-slider {
        width: 100%;
        overflow: hidden;
        display: flex;
        margin-bottom: 20px; /* Space between the 3 rows */
    }

    .logos-wrapper {
        display: flex;
        width: max-content;
        animation: marquee 30s linear infinite;
        will-change: transform, margin-left; /* Optimizes performance for scroll */
    }

    /* Vary the speeds for more randomness */
    #slider1 .logos-wrapper { animation-duration: 25s; }
    #slider2 .logos-wrapper { animation-duration: 40s; animation-direction: reverse; }
    #slider3 .logos-wrapper { animation-duration: 30s; }

    .logos-wrapper img {
        height: 50px;
        margin: 0 40px;
        flex-shrink: 0;
        opacity: 0.7;
        transition: opacity 0.3s;
    }

    .logos-wrapper img:hover { opacity: 1; }

    @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
    }
</style>
`;
document.head.insertAdjacentHTML('beforeend', sliderCSS);

$(document).ready(function() {
    const allLogos = [
        'logos/lunaer-logo.png', 
        'logos/merapashu-logo.png',
        'logos/xneeti-logo.png',
        'logos/baked-beauty-logo.png',
        'logos/nidhi-logo.png'
    ];

    // Function to shuffle an array
    const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

    const setupSlider = (id) => {
        const $slider = $(id);
        const $wrapper = $('<div class="logos-wrapper"></div>');
        
        // Randomize logos for this specific row
        const randomSet = shuffle(allLogos);
        const logoHTML = randomSet.map(url => `<img src="${url}" alt="Client">`).join('');
        
        $wrapper.html(logoHTML + logoHTML);
        $slider.append($wrapper);
        return $wrapper;
    };

    // Initialize all 3
    const $w1 = setupSlider('#slider1');
    const $w2 = setupSlider('#slider2');
    const $w3 = setupSlider('#slider3');

    // 3) Scroll "Bubble Level" Effect
    $(window).on('scroll', function() {
        let scrollTop = $(window).scrollTop();
        
        // Move each row slightly differently based on scroll
        // Adjust the numbers (0.2, 0.5, 0.1) to change the "sensitivity"
        $w1.css('margin-left', `${(scrollTop * 0.2)}px`);
        $w2.css('margin-left', `${-(scrollTop * 0.5)}px`);
        $w3.css('margin-left', `${(scrollTop * 0.3)}px`);
    });
});
// Inject the CSS into the head

