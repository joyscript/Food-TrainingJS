import { tabs } from './modules/tabs';
import { contact } from './modules/contact';
import { slider } from './modules/slider';
import { calc } from './modules/calc';
import { cards } from './modules/cards';
import { timer } from './modules/timer';

tabs('.tabcontent', '.tabheader__item');
slider('.offer__slider', '.offer__slide', '.offer__slider-prev', '.offer__slider-next', '#current', '#total');
contact();
calc();
cards();
timer();
