import { tabs } from './modules/tabs';
import { modal } from './modules/modal';
import { Card } from './modules/Card';
import { postData } from './modules/postData';
import { slider } from './modules/slider';
import { calc } from './modules/calc';
import { timer } from './modules/timer';

tabs('.tabcontent', '.tabheader__item');
modal();
Card();
postData();
slider();
calc();
timer();
