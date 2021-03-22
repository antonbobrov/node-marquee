import { selectOne, isElement, addEventListener } from 'vevet-dom';
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
    let destroyed = false;

    // default properties
    const DEFAULT_PROP: NodeMarqueeProp = {
        selector: '.node-marquee',
        speed: 1,
        autoplay: true,
        pauseOnHover: false,
        applyOuterStyles: true,
        optimizeCalculation: false,
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
    let elementsWidth: number[] = [];

    // vars
    let translateX = 0;
    let isPlaying = false;

    // minimum amount of text elements
    const MIN_AMOUNT = 4;

    // events
    let observer: false | MutationObserver = false;



    // create the marquee element
    createMarquee();

    // set animation frame
    let animationFrame: (false | number) = false;
    if (prop.autoplay) {
        play();
    }



    // set events
    const RESIZE_LISTENER = addEventListener(window, 'resize', createMarquee.bind(this));
    const MOUSEENTER_LISTENER = addEventListener(OUTER, 'mouseenter', onMouseEnter.bind(this));
    const MOUSELEAVE_LISTENER = addEventListener(OUTER, 'mouseleave', onMouseLeave.bind(this));



    // Create the marquee element
    function createMarquee () {

        // disable mutation observer
        disconnectMutationsObserver();

        // clear the outer element
        quantity = 0;
        elements = [];
        elementsWidth = [];
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
        let firstElWidth = firstEl.clientWidth;
        if (firstElWidth <= 0) {
            firstElWidth = window.innerWidth;
        }
        // calculate how much elements we need to create in addition to the first one
        if (firstElWidth < OUTER.clientWidth) {
            quantity = Math.ceil(OUTER.clientWidth * 1.5 / firstElWidth);
        }
        if (quantity < MIN_AMOUNT) {
            quantity = MIN_AMOUNT;
        }
        // and create them
        for (let i = 0; i < quantity - 1; i++) {
            createElement(true);
        }

        // update sizes of the elements
        updateSizes();

        // render
        renderElements();

        // enable mutation observer
        observeMutations();

        // and to be sure, update sizes once more
        if (prop.optimizeCalculation) {
            setTimeout(() => {
                updateSizes();
            }, 500);
        }

    }

    function createElement (
        absolutePosition = false,
    ) {

        const el = document.createElement('div');
        el.classList.add(`${className}__el`);

        // set text
        el.innerHTML = `&nbsp;${text}`;

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
        let moveToEndIndex = 0;

        let w = 0;
        // render elements
        for (let i = 0; i < quantity; i++) {

            const el = elements[i];

            // get width of the current element
            if (!prop.optimizeCalculation) {
                elementsWidth[i] = el.clientWidth;
            }
            const elWidth = elementsWidth[i];

            // calulate transforms
            const x = w - translateX;
            w += elWidth;

            // apply transforms
            el.style.transform = `matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0, ${x}, 0, 0,1)`;
            if (x < elWidth * -1) {
                moveToEnd = el;
                moveToEndIndex = i;
            }

        }

        if (moveToEnd) {
            elements.push(elements.splice(elements.indexOf(moveToEnd), 1)[0]);
            translateX -= prop.optimizeCalculation ? elementsWidth[moveToEndIndex] : moveToEnd.clientWidth;
            if (prop.optimizeCalculation) {
                updateSizes();
            }
        }

    }

    // Update elements' width
    function updateSizes () {

        if (destroyed) {
            return;
        }

        for (let i = 0; i < quantity; i++) {
            let width = elements[i].clientWidth;
            width = elements[i].clientWidth;
            if (width <= 0) {
                width = window.innerWidth;
            }
            elementsWidth[i] = width;
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

        destroyed = true;

        pause();
        disconnectMutationsObserver();

        RESIZE_LISTENER.remove();
        MOUSEENTER_LISTENER.remove();
        MOUSELEAVE_LISTENER.remove();

        OUTER.innerHTML = text;

    }



    return {
        play: play.bind(this),
        pause: pause.bind(this),
        isPlaying: () => isPlaying,
        render: renderElements.bind(this),
        recreate: createMarquee.bind(this),
        updateSizes: updateSizes.bind(this),
        destroy: destroy.bind(this),
    };

}
