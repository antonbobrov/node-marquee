import { selectOne, isElement } from 'vevet-dom';
import { NodeMarqueeProp, NodeMarquee } from './types';

export {
    NodeMarquee,
    NodeMarqueeProp,
};



/**
 * Custom Marquee
 */
export default function nodeMarquee (
    prop: NodeMarqueeProp = {},
): (NodeMarquee | false) {

    const className = 'node-marquee';

    // default properties
    const DEFAULT_PROP: NodeMarqueeProp = {
        selector: '.node-marquee',
        speed: 1,
        autoplay: true,
        pauseOnHover: false,
        applyOuterStyles: true,
    };
    // extend properties
    prop = Object.assign(DEFAULT_PROP, prop);



    // get the outer element
    const OUTER = selectOne(prop.selector) as HTMLElement;
    // return if the element doesn't exist
    if (!isElement(OUTER)) {
        return false;
    }
    // add the default class
    OUTER.classList.add(className);



    // get inner text
    let text = OUTER.innerHTML;

    // quantity of elements
    let quantity = 0;
    let elements: HTMLElement[] = [];

    // vars
    let translateX = 0;
    let isPlaying = false;

    // minimum amount of text elements
    const MIN_AMOUNT = 4;

    // events
    let observer: false | MutationObserver = false;
    const RESIZE_LISTENER_FUNCTION = createMarquee.bind(this);
    const MOUSE_ENTER_LISTENER_FUNCTION = onMouseEnter.bind(this);
    const MOUSE_LEAVE_LISTENER_FUNCTION = onMouseLeave.bind(this);



    // create the marquee element
    createMarquee();

    // set animation frame
    let animationFrame: (false | number) = false;
    if (prop.autoplay) {
        play();
    }



    // set events
    window.addEventListener('resize', RESIZE_LISTENER_FUNCTION, false);
    OUTER.addEventListener('mouseenter', MOUSE_ENTER_LISTENER_FUNCTION, false);
    OUTER.addEventListener('mouseleave', MOUSE_LEAVE_LISTENER_FUNCTION, false);



    // Create the marquee element
    function createMarquee () {

        // disable mutation observer
        disconnectMutationsObserver();

        // clear the outer element
        quantity = 0;
        elements = [];
        OUTER.innerHTML = '';

        // apply styles to the outer
        if (prop.applyOuterStyles) {
            OUTER.style.position = 'relative';
            OUTER.style.width = '100%';
            OUTER.style.overflow = 'hidden';
            OUTER.style.whiteSpace = 'nowrap';
        }

        // create the first element
        const firstEl = createElement();

        // calculate how much elements we need to create in addition to the first one
        let width = firstEl.clientWidth;
        if (width <= 0) {
            width = window.innerWidth;
        }
        if (width < OUTER.clientWidth) {
            quantity = Math.ceil(OUTER.clientWidth * 1.5 / width);
        }
        if (quantity < MIN_AMOUNT) {
            quantity = MIN_AMOUNT;
        }
        // and create them
        for (let i = 0; i < quantity - 1; i++) {
            createElement(true, true);
        }

        // render
        renderElements();

        // enable mutation observer
        observeMutations();

    }

    function createElement (
        absolutePosition = false,
        appendWhitespace = false,
    ) {

        const el = document.createElement('div');
        el.classList.add(`${className}__el`);

        // set text
        if (appendWhitespace) {
            el.innerHTML = `&nbsp;${text}`;
        }
        else {
            el.innerHTML = text;
        }

        // apply styles
        if (absolutePosition) {
            el.style.position = 'absolute';
            el.style.top = '0';
            el.style.left = '0';
        }
        el.style.display = 'inline-block';

        // add the element
        OUTER.appendChild(el);
        elements.push(el);

        return el;

    }



    // when the marquee is hovered
    function onMouseEnter () {
        if (prop.pauseOnHover) {
            pause();
        }
    }

    // when the marquee is not hovered anymore
    function onMouseLeave () {
        if (prop.pauseOnHover) {
            play();
        }
    }



    // observe changes in DOM
    // when there happen some changes, we recreate the marquee element

    function observeMutations () {

        // observer config
        const config: MutationObserverInit = {
            childList: true,
        };

        // oserver callback
        const callback: MutationCallback = (mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    text = OUTER.innerHTML;
                    createMarquee();
                }
            }
        };

        // create the observer
        observer = new MutationObserver(callback);
        observer.observe(OUTER, config);

    }

    function disconnectMutationsObserver () {
        if (observer) {
            observer.disconnect();
        }
    }



    // Render the marquee element
    function render () {

        renderElements();

        if (isPlaying) {
            animationFrame = window.requestAnimationFrame(render.bind(this));
        }

    }

    // Render the Marquee Elements
    function renderElements (
        speed = prop.speed,
    ) {

        translateX += speed;
        let moveToEnd: (HTMLElement | false) = false;

        let w = 0;
        for (let i = 0; i < quantity; i++) {

            const el = elements[i];

            const t = w - translateX;
            w += el.clientWidth;

            el.style.transform = `translate(${t}px, 0)`;
            if (t < el.clientWidth * -1) {
                moveToEnd = el;
            }

        }

        if (moveToEnd) {
            elements.push(elements.splice(elements.indexOf(moveToEnd), 1)[0]);
            translateX -= moveToEnd.clientWidth;
        }

    }



    // Start the animation frame
    function play () {
        if (!animationFrame) {
            isPlaying = true;
            animationFrame = window.requestAnimationFrame(render.bind(this));
        }
    }

    // Stop the animation frame
    function pause () {
        isPlaying = false;
        if (animationFrame) {
            window.cancelAnimationFrame(animationFrame);
            animationFrame = false;
        }
    }



    // Destroy the marquee
    function destroy () {

        pause();
        disconnectMutationsObserver();

        window.removeEventListener('resize', RESIZE_LISTENER_FUNCTION, false);
        OUTER.removeEventListener('mouseenter', MOUSE_ENTER_LISTENER_FUNCTION, false);
        OUTER.removeEventListener('mouseleave', MOUSE_LEAVE_LISTENER_FUNCTION, false);

        OUTER.innerHTML = text;

    }



    return {
        play: play.bind(this),
        pause: pause.bind(this),
        isPlaying: () => isPlaying,
        render: renderElements.bind(this),
        recreate: createMarquee.bind(this),
        destroy: destroy.bind(this),
    };

}
