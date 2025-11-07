(function () {
    var images = [
        'Assets/act5bg1.jpg',
        'Assets/act5bg2.jpg',
        'Assets/act5bg3.jpg',
        'Assets/act5bg4.jpg',
        'Assets/act5bg5.jpg',
        'Assets/act5bg6.jpg',
        'Assets/act5bg7.jpg'
    ];

    var a = document.querySelector('.slide-a');
    var b = document.querySelector('.slide-b');
    var idx = 0;
    var showingA = true;
    var intervalMs = 7000;
    var slideshowActive = true;
    var scrollTimeout;

    function setBackground(el, src) {
        el.style.backgroundImage = 'url(' + src + ')';
    }

    setBackground(a, images[0]);
    setTimeout(function () { a.classList.add('is-visible'); }, 0);

    function nextIndex(i) {
        return (i + 1) % images.length;
    }

    function crossfade() {
        if (!slideshowActive) return;
        var next = nextIndex(idx);
        if (showingA) {
            setBackground(b, images[next]);
            b.classList.add('is-visible');
            a.classList.remove('is-visible');
        } else {
            setBackground(a, images[next]);
            a.classList.add('is-visible');
            b.classList.remove('is-visible');
        }
        showingA = !showingA;
        idx = next;
        scheduleNext();
    }

    function scheduleNext() {
        setTimeout(crossfade, intervalMs);
    }

    images.forEach(function (src) {
        var img = new Image();
        img.src = src;
    });

    setTimeout(function () {
        idx = 0;
        scheduleNext();
    }, 1200);

    const sliderContainer = document.querySelector('.slider-container');
    const sliderImages = document.querySelectorAll('.slider-img');
    let isPaused = false;

    sliderImages.forEach(img => {
        img.addEventListener('click', () => {
            if (!isPaused) {
                sliderContainer.classList.add('paused');
                img.classList.add('active');
                isPaused = true;
            } else {
                sliderContainer.classList.remove('paused');
                img.classList.remove('active');
                isPaused = false;
            }
        });
    });

    const placesSliderContainer = document.querySelector('.places-slider-container');
    const placesSliderImages = document.querySelectorAll('.places-slider-img');
    let isPlacesPaused = false;

    placesSliderImages.forEach(img => {
        img.addEventListener('click', () => {
            if (!isPlacesPaused) {
                placesSliderContainer.classList.add('paused');
                img.classList.add('active');
                isPlacesPaused = true;
            } else {
                placesSliderContainer.classList.remove('paused');
                img.classList.remove('active');
                isPlacesPaused = false;
            }
        });
    });

    window.addEventListener('scroll', function () {
        slideshowActive = false;
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function () {
            slideshowActive = true;
        }, 300);
    });
})();

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }
}
