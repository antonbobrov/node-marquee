import '../styles/index.scss';
import nodeMarquee from '../../src/ts/index';

const simple = document.getElementById('marquee-simple');
if (simple) {
    nodeMarquee({
        parent: simple,
    });
}

const pause = document.getElementById('marquee-pause');
if (pause) {
    nodeMarquee({
        parent: pause,
        pauseOnHover: true,
    });
}

const reverse = document.getElementById('marquee-reverse');
if (reverse) {
    nodeMarquee({
        parent: reverse,
        speed: -1,
    });
}

const mutation = document.getElementById('marquee-mutation');
if (mutation) {
    nodeMarquee({
        parent: mutation,
        speed: -1,
    });
    setTimeout(() => {
        mutation.innerHTML = 'The text is changed -';
    }, 5000);
}

const destroy = document.getElementById('marquee-destroy');
if (destroy) {
    const marquee = nodeMarquee({
        parent: destroy,
        speed: -1,
    });
    setTimeout(() => {
        if (marquee) {
            marquee.destroy();
        }
    }, 5000);
}
