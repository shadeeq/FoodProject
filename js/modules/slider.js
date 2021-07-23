import {addZero} from './timer';
function slider({container, slide, nextArrow, prevArrow, totalCurrent, currentCounter, wrapper, field}) {
   

    const slides = document.querySelectorAll(slide),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        slider = document.querySelector(container),
        total = document.querySelector(totalCurrent),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;
    let slideIndex = 1;
    let offset = 0;
    
    current.textContent = addZero(slideIndex);
    total.textContent = addZero(slides.length);

    slider.style.position = 'relative';

    const indicators = document.createElement('ol');
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    for (let i=0; i < slides.length; i++) {
        const li = document.createElement('li');
        li.classList.add('dot');
        li.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        indicators.append(li);
    }

    const dots = document.querySelectorAll('.dot');

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = "0.5s all";

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    next.addEventListener('click', () => {
        if (offset === +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length -2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;
        slideIndex++;
        changeSlideIndex(slideIndex);
        switchDot(slideIndex);
        
    });

    prev.addEventListener('click', () => {
        if (offset === 0) {
            offset = +width.slice(0, width.length -2) * (slides.length -1);
        } else {
            offset -= +width.slice(0, width.length -2);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        slideIndex--;
        changeSlideIndex(slideIndex);
        switchDot(slideIndex);
    });

    function changeSlideIndex(n) {
        if (n < 1) {
            slideIndex = slides.length;
        } else if (n > slides.length) {
            slideIndex = 1;
        }
        current.textContent = addZero(slideIndex);
    }
    // Dots for slider
    switchDot(slideIndex);

    function switchDot(n) {
        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[n-1].style.opacity = '1';
    }

    dots.forEach((dot,i) => {
        dot.addEventListener('click', () => {
            offset = cutWords(width) * i;
            slidesField.style.transform = `translateX(-${offset}px)`;
            switchDot(i+1);
            current.textContent = addZero(i+1);
            slideIndex = (i+1);
        });
    });

    function cutWords(str) {
        return str.replace(/\D/g, '');
    }

   
}

export default slider;