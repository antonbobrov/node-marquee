import '../styles/index.scss';
import nodeMarquee from '../../src/ts';



// try a simple marquee
nodeMarquee({
    speed: 2,
    selector: '#node-marquee',
});

// try a marquee that is paused on hover
nodeMarquee({
    speed: 2,
    selector: '#node-marquee-pause',
    pauseOnHover: true,
});



// try an observable marquee
const observableMarqueeElement = document.querySelector('#node-marquee-observable');
// init the marquee
const observableMarquee = nodeMarquee({
    selector: observableMarqueeElement as HTMLElement,
    speed: 3,
});
// and then change its content
setTimeout(() => {

    observableMarqueeElement.innerHTML = 'It\'s content may be changed dynamically.';

    // and destroy
    setTimeout(() => {
        if (observableMarquee) {
            observableMarquee.destroy();
        }
    }, 5000);

}, 5000);
