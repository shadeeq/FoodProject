import {getData} from '../services/services';
function menu() {
       
   
   

    
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

   
}

export default menu;