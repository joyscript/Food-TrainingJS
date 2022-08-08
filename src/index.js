import { tabs } from './modules/tabs';
import { Card } from './modules/Card';
import { contact } from './modules/contact';
import { slider } from './modules/slider';
import { calc } from './modules/calc';
import { timer } from './modules/timer';

tabs('.tabcontent', '.tabheader__item');
Card();
contact();
slider();
calc();
timer();
