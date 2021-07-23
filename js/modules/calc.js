function calc() {
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

   
}

export default calc;