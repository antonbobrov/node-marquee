import '../styles/index.scss';

import nodeMarquee from '../../../src/index';
require('babel-polyfill');



// try simple marquee
nodeMarquee({
    speed: 2,
    selector: '#node-marquee'
});

// try marquee that is paused on hover
nodeMarquee({
    speed: 2,
    selector: '#node-marquee-pause',
    pauseOnHover: true
});



// try observable marquee
const observableMarqueeElement = document.querySelector("#node-marquee-observable");
// init marquee
const observableMarquee = nodeMarquee({
    selector: observableMarqueeElement,
    speed: 3
});
// and then change its content
setTimeout(() => {
    observableMarqueeElement.innerHTML = 'Dynamic content';
}, 2000);
// and destroy
setTimeout(() => {
    if (observableMarquee) {
        observableMarquee.destroy();
    }
}, 5000);