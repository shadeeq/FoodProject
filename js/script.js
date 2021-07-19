"use strict";
window.addEventListener('DOMContentLoaded', function() {
   
    // Tabs
    
	let tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent() {
        
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
	}

	function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    
    hideTabContent();
    showTabContent();

	tabsParent.addEventListener('click', function(event) {
		const target = event.target;
		if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
		}
    });
    
    //Timer

    const timer = setInterval(setClock, 1000);
    setClock();
    function setClock(deadline = "2021-07-26"){
        const t = Date.parse(deadline) - Date.parse(new Date());
        const timer = document.querySelector('.timer');
        timer.querySelector('#days').innerHTML = addZero(Math.floor((t / (1000*60*60*24))));
        timer.querySelector('#hours').innerHTML = addZero(Math.floor((t / (1000*60*60)%24)));
        timer.querySelector('#minutes').innerHTML = addZero(Math.floor((t / (1000*60)% 60)));
        timer.querySelector('#seconds').innerHTML = addZero(Math.floor((t / 1000 % 60)));

        if (t <= 0) {
            clearInterval(timer);
        }
    }
    function addZero(num) {
        if (num > 0 && num < 10) {
            num = `0${num}`;
        }
        return num;
    }
    
   
    /*const deadline = '2022-05-11';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor( (t/(1000*60*60*24)) ),
            seconds = Math.floor( (t/1000) % 60 ),
            minutes = Math.floor( (t/1000/60) % 60 ),
            hours = Math.floor( (t/(1000*60*60) % 24) );

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num){
        if (num >= 0 && num < 10) { 
            return '0' + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);*/

    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == "") {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) { 
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 300000);
    // Изменил значение, чтобы не отвлекало

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

   
    // Используем классы для создание карточек меню

