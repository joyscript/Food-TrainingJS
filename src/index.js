import { clearLS } from './modules/services';
import { tabs } from './modules/tabs';
import { slider } from './modules/slider';
import { contact } from './modules/contact';
import { calc } from './modules/calc';
import { cards } from './modules/cards';
import { timer } from './modules/timer';

clearLS();
tabs('.tabcontent', '.tabheader__item');
slider('.offer__slider', '.offer__slide', '.offer__slider-prev', '.offer__slider-next', '#current', '#total');
contact();
calc();
cards();
timer('.timer', '2022-08-08', '#end-day', '#end-month');
