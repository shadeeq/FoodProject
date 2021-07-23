"use strict";
require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';
import calc from './modules/calc';
import forms from './modules/forms';
import menu from './modules/menu';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', function() {
        
        const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 300000);

        calc();
        forms('form', modalTimerId);
        menu();
        modal('[data-modal]', '.modal', modalTimerId);
        slider({
                container : '.offer__slider',
                slide : '.offer__slide',
                nextArrow: '.offer__slider-next',
                prevArrow: '.offer__slider-prev',
                totalCurrent: '#total',
                currentCounter: '#current',
                wrapper: '.offer__slider-wrapper',
                field: '.offer__slider-inner'
        });
        tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
        timer('.timer', '2021-08-01');
        
       

       
});