/*    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH(); 
        }

        changeToUAH() {
            this.price = this.price * this.transfer; 
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    getData('http://localhost:3000/menu')
    .then(data => createMenu(data));

    function createMenu(data) {
        data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        });
    }
*/  
    //  Создаем карточки меню

    const getData = async data => {
        let res = await fetch(data);
        if (!res.ok) {
            throw new Error('ERROR');
        } 
        return await res.json();
    };

    
    getData('http://localhost:3000/menu')
    .then(data => createCard(data));

    function createCard(data, parent = '.menu .container') {
        data.forEach(({img, altimg, title, descr, price}) => {
            const div = document.createElement('div');
            div.classList.add('menu__item');
            price = price*27;
            div.innerHTML = `
                <img src=${img} alt=${altimg}>
                <h3 class="menu__item-subtitle">${title}</h3>
                <div class="menu__item-descr">${descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${price}</span> грн/день</div>
                </div>
            `;
            document.querySelector(parent).append(div);
        });
    }  

   
    // Forms

    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });
        return await res.json();
    };
    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);
        
            
            // Перебор formData для создания JSON объекта
           /*  const formData = new FormData(form);
            const obj = {};
            formData.forEach((input, key) => {
                obj[key] = input;
            });
            console.log(obj); 
            const json = JSON.stringify(obj);*/
            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            
            
            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }
  
    // Окно после оправки формы

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }
    
    // Slider

    /* const slides = document.querySelectorAll('.offer__slide'),
    prev = document.querySelector('.offer__slider-prev'),
    next = document.querySelector('.offer__slider-next');
    let current = 1;
    const wrapper = document.querySelector('.offer__slider');
    document.querySelector('#current').textContent = addZero(current);
    document.querySelector('#total').textContent = addZero(slides.length);

    wrapper.addEventListener('click', (e) => {
        if (e.target.classList.contains('offer__slider-prev')) {
            current--;
            if (current < 1) {
                current = slides.length;
            }
            document.querySelector('#current').textContent = addZero(current);
            showSlide(current-1);
        } else if (e.target.classList.contains('offer__slider-next')) {
            current++;
            if (current > slides.length) {
                current = 1;
            }
            document.querySelector('#current').textContent = addZero(current);
            showSlide(current-1);
        }
    });

    function showSlide(i=0) {
        slides.forEach(slide => {
            slide.classList.add('hide');
        });
        slides[i].classList.add('show');
        slides[i].classList.remove('hide');
    }
    showSlide(); */
   
    // Slider_2
    
    /* const slides = document.querySelectorAll('.offer__slide'),
    next = document.querySelector('.offer__slider-next'),
    prev = document.querySelector('.offer__slider-prev');
    let currentValue = 1;
    document.querySelector('#current').textContent = addZero(currentValue);
    document.querySelector('#total').textContent = addZero(slides.length);
    showSlide(currentValue);
    function showSlide(n) {
       if (n < 1) {
           currentValue = slides.length;
       } else if (n > slides.length) {
           currentValue = 1;
       }

       slides.forEach(item => item.style.display = "none");
       slides[currentValue-1].style.display = '';
       document.querySelector('#current').textContent = addZero(currentValue);
    }

    function nextSlide(n) {
        showSlide(currentValue += n);
    }

    next.addEventListener('click', () => {
        nextSlide(1);
    });
    prev.addEventListener('click', () => {
        nextSlide(-1);
    });
 */
    // Animated Slider

    const slides = document.querySelectorAll('.offer__slide'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        slider = document.querySelector('.offer__slider'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
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
        slideIn(slideIndex);
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
        slideIn(slideIndex);
        switchDot(slideIndex);
    });

    function slideIn(n) {
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

   


    // Calculator v.1
    /*const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio;

    function calcTotal() {
        if (!sex || !weight || !age || !height || !ratio) {
            result.textContent = '____';
            return;
        }

        if (sex === "female") {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else if (sex === "male") {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 *age)) * ratio);
        }
    }
    calcTotal();

    const genders = document.querySelectorAll('#gender div');

    genders.forEach(gender => {
        gender.addEventListener('click', () => {
            genders.forEach(gender => gender.classList.remove('calculating__choose-item_active'));
            gender.classList.add('calculating__choose-item_active');
            sex = gender.getAttribute('id');
            calcTotal();
        });
    });

    const inputs = document.querySelectorAll('.calculating__choose_medium input');

    inputs.forEach(input => {
        input.addEventListener('input', () => {
            input.value = input.value.replace(/\D/ig, '');

            height = +document.querySelector('#height').value;
            weight = +document.querySelector('#weight').value;
            age = +document.querySelector('#age').value;

            calcTotal();
        });
    });

    const activity = document.querySelectorAll('.calculating__choose_big div');

    activity.forEach(button => {
        button.addEventListener('click', () => {
            activity.forEach(act => act.classList.remove('calculating__choose-item_active'));
            ratio = button.getAttribute('data-ratio');
            button.classList.add('calculating__choose-item_active');

            calcTotal();
        });
    });*/


    // Calculator v.2 with Local Storage

    const result = document.querySelector('.calculating__result span');
    let sex, weight, age, height, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function calcTotal() {
        if (!sex || !weight || !age || !height || !ratio) {
            result.textContent = '____';
            return;
        }

        if (sex === "female") {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else if (sex === "male") {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 *age)) * ratio);
        }
    }
    calcTotal();

    function initLocalSettings(selector, activeClass) {
        const items = document.querySelectorAll(selector);

        items.forEach(item => {
            item.classList.remove(activeClass);
            if (item.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                item.classList.add(activeClass);
                ratio = localStorage.getItem('ratio');
            }
            if (item.getAttribute('id') === localStorage.getItem('sex')) {
                item.classList.add(activeClass);
                sex = localStorage.getItem('sex');
            }
        });
    }
    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function getActiveButtons(selector, activeClass) {
        const items = document.querySelectorAll(selector);

        items.forEach(item => {
            item.addEventListener('click', (e) => {
                if (item.getAttribute('data-ratio')) {
                    ratio = +item.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +item.getAttribute('data-ratio'));
                } else {
                    sex = item.getAttribute('id');
                    localStorage.setItem('sex', item.getAttribute('id'));
                }

                items.forEach(item => item.classList.remove(activeClass));
                item.classList.add(activeClass);

                calcTotal();
            });
        });
    }

    getActiveButtons('#gender div', 'calculating__choose-item_active');
    getActiveButtons('.calculating__choose_big div', 'calculating__choose-item_active');

    function getInputs(selector) {
        const inputs = document.querySelectorAll(selector);

        inputs.forEach(input => {
            input.addEventListener('input', () => {
                /* if (input.value.match(/\D/g)) {
                    input.style.border = '1px solid red';
                } else {
                    input.style.border = 'none';
                } */
                input.value = input.value.replace(/\D/ig, '');
                
                switch (input.getAttribute('id')) {
                    case 'weight':
                        weight = +input.value;
                        break;
                    case 'height':
                        height = +input.value;
                        break;
                    case 'age':
                        age = +input.value;
                        break;

                }
                calcTotal();
            });
        });
    }

    getInputs('#height');
    getInputs('#weight');
    getInputs('#age');



});